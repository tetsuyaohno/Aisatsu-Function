/**
 * Import function triggers from their respective submodules:
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
require('dotenv').config();
const {onRequest} = require("firebase-functions/v2/https");
const functions = require('firebase-functions');
const logger = require("firebase-functions/logger");
const express = require('express');
const cors = require('cors');

const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const gptmod = require('./gptmod.js');
// https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
/*************************************************
 *  req=リクエスト：立場、場面、注文事項、補足情報の配列
 *  res=レスポンス
 * 関数handleEventを実行、それが終了してから戻り値をレスポンスとして返す
 */
app.post('/', (req, res) => {
  return handleEvent(req).then((result)=>{
   res.send(result);
  }).catch( err => {
    console.log(err);
  });
});
//エントリーポイント　gogpt
exports.gogpt = onRequest(app);
/*
exports.gogpt = onRequest((req, res) => {
  return handleEvent(req).then((result)=>{
   res.send(result);
  }).catch( err => {
    console.log(err);
  });
});
*/
/**************************************************
 * リクエスト内容を整形して関数chatGptを実行し、答えを返す
 */
function handleEvent(req) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try{
          const query = req.body;//オブジェクトreq.bodyを変数queryに格納
          console.log('リクエストbody＝' + JSON.stringify(query));
          return resolve(gptmod.chatGpt(query));//queryを引数にして関数chatGptを実行し、答えを返す
        } catch (err) {
          console.log('function最終段階エラー：' + err);
          return reject(err);
        }
      }, 50);
    });
}