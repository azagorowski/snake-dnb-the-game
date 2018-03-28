//Based on "Code Explained" Snake tutorial

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// Unit creating
const box = 32;

// Loading images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// Loading audio
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.wav";
eat.src = "audio/eat.wav";
up.src = "audio/up.wav";
right.src = "audio/right.wav";
left.src = "audio/left.wav";
down.src = "audio/down.wav";

// Creating the snake
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// Creating an apple
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// Score

var score = 0;

// Control

let d;

document.addEventListener("keydown",direction);

function direction(evt){
    let key = evt.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// Colision
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// Draw everything

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "yellow";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "lime";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // First snake position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // Directions
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // Eating
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // not removing the tail
    }else{
        // removing the tail
        snake.pop();
    }
    
    // add new body
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // GAME OVER
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "red";
    ctx.font = "42px Georgia one";
    ctx.fillText("Score: " + score,2*box,1.6*box);
}

// Gameplay speed

var game = setInterval(draw,150);