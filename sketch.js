var bakground,backgroundImg;
var boyImg,boy;
var obstacle1,obstacle2,obstacle3;
var wireImg;
var jumpSound,gameOverSound,taskDoneSound;
var dioImg;

var gameState = "play";
var tasks = "task1";
var wireCount = 0;

function preload(){
  backgroundImg = loadImage("background.jpg");
  boyImg  = loadAnimation("tile0.png","tile1.png","tile2.png","tile3.png","tile4.png","tile5.png");
  obstacle1 = loadImage ("rockImg.png");
  obstacle2 = loadAnimation("dog1.png","dog2.png","dog3.png","dog4.png","dog5.png","dog6.png");
  obstacle3 = loadAnimation("scorpion1.png","scorpion2.png","scorpion3.png","scorpion4.png","scorpion5.png","scorpion6.png");
  wireImg = loadImage("wire.jpg");
  jumpSound = loadSound("jump.mp3");
  gameOverSound = loadSound("gameOver.mp3");
  taskDoneSound = loadSound("taskdone.mp3");
  dioImg = loadImage("Dio.png");
}




function setup() {
  createCanvas(800,500);
  bakground=createSprite(400, 250, 50, 50);
  bakground.addImage(backgroundImg);
  
  boy = createSprite(100,420,10,10);
  boy.addAnimation("running",boyImg);
  boy.scale = 0.5;

  insGround = createSprite(400,490,800,10)
  insGround.visible = false;
 
  obstaclesGroup = createGroup();
  wireGroup = createGroup();
}

function draw() {
  
  if(gameState === "play"){
      bakground.velocityX = -4;
      if(bakground.x < 300){
        bakground.x = bakground.width/2;
      }
      if(keyDown("space")){
        boy.velocityY = -12;
        jumpSound.play();
      }
      boy.velocityY = boy.velocityY +0.8;
      
      spawnObstacles();
      if(tasks==="task1"){
        
        spawnWire();
        for(var i=0;i<wireGroup.length;i++){
          if(boy.isTouching(wireGroup.get(i))){
            wireGroup.get(i).destroy();
            wireCount = wireCount + 1;
          }
        }
        if(wireCount>=10){
          tasks="task2";
          taskDoneSound.play();
        }
      }

      if(boy.isTouching(obstaclesGroup)){
        gameOverSound.play();
        gameState = "end";
        
      }

  }
  else if(gameState=="end"){
    console.log(gameState);
    bakground.velocityX = 0;
    boy.velocityY = 0;
    textSize(40);
    text ("GAME OVER",300,200);
    wireGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    wireGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
  }
  else if(gameState==="win"){
    bakground.velocityX = 0;
    boy.velocityY = 0;
    textSize(40);
    text ("You WIN",300,200);
    
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
  }

  boy.collide(insGround);
  drawSprites();
  if(tasks=="task1"){
    imageMode (CENTER);
        image (dioImg,250,100,80,80);
        textSize(30);
        text ("Collect 10 wires",300,100);
  }
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(800,460,10,40);
    obstacle.velocityX = -6;

    var rand = Math.round(random(1,3));
    switch(rand)  {

      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.2;
             break;

      case 2: obstacle.addAnimation("dog",obstacle2);
              obstacle.scale = 0.3;
               break;
      case 3: obstacle.addAnimation("scorpio",obstacle3);
              obstacle.scale = 0.6;
                 break;      
       default: break;             
    }

obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function spawnWire(){
  if(frameCount % 60 === 0 ) {
    var wire = createSprite(800,165,10,40);
    wire.y = Math.round(random(250,350));
    wire.velocityX = -3;
    wire.addImage(wireImg);
    wire.scale = 0.05;
    wire.lifetime=270;
    wireGroup.add(wire);
  }
}