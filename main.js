let button = document.querySelector('button')

button.onclick = function () {
    myGameArea.start()
    let interval = setInterval(counter.startTime, 1000)
    setInterval(addObstacle, 1000);

};

// myGameArea.start()

function playAgain() {
    if (!gameRunning) {
        button.innerHTML = 'Play again';
    }
}



// ajouter une classe playagin qui change le texte et un onclick pour restart le jeu