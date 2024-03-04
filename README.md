# Aisatsu-Function
<h1>あいさつアシスタント関数本体</h1>
<h2>プロジェクトの説明</h2>
<h3>このリポジトリについて</h3>
　このリポジトリには「あいさつアシスタント」の本体であるaisatsu関数のコードを載せています。

<h3>あいさつアシスタントの開発</h3>
「純粋倫理風」の挨拶をシーン別に提供するツールが、「あいさつアシスタント」です。
　純粋倫理とは（一社）倫理研究所が提唱する、守れば幸福になる厳然とした日常の法則、生活の法則(くらしみち)　のことです。<br>
　一方、最近話題になっているのが、Chat-GPT（チャットジーピーティー）などに代表される、大規模言語モデルと呼ばれるAIです。<br>
　あいさつアシスタントは、このAIに純粋倫理の知識を与えることによって、純粋倫理のエッセンスを持った、一味違う挨拶文を提案するものです。

<h2>このプロジェクトが有益な理由</h2>
<h3>挨拶って楽勝ですか？</h3>
　自治会長やPTA会長など、突然、組織や会の長になって、行事のたびに挨拶をしなければならず、それをプレッシャーに感じたことがある人は結構いるのではないでしょうか。<br>
　そんな時、挨拶原稿を一発で提案してくれるツールがあると助かると思います。
　確かに、Chat-GPTには元からそのような機能は備わっている訳ですが、純粋倫理のエッセンスをちりばめた一味違う挨拶文を提案できれば、純粋倫理をPRする機会になるのではないでしょうか？<br>
<h3>純粋倫理になじむチャンス</h3>
　挨拶に行き詰って困っているときに、（これから次々と出てくるであろう）挨拶文作成ツールの中で、純粋倫理系のツールは、多くの人の共感を得られると信じています。<br>
　言い換えればこのツールの愛用者は、純粋倫理の潜在的支持者であり、日常的に純粋倫理に触れて、馴染んでいる人たちと言えます。<br>
　そういった人たちを増やしていくことが、社会の中での純粋倫理の位置付けをより確かなものにしていくと共に、普及にも良い影響を与えていくものと思います。<br>
<h3>今日は最良の一日</h3>
　この手のツールは、一旦作ってしまえば費用も掛からず、ホームページやブログなどの客寄せに効果的なため、今後爆発的に増えることが予想されます。<br>
そのため出来るだけ早く始めて固定客をつかんでおかないと、増えてしまってからでは内容が良くても見向きもされなくなる可能性が高くなります。<br>
まさに「今日は最良の一日、今は無二の好機」なのです。<br>

<h2>aisatsu関数のしくみ</h2>
<h3>フューショットプロンプティング文章を生成</h3><p>
　aisatsu関数は、ユーザーが簡単な必要事項を入力すると、それを基に<abbr title="AIに問い合わせの内容やジャンルに関するキーワードその他の文の断片を与え、それに基づいてAIに新しいアイデアや文章を生成させる方法。">フューショットプロンプティング</abbr>用の問い合わせ文書を生成し、Chat-GPTに送り出します。<br>
　フュ－ショット用文書には挨拶内容に関連する純粋倫理のエッセンスが付加されており、Chat-GPTはそれを参考にして挨拶文を生成します。その結果、純粋倫理のエッセンスが効いた挨拶文が生成されるのです。<br>
　ここでのポイントは、ユーザーはChat-GPTへの問い合わせを直接行うのではなく、aisatsu関数に簡単な必要事項を入力するだけ、Chat-GPTへのの問い合わせはaisatsu関数が生成した文章で行う、という点にあります。</p>
 
<h3>埋め込み（embedding）を利用して純粋倫理のエッセンスを付加</h3>
<p>
　純粋倫理のエッセンスは、エッセンステーブルとも言える文章群から挨拶内容に関連性の高い文章が選び出されます。<br>
　関連性の高いエッセンスを選び出す方法として、埋め込み（embedding）という方法を利用しています。</p>

<h3>処理の流れ</h3>
<ol>
  <li>ユーザーが必要事項を入力する</li>
  <li>入力内容から関連性の高いエッセンス文章を選ぶ</li>
  <li>入力内容・選んだエッセンス文章に基づいて問い合わせ文章を生成</li>
  <li>Chat-GPTにより、純粋倫理のエッセンスが効いた挨拶文が生成される</li>
