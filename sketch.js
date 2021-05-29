var PLAY=1
var END=0
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var ground, invisibleGround
var survivalTime=0


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  invisibleGround=createSprite(400,350,900,10);
  
  foodGroup = createGroup();
  obstacleGroup=createGroup();

}


function draw() {
background(250);
  
stroke("white");
textSize(20);
fill("white");
  
stroke("black")
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate())
text("survival Time:"+survivalTime,100,50);

  
  
  
  if(gameState===PLAY){
   if(ground > 0){
    ground.x=ground.width/2;
    }
    
    if(keyDown("Space")&&monkey.y >= 100){
      monkey.velocityY=-8;
    }
    
    monkey.velocityY=monkey.velocityY+0.8
    
    monkey.collide(invisibleGround)
    
    //spawn the food
     spawnFood();
    
    //spawn the obstacle
    spawnObstacle();
  }
  
  
  else if(gameState===END){
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX=0;
    monkey.velocityY=0;
  }
    
    if(mousePressedOver(restart)){
      reset();
    }
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
      }
  

  
  drawSprites();

}


function reset(){
 gameState=PLAY;
  
  obstaclesGroup.destroyEach();
  
  bananaGroup.destroyEach();
  
score=0;
}

function spawnFood() {
  //write code here to spawn the banana
  if (frameCount % 80 === 0) {
    var banana = createSprite(350,60,30,10);
    banana.y = Math.round(random(120,150));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale=0.15;
    
    banana.lifetime=200;
    foodGroup.add(banana);
    
  }
}


function spawnObstacle(){
  //write code to spawn obstacle
  if(frameCount % 300===0){
    var obstacle=createSprite(350,320,60,10);
    obstacle.x=Math.round(random(120,200));
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3
    obstacle.scale=0.15;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}