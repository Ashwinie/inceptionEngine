// function askQuestion() {
//   $.ajax({
//     url: "/question",
//     method: 'GET',
//     success: function(response) {
//       console.log("response", response);
//       tts_client(response.question);
//     },
//     error: function(error) {
//       console.log("response", error)

//     }
//   }).done(function() {});
// }

function initalGreeting() {
  console.log("date", new Date());
  let hours = (new Date()).getHours();
  let ques;
  if (hours < 12) {
    ques = "Hey, Good morning! Please have a seat";
  } else if (hours < 16) {
    ques = "Hey, Good afternoon! Please have a seat";
  } else if (hours < 23) {
    ques = "Hey, Good evening! Please have a seat";
  } else {
    ques = "Hey, Good morning! Please have a seat";
  }
  tts_client(ques);
}

function passOnAnswers(sentence){
  $.ajax({
    url: "/wit/getResponse",
    method: 'GET',
    'content-type':'application/x-www-form-urlencoded',
    data : {
      'sentence' : encodeURIComponent(sentence)
    },
    success: function(response) {
      console.log("response", response);
     // tts_client(response.question);
     tts_client(response);
     setTimeout(function(){
      googleVoice.startButton(event);
   },4000)
    },
    error: function(error) {
      console.log("response", error)

    }
  }).done(function() {});
}
