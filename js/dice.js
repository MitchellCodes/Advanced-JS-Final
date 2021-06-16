function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    random = Math.floor(random * maxValue) + minValue;
    return random;
}
function getPlayerName(player) {
    return document.getElementById(player).value;
}
function getTotal() {
    return parseInt(document.getElementById("total").value);
}
function getCurrentPlayerName() {
    return document.getElementById("current").innerText;
}
function changePlayers() {
    var currentPlayerName = getCurrentPlayerName();
    var currentPlayerSpan = document.getElementById("current");
    var player1Name = getPlayerName("player1");
    var player2Name = getPlayerName("player2");
    if (currentPlayerName != player1Name) {
        currentPlayerName = player1Name;
    }
    else {
        currentPlayerName = player2Name;
    }
    currentPlayerSpan.innerText = currentPlayerName;
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    document.getElementById("roll").disabled = false;
    document.getElementById("hold").disabled = false;
    document.getElementById("winner-output").innerText = "";
    document.getElementById("die").value = "";
    document.getElementById("score1").value = "0";
    document.getElementById("score2").value = "0";
    var player1Name = getPlayerName("player1");
    var player2Name = getPlayerName("player2");
    if (player1Name.length >= 1 && player2Name.length >= 1) {
        document.getElementById("turn").classList.add("open");
        document.getElementById("chart").removeAttribute("hidden");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
    else {
        alert("Both players must have a name");
    }
}
function rollDie() {
    var totalBox = document.getElementById("total");
    var dieBox = document.getElementById("die");
    var currTotal = getTotal();
    var roll = generateRandomValue(1, 6);
    dieBox.value = roll.toString();
    if (roll == 1) {
        changePlayers();
        currTotal = 0;
    }
    if (roll > 1) {
        currTotal += roll;
    }
    totalBox.value = currTotal.toString();
    if (isWinner()) {
        endGame();
    }
}
function endGame() {
    var currentPlayerName = getCurrentPlayerName();
    document.getElementById("winner-output").innerText = currentPlayerName + " wins!";
    document.getElementById("roll").disabled = true;
    document.getElementById("hold").disabled = true;
}
function holdDie() {
    var currTotal = getTotal();
    var currentScore = getCurrentPlayerScoreBox();
    var newScore = parseInt(currentScore.value) + currTotal;
    currentScore.value = newScore.toString();
    currTotal = 0;
    document.getElementById("total").value = currTotal.toString();
    changePlayers();
}
function isWinner() {
    var currentScore = parseInt(getCurrentPlayerScoreBox().value);
    var currentTotal = getTotal();
    if (currentScore + currentTotal >= 100) {
        return true;
    }
    return false;
}
function getCurrentPlayerScoreBox() {
    var currentPlayerName = getCurrentPlayerName();
    var player1Name = getPlayerName("player1");
    var currentPlayerScoreBox = document.getElementById("score1");
    if (currentPlayerName != player1Name) {
        currentPlayerScoreBox = document.getElementById("score2");
    }
    return currentPlayerScoreBox;
}
