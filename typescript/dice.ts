let turnNumber:number[] = [0];
let player1Score:number[] = [0];
let player2Score:number[] = [0];
let turnCounter = 0;

function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.random(); // between 0 and 0.99
    
    random = Math.floor(random * maxValue) + minValue; 

    return random;
}

// helper function to get player name
function getPlayerName(player:string):string{
    return (<HTMLInputElement>document.getElementById(player)).value;
}

// helper function to get the current total as a number
function getTotal():number {
    return parseInt((<HTMLInputElement>document.getElementById("total")).value);
}

// helper function to get the current player's name
function getCurrentPlayerName():string {
    return document.getElementById("current").innerText;
}

function changePlayers():void{
    let currentPlayerName = getCurrentPlayerName();
    let currentPlayerSpan = document.getElementById("current");
    let player1Name = getPlayerName("player1");
    let player2Name = getPlayerName("player2");

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName != player1Name) { // if current player is player 2, switch to player 1
        currentPlayerName = player1Name;
    }
    else { // if current player is player 1, switch to player 2
        currentPlayerName = player2Name;
    }
    currentPlayerSpan.innerText = currentPlayerName;
    
    // keep track of that turn it is
    turnCounter++;
    if (turnCounter == 2) { // go to the next turn after both players get to roll
        turnNumber.push(turnNumber.length);
        turnCounter = 0;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    document.getElementById("roll").onclick = rollDie;

    document.getElementById("hold").onclick = holdDie;
}

function createNewGame(){
    // set default values for arrays
    turnNumber = [0];
    player1Score = [0];
    player2Score = [0];

    // reset the roll and hold buttons if someone won the last game
    (<HTMLButtonElement>document.getElementById("roll")).disabled = false;
    (<HTMLButtonElement>document.getElementById("hold")).disabled = false;

    // reset the winner-output div
    document.getElementById("winner-output").innerText =  "";

    // reset <input id="die"></input> to nothing
    (<HTMLInputElement>document.getElementById("die")).value = "";

    //set player 1 and player 2 scores to 0
    (<HTMLInputElement>document.getElementById("score1")).value = "0";
    (<HTMLInputElement>document.getElementById("score2")).value = "0";

    //verify each player has a name
    //if both players don't have a name display error
    let player1Name = getPlayerName("player1");
    let player2Name = getPlayerName("player2");
    if (player1Name.length >= 1 && player2Name.length >= 1) {
        //if both players do have a name start the game!
        document.getElementById("turn").classList.add("open");
        document.getElementById("chart").removeAttribute("hidden");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
    else {
        alert("Both players must have a name");
    }
}

// helper function to get the current player's score array
function getCurrentPlayerScoreArray():number[] {
    if (getCurrentPlayerName() == getPlayerName("player1")) {
        return player1Score;
    }
    return player2Score;
}

function rollDie():void{
    let totalBox = <HTMLInputElement>document.getElementById("total");
    let dieBox = <HTMLInputElement>document.getElementById("die");
    let currTotal = getTotal();
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let roll = generateRandomValue(1, 6);
    dieBox.value = roll.toString();

    //if the roll is 1
    //  change players
    //  set current total to 0
    if (roll == 1) {
        changePlayers();
        currTotal = 0;

        // append the current player's previous score to their score array
        let currentScore = parseInt(getCurrentPlayerScoreBox().value);
        getCurrentPlayerScoreArray().push(currentScore);
    }
    
    //if the roll is greater than 1
    //  add roll value to current total
    if (roll > 1) {
        currTotal += roll;
    }

    //set the die roll to value player rolled
    //display current total on form
    totalBox.value = currTotal.toString();

    // check if a player wins
    if (isWinner()) {
        endGame();
    }
}

// function to output the results of the game when someone wins, and
// disables the roll and hold buttons
function endGame() {
    let currentPlayerName = getCurrentPlayerName();
    document.getElementById("winner-output").innerText =  currentPlayerName + " wins!";
    (<HTMLButtonElement>document.getElementById("roll")).disabled = true;
    (<HTMLButtonElement>document.getElementById("hold")).disabled = true;
    drawChart();
}

function holdDie():void{
    //get the current turn total
    //determine who the current player is
    //add the current turn total to the player's total score
    let currTotal = getTotal();
    let currentScore = getCurrentPlayerScoreBox();

    let newScore = parseInt(currentScore.value) + currTotal;
    currentScore.value = newScore.toString();

    // update the current player's score array
    getCurrentPlayerScoreArray().push(newScore);

    //reset the turn total to 0
    currTotal = 0;
    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();

    //change players
    changePlayers();
}

// check if the current player's score plus their total is > 100
function isWinner():boolean {
    let currentScore = parseInt(getCurrentPlayerScoreBox().value);
    let currentTotal = getTotal();
    if (currentScore + currentTotal >= 100) {
        return true;
    }
    return false;
}

// helper function to get the current player's score input element
function getCurrentPlayerScoreBox():HTMLInputElement {
    let currentPlayerName = getCurrentPlayerName();
    let player1Name = getPlayerName("player1");
    let currentPlayerScoreBox = <HTMLInputElement>document.getElementById("score1"); // default to player 1's score box

    if (currentPlayerName != player1Name) { // if current player is not player 1, target player 2's score box
        currentPlayerScoreBox = <HTMLInputElement>document.getElementById("score2");
    }

    return currentPlayerScoreBox;
}

function drawChart() {
    // draw the chart
    let scoreChart = new Chart(document.getElementById("score-chart"), {
        type: 'line',
        data: {
            labels: turnNumber,
            datasets: [
                {
                    label: 'Player 1',
                    data: player1Score,
                },
                {
                    label: 'Player 2',
                    data: player2Score,
                }
            ]
        }
    });
}