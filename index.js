let touched = 0;
let gameRunning = false;
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
        this.interval = setInterval(updateGameArea, 60);
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

let obstacleInterval;


// //Create bonus, add to array, change x to make it "fall"
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
        bonusArray[i].y += Math.random() * (10 - 1) + 1
        // console.log('increase y' + obstaclesArray[i].y)
    }
}


// Displaying bonus
var bonusImg = new Image();
bonusImg.src = './winimg.png'

function displayBonus() {
    console.log('vaccin')
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
            console.log(counter.currentTime)

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
    //resetCanvas()
    //playAgain()

}

// Game Over
function gameOver() {
    obstaclesFalling = false;
    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText("GAME OVER !", 20, 250);
    button.setAttribute('class', 'play-again')
    myGameArea.interval = clearInterval()
    resetCanvas()

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

//Sounds
function sound (){
    var myAudio = document.createElement("audio");
    myAudio.src = "./African_fun_long.mp3"
    ;
    myAudio.play();
   // myAudio.pause();
}

function moveSound(){
    var myAudio = document.createElement("audio");
    myAudio.src = "./zapsplat_toy_board_game_token_plastic_move_on_board_x1.mp3"
    ;
    myAudio.play();
   // myAudio.pause();
}


function winSound (){
    var myAudio = document.createElement("audio");
    myAudio.src = "./little_robot_sound_factory_Jingle_Win_Synth_04.mp3"
    ;
    myAudio.play();
   // myAudio.pause();
}


function gameOverSound (){
    console.log('gameoversound')
    var myAudio = document.createElement("audio");
    myAudio.src = "./game-over-piano-sound-effect.mp3"
    ;
    myAudio.play();
   // myAudio.pause();
}



// updating canvas
function updateGameArea() {
    console.log('updating..')
    if (touched < 20 && counter.currentTime <= 60) {
        myGameArea.clear();
        backgroundImage.displayBackground();
        counter.displayTime();
        jerry.displayNewPos();
        moveObstacle();
        displayObst(obstaclesArray);
        collision();
    }
    if (counter.currentTime >= 49 && touched < 20) {
        backgroundImage.displayBackground();
        win();
        //myGameArea.interval = clearInterval()
       // resetCanvas()
        playAgain();
    }
    if (touched >= 20) {
        backgroundImage.displayBackground();
        gameOver()
        //myGameArea.interval = clearInterval()
        //resetCanvas()
        playAgain();
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




// //function canvas appears 
// function drawCanvas() {
//     let canvas1 = document.createElement("canvas")

//     canvas1.width = 500;
//     canvas1.height = 500;
//     document.body.insertBefore(canvas1, document.body.footer);
//     var ctx = canvas1.getContext("2d");

//     //Jerry
//     var jerryImg = new Image();
//     jerryImg.src = "./cartoon-people-transparent-background-14.png"

//     jerryImg.onload = function () {
//         ctx.drawImage(jerryImg, 150, 130, 400, 400);
//     };

//     //Background Image
//     var backgroundImg = new Image();
//     backgroundImg.onload = function () {
//         ctx.drawImage(backgroundImg, 0, 0, 500, 500)
//     }
//     backgroundImg.src = "./best-street-macro-wallpaper-photo-hd.jpg"

//     //Virus
//     var virus = new Image();
//     virus.onload = function () {
//         ctx.drawImage(virus, 100, 300, 100, 130);
//     };
//     virus.src = "https://www.stickpng.com/assets/images/5bd08b637aaafa0575d85039.png";

// }

