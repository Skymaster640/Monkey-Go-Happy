var monkey, player_running;
var banana_group;
var obstacle_group;
var back_ground, backimage; 
var score=0;
var ground;
var banana_image;
var stone_image;


var play=1;
var end=3;
var gameState=play;

function preload() {
  backimage=loadImage("jungle.png");
  
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  banana_image=loadImage("banana.png");
  
  stone_image=loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
  back_ground = createSprite(200,200,800,400);
  back_ground.addImage("jungle",backimage);
  back_ground.scale=2;
  back_ground.x=back_ground.width/2;
  back_ground.velocityX=-5
  
  monkey = createSprite(100,340,10,10);
  monkey.addAnimation("monkey",player_running);
  monkey.scale=0.1;
  
  ground=createSprite(200,350,400,10);
  
  banana_group = new Group();
  
  obstacle_group = new Group();
  
}

function draw() {
  background(220);
  
  if(keyDown("space")){
   monkey.velocityY=-5; 
  }
  
  monkey.velocityY=monkey.velocityY+0.8
  
  
  
  switch(score) {
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18;
    default: break;
  }
  
  if(back_ground.x=100){
    back_ground.x=back_ground.width/2;
  }
  
  if(obstacle_group.isTouching(monkey)){
     monkey.scale=0.06;
     score=0;
  }
  
  if(banana_group.isTouching(monkey)){
    score=score+2;
    banana_group.destroyAll;
  }
  
  
  /*if(obstacle_group.isTouching(monkey)&&monkey.scale=0.2){
    gameState=end;
    obstacle_group.destroyEach;
    banana_group.destroyEach;
  }
  
  if(gameState=play){
    
    
    
  }
  
  if(gameState=end){
    monkey.visible=false;
    back_ground.visible=false;
    
    stroke("white");
    textSize(20);
    fill("white");
    //text("GAME OVER" 200, 200);
  }
  */
  
  
  monkey.collide(ground);
  
  ground.visible=false;
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :"+ score, 300, 50);
  
  makefood();
  spawnobstacle();
}

function makefood() {
  if(World.frameCount % 60 === 0) {
    var fruit = createSprite(400,200,10,10);
    fruit.y=random(0,300);
    fruit.velocityX=-4;
    fruit.addImage("banana",banana_image);
    fruit.scale=0.08;
    
    fruit.lifetime=80;
    banana_group.add(fruit);
  }
}
  
function spawnobstacle() {
  if(World.frameCount % 50 === 0) {
    var stone = createSprite(400,340,10,10);
    stone.velocityX=-(4+score/10);
    stone.addImage("stone",stone_image);
    stone.scale=0.2;
    obstacle_group.add(stone);
  }
}