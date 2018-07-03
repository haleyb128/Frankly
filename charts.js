//Individual Sentiment Chart
window.onload = function() {
var sentimentChart = document.getElementById("sentiment-chart"); 
var SentChart = new Chart(sentimentChart,{
  type: 'pie',
  data: {
    labels: ["Anger", "Fear", "Joy", "Sadness", "Analytical"],
    datasets: [{
      backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
      data: [12, 19, 3, 17, 28] //this is where we'll connect results
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
var LanguageLevelChart = document.getElementById("level-compare-chart"); 
var LangChart = new Chart(LanguageLevelChart,{
    type: 'bar',
    data: {
      labels: ["Your Input", "Goldman Sachs", "Obama's Farewell Speech", "Gettysburg Address", "Average Legal Publication"],
      datasets: [{
          backgroundColor: ["#d36f35", "#d18d66","#e2cabc","#029bbd","#9bbcc4"], 
          data: [2,3,5,4,7]
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
var comparisonChart = document.getElementById("sentiment-compare-chart");
var compChart = new Chart(comparisonChart, {
  type: 'bar',
  data: {
    labels: ["Anger", "Disgust", "Joy", "Sadness", "Fear"],
    datasets: [{
      label: 'Your Input',
      backgroundColor: ("#d36f35"),
      data: [0.10, 0.10, 0.10, 0.10, 0.10]
    }, {
      label: "Tupac's Speech on Greed",
      backgroundColor: ("#d18d66"),
      data: [0.18, 0.60, 0.17, 0.59, 0.13]
    }, {
        label: 'I Have a Dream Speech',
        backgroundColor: ("#029bbd"),
        data: [0.12, 0.10, 0.66, 0.51, 0.10]
      }, {
        label: 'Equifax Apology',
        backgroundColor: ("#9bbcc4"),
        data: [0.11, 0.05, 0.54, 0.20, 0.11]
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
var confidenceChart = document.getElementById("confidence-chart").getContext('2d');
var myChart = new Chart(confidenceChart, {
  type: 'doughnut',
  data: {
    labels: ["confidence", ""],
    datasets: [{
      backgroundColor: ("#2ecc71", none),
      data: [75, (100-75)]
    }]
  }
});
}