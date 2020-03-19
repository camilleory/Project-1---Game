let button = document.querySelector('button')

button.onclick = function () {
    gameRunning = true;
    myGameArea.start()
    sound()
    counter.timeInterval = setInterval(counter.startTime, 1000)
    obstacleInterval = setInterval(addObstacle, 1000);
    bonusInterval = setInterval(addBonus, 1000);


};



//Reload page to play again
function playAgain() {
    button.innerHTML = 'Play again';
    button.onclick = function () {
        location.reload();
        return false;
    }
}

