$(document).ready(function(){
    app.init();

});

var app = (function(){

   function init (){

    setTimeout(function(){
        console.log('Calling Voice to text ');
        initalGreeting();
    },3500);

     setTimeout(function(){
         console.log('Calling Voice to text ');
        googleVoice.startButton(event);
     },5500);
   }
   return{
       init : init
   }
})();
