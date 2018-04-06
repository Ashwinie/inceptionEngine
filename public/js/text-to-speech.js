
var tts_client = function (inputTxt) {
  var synth = window.speechSynthesis;
  var voices = synth.getVoices();
console.log("Speech API")
  var utterThis = new SpeechSynthesisUtterance(inputTxt);
  utterThis.lang = 'en-US';

utterThis.voice = voices[50];

utterThis.rate = 1;
synth.speak(utterThis);

return function(){
  return synth.speak(utterThis);
}
}
