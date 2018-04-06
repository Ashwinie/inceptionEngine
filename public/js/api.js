function askQuestion() {
  $.ajax({
    url: "/question",
    method: 'GET',
    success: function(response) {
      console.log("response", response);
      tts_client(response.question);
    },
    error: function(error) {
      console.log("response", error)

    }
  }).done(function() {});
}
