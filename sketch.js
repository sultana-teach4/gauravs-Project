var back, backI;
var alien, alienI;
var alien_hit, alien_jump;
var diamondGrp, crownGrp;
var diamond, diamondI;
var crown, crownI;
var invGround, obstacle;
var obstacleI, dScore, Cscore;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameOverI;
var obstacleGrp, crownGrp, diamondGrp;
var reset, resetI;

var message

function preload() {
  alienI = loadAnimation("alien1.png", "alien2.png");
  alien_hit = loadImage("hit.png");
  
  alien_jump = loadImage("jump.png")
  backI = loadImage('back.png');
  obstacleI = loadImage('rocks.png');
  gameOverI = loadImage('gameOver.png')
  diamondI = loadImage('diamond.png');
  crownI = loadImage('gameplay_crown.png');
  resetI = loadImage('reset.png');

}
function setup() {
  createCanvas(400, 400);
  back = createSprite(300, 150);
  back.addImage(backI);
  back.scale = 1.5;
  back.velocityX = -5;
  invGround = createSprite(200, 380, 400, 10);
  invGround.velocityX = -7
  invGround.visible = false;
  dScore = 0;
  Cscore = 0;

  gameOver = createSprite(200, 200, 100, 100)
  gameOver.scale = 1.5;
  gameOver.visible = false;

  reset = createSprite(200, 290, 100, 100);
  reset.visible = false;


  alien = createSprite(100, 340, 30, 30);
  
  alien.addAnimation("alien", alienI);
  alien.addAnimation("hitting", alien_hit)
  diamondGrp = new Group();
  crownGrp = new Group();
  obstacleGrp = new Group(obstacle);

}
function draw() {
  background(220)


  if (gameState === PLAY) {
    diamonds();
    crowns();
    obstacles()
    obstacleGrp.debug = true;
    if (back.x < 100) {

      back.x = 200;
    }
    
    if (keyDown('space') && alien.collide(invGround)) {
      alien.addImage(alien_jump);
      alien.velocityY = -17;

    }
    alien.velocityY = alien.velocityY + 0.8;

    alien.collide(invGround)
    if (invGround.x < 100) {
      invGround.x = 200;
    }
    if (diamondGrp.isTouching(alien)) {
      diamondGrp.destroyEach();
      dScore = dScore + 1;
    }
    if (crownGrp.isTouching(alien)) {
      crownGrp.destroyEach();
      Cscore = Cscore + 1;
    }



    if (obstacleGrp.isTouching(alien)) {
      gameState = END
      alien.changeAnimation("hitting", alien_hit)
      alien.velocityX = 0;



    }
  }

  if (gameState === END) {
    gameOver.visible = true;
    reset.visible = true;
    alien.changeAnimation("hitting", alien_hit)
    back.velocityX = 0;
    alien.velocityX = 0;
    obstacleGrp.setVelocityXEach(0);
    diamondGrp.setVelocityXEach(0);
    crownGrp.setVelocityXEach(0);
    obstacleGrp.setLifetimeEach(-1);
    diamondGrp.setLifetimeEach(-1);
    crownGrp.setLifetimeEach(-1)
    gameOver.addImage(gameOverI);
    reset.addImage(resetI)
    reset.scale = 0.2
    alien.collide(invGround)
  }
  if (mousePressedOver(reset)) {
    alien.changeAnimation("alien");
    gameState = PLAY;
    restart();
  }



  drawSprites();
  fill("White");
  textSize(15);
  stroke("black")
  strokeWeight(2);
  text("DIAMOND: " + dScore, 20, height / 8)

  fill("White");
  textSize(15);
  stroke("black")
  strokeWeight(2);
  text("CROWN: " + Cscore, 300, height / 8)


}





function diamonds() {
  if (frameCount % 300 === 0) {
    diamond = createSprite(400, 200, 30, 30)
    diamond.addImage(diamondI);
    diamond.scale = 0.07;
    diamond.velocityX = -5;
    diamond.lifetime = 200;
    diamondGrp.add(diamond);
  }

}
function crowns() {
  if (frameCount % 700 === 0) {
    crown = createSprite(400, 200, 30, 30);
    crown.addImage(crownI)
    crown.scale = 0.1
    crown.velocityX = -5;
    crown.lifetime = 200
    crownGrp.add(crown)
  }

}
function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(420, 370, 30, 30);
    obstacle.addImage(obstacleI);
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacle.scale = 0.18;
    obstacleGrp.add(obstacle);
    obstacleGrp.debug = true;
  }

}
function restart() {
  gameState = PLAY;
  Cscore = 0
  dScore = 0
  diamondGrp.destroyEach();
  crownGrp.destroyEach();
  obstacleGrp.destroyEach();
  gameOver.visible = false;
  reset.visible = false;
  back.velocityX = -5;
  if (back.x < 100) {

    back.x = 200;
  }
  if (keyDown('space') && alien.collide(invGround)) {
    alien.addImage(alien_jump);
    alien.velocityY = -20;
  }
  alien.velocityY = alien.velocityY + 0.8;

}
