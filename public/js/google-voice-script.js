var googleVoice = function() {
    var final_transcript = '';
    var recognizing = false;
    var ignore_onend;
    var start_timestamp;
    if (!('webkitSpeechRecognition' in window)) {
        upgrade();
    } else {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function() {
            recognizing = true;
        };

        recognition.onerror = function(event) {
            if (event.error == 'no-speech') {

                ignore_onend = true;
            }
            if (event.error == 'audio-capture') {

                ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
                if (event.timeStamp - start_timestamp < 100) {

                } else {

                }
                ignore_onend = true;
            }
        };

        recognition.onend = function() {
            recognizing = false;
            if (ignore_onend) {
                return;
            }
            if (!final_transcript) {
                return;
            }

            if (window.getSelection) {
                window.getSelection().removeAllRanges();
                //var range = document.createRange();
               // range.selectNode(document.getElementById('final_span'));
                //window.getSelection().addRange(range);
            }
        };

        recognition.onresult = function(event) {
            console.log("***");
            var interim_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                   // console.log("final");
                    final_transcript += event.results[i][0].transcript;
                   // app.createUserStory(final_transcript);
                   
                   passOnAnswers(final_transcript);
                   recognition.stop();
                   console.log("final sentence" + final_transcript);
                    final_transcript = "";
                    interim_transcript = "";
                } else {
                    // console.log("interim");
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            final_transcript = capitalize(final_transcript);
           // final_span.innerHTML = linebreak(final_transcript);
            //interim_span.innerHTML = linebreak(interim_transcript);
            console.log("Find the sentence " + final_transcript);
            if (final_transcript || interim_transcript) {

            }
        };
    }

    function upgrade() {
        alert("Not supported");
    }

    var two_line = /\n\n/g;
    var one_line = /\n/g;

    function linebreak(s) {
        return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    var first_char = /\S/;

    function capitalize(s) {
        return s.replace(first_char, function(m) {
            return m.toUpperCase();
        });
    }


    function startButton(event) {
        console.log("Called voice");
       
        if (recognizing) {
            recognition.stop();
            return;
        }
       // recognition.stop();
        final_transcript = '';
        recognition.lang = "en-IN";
        recognition.start();
        ignore_onend = false;
        start_timestamp = event.timeStamp;
    }

    return {
        startButton: startButton
    }
}();