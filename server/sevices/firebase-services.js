import { isTSNamespaceExportDeclaration } from 'babel-types';

var  admin = require('firebase-admin');
// Fetch the service account key JSON file contents
var serviceAccount = require("../constants/serviceAccountKey.json");


// var fireBaseServices = function(){
      
     let questionsRef;
     let answersRef;
     var dbObj;
     function dbinit(){
      console.log("Initializing firebase db");
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://inception-3662c.firebaseio.com"
      });
      
      // As an admin, the app has access to read and write all data, regardless of Security Rules
      var db = admin.database();
      var ref = db.ref("server/inception");

      console.log("Returning the object");

      dbObj= ref;
      //to save to database
      // questionsRef = ref.child("Questions");
      // answersRef = ref.child("Answers");
     };
   dbinit();
  export   function insertDataIntoQuestions (){

      // dbObj = dbinit();
      console.log('Firebase object created '+ dbObj);
      questionsRef = dbObj.child('Questions');
      questionsRef.set({
        question1 : {
          category : 'Greeting',
          intent : 'neutral',
          questions : 'Hey, Good morning! Please have a seat'
        },
        question2 : {
         category : 'Introduction',
         Assertion: 'neutral',
         questions : 'Tell me about yourself'
       },
       question3 : {
         category : 'Attitude',
         Assertion : 'neutral',
         questions : 'What are your strengths?'
       },
       question4 : {
         category : 'Attitude',
         Assertion : 'neutral',
         questions : 'Ok. What are your weaknesses?'
       },
       question5 : {
         category : 'Location',
         Assertion : 'neutral',
         questions : 'Where are you from?'
       },
       question6 : {
         category : 'Location',
         Assertion : 'neutral',
         questions : 'So....Will you be willing to relocate?'
       },
       question7 : {
         category : 'Attitude',
         Assertion : 'neutral',
         questions : 'Why Sirius?'
       },
       question8 : {
         category : 'Availability',
         Assertion : 'neutral',
         questions : 'When will you be able to join Sirius?'
       }
       
       });
       
     }
    //  return{
    //    insertDataIntoQuestions : insertDataIntoQuestions     
    //  }

// }();


// module.exports = {
//   fireBaseServices
// };


export function insertTokenIntoDb(tokens){
  // if(dbObj == ''){
  //   dbObj = dbinit();
  //  }
  let googleTokens = dbObj.child('googleTokens');
  googleTokens.set({
        tokens:{
          access_token:tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiry_date: tokens.expiry_date
        }
  });



}

export function retrieveGoogleAuthInfo(){
//  if(dbObj == ''){
//   dbObj = dbinit();
//  }
return new Promise((resolve,reject)=>{
  
  let googleTokens = dbObj.child('googleTokens');
  //to read data once
  googleTokens.once("value", function(snapshot) {
    console.log("Snapshot", JSON.stringify(snapshot.val()));
    resolve(snapshot.val());
  });
});

}