var chart = document.getElementById("score-chart");
var turnNumber = [0];
var player1Data = [0];
var player2Data = [0];
var labels = turnNumber;
var data = {
    labels: labels,
    datasets: [
        {
            label: 'Player 1',
            data: player1Data,
        },
        {
            label: 'Player 2',
            data: player2Data,
        }
    ]
};
var config = {
    type: 'line',
    data: data,
    options: {}
};
var scoreChart = new Chart(chart, config);
