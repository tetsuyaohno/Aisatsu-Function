require('dotenv').config();
const fs = require('node:fs/promises');
const path = require('node:path');
const OpenAI = require('openai');

// ChatGPT起動
const JOUHOU_INPUT = path.join(__dirname, 'aisatsu.json'); // EmbeddingFile
const EMBEDDING_MODEL = 'text-embedding-3-small';
const CHAT_MODEL = 'gpt-6.2-astra';
const openai = new OpenAI({apiKey: process.env.GPT_API});
let knowledgePromise;

/**
 * ChatGPT Embedによるレスポンス作成。
 * @param {Object} query 立場(tachiba)、場面(bamen)、注文(chumon)、補足(hosoku)。
 * @return {Promise<string>} 生成したあいさつ文、または入力を促すメッセージ。
 */
exports.chatGpt = async function(query) {
  // 入力内容を取得
  if (!query || typeof query.tachiba !== 'string' || !query.tachiba.trim() ||
      typeof query.bamen !== 'string' || !query.bamen.trim()) {
    return '質問を入力してください。';
  }
  const chumon = typeof query.chumon === 'string' ? query.chumon.trim() : '';
  const hosoku = typeof query.hosoku === 'string' ? query.hosoku.trim() : '';
  // ユーザーからの質問文を組み立てる
  const input = `${query.bamen.trim()}で使用するあいさつ文を以下の条件で考えて下さい。 条件 500字程度 ${chumon}` +
    (hosoku ? `\n補足：${hosoku}` : '');
  // 参考情報を選抜
  const [chishikiVector, [inputV]] = await Promise.all([
    getKnowledge(), createEmbeddings([input]),
  ]);
  const relevanceList = getRelevanceList(chishikiVector, inputV);
  // ChatGPTへの問い合わせ内容を作る
  const messages = [
    {role: 'system', content: `あなたは、${query.tachiba.trim()}としてロールプレイをします。`},
    ...relevanceList.map(text => ({role: 'assistant', content: text})),
    {role: 'user', content: input},
  ];
  return createCompletion(messages);
};

/**
 * 生成済みの参考資料ベクターを読み込み、キャッシュを共有する。
 * 同時リクエストでも初期化は一度だけ行う。ファイル更新は再起動後に反映する。
 * @param {void} なし。
 * @return {Promise<Array<{text: string, vector: number[]}>>} 参考資料ベクター。
 */
async function getKnowledge() {
  if (!knowledgePromise) knowledgePromise = loadKnowledge();
  const pending = knowledgePromise;
  try {
    return await pending;
  } catch (error) {
    // ファイルの読み込み失敗後に再試行できるようにする。
    if (knowledgePromise === pending) knowledgePromise = undefined;
    throw error;
  }
}

/**
 * スプレッドシートのaisatsuシートから外部生成されたJSONを読み込む。
 * vectorは生成し直さず、そのまま使用する。
 * JSON生成側でも質問文と同じtext-embedding-3-smallを使用すること。
 * @param {void} なし。
 * @return {Promise<Array<{text: string, vector: number[]}>>} 保存済みの参考資料。
 */
async function loadKnowledge() {
  const documents = JSON.parse(await fs.readFile(JOUHOU_INPUT, 'utf8'));
  if (!Array.isArray(documents) || documents.some(item =>
    !item || typeof item.text !== 'string' || !item.text.trim() ||
    !Array.isArray(item.vector) || !item.vector.length ||
    !item.vector.every(Number.isFinite))) {
    throw new Error('aisatsu.jsonの参考資料が不正です。');
  }
  return documents;
}

/**
 * ユーザーの質問からembedベクトルを作成する。
 * @param {string[]} input 埋め込み対象の文章。
 * @return {Promise<number[][]>} 入力順のベクトル。APIエラーは呼び出し元へ伝える。
 */
async function createEmbeddings(input) {
  const response = await openai.embeddings.create({model: EMBEDDING_MODEL, input});
  const vectors = new Array(input.length);
  for (const item of response.data) {
    if (!Number.isInteger(item.index) || item.index < 0 || item.index >= input.length ||
        vectors[item.index] || !Array.isArray(item.embedding) ||
        !item.embedding.length || !item.embedding.every(Number.isFinite)) {
      throw new Error('埋め込みAPIの応答が不正です。');
    }
    vectors[item.index] = item.embedding;
  }
  if (vectors.includes(undefined)) throw new Error('埋め込みAPIの応答が不足しています。');
  return vectors;
}

/**
 * 二つの配列のドット積（内積）を計算する。中間配列を作らずに合計する。
 * @param {number[]} a 質問文ベクトル。
 * @param {number[]} b 参考資料ベクトル。
 * @return {number} 内積の合計。
 */
function dot(a, b) {
  if (a.length !== b.length) throw new Error('埋め込みベクトルの次元が一致しません。');
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

/**
 * 内積の合計を比較して上位3つを選んだ後、そのtextの配列を返す。
 * @param {Array<{text: string, vector: number[]}>} chishikiVector 参考資料ベクター。
 * @param {number[]} inputV 質問文のベクトル。
 * @return {string[]} 関連性の高い参考資料上位3つ。
 */
function getRelevanceList(chishikiVector, inputV) {
  const top = [];
  for (const item of chishikiVector) {
    const candidate = {text: item.text, similarity: dot(inputV, item.vector)};
    const index = top.findIndex(entry => candidate.similarity > entry.similarity);
    if (index === -1) {
      if (top.length < 3) top.push(candidate);
    } else {
      top.splice(index, 0, candidate);
      if (top.length > 3) top.pop();
    }
  }
  return top.map(item => item.text);
}

/**
 * Responses APIでChatGPTに問い合わせる。
 * @param {Array<{role: string, content: string}>} messages 問い合わせ内容。
 * @return {Promise<string>} 生成された回答。失敗や空の応答は例外として伝える。
 */
async function createCompletion(messages) {
  const completion = await openai.responses.create({
    model: CHAT_MODEL,
    input: messages,
    max_output_tokens: 2000,
    reasoning: {effort: 'low'},
  });
  if (completion.incomplete_details?.reason === 'max_output_tokens') {
    throw new Error('回答がトークン上限に達しました。');
  }
  if (completion.status !== 'completed') {
    throw new Error('ChatGPTの回答生成が完了しませんでした。');
  }
  const content = completion.output_text;
  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('ChatGPTから回答本文を取得できませんでした。');
  }
  return content;
}
