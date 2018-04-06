import witService from '../server/sevices/witService';
var express = require('express');
var router = express.Router();
import path from 'path';
import {insertDataIntoQuestions} from '../server/sevices/firebase-services';
import {queryGoogleFit} from '../server/sevices/googleFit-services';
import {compareIntentFromAnswer} from '../controllers/intentController';

//Get Response from Witai
router.get('/wit/getResponse', function(req, res) {
  // console.log("firebase",fireBaseServices.insertDataIntoQuestions);
console.log("getResponse",)
  // console.log("firebaseServices.insertDataIntoQuestions",fireBaseServices.insertDataIntoQuestions);
  // insertDataIntoQuestions();
queryGoogleFit();
 
  if (req.query.sentence != '') {
   // console.log("Passing on the sentence to witservice" + JSON.stringify(req.query.sentence));
    witService.queryWit(req.query.sentence).then((res)=>{
      console.log("res",res);
    });

  } else {
    console.log('Nothing to process');
  }
  res.send(200);
});

module.exports = router;
