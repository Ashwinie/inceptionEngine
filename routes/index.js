import witService from '../server/sevices/witService';
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
module.exports = router;
