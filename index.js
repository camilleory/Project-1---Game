let touched = 0;
let gameRunning = true;
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
        document.body.insertBefore(this.canvas, document.body.footer);
    // starting update function here, so maybe it never checks the other conditions before starting it
        this.interval = setInterval(updateGameArea, 60);
        if (touched > 1){
            console.log('hello')
            this.interval = clearInterval()
        }
        //var ctx = myGameArea.context;
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};
function check (){
    console.log('check')
    if (touched > 1){
        console.log('hello')
        clearInterval(myGameArea.interval)
}
}
check()

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
        obstaclesArray[i].y += Math.random() * (10 - 1) + 1
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


// Time
let counter = {
    currentTime: 0,
    startTime: function () {
        if (counter.currentTime >= 60) {
            counter.currentTime = 60;
        } else {
            counter.currentTime += 1
            console.log(counter.currentTime)

            return counter.currentTime;
        }
    },
    displayTime: function () {
        var ctx = myGameArea.context;
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(counter.currentTime, 20, 40);
    }
};

//let interval = setInterval(counter.startTime, 1000)


// WIN
var gameOverImg = new Image();
gameOverImg.src = './winimg.png'

function win() {
    if (counter.currentTime === 60 && touched < 30) {
        gameRunning = false;
        var ctx = myGameArea.context;
        ctx.fillStyle = "RGB(255, 165, 0)";
        ctx.font = "70px Arial";
        ctx.fillText("You survived !", 20, 250);
        ctx.drawImage(gameOverImg, 100, 100, 100, 100)
        playAgain()
    }
    return gameRunning

}
win()

// Game Over
function gameOver() {
    obstaclesFalling = false;
    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText("GAME OVER !", 20, 250);
    button.setAttribute('class', 'play-again')
}

//Collision if Jerry touches Virus
function collision() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        let collisionRightX = obstaclesArray[i].x;
        let collisionLeftX = obstaclesArray[i].x - 40

        if (jerry.x < collisionRightX && jerry.x > collisionLeftX && obstaclesArray[i].y < 480 && obstaclesArray[i].y > 420) {
            touched += 1;
            //obstaclesFalling = false;
            var ctx = myGameArea.context;
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Argh!", jerry.x, 400);
            //clearInterval(interval)
        }
    }
}


if (counter.currentTime > 10) {
    console.log('time stopped')
    // backgroundImage.displayBackground();
    // win();
} 


// if (touched >= 20) {
//     console.log('touches > 20')
//     !gameRunning
//     backgroundImage.displayBackground();
//     gameOver()
//     gameOverStatus.status = true;
//     console.log('game over' + gameOverStatus.status)
//     // return status = gameOverStatus.status;
// }


// updating canvas
function updateGameArea() {
    console.log('updating..')
    if (touched < 20 && counter.currentTime <=60) {
        myGameArea.clear();
        backgroundImage.displayBackground();
        counter.displayTime();
        jerry.displayNewPos();
        moveObstacle();
        displayObst(obstaclesArray);
        collision();
    } else if (touched >20)
    {
        clearInterval(myGameArea.interval)
        // gameOver()
        console.log('gameover called')
    }
}
   

// if (counter.currentTime === 60 && touched < 30) { 
//     !gameRunning 
//         console.log(gameRunning)
// };


// if (gameRunning){
//     updateGameArea()
// } else if (!gameRunning){
//     win()
// }



// CountDown when in quarantine 
// let timeWhileQuarantine = {
//     counterDown: 15,
//     countDown: function () {
//         if (timeWhileQuarantine.counterDown <= 0) {
//             timeWhileQuarantine.counterDown = 0;
//         } else {
//             timeWhileQuarantine.counterDown -= 1;
//             console.log(timeWhileQuarantine.counterDown);
//             return timeWhileQuarantine.counterDown;
//         }
//     },
//     displayCounterDown: function () {
//         var ctx = myGameArea.context;
//         ctx.fillStyle = "white";
//         ctx.font = "30px Arial";
//         ctx.fillText(timeWhileQuarantine.counterDown, 100, 100)
//         console.log('display countdown called')
//     }
// };




// if (obstaclesFalling === false) {
//     console.log(timeWhileQuarantine.counterDown)
//     setInterval(timeWhileQuarantine.countDown, 1000)
// }



// function wait() {  
//     setInterval(timeWhileQuarantine.countDown, 1000) 
//     var canvas = document.getElementById("canvas");
//             var ctx = canvas.getContext("2d");
//     console.log('wait')
//     }

// starting again after quarantine



document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            jerry.moveLeft();
            break;
        case 39:
            jerry.moveRight();
            break;
    }
};


//function canvas appears 
// function drawCanvas() {
//     var canvas = document.getElementById("canvas");
//     var ctx = canvas.getContext("2d");

//     //Background Image
//     var bgImg = new Image();
//     bgImg.onload = function () {
//         ctx.drawImage(bgImg, 0, 0, 500, 500)
//     };
//     bgImg.src = 'https://bgwall.net/wp-content/uploads/2014/09/best-street-macro-wallpaper-photo-hd.jpg'

//     //Jerry
//     var img = new Image();
//     img.onload = function () {
//         ctx.drawImage(img, 150, 130, 400, 400);
//     };
//     img.src = "./cartoon-people-transparent-background-14.png";

//     //Go 
//     var virus = new Image();
//     virus.onload = function () {
//         ctx.drawImage(virus, 100, 300, 100, 130);
//     };
//     virus.src = "https://www.stickpng.com/assets/images/5bd08b637aaafa0575d85039.png";
// }
// drawCanvas()


// let object = document.querySelector('button')
// object.onclick = function(){
//myGameArea.start()


//};

// function startGame(){
//     myGameArea.start()
// }

// let button = doc ument.querySelector('button');
// button.onclick = startGame();