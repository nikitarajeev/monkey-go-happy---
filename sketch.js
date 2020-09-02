// DECLARING VARIABLE
var banana,banana1,bananaGroup;
var monkey,monkey1;
var stone,stone1,stoneGroup;
var back,back1;
var score;
var ground;

function preload(){
  // PRELOADING THE IMAGES
  
  banana1=loadImage("banana.png");
  monkey1=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  stone1=loadImage("stone.png");
  back1=loadImage("jungle.jpg");
  
 // CREATING GROUPS
  BananaGroup = new Group();
  StoneGroup = new Group();
                        

}



function setup() {
  createCanvas(800,400);
  
  // CREATING THE BACKGROUND
  back=createSprite(0,0,800,400);
  back.addImage(back1);
  back.scale=1.5;
  back.x=back.width/2;
  back.velocityX=-4;
  
  // CREATING THE GROUND
  ground=createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  
  // CREATING THE MONKEY
  monkey= createSprite(100,340,20,50);
  monkey.addAnimation("monkey",monkey1);
  monkey.scale = 0.3;
  
   // SCORE
  score = 0;
  
}


function draw() {
  background(220);
  
  // TO MAKE THE GROUND MOVING
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  // TO MAKE THE BACKGROUND MOVING
  if(back.x<100){
    back.x=back.width/2;
  }
  
  
  //TO INCREASE SCORE BY 2 WHEN THE BANANA TOUCHES THE MONKEY
  if(BananaGroup.isTouching(monkey)){
      BananaGroup.destroyEach();    
       monkey.scale=0.3;
    score = score + 2;
    }
  
  
  // WHEN THE SCORE REACHES 10 OR IT'S MULTIPLES THE SCORE INCREASES 
  
  switch(score){
    case 10 : monkey.scale=0.12;
      break;
      
    case 20 : monkey.scale=0.14;
      break;
      
    case 30 : monkey.scale=0.16;
      break;
    
    case 40 : monkey.scale=0.18;
      break;
      
    default : break;
  
  }
  
  
  // IF THE SPACE KEY PRESSED THE MONKEY WILL JUMP
  if(keyDown("space") ) {
      monkey.velocityY = -15;
    }
  
  
  // GIVING GRAVITY
    monkey.velocityY = monkey.velocityY + 0.8;
  
  
  //TO MAKE THE MONKEY COLLIDE WITH THE GROUND
    monkey.collide(ground);
  
  
  // IF THE STONE TOUCHES THE MONKEY THE SCORE WILL DECREASE BY 2 
  if(StoneGroup.isTouching(monkey)){ 
      monkey.scale=0.10 ;
      score=score-2;
  }
  // NAMING THE FUNCTIONS
  SpawnBanana();
  SpawnStones();
  
  drawSprites();
  
  // TO DISPLAY SCORE
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
}

// TO SPAWN BANANAS
function SpawnBanana() {
  // GIVING  A FRAMECOUNT SO THAT BANANAS WILL BE MADE IN PARTICULAR INTERVALS
  if (frameCount % 60 === 0) {
    // DECLARING VARIABLE
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(banana1);
    banana.scale = 0.05;
    banana.velocityX = -5;
     
   //ASSIGN THE LIFETIME TO THE BANANA
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //ADD BANANA TO THE GROUP
    BananaGroup.add(banana);
  }
}

// TO SPAWN STONES OR THE OBSTACLES
function SpawnStones() {
  if(frameCount % 200 === 0) {
     // GIVING  A FRAMECOUNT SO THAT STONES WILL BE MADE IN PARTICULAR INTERVALS
    var stone = createSprite(800,350,10,40);
    stone.velocityX = -6;
    stone.addImage(stone1);
    
  //ASSIGN THE LIFETIME TO THE STONES
    stone.scale = 0.1;
    stone.lifetime = 300;
    
  //ADD STONES TO THE GROUP
    StoneGroup.add(stone);
  }
}