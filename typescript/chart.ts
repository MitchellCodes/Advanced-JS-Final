let chart = document.getElementById("score-chart");

let turnNumber:number[] = [0];
let player1Data:number[] = [0];
let player2Data:number[] = [0];


let labels = turnNumber;
let data = {
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

let config = {
    type: 'line',
    data,
    options: {}
};

let scoreChart = new Chart(chart, config);