import { isTSNamespaceExportDeclaration } from 'babel-types';

var  admin = require('firebase-admin');
// Fetch the service account key JSON file contents
var serviceAccount = require("../constants/serviceAccountKey.json");


// var fireBaseServices = function(){
      
     let questionsRef;
     let answersRef;
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

      return ref;
      //to save to database
      // questionsRef = ref.child("Questions");
      // answersRef = ref.child("Answers");
     };

  export   function insertDataIntoQuestions (){
      let dbObj = dbinit();
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