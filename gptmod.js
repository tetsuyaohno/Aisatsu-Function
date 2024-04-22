require('dotenv').config();
const fs = require('fs');
const readline = require('readline');
const functions = require('firebase-functions');
const {google} = require('googleapis');
const { Configuration, OpenAIApi } = require("openai");

//ChatGPT起動
//const API_KEY = process.env.GPT_API;//ChatGPT API key
const JOUHOU_INPUT = 'aisatsu.json';//EnbeddingFile
const configuration = new Configuration({
  apiKey: process.env.GPT_API,
});
const openai = new OpenAIApi(configuration);

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements 
/*******************************************************************************
 * 　ChatGPT　Embedによるレスポンス作成　
 *   引数：query[0]=立場 query[1]=場面 query[2]=注文 query[3]=補足
 */  
exports.chatGpt = async function(query){
  //入力内容を取得
  console.log('GPT起動');
  if(query.tachiba=='' || query.bamen==''){
    const mukou = '質問を入力してください。';
    console.log('質問が無効');
    return mukou;
  }
    var bufferC = fs.readFileSync(JOUHOU_INPUT);
    var content = bufferC.toString();
    const chishikiVector = JSON.parse(content);
    //参考情報を選抜
    const input = query.bamen + 'で使用するあいさつ文を以下の条件で考えて下さい。 条件: 500字程度 ' + query.chumon;//ユーザーからの質問文を組み立てる
    const relevanceList = await getRelevanceList(chishikiVector, input);
    //Chat-GPTへの問い合わせ内容を作る
    const sys = 'あなたは、' + query.tachiba + 'としてロールプレイをします。';
    const mes =[
      {"role":"system", "content":sys},
      {"role":"assistant", "content":relevanceList[0]},
      {"role":"assistant", "content":relevanceList[1]},
      {"role":"assistant", "content":relevanceList[2]},
      {"role":"user", "content":input}
    ];
    if(query.hosoku){mes.push({"role":"assistant", "content":query.hosoku});}
    console.log('情報\n'+ relevanceList[0] + '\n\n' + relevanceList[1] + '\n\n' + relevanceList[2] + '\n\n' + query.hosoku + '\n\n質問\n' + input);
    const completion = await createCompletion(mes);
    //const completion = 'これはテストモードです。'
    console.log('\n回答\n' + completion);
    return completion;
  }
  /************************************************************************************
  *　　ユーザーからの質問からembedベクトル作成 ()
  *　引数：input＝ユーザーからの質問（場面と注文事項を足し合わせた内容）
  *　戻り値：質問のベクトル値
  */
  const createEmbedding = async(input) => {
    try {
      const embedding = await openai.createEmbedding({
          model: 'text-embedding-3-small',
          input
        });
      return embedding.data.data[0].embedding;
    } catch(e) {
      console.error(e);
      throw e;
        }
  }
  /******************************************************************************************
  *　内積の合計を求めて数値を比較して上位3つを選んだ後、そのtextの配列を返す
  *  引数：input＝ユーザーからの質問（場面と注文事項を足し合わせた内容）
  *        chishikiVector＝参考資料ベクター
  * 戻り値：関連性の高い参考資料上位3つが格納された配列
  */
  getRelevanceList = async (chishikiVector, input) => {
    //dot 関数を定義: 二つの配列 a と b のドット積（内積）を計算する関数です。この関数は、対応する要素同士を掛け合わせ、その結果を合計します。
    //解説：a.map((x, i) => a[i] * b[i])二つの配列 a と bに対して同じインデックス同士の値を掛けて、　
    //reduce((m, n) => m + n)　n=a[i] * b[i]と考えた場合、m=m+nを配列の全結果に対して行う（各要素の合計になる）。
    const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
    const inputV = await createEmbedding(input);//質問文のベクターを求める
    // chishikiVector内の全要素と質問文ベクトルの各内積の合計を計算し、それぞれオブジェクト名similarityに格納（実質的にはiの末尾に追加）
    //sortでsimilarityの大きい順に並べ替えて、sliceで上位3個を取り出し、配列を文字列に置き換える。
    return chishikiVector.map(i => {
          return {
            ...i,
            similarity: dot(inputV, i.vector)
          };
    }).sort((a, b) => b.similarity - a.similarity).slice(0,3).map(i => i.text);
  }
  /*******************************************************************************************
   * ChatGTPに問い合わせる
   * 引数：prompt＝問い合わせ内容の文字列やオブジェクト（使用するmodelに合わせたもの）
   */
  createCompletion = async(prompt) => {
    try {
      const completion = await openai.createChatCompletion({
          model: "gpt-４-turbo",
          messages: prompt,
          max_tokens: 2000,
          temperature: 0.4
        });
      return completion.data.choices[0].message.content;
    } catch (e) {
      console.error(e);
    }
  }