</ol>

<h3>主な仕様</h3><p>
　挨拶文の生成は、GPT-3.5-turboを使用しています。<br>
　プロンプトの埋め込み（embedding）には、text-embedding-3-smallを使用しています。<br>
　この関数は、標準的な HTTP リクエストから呼び出されるHTTP 関数であり、<a href="https://cloud.google.com/functions/docs/concepts/overview?hl=ja">Google Cloud Functions</a>上で<a href= "https://platform.openai.com/docs/overview">OpenAI API</a> を使用して動作します。<br>
　コードはnode.jsで書いています。<br>
　エッセンス文章は大野哲也の独断で収集しています。<br>
　エッセンス文書の埋め込み（aisatsu.json）生成はada-002を使用しており、その機能はこのプロジェクトに含まれません。</p>

<h2>aisatsu関数の使い方</h2>
<h3>OpenAI APIに関する免責事項</h3>
　<p>このプロジェクトのAPIは大野哲也の個人アカウントのものを使用しており、API課金の支払いは大野哲也が行っています。<br>
　このアカウントには支払い金額の上限が設定されているため、上限を超えた場合、一時的に使用できなくなる場合があります。</p>
<h3>関数のURL</h3>
　　<code>https://us-central1-urinri2023.cloudfunctions.net/aisatsu</code>
<h3>エントリポイント</h3><var>gogpt</var>
<h3>関数パラメーター</h3>
<strong>※この関数は認証なしで使用できます。</strong><br>
  <table>
   <caption>引数一覧</caption>
   <tr><th>変数の内容</th><th>説　明</th><th>形式</th></tr>
   <tr><td>挨拶する人の立場<strong>(必須）</strong></td><td>自治会長やPTA会長など挨拶する人の立場を入力<br>一般的な内容を記述し、特殊な内容は補足事項に記述する。</td><td>文字列形式</td></tr>
   <tr><td>挨拶の場面<strong>(必須）</strong></td><td>盆踊り大会や清掃活動の始めなど、挨拶を行う場面（具体的な方がよい）を入力<br>特殊な内容は補足事項に記述する。</td><td>文字列形式</td></tr>
   <tr><td>注文事項<strong>（省略可）</strong></td><td>飲食を勧める、感謝の気持ちを伝える、など盛り込みたい内容を記入。<br>
    挨拶文の文字数は500字程度に指定しているため、改めて別の文字数を指定した場合、反映されない可能性がある</td><td>文字列形式</td></tr>
   <tr><td>補足事項<strong>（省略可）</strong></td><td>10周年記念や無形文化財に指定されているなど、参考となる情報があれば記入。<br>
立場・役職、場面・行事が一般的でない場合やAIが理解できていないと思われる場合は、ここで説明する。</td><td>文字列形式</td></tr>
  </table>
　
<h3>コードの記述例</h3>
<a href="https://github.com/tetsuyaohno/Aisatsu-Public">Aisatsu-publicリポジトリ</a>内の<a href="https://github.com/tetsuyaohno/Aisatsu-Public/blob/master/jikkou.js">jikkou.js</a>ファイルより抜粋
  <pre><code>
   /*******************************************************************
   * postメソッドで外部関数を実行
   * tachiba = 立場,　bamen = 場面,　chumon = 注文事項,　hosoku = 補足内容 */
    //必要事項をJSON形式で作成
    const body = {tachiba: tachiba, bamen: bamen, chumon: chumon, hosoku: hosoku};
    //関数のURL
    const url= 'https://us-central1-urinri2023.cloudfunctions.net/aisatsu';
    //+++++++++　フェッチコマンドで外部関数実行　++++++++++
    fetch(url,{
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
  </code></pre>
 <h3>試してみる</h3>
  以下のページで実際にあいさつアシスタントを試すことが出来ます。<br>
  <a href="https://github.com/tetsuyaohno/Aisatsu-Public">あいさつアシスタントサンプル(Aisatsu-Publicリポジトリ)</a><hr>
<h2>独自環境への導入</h2>
　このコードをご自分の環境で構築・デプロイすることで、エッセンス文章ファイルやプロンプトの生成プロセス、生成エンジンをカスタマイズできます。
<h3>準備</h3>
<ol>
  <li>Google Cloud Console の [プロジェクト セレクタ] ページで、Google Cloud <a herf="https://cloud.google.com/resource-manager/docs/creating-managing-projects?hl=ja">プロジェクトを選択または作成</a>します。<br>
  <small>注: この手順で作成するリソースをそのまま保持する予定でない場合、既存のプロジェクトを選択するのではなく、新しいプロジェクトを作成してください。<br>
   チュートリアルの終了後にそのプロジェクトを削除すれば、プロジェクトに関連するすべてのリソースを削除できます。</small></li>
  <li>Google Cloud プロジェクトで課金が有効になっていることを確認します。</li>
  <li><strong>API を有効にします</strong>「Cloud Functions、Cloud Build、Artifact Registry、Cloud Run、and Cloud Logging」 。</li>
  <li><a href="https://cloud.google.com/sdk/docs/install?hl=ja">gcloud CLI をインストールして初期化します。</a></li>
  <li><code>gcloud</code> コンポーネントを更新してインストールします。<br><code>gcloud components update</code></li>
</ol>
<h3>Node.js 開発環境のセットアップ</h3>
<ol>
 <li>Node Version Manager（NVM）をインストールします。</li>
 <li>Node.js と npm（Node Package Manager）をインストールします。</li>
 <li>エディタをインストールします。</li>
 <li>Google Cloud CLI をインストールする</li>
</ol>
<a href="https://cloud.google.com/nodejs/docs/setup?hl=ja">こちらのサイトに詳細な説明があります。</a>
<h4>Node.js　バージョンの確認</h4>
  <p>Node.jsのバージョンを確認するにはターミナルで　<code>node --version</code>　または　<code>node -v</code>　を実行します。<br>
  Node.jsがインストールされていれば　<samp>v18.16.0</samp>　などと表示されます。<br>
  ちなみにNode.jsのパッケージを管理する「npm」も同様に確認できます<br><code>npm --version<br>9.5.1</code><br>
  Google Cloud FunctionsがサポートしているNode.jsランタイムのバージョンは<a href="https://cloud.google.com/functions/docs/concepts/nodejs-runtime?hl=ja">こちらから</a>確認できます。</p>
<h3>サンプルコードを取得</h3>
ローカルマシンにリポジトリのクローンを作成します。<br>
<code>git clone https://github.com/tetsuyaohno/Aisatsu-Function.git</code><br>Cloud Functions のサンプルコードが含まれているディレクトリに移動します。<code>cd Aisatsu-Function</code><br>
<code>dir</code>コマンドでファイルが揃っているか確認する。<br>
<code><pre>
 Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          2024/01/29     7:54        1124994 aisatsu.json
-a---          2024/03/02    13:44           5314 gptmod.js
-a---          2024/03/01    12:21           2105 index.js
-a---          2024/03/01    13:45           1212 LICENSE.txt
-a---          2023/06/17    16:01         230396 package-lock.json
-a---          2023/06/17    16:01            649 package.json
</pre></code>
<h3>クライアント ライブラリをインストール</h3>
<h4>サンプルのpackage.jsonを利用</h4>
<code>npm install</code>コマンドを実行：関数のディレクトリ内、引数なし。<br>
これでパッケージとそのパッケージが依存するすべてのパッケージがインストールされます。<br>
説明：外部モジュールを含む、Node.js における依存関係は、npm で管理され、package.json というメタデータ ファイルで表現されます。<br>サンプルのpackage.json<code><pre>
 {
  "name": "aisatsu",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "18"
  },
  "main": "index.js",
  "dependencies": {
    "dotenv": "^16.1.4",
    "firebase-admin": "^11.8.0",
    "firebase-functions": "^4.4.1",
    "googleapis": "^118.0.0",
    "openai": "^3.2.1",
    "yaml": "^2.3.1"
  },
  "devDependencies": {
    "firebase-functions-test": "^3.1.0"
  },
  "private": true
}
</pre></code>
<code>"openai": "^3.2.1",</code>とあるように、このファイルを利用すればOpenAIのAPIライブラリも一緒にインストールされます。<br>
<h4>個別にOpenAI APIライブラリをインストールする</h4>
  <p>個別にOpenAI Node.js ライブラリをインストールする場合は、ターミナル/コマンドラインから、次を実行します。<br>
  <code>npm install --save openai</code></p>
<h3>OpenAI APIの準備</h3><p>
　OpenAI APIキーが準備出来ている場合は飛ばしてください。<br>　OpenAI APIキーがない場合、または新規に追加する場合は、<a href="https://platform.openai.com/signup">OpenAI アカウント</a>を作成するか、<a href="https://platform.openai.com/login">サインイン</a>します。<br>
　次に、<a href="https://platform.openai.com/account/api-keys">API キー ページ</a>に移動し、「新しい秘密キーを作成」し、必要に応じてキーに名前を付けます。<strong>※キーは一度しか表示されません。</strong><br>
　これを安全な場所に保存し、誰とも共有しないようにします。</p>
<h3>APIキーを設定する</h3><p>
　このプロジェクトでは、.envを使用しています。Node.js 18では<a href="https://www.npmjs.com/package/dotenv">dotenv</a>を使用する方法が一般的です。<br>
　ローカル環境（WindowsまたはMac）で使用する場合は、<a href="https://platform.openai.com/docs/quickstart/step-2-set-up-your-api-key">OSの環境変数を使用する方法</a>もあります。</p>
 <h3>関数のデプロイ</h3>
 関数のディレクトリで次のコマンドを実行します。<br>
 <code>  gcloud functions deploy aisatsu --runtime nodejs18 --trigger-http --allow-unauthenticated --entry-point gogpt --timeout 180</code><br>
　関数がデプロイされたら、uri プロパティをメモするか、Cloud Functions のコンソールで確認します。<br>
 <a href="https://github.com/tetsuyaohno/Aisatsu-Public">あいさつアシスタントサンプル(Aisatsu-Publicリポジトリ)</a>をダウンロードし、JavaScriptファイル<a>jikkou.js</a>urlを書き換えるなどして動作確認が出来ます。
<h2>カスタマイズのポイント</h2>
関数本体はgptmod.jsに記述されています。<br>
<h3>問い合わせ文章（フューショットプロンプト）カスタマイズ</h3>
問い合わせ文章はFunction chatGptに記述されており、ここで各入力パラメーターを組み合わせて文章にしている。この関数がindex.jsとのやり取りを行っている。<br>
この記述を変えることで問い合わせ文章（プロンプト）の形式が変えられる。<br>
現状では"role":"assistant"の部分がフューショットの部分となっている。<br>
<code><pre>
 //ユーザーからの質問文を組み立てる
 const input = query.bamen + 'で使用するあいさつ文を以下の条件で考えて下さい。 条件: 500字程度 ' + query.chumon;
    const relevanceList = await getRelevanceList(chishikiVector, input);
    //Chat-GPTへの問い合わせ内容を作る
    const sys = 'あなたは、' + query.tachiba + 'としてロールプレイをします。';
    //配列relevanceListに選抜されたエッセンス文章が格納されている。
    const mes =[
      {"role":"system", "content":sys},
      {"role":"assistant", "content":relevanceList[0]},
      {"role":"assistant", "content":relevanceList[1]},
      {"role":"assistant", "content":relevanceList[2]},
      {"role":"user", "content":input}
    ];
</pre></code>
<h3>挨拶文生成engineの指定</h3>
あいさつ文生成エンジンの指定はfunction createCompletionに記述されている。<br>
ここのパラメーターを変えると、生成エンジンやその挙動が変更できる。<br>
APIの場合はplusに加入していなくてもGpt4.0が使える、ただしお高い。<br>
<code><pre>
 {
   model: "gpt-3.5-turbo",//GTP3.5を使用している、gpt-4.0にすればGPT4.0になる。
   messages: prompt,//問い合わせ文章全体
   max_tokens: 2000,//あいさつ文の最長
   temperature: 0.4//ゆらぎ=0に近いほど正確
 }
</pre></code>
<h3>比較元文章の埋め込み生成エンジン</h3>
フューショットプロンプティングで送る、エッセンス文章を選抜する基になる埋め込み文章を生成するエンジンは、Function createEmbeddingに記述されている。<br>
<code><pre>
 {
   model: 'text-embedding-3-small',
           input //引数：ユーザーからの質問（場面と注文事項を足し合わせた内容）
 }
</pre></code>
<h3>エッセンス文章の選抜</h3>
エッセンス文章の選抜はFunction getRelevanceListで行われており、関連の高い物から3つを配列にして返している。<br>
選抜の計算には<a href="https://rikeilabo.com/vector-dot-product">内積の和</a>を利用しているが、どの式を使うかはあまり重要でないらしい。
