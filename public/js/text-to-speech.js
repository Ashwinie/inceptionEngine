
var tts_client = (function (inputTxt) {
  var synth = window.speechSynthesis;
  var voices = synth.getVoices();

  var utterThis = new SpeechSynthesisUtterance(inputTxt);

utterThis.voice = voices[46];

utterThis.rate = 0.9;
synth.speak(utterThis);

return function(){
  return synth.speak(utterThis);
}
})();
