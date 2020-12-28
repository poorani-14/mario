var mario,marioImg,mariocollidedbricksGroup;
var ground,groundImg,brickImg,background,
    backgroundImg,obstaclesGroup, obstacle1, obstacle2, obstacle3,       obstacle4;
var gameover,gameoverImg;
var restart,restartImg;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jumpSound,dieSound,checkpointSound


function preload(){
  marioImg=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
    groundImg=loadAnimation("ground2.png");
    brickImg=loadAnimation("brick.png");
    backgroundImg=loadAnimation("bg.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    mariocollided=loadImage("collided.png");
    gameoverImg=loadImage("gameOver.png");
    restartImg=loadImage("restart.png");
    jumpSound=loadSound("jump.mp3");
    dieSound=loadSound("die.mp3");
    checkpointSound=loadSound("checkPoint.mp3")
  

}
function setup(){
  createCanvas(600,300);

    background=createSprite(0,0,300,300);
    background.addAnimation("bg",backgroundImg);
    background.scale=2; 
  
    mario=createSprite(50,230,20,50);
    mario.addAnimation("running",marioImg);
    mario.addImage("collided",mariocollided)
   
    ground=createSprite(200,260,400,20);
    ground.addAnimation("ground",groundImg);
    ground.x=ground.width/2;


    gameOver=createSprite(300,150);
    gameOver.addImage(gameoverImg);

    restart=createSprite(300,170);
    restart.addImage(restartImg);
   
    gameOver.scale=0.5;
    restart.scale=0.5;
    
    score=0; 
    
    obstaclesGroup = new Group();
    bricksGroup= new Group();
   
    mario.setCollider("rectangle",0,0);
    //mario.debug=true

}
function draw(){
  
      
  
  
  if(gameState===PLAY){
        gameOver.visible = false;
        restart.visible = false;
        mario.changeAnimation("running",marioImg)

        score = score + Math.round(frameCount/60);
        ground.velocityX=-(2+3*score/400);
    
        if(score>0 && score%400===0){
            checkpointSound.play();
          }
         if(ground.x<0){
            ground.x=ground.width/2
          }
        if(keyDown("space")&&mario.y>=100){
          mario.velocityY=-3;
          jumpSound.play();
          }
    
       mario.velocityY=mario.velocityY+0.8;
     
      spawnObstacles();

    
    if(obstaclesGroup.isTouching(mario)){
      gameState=END;
      dieSound.play();
    }
    spawnBricks();
  }
  else if(gameState===END){
      gameOver.visible=true;
      restart.visible=true;
    
      ground.velocityX=0;
      mario.velocityY=0;
    
      mario.changeAnimation("collided",mariocollided);
      obstaclesGroup.setLifetimeEach(-1);
      bricksGroup.setLifetimeEach(-1);
    
      obstaclesGroup.setVelocityXEach(0);
      bricksGroup.setVelocityXEach(0);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 
    mario.collide(ground);

    drawSprites();
textSize(20);
      fill("red");
      text("Score: "+ score, 50,50);
 
  }
function spawnBricks(){
    if(frameCount % 100===0){
      brick=createSprite(600,160,40,10);
      brick.addAnimation("brick",brickImg);
      brick.y=Math.round(random(200,100));
      brick.velocityX=-3;
      bricksGroup.add(brick)
    }
}
function spawnObstacles() {
    if (frameCount % 80 === 0){
     var obstacle = createSprite(400,225,10,40);
     obstacle.velocityX = -(2+score/400);

      
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
                default:break;

    }
      obstacle.lifetime=200;
      obstaclesGroup.add(obstacle)
    }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bricksGroup.destroyEach();
  score = 0;
}
