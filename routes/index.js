import witService from '../server/sevices/witService';
var express = require('express');
var router = express.Router();
import path from 'path';
import {insertDataIntoQuestions} from '../server/sevices/firebase-services';



//Get Response from Witai
router.get('/wit/getResponse', function(req, res) {
  // console.log("firebase",fireBaseServices.insertDataIntoQuestions);

  // console.log("firebaseServices.insertDataIntoQuestions",fireBaseServices.insertDataIntoQuestions);
  insertDataIntoQuestions();
   if (req.query.sentence != '') {
   // console.log("Passing on the sentence to witservice" + JSON.stringify(req.query.sentence));
    // witService.queryWit(req.query.sentence);

  } else {
    console.log('Nothing to process');
  }
  res.send(200);
});

module.exports = router;
