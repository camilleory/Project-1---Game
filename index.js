let touched = 5;
let gameRunning = false;
let section1 = document.querySelector('#explainations')

// let interval = false;

let canvas = document.createElement("canvas")

//Creating canvas 
var myGameArea = {
    canvas: canvas,
    context: canvas.getContext("2d"),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.querySelector('#instructions').appendChild(this.canvas)
        this.interval = setInterval(updateGameArea, 60);
        document.querySelector('#Jerry').remove();
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};

function check() {
    console.log('check')
    if (touched > 1) {
        console.log('hello')
        clearInterval(myGameArea.interval)
    }
}
// check()

//myGameArea.start()

var ctx = myGameArea.context;
var img = new Image();
img.src = "./cartoon-people-transparent-background-14.png";

//Creating Jerry and his moves
let jerry = {
    x: 150,
    y: 430,

    moveRight: function () {
        if (jerry.x < 450) {
            jerry.x += 10
        } else {
            jerry.x = 450
        }
        return jerry.x
    },
    moveLeft: function () {
        if (jerry.x > -20) {
            jerry.x -= 10
        } else {
            jerry.x = -20
            return jerry.x
        }
    },
    displayNewPos: function () {
        ctx.drawImage(img, jerry.x, jerry.y, 80, 80);
    }
};

//Background Image
var bgImg = new Image();
bgImg.src = './best-street-macro-wallpaper-photo-hd.jpg'

let backgroundImage = {
    displayBackground: function () {
        ctx.drawImage(bgImg, 0, 0, 500, 500)
    }
};

//Create Virus, add to array, change x to make it "fall"
let obstaclesArray = [];
let obstaclesFalling = true;
class Obstacle {
    constructor(x, y, width, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.speed = speed;
    }
}

function addObstacle() {
    obstaclesArray.push(new Obstacle(Math.random() * (500 - 5) + 0, 0, 30))
}
console.log(obstaclesArray)


function moveObstacle() {
    for (i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].y += 10
        // console.log('increase y' + obstaclesArray[i].y)
    }
}


// Displaying virus
var newImage = new Image();
newImage.src = './virus.png'

function displayObst() {
    var ctx = myGameArea.context;
    if (obstaclesFalling === true) {


        for (let i = 0; i < obstaclesArray.length; i++) {
            ctx.drawImage(newImage, obstaclesArray[i].x, obstaclesArray[i].y, obstaclesArray[i].width, 30)
        }
    } else {
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
    }
}
// setInterval(addObstacle, 1000);

let obstacleInterval;


// Create bonus, add to array, change x to make it "fall"
let bonusArray = [];
let bonusFalling = true;
class Bonus {
    constructor(x, y, width, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.speed = speed;
    }
}

function addBonus() {
    bonusArray.push(new Bonus(Math.random() * (500 - 5) + 0, 0, 30))
}


function moveBonus() {
    for (i = 0; i < bonusArray.length; i++) {
        bonusArray[i].y += 7
        // console.log('increase y' + obstaclesArray[i].y)
    }
}

// Displaying bonus
var bonusImg = new Image();
bonusImg.src = './hiclipart.com.png'

function displayBonus() {
    var ctx = myGameArea.context;
    if (bonusFalling === true) {


        for (let i = 0; i < bonusArray.length; i++) {
            ctx.drawImage(bonusImg, bonusArray[i].x, bonusArray[i].y, bonusArray[i].width, 30)
        }
    } else {
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
    }
}

let bonusInterval;




// Time
let counter = {
    currentTime: 0,
    startTime: function () {
        if (counter.currentTime >= 60) {
            counter.currentTime = 60;
        } else {
            counter.currentTime += 1

            return counter.currentTime;
        }
    },
    displayTime: function () {
        var ctx = myGameArea.context;
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(counter.currentTime, 20, 40);
    },
    timeInterval: function () {
        setInterval(counter.startTime, 1000)
    }
};

//let interval = setInterval(counter.startTime, 1000)


// WIN
var gameOverImg = new Image();
gameOverImg.src = './winimg.png'

function win() {
    //gameRunning = false;
    var ctx = myGameArea.context;
    ctx.fillStyle = "RGB(255, 165, 0)";
    ctx.font = "70px Arial";
    ctx.fillText("You survived !", 20, 250);
    ctx.drawImage(gameOverImg, 100, 100, 100, 100)
    playAgain()

}

// Game Over
function gameOver() {
    obstaclesFalling = false;
    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText("GAME OVER !", 20, 250);
    button.setAttribute('class', 'play-again')
    myGameArea.interval = clearInterval()

}

//Collision if Jerry touches Virus
function collision() {

    for (let i = 0; i < obstaclesArray.length; i++) {
        let collisionRightX = obstaclesArray[i].x;
        let collisionLeftX = obstaclesArray[i].x - 40

        if (jerry.x < collisionRightX && jerry.x > collisionLeftX && obstaclesArray[i].y === 410 /*&& obstaclesArray[i].y > 420*/) {
            //obstaclesArray.pop()
           // obstaclesArray.splice(collidingObstacleIdx, 1)
           collidingObstacleIdx = i

            touched -= 1;
            obstaclesArray.splice(collidingObstacleIdx, 1)

            var ctx = myGameArea.context;
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Argh!", jerry.x, 400);
        }
    }

}

// Get more points if jerry catches vaccin
function getNeedle() {
    for (let i = 0; i < bonusArray.length; i++) {
        let collisionRightX = bonusArray[i].x - 10;
        let collisionLeftX = bonusArray[i].x - 50

        if (jerry.x < collisionRightX && jerry.x > collisionLeftX && bonusArray[i].y < 480 && bonusArray[i].y > 420) {
            bonusArray.pop()
            touched += 1;
            //obstaclesFalling = false;
            var ctx = myGameArea.context;
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Yes!", jerry.x, 400);
            //clearInterval(interval)
        }
    }
}

// Display life expectation
function displayLife() {
    var ctx = myGameArea.context;
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Life credit: ${touched}`, 380, 40);
}


//Sounds
function sound() {
    var myAudio = document.createElement("audio");
    myAudio.src = "./African_fun_long.mp3";
    myAudio.play();
    myAudio.loop = true;
}

function moveSound() {
    var myAudio = document.createElement("audio");
    myAudio.src = "./zapsplat_toy_board_game_token_plastic_move_on_board_x1.mp3";
    myAudio.play();
    // myAudio.pause();
}




// updating canvas
function updateGameArea() {
    if (touched > 0 && counter.currentTime <= 60) {
        myGameArea.clear();
        backgroundImage.displayBackground();
        counter.displayTime();
        jerry.displayNewPos();
        moveObstacle();
        displayObst(obstaclesArray);
        collision();
        getNeedle()
        displayBonus(bonusArray)
        moveBonus()
        displayLife()
    }
    if (touched >= 10) {
        backgroundImage.displayBackground();
        win();
        playAgain();
        touched = 1000;
        console.log(touched)
        clearInterval(bonusInterval)
    }
    if (touched <= 0) {
        backgroundImage.displayBackground();
        gameOver()
        playAgain();
    }
    if (counter.currentTime >= 60 && touched < 10) {
        gameOver();
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("You are too slow!", 150, 180);
        counter.timeInterval = ""
        playAgain()
        clearInterval(bonusInterval)
    }
}


// Arrows linked to game
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            jerry.moveLeft();
            moveSound()
            break;
        case 39:
            jerry.moveRight();
            moveSound()
            break;
    }
};