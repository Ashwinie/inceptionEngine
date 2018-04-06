const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
import fetch from 'node-fetch';
import {retrieveGoogleAuthInfo,insertTokenIntoDb} from './firebase-services';


export const oauth2Client = new OAuth2(
  '238351430553-jg8m74n1o22bsahndctobugcnv2t8j23.apps.googleusercontent.com',
  'Hzf0mfF6OlDsBRt41KciRPbb',
  'http://localhost:3000/oauth2callback'
);

const scopes = [
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.body.write',
  'https://www.googleapis.com/auth/fitness.activity.write' 

  ];
  
  export const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
  
    // If you only need one scope you can pass it as a string
    scope: scopes,
  
    // Optional property that passes state parameters to redirect URI
    // state: 'foo'
  });
  
 function getRefreshToken(){  
   
  return new Promise((resolve, reject)=>{
      oauth2Client.refreshAccessToken((err, tokens) => {
      // your access_token is now refreshed and stored in oauth2Client
      // store these new tokens in a safe place (e.g. database)
      if(err){
        console.log('Error occurred while refreshing token',err);
        reject(err);
      }
        console.log('Refresh token value', tokens);
         resolve(tokens);
      
    });
  })
   
 }


 //Query Google fit for the datasource and dataPoints and user details
  export function  queryGoogleFit(){
    console.log(retrieveGoogleAuthInfo);
    retrieveGoogleAuthInfo().then((token)=>{
      console.log('Tokening ' + JSON.stringify(token.tokens.access_token));
   
      oauth2Client.setCredentials({
        access_token: token.tokens.access_token,
        refresh_token: token.tokens.refresh_token,
        expiry_date: token.tokens.expiry_date
      });

      let refreshTokens = getRefreshToken().then((newTokens)=>{
        insertTokenIntoDb(newTokens);
        console.log("Refresh tokens "+ refreshTokens);
        return fetch(
          'https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google.heart_rate.bpm:407408718192:Example%20Manufacturer:ExampleTablet:1000001:Pulse%20rate/datasets/1411053997000000000-1411057556000000000',
          {
            headers: {
              Authorization: `Bearer ${newTokens.access_token}`,
              'Content-Type': 'application/json'
            },
          }
        ).then(res => res.json())
        .then(ResponseObj => 
         { 
          console.log('The response Obj', JSON.stringify(ResponseObj));
         }).catch(err => console.log(err)
        
        );
      
      });
     // console.log("Auth " + token);

      });   
  
  };


  