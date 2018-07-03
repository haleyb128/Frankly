jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://ca329482.herokuapp.com/' + options.url;
    }
});

var textInput = "This is amazing!"


console.log(textInput);
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://twinword-language-scoring.p.mashape.com/text/?text=" + textInput,
    "method": "GET",
    "headers": {
      "X-Mashape-Key": "p6H3bvHoQTmshZs5pB8NsAb4AbqOp14vgGBjsnCsoqUkVYSj6D",
      "Accept": "application/json",
      "Cache-Control": "no-cache",
      "Postman-Token": "7a80cae9-87ce-405e-ae4a-c17ed8b02ab3"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  }).then(function(response) {
      var readScore = response.ten_degree;
      console.log(readScore);
  })