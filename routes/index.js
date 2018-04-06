import witService from '../server/sevices/witService';
var express = require('express');
var router = express.Router();
import path from 'path';
import {insertDataIntoQuestions} from '../server/sevices/firebase-services';
import {queryGoogleFit} from '../server/sevices/googleFit-services';
import {questionsObj} from '../server/constants/constants'
var fillers = require('fillers');

fillers.length; //=> 80
var answersArr=[];
console.log(fillers);

console.log('QuestionsArray ' + JSON.stringify(questionsObj));
//import {compareIntentFromAnswer} from '../controllers/intentController';
//import {googleService} from '../server/sevices/google-service';

var count = 1;
//Get Response from Witai
router.get('/wit/getResponse', function(req, res) {
 let fillerCount = 0;
  // console.log("firebase",fireBaseServices.insertDataIntoQuestions);
console.log("getResponse",)
  // console.log("firebaseServices.insertDataIntoQuestions",fireBaseServices.insertDataIntoQuestions);
  // insertDataIntoQuestions();
//queryGoogleFit();
//  googleService.findSyntax('Actually I have an experience of 2 years').then((response) => {
//    console.log("Google NLP Response "+ response);
//  }).catch((err) => {
//    console.log("Error NLP Response " + NLP);
//  });
  if (req.query.sentence != '') {
   console.log("Passing on the sentence to witservice" +req.query.sentence);

   console.log(typeof req.query.sentence);
   let splitWords = decodeURIComponent(req.query.sentence);
   console.log("Words " + splitWords);
  let  splitWordsArray = splitWords.split(' ');

   console.log("Splitted Array " + splitWordsArray);
   splitWordsArray.forEach(element => {
      if(fillers.indexOf(element.toLowerCase()) > -1){
          fillerCount++;
      }
   });
   console.log("Filler Count " + fillerCount);



    witService.queryWit(req.query.sentence).then((response)=>{
      console.log("res",response);
     if(count <= 7){
      res.send(questionsObj[count].questions);
      count++;
     }else{
       res.send('Thank You! You can leave for the day');
     }

    });

  } else {
    console.log('Nothing to process');
  }
});

module.exports = router;
