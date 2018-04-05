import witService from '../server/sevices/witService';
import tts from '../server/sevices/textToSpeech';
var express = require('express');
var router = express.Router();
import path from 'path';



//Get Response from Witai
router.get('/getResponse',function(req,res){

  if(req.query.sentence!=''){
    console.log("Passing on the sentence to witservice" + JSON.stringify(req.query.sentence));
    witService.queryWit(req.query.sentence);
  }else{
    console.log('Nothing to process');
  }

  res.send(200);
});

router.get('/getTTS',function(req,res){
    console.log("Text to speech..");
    tts.googleTTS('Hello World', 'en', 1);

  res.sendStatus(200);
});
module.exports = router;
