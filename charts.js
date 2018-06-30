//Individual Sentiment Chart
var sentimentChart = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  responsive: true,
  type: 'pie',
  data: {
    labels: ["Anger", "Fear", "Joy", "Sadness", "Analytical", "Confident", "Tentative"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
      data: [12, 19, 3, 17, 28, 24, 7] //this is where we'll connect results
    }]
  }
});
//Language Level Chart
new Chart(document.getElementById("bar-chart"), {
    responsive: true,
    type: 'bar',
    options: {
      title: {
          display: true,
          text: 'Readability Level Score'
      },
    data: {
      labels: ["Your Input", "Fifty Shades of Grey", "Hillary Clinton", "", ""],
      datasets: [
        {
          label: "Level",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,4.29,,784,433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Language Level Comparison'
      }
    }
});
//Sentiment Comparison Chart
var comparisons = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  responsive: true,
  type: 'bar',
  data: {
    labels: ["Anger", "Fear", "Joy", "Sadness", "Analytical", "Confident", "Tentative"],
    datasets: [{
      label: 'Your Input',
      options: {
        title: {
            display: true,
            text: 'Sentiment Comparison'
        },
      data: [12, 19, 3, 17, 28, 24, 7]
    }, {
      label: 'Wells Fargo',
      data: [30, 29, 5, 5, 20, 3, 10]
    }, {
        label: 'JPMORGAN CHASE & CO.',
        data: [30, 29, 5, 5, 20, 3, 10]
      }, {
        label: 'Equifax Apology',
        data: [30, 29, 5, 5, 20, 3, 10]
      }]
  }
});