(function getFeedback() {
  var urls = ["https://api.myjson.com/bins/jms7f",
    "https://api.myjson.com/bins/rwpij",
    "https://api.myjson.com/bins/1e8oez",
    "https://api.myjson.com/bins/1h7ufv",
    "https://api.myjson.com/bins/16k6pn"
  ];

  $.ajax({
    url: urls[getRandomInt(5)],
    method: 'GET',
    success: function(response) {
      putIntoHtml(response);
    },
    error: function(error) {
      console.log("response", error)
    }
  }).done(function() {});

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  console.log(getRandomInt(3));

  function putIntoHtml(res) {
    console.log("res", res);
    $('.com-list').append('<li>' + res['communicaton'].comments[0] + '</li>');
    $('.ner-list').append('<li>' + res['nervousness'].comments[0] + '</li>');
    $('.att-list').append('<li>' + res['attitude'].comments[0] + '</li>');
    $('.com-score').text(res['communicaton'].score);
    $('.ner-score').text(res['nervousness'].score);
    $('.att-score').text(res['attitude'].score);
    let comScore = parseInt(res['communicaton'].score.substring(0, res['communicaton'].score.length - 1));
    let nerScore = parseInt(res['nervousness'].score.substring(0, res['nervousness'].score.length - 1));
    let attScore = parseInt(res['attitude'].score.substring(0, res['attitude'].score.length - 1));
    addDynamicClass(comScore, '.com-item .header');
    addDynamicClass(attScore, '.att-item .header');
    addDynamicClass(nerScore, '.ner-item .header');
    addDynamicClass(comScore, '.com-score');
    addDynamicClass(attScore, '.att-score');
    addDynamicClass(nerScore, '.ner-score');
  }

  function addDynamicClass(score, className) {
    if (score > 80) {
      $(className).addClass('color-green');
    } else if (score > 50) {
      $(className).addClass('color-yellow');
    } else {
      $(className).addClass('color-red');
    }

  }
})();
