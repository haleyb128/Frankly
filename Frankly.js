$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBJxD7GITdX1hlYaBVzMxuWZgLS0TDPVS8",
        authDomain: "project-violet-44fcf.firebaseapp.com",
        databaseURL: "https://project-violet-44fcf.firebaseio.com",
        projectId: "project-violet-44fcf",
        storageBucket: "project-violet-44fcf.appspot.com",
        messagingSenderId: "266875945649"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var keys = database.ref("keys");
    keys.on("value", function (){return;});

    var text;
    var name;
    var count = 0;

    //chart variables
    var anger = 0;
    var fear = 0;
    var joy = 0;
    var sadness = 0;
    var analytical = 0;
    var confident = 0;
    var tentative = 0;
    var readScore = 0;

    //chart selectors
    var sentimentChart = $("#sentiment-chart");
    var SentChart;

    var LanguageLevelChart = $("#level-compare-chart");
    var LangChart;

    var comparisonChart = $("#sentiment-compare-chart");
    var compChart;

    // words found in the text field. The .join concatenates the array so you can display it.
    var buzzWordsFoundArray = [];
    var buzzWordsFound = buzzWordsFoundArray.join(", ");

    //hide charts on load
    sentimentChart.hide();
    LanguageLevelChart.hide();
    comparisonChart.hide();

    // firebase location
    //ex. buzzwords.push("shareholder");
    var buzzwords = database.ref("buzzWords");

    // tableDisplay() on load
    tableDisplay();

    // for loop to push new buzzwords to the firebase. Uncomment to add words from a given array to firebase.
    /* var newWords = [];
        for (i = 0; i < newWords.length; i++) {
            buzzwords.push(newWords[i]);
        };
    */

    // push words from firebase to a local array.
    var buzzWordCheck = [];


    buzzwords.on("child_added", function (childSnap) {

        // console.log(childSnap.val());
        buzzWordCheck.push(childSnap.val());

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);  // If any errors are experienced, log them to console.
    });
    setTimeout(function () { console.log("BuzzWords " + buzzWordCheck) }, 2000);


    // console.log("mission statement",$("#missionStatement").text());

    // click function that takes the input, parses for words in buzzWordCheck and highlights them.
    // It allows counts each words found and displays it.
    $("#submit").on("click", function (event) {
        event.preventDefault();
        text = $("#textarea").val().trim();
        searchText = $("#textarea").val().trim();
        theFunction();
    }); // end of click function

    $("#test").on("click", function (event) {
        event.preventDefault();
        text = $("#missionStatement").text().trim();
        searchText = $("#missionStatement").text().trim();
        theFunction();
    });


    function theFunction() {

        $('#nav li:last-child a').tab('show');

        //destroy chart so they can be redrawn
        // LangChart.destroy();
        // compChart.destroy();
        // SentChart.destroy();

        // empty the chart divs

        count = 0;

        name = $("#name").val().trim();
        console.log(name);

        buzzWordsFoundArray = [];

        // text = $("#textarea").val();
        console.log(text);

        

        // let users input their own words to search for
        if ($("#additionalWords").val() !== "") {

            var aw = $("#additionalWords").val().trim().split(", ");
            Array.prototype.push.apply(buzzWordCheck, aw);
            // console.log(wordsToCheck);
        }

        // /hey\syou/g

        for (i = 0; i < buzzWordCheck.length; i++) {

            var word = new RegExp(buzzWordCheck[i], "gi");
            // var word = new RegExp(wordsToCheck[i], "gi");

            // var fixed = test.replace( "/" + wordsToCheck[i] + "/g", "<span class='highlight'>" + wordsToCheck[i] + "</span>");
            // var test = test.replace(word, "<span class='highlight'>" + wordsToCheck[i] + "</span>");
            text = text.replace(word, function (x) {
                count++;
                console.log("count" + count);
                buzzWordsFoundArray.push(x);
                return "<span class='highlight'>" + x + "</span>";
            });

            $("#key-word-results").empty();
            var textDiv = $("<div id='keywords'></div>").append(text);
            $("#key-word-results").append(textDiv);

            // console.log(word.test(text));

            $("#count").text(count);
        }

        buzzWordsFound = buzzWordsFoundArray.join(", ");
        watson();

        ////////////////////////within click function scope. Sets sentiments to 0 on click///////////////////////////

    } // end of theFunction



    function watson() {

        toneArray = [];

        let watsonAuth;
        let watsonToke;

        keys.on("value", function (snap) {
            watsonAuth = snap.val().watson.authorization;
            watsonToke = snap.val().watson.token;
        });

        //// Watson Api

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text=" + searchText,
            "method": "GET",
            "headers": {
                "Authorization": watsonAuth,
                "Cache-Control": "no-cache",
                "Postman-Token": watsonToke,
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        }).then(function (response) {

            response.document_tone.tones.forEach(element => {

                var toneScore = element.score;
                console.log(toneScore);
                var toneName = element.tone_name;
                console.log(toneName);

                toneArray.push({ toneName: toneName, toneScore: toneScore });
            });

            console.log(toneArray);
            // log();
            // tones();
            twinWord();
        })

    }


    ///twinword api
    ////////////////////////////////////////////////////////
    function twinWord() {

        let twinKey;

        jQuery.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://ca329482.herokuapp.com/' + options.url;
            }
        });

        keys.on("value", function (snap) {
            twinKey = snap.val().twinWord;
        });

        console.log(text);

        var settings = {
            "async": true,
            "crossDomain": true,
            // langauge scoring       
            "url": "https://twinword-language-scoring.p.mashape.com/text/?text=" + searchText,
            "method": "GET",
            "headers": {
                "X-Mashape-Key": twinKey,
                "Accept": "application/json",
                "Cache-Control": "no-cache",
                "Postman-Token": "7a80cae9-87ce-405e-ae4a-c17ed8b02ab3"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        }).then(function (response) {
            readScore = response.ten_degree;
            // var toneType = response.type;
            console.log(readScore);
            // console.log(toneType);
            chart();
        })

        // log();
        tones();
    }

    var toneArray = [];

    function tones() {

        anger = 0;
        fear = 0;
        joy = 0;
        sadness = 0;
        analytical = 0;
        confident = 0;
        tentative = 0;

        toneArray.forEach(function (element) {
            switch (element.toneName) {
                case "Anger":
                    anger = element.toneScore.toFixed(2);
                    break;
                case "Fear":
                    fear = element.toneScore.toFixed(2);
                    break;
                case "Joy":
                    joy = element.toneScore.toFixed(2);
                    break;
                case "Sadness":
                    sadness = element.toneScore.toFixed(2);
                    break;
                case "Analytical":
                    analytical = element.toneScore.toFixed(2);
                    break;
                case "Confident":
                    confident = element.toneScore.toFixed(2);
                    break;
                case "Tentative":
                    tentative = element.toneScore.toFixed(2);
            }
        });

        console.log(`Tone variables: anger: ${anger}, fear: ${fear}, joy: ${joy}, sadness: ${sadness}, analytical: ${analytical}, confident: ${confident}, tentative: ${tentative}`);
        push();
    }

    // if no words are found the data is not pushed to the table(testimonials)/firebase
    function push() {
        if ((count > 0) && (name !== "")) {
            //push to  tesimonials
            database.ref("testimonials").push({

                name: name,
                count: count,
                buzzWords: buzzWordsFound,
                anger: anger,
                fear: fear,
                joy: joy,
                sadness: sadness,
                analytical: analytical,
                confident: confident,
                tentative: tentative,
            });
        }

        tableDisplay();
    }

    // table display function. (wrapped in a function so it can be called and kept to most recent tables)

    function tableDisplay() {
        $("#lastSearch").empty();
        var testimonials = database.ref("testimonials");

        var th = $("<tr><th>Search Title</th><th>Word Count</th><th>Words Found</th><th>Anger</th><th>Fear</th><th>Joy</th><th>Sadness</th><th>Analytical</th><th>Confident</th><th>Tentative</th></tr>");
        var table = $("<table>");

        testimonials.orderByKey().limitToLast(5).on("child_added", function (childSnap) {
            table.prepend(th);
            var tr = $("<tr>");

            tr.append(`<td>${childSnap.val().name}</td>`);
            tr.append(`<td>${childSnap.val().count}</td>`);
            tr.append(`<td>${childSnap.val().buzzWords}</td>`);
            tr.append(`<td>${childSnap.val().anger}</td>`);
            tr.append(`<td>${childSnap.val().fear}</td>`);
            tr.append(`<td>${childSnap.val().joy}</td>`);
            tr.append(`<td>${childSnap.val().sadness}</td>`);
            tr.append(`<td>${childSnap.val().analytical}</td>`);
            tr.append(`<td>${childSnap.val().confident}</td>`);
            tr.append(`<td>${childSnap.val().tentative}</td>`);
            table.append(tr);
            // childSnap.val().name;
            // childSnap.val().count;
            // childSnap.val().buzzWords;

            $("#lastSearch").append(table);

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);  // If any errors are experienced, log them to console.
        });

        // chart();
    }



    /////////chart JS integration
    function chart() {

        // add each to html files where you want your canvas
        // <div id="sentiment-div"></div>
        // <div id="level-div"></div>
        // <div id="sentiment-compare-div"></div>

        $("#sentiment-div").empty();
        $("#level-div").empty();
        $("#sentiment-compare-div").empty();


        $("#sentiment-div").append($('<canvas id="sentiment-chart"></canvas>'));
        $("#sentiment-compare-div").append($('<canvas id="sentiment-compare-chart"></canvas>'));
        $("#level-div").append($('<canvas id="level-compare-chart"></canvas>'));

        // width = "1600" height = "900"

        sentimentChart = $("#sentiment-chart");
        sentimentChart.show();

        LanguageLevelChart = $("#level-compare-chart");
        LanguageLevelChart.show();

        comparisonChart = $("#sentiment-compare-chart");
        comparisonChart.show();

        SentChart = new Chart(sentimentChart, {
            type: 'pie',
            data: {
                labels: ["Anger", "Fear", "Joy", "Sadness", "Analytical", "confident", "tentative"],
                datasets: [{
                    backgroundColor: ["#c45850", "#8e5ea2", "#3cba9f", "#e8c3b9", "#3e95cd", "#50c451", "#c4c250"],
                    data: [anger, fear, joy, sadness, analytical, confident, tentative] //this is where we'll connect results
                }]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'Sentiment Scores'
                }

            }
        });

        //Language Level Chart
        LanguageLevelChart = $("#level-compare-chart");
        LangChart = new Chart(LanguageLevelChart, {
            type: 'bar',
            data: {
                labels: ["Your Input", "Goldman Sachs", "Obama's Farewell Speech", "Gettysburg Address", "Average Legal Publication"],
                datasets: [{
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [readScore, 3, 5, 4, 7]
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Language Level Comparison'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        //Sentiment Comparison Chart
        comparisonChart = $("#sentiment-compare-chart");
        compChart = new Chart(comparisonChart, {
            type: 'bar',
            data: {
                labels: ["Anger", "Fear", "Joy", "Sadness", "Analytical", "Confident", "tentative"],
                datasets: [{
                    label: 'Your Input',
                    backgroundColor: ("#3e95cd"),
                    data: [anger, fear, joy, sadness, analytical, confident, tentative]
                }, {
                    label: "Tupac's Speech on Greed",
                    backgroundColor: ("#8e5ea2"),
                    data: [0.18, 0.60, 0.17, 0.59, 0.13, 0.55, 0.21]
                }, {
                    label: 'I Have a Dream Speech',
                    backgroundColor: ("#3cba9f"),
                    data: [0.12, 0.10, 0.66, 0.51, 0.10, 0.66, 0.01]
                }, {
                    label: 'Equifax Apology',
                    backgroundColor: ("#e8c3b9"),
                    data: [0.11, 0.05, 0.54, 0.20, 0.11, 0.11, 0.11]
                }]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'Language Level Comparison'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }

}); // document.on(ready)