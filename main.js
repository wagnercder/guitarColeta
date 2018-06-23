// trash
var dx = 2; 
var score = 0; 
var life = 10; 
var eventX, eventY; 

var trashDx = 1; 
var trashes = [];
var trashType = [];
var maca = new Image();
var banana = new Image();
var pet = new Image();
var lata = new Image();
var keyPressed = '';
var hasTrash = false;
var atualTrash;

//maca.src = 'images/apple_trash.png';
banana.src = 'images/banana_trash.png';
pet.src = 'images/plastic_bottle.png';
lata.src = 'images/steel_trash.png';

var trashImages = [
    banana,pet,lata
];

// inicio de lixo
function createTrash() {
    if(!hasTrash){
        var element = document.getElementById('playground');
        var randomValue = Math.floor(Math.random() * 3);
        
        var randomImage = trashImages[randomValue];
        var trashWidth = 100;
        var trashHeight = 100;
        var startingY = Math.random() * (element.height - randomImage.height - 220);

        var trash = { 
            x : 0, y : startingY, 
            width : trashWidth, 
            height : trashHeight, 
            image : randomImage
        };

        trashType.push(randomValue);
        trashes.push(trash);
        atualTrash = randomValue;
        hasTrash = true;
    }
}

function drawTrash(trash) {
    var context = document.getElementById('playground').getContext('2d');
    
    context.drawImage(
        trash.image, trash.x, trash.y, 
        145, 145
    );

    trash.x += dx;
}

function destroyTrash(trash) {
    var index = trashes.indexOf(trash);
    
    if (eventX >= trash.x && eventX <= trash.x + trash.width) {
        if(keyPressed == 'BLUE'){
            if(atualTrash == 3){
                score++;
            }else{
                if(score == 0){
                    life--;

                    if(life == 0){
                        window.location = 'gameover.html';
                    }
                }else{
                    score--;
                }
            }
        }

        if(keyPressed == 'RED'){
            if(atualTrash == 1){
                score++;
            }else{
                if(score == 0){
                    life--;

                    if(life == 0){
                        window.location = 'gameover.html';
                    }
                }else{
                    score--;
                }
            }
        }

        if(keyPressed == 'YELLOW'){
            if(atualTrash == 2){
                score++;
            }else{
                if(score == 0){
                    life--;

                    if(life == 0){
                        window.location = 'gameover.html';
                    }
                }else{
                    score--;
                }
            }
        }

        if(keyPressed == 'GREEN'){
            if(atualTrash == 0){
                score++;        
            }else{
                if(score == 0){
                    life--;

                    if(life == 0){
                        window.location = 'gameover.html';
                    }
                }else{
                    score--;
                }
            }
        }

        trashes.splice(index, 1);
        trashType.splice(index,1);
        eventX = -1; eventY = -1;       
        hasTrash = false;
        displayStatus();
    }
}

function detectEdgeCollision(trash) {
    var index = trashes.indexOf(trash);
    var element = document.getElementById('playground');
    var toasters = document.getElementById('sea');

    if (trash.x + trash.width >= element.width - toasters.width) {
        if (life > 1) {
            trashes.splice(index, 1);
            life--;
            displayStatus();
            hasTrash = false;
        }else {
            window.location = 'gameover.html';
        }
    }
}

function tickTrash() {
    var element = document.getElementById('playground');
    var context = element.getContext('2d');
    context.clearRect(0, 0, element.width, element.height);
    
    for (var i = 0; i < trashes.length; i++) {
        drawTrash(trashes[i]);
        destroyTrash(trashes[i]);  
        detectEdgeCollision(trashes[i]);
    }
}
// fim de lixo

function displayStatus() {
    document.getElementById('stats').innerHTML = 
        'SCORE: ' + score + ' | LIFE: ' + life;
}

function setMousedown(event) {
    eventX = event.clientX;
    eventY = event.clientY;
}

function on_resize() {
    var canvases = [];
    var trashElement = document.getElementById('playground');
    
    canvases.push(trashElement);
    
    for (var i = 0; i < canvases.length; i++) {
        canvases[i].width = window.innerWidth;
        canvases[i].height = window.innerHeight;
    }
}
    
window.onload = function() {
    var bgmusic = document.getElementById('bgmusic');

    bgmusic.loop = true;
    bgmusic.load();
    bgmusic.play();
    on_resize();

    var gameLevel = localStorage.getItem('level');
    var trashSpeed;

    if(gameLevel == 1){
        trashSpeed = 9;
    }

    if(gameLevel == 2){
        trashSpeed = 7;
    }

    if(gameLevel == 3){
        trashSpeed = 5;
    }

    // Lixos
    setInterval(tickTrash, trashSpeed);
    setInterval(createTrash, 10);
    displayStatus();
    tickTrash();
    createTrash();

    document.getElementById('green_been').hidden = true;
    document.getElementById('yellow_been').hidden = true;
    document.getElementById('blue_been').hidden = true;
    document.getElementById('red_been').hidden = true;
}

window.onresize = function() {
    on_resize();
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 81) { //Q
        document.getElementById('green_been').hidden = false;
        eventX = document.getElementById('green_been').x;
        keyPressed = 'GREEN';
    }else{
        document.getElementById('green_been').hidden = true;
    }
    
    if(event.keyCode == 87) { //W
        document.getElementById('yellow_been').hidden = false;
        eventX = document.getElementById('yellow_been').x;
        keyPressed = 'YELLOW';
    }else{
        document.getElementById('yellow_been').hidden = true;
    }
    
    if(event.keyCode == 69) { //E
        document.getElementById('red_been').hidden = false;
        eventX = document.getElementById('red_been').x;
        keyPressed = 'RED';
    }else{
        document.getElementById('red_been').hidden = true;
    }

    if(event.keyCode == 82) { //R
        document.getElementById('blue_been').hidden = false;
        eventX = document.getElementById('blue_been').x;
        keyPressed = 'BLUE';
    }else{
        document.getElementById('blue_been').hidden = true;
    }
});

document.addEventListener('keyup', function(event) {
    eventX = 0;
    document.getElementById('blue_been').hidden = true;
    document.getElementById('red_been').hidden = true;
    document.getElementById('yellow_been').hidden = true;
    document.getElementById('green_been').hidden = true;
});