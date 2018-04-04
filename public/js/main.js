$(document).ready(function(){
    app.init();

});

var app = (function(){

   function init (){
        googleVoice.startButton(event);
   }
   return{
       init : init
   }
})();