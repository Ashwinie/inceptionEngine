
const query = require('querystring');
const request = require('request');
const APP_CONSTANTS = require('../constants/constants');

const FILE_NAME = "Google Service";

var googleService = {
    getInfo : function(storyLine){
		return new Promise((resolve, reject) => {
			console.log(FILE_NAME, "Inside getInfo()");
			var responseData = {};
      
					googleService.findSyntax(storyLine)  // Returns a Promise!
						.then(syntax => {
							responseData.syntax = syntax;
							return resolve(responseData);
						})
						.catch(err => {
							console.log(FILE_NAME, "Error");
							return reject(err);
						})
				});

    },

	findEntity : function(text){
	  	    return new Promise((resolve, reject) => {
	     APP_CONSTANTS.GOOGLE_LANGUAGE.detectEntities(text, (err, entities)=>{
	            var entity = [];
	            if(err){
	               return reject(err);
	            }else{
	                for(obj in entities){
	                   var entityObj ={};
	                   entityObj.name = entities[obj].name;
	                   entityObj.type = entities[obj].type;

	                   entity.push(entityObj);
	                }

	               return resolve(entity);
	            }
	      });
	  });
	},

	findSentiment : function(text){
	  return new Promise((resolve, reject) => {
	       APP_CONSTANTS.GOOGLE_LANGUAGE.detectSentiment(text, (err, sentiment)=>{
	            if(err){
	               return reject(err);
	            }else{
	               return resolve(sentiment);
	            }
	      });
	  });
	},
	findSyntax : function(text){
	  return new Promise((resolve, reject) => {
	       APP_CONSTANTS.GOOGLE_LANGUAGE.detectSyntax(text, (err, syntax)=>{
	            var syntaxArray = [];
	            if(err){
	               return reject(err);
	            }else{
	               for(obj in syntax){
	                  var syntaxObj = {};
	                  syntaxObj.word = syntax[obj].text.content;
	                  syntaxObj.tag = syntax[obj].partOfSpeech.tag;
	                  syntaxArray.push(syntaxObj);
	               }

	               return resolve(syntaxArray);
	            }
	      });
	  });
	}

};

module.exports = googleService;
