textInput = "I hate you!"


console.log(textInput)

var settings = {
    "async": true,
    "crossDomain": true,

    "url": "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text=" + textInput,
    "method": "GET",
    "headers": {
      "Authorization": "Basic YzYzMjdkNDUtMjZkYS00YTIxLTlkMjYtZDk0ZmNhYjMyYjIzOlc4Rm8wSkdBWmxiVw==",
      "Cache-Control": "no-cache",
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  }).then(function(response) {

  response.document_tone.tones.forEach(element => {
      var toneScore = element.score;
      console.log(toneScore);
      var toneName = element.tone_name;
      console.log(toneName);
  });
  })