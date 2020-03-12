let touched = 0;

//Creating canvas 
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
      this.canvas.width = 500;
      this.canvas.height = 500;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.footer);
      this.interval = setInterval(updateGameArea, 60);
      //this.draw = window.requestAnimationFrame(updateGameArea);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  };

  myGameArea.start();

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
    displayNewPos: function(){
        var ctx = myGameArea.context;
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, jerry.x, jerry.y, 80, 80);
            };
        img.src = "./cartoon-people-transparent-background-14.png";
    }
};

 //Background Image
 let backgroundImage = {
     displayBackground: function (){
        var ctx = myGameArea.context;
        var bgImg = new Image();
        bgImg.onload = function () {
         ctx.drawImage(bgImg, 0, 0, 500, 500)
        };
        bgImg.src = './best-street-macro-wallpaper-photo-hd.jpg';
     }
};
     
//Virus
let obstaclesArray = [];

class Obstacle {
    constructor(x, y, width, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.speed = speed;
    }  
}

function addObstacle () {
    // if (touched < 30 && counter.currentTime < 60) {
         obstaclesArray.push(new Obstacle(Math.random() * (500 - 10) + 0, 0, 30))             
         }
 //      else if (obstaclesFalling === false) {
        console.log(obstaclesArray)
 //     }
 // }
 setInterval(addObstacle, 1000);


function moveObstacle() {
    for (i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].y += Math.random() * (10 - 1) + 1
           // console.log('increase y' + obstaclesArray[i].y)
    }
}

var newImage = new Image();
newImage.src = './virus.png'

function displayObst() {
    var ctx = myGameArea.context;


   for (let i = 0; i < obstaclesArray.length; i++) {
                ctx.drawImage(newImage, obstaclesArray[i].x, obstaclesArray[i].y, obstaclesArray[i].width, 30)
            }
    // newImage.onload = displayObst() 
}


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
    displayTime: function() {
        var ctx = myGameArea.context;
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(counter.currentTime, 20, 40);
        }
};

setInterval(counter.startTime, 1000)

// updating canvas
function updateGameArea() {
    backgroundImage.displayBackground();
    myGameArea.clear();
    counter.displayTime();
    jerry.displayNewPos();
    moveObstacle();
    displayObst(obstaclesArray);
} 



// OLD CODE - need to be taken in the restructured code

// CountDown when in quarantine 
// let timeWhileQuarantine = {
//     counterDown: 15,
//     countDown: function ( {
//         if (timeWhileQuarantine.counterDown < 0) {
//             timeWhileQuarantine.counterDown = 0;
//         } else {
//             timeWhileQuarantine.counterDown -= 1;
//             console.log(timeWhileQuarantine.counterDown);
//         return timeWhileQuarantine.counterDown;
//         }
//     }
// };



// function startGame() {
//     intervalNo = setInterval(counter.time, 1000)
//     // clearInterval(intervalNo)
//     obstaclesFalling = setInterval(addObst, 1000)
//     draw()
// }

//let quarantineVar = false

// Drawing everything in canvas
//function draw() {
    //canvas
    // var canvas = document.getElementById("canvas");
    // var ctx = canvas.getContext("2d");

   

    //Jerry
    // var img = new Image();
    // img.onload = function () {
    //     ctx.drawImage(img, jerry.x, jerry.y, 80, 80);
    // };
    // img.src = "./cartoon-people-transparent-background-14.png";

    // Obstacle
    //var newImage = new Image();

    // function displayObst(obstaclesArr) {
    //     if (counter.currentTime < 60) {
    //         newImage.src = 'https://www.stickpng.com/assets/images/5bd08b637aaafa0575d85039.png'

    //         for (let i = 0; i < obstaclesArr.length; i++) {
    //             ctx.drawImage(newImage, obstaclesArr[i].x, obstaclesArr[i].y, obstaclesArr[i].width, 30)
    //         }
    //     }
    // }
    // newImage.onload = displayObst(obstaclesArr)
    // moveObstacle(obstaclesArr)

    // displaying counter
    // if (touched > 30) {

    // } else {
    //     ctx.fillStyle = "white";
    //     ctx.font = "30px Arial";
    //     ctx.fillText(counter.currentTime, 20, 40);
    // }
    // displaying CountDown
    
    // function displayCountdown () {
    //     ctx.fillStyle ="white";
    //     ctx.font = "200px Arial";
    //     ctx.fillText(timeWhileQuarantine.counterDown, 100, 200)
    // }

    // Game Over
    function gameOver() {
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText("GAME OVER !", 200, 400);
    }
    if (touched >= 30) {
        gameOver()

    }


    //Quarantine if Jerry touches Virus
//     for (let i = 0; i < obstaclesArr.length; i++) {
//         let collisionRightX = Math.floor(obstaclesArr[i].x) + 10;
//         let collisionLeftX = Math.floor(obstaclesArr[i].x) - 40

//         if (jerry.x < collisionRightX && jerry.x > collisionLeftX && obstaclesArr[i].y < 450 && obstaclesArr[i].y > 400) {
//             touched += 1;
//             quarantineVar = true;
//             clearInterval(intervalNo)
//             clearInterval(obstaclesFalling)
//             ctx.fillStyle = "white";
//             ctx.font = "50px Arial";
//             ctx.fillText("Quarantine !", 200, 400);
//             return wait()
//     }            
// }


// WIN
function win() {
    var ctx = myGameArea.context;
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText("You survived !", 200, 500);
        }
    // }
    // if (counter.currentTime >= 60 && touched < 30) {
    //     win()
    // }

    // drawing endlessly
//     if (obstaclesFalling) {
//         window.requestAnimationFrame(draw)
//     }
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


// function canvas appears 
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