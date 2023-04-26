var PLAY = 1
var END = 0
var gameState = PLAY

var kingImg;
var gunImg;
var angryImg;
var backgroundImg;
var bulletImg;
var gameOverImg;
var victoryImg; 

var bulletS = 5


function preload(){
   kingImg = loadImage('king.png');
   gunImg = loadImage('gun.png');
   angryImg = loadImage('angry.png');
   backgroundImg = loadImage('background.jpg');
   bulletImg = loadImage('bullet.png');
   gameOverImg = loadImage('gameOver.png');
   victoryImg = loadImage('victory.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    king = createSprite(width / 11, height - 90);
    king.scale = 0.5;
    king.addImage(kingImg);
    king.velocity.y = -15;
    king.depth = 10
    //king.debug = true

    gun = createSprite(width / 1.29, height - 110);
    gun.scale = 0.7;
    gun.addImage(gunImg);

    angry = createSprite(width / 1.19, height - 110); 
    angry.scale = 0.5;
    angry.addImage(angryImg);

    gameOver = createSprite(width / 2, height - 300); 
    gameOver.scale = 1;
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;

    victory = createSprite(width / 2, height - 300); 
    victory.scale = 2;
    victory.addImage(victoryImg);
    victory.visible = false;

    wallT = createSprite(width / 11, height - 730, 200, 10);
    wallT.visible = false;

    wallB = createSprite(width / 11, height - 10, 200, 10);
    wallB.visible = false;

    bulletG = new Group();
   
}

function draw() {
    background(backgroundImg);



    if(keyIsDown(UP_ARROW)){
        angry.position.y -= 10;
        gun.position.y -= 10;
    }

    if(keyIsDown(DOWN_ARROW)){
        angry.position.y += 10;
        gun.position.y += 10;
    }

    if(keyDown('space')){
        bullets();
        bulletS -= 1   
    }

    if(bulletS <= -1){
        gameOver.visible = true;
        king.velocity.y = 0;
        bulletG.destroyEach();
        bulletS = 0
    }

    if(king.isTouching(bulletG)){
        bulletG.setVelocityXEach(0);
        king.velocity.y = 0;
        bulletG.setLifetimeEach(10000);
        victory.visible = true;
        gameOver.destroy()
    }

    bulletG.setColliderEach('rectangle', 0, 0, 300, 10);
    king.setCollider('rectangle', 0, 0, 100, 150);


    king.bounceOff(wallT);
    king.bounceOff(wallB);


    drawSprites();

    textSize(45);
    fill('red');
    text('bullets remaining: ' + bulletS, 500, 50);
}

function bullets(){
    bullet = createSprite(gun.position.x, gun.position.y);
    bullet.scale = 0.3;
    bullet.addImage(bulletImg);
    bullet.velocity.x = -15;
    bulletG.add(bullet);
    bullet.depth = 1
    //bullet.debug = true
}