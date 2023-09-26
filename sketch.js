var PLAY = 1;

var END = 0;

var gameState = PLAY;


var towerImg, tower;

var doorImg, door, doorsGroup;

var climberImg, climber, climbersGroup;
var ghost, ghostImg;

var invisibleBlockGroup, invisibleBlock;

function preload()
{
  towerImg = loadImage("tower.png");

  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);

  tower = createSprite(width/2,height/2);
  tower.addImage(towerImg);

  //criar o sprite do ghost
  ghost = createSprite(width/2,height*0.3)
  ghost.addImage(ghostImg)
  ghost.scale = 0.5


  //grupo
  doorsGroup = new Group();

}

function draw() 
  {
    background("black");
  
  
    if(gameState===PLAY){
  
    if(tower.y > 400)
    {
        tower.y = 300
    }
    tower.velocityY = 1;

    if(keyDown("space")){
      ghost.velocityY=-5;
    }
    //gravidade (peso)
    ghost.velocityY = ghost.velocityY + 0.8;
  
  
    //controle: direita e esquerda
    if (keyDown("right")){
      ghost.x+= 3;
    }
    if (keyDown("left")){
      ghost.x -= 3; 
    }

    janelas();

   if (doorsGroup.isTouching(ghost))
   {
  
      gameState = END;
    
  }



}

else if(gameState=== END)
{

    //cor de dentro
    fill("white") //pinta por dentro
    stroke("white") //pinta o contorno da letra ou de um objeto
    textSize(20) //tamanho
    text("GAME OVER",width/2 , height/2 )
    
    
    //doorsGroup.setLifetimeEach(-1);
    doorsGroup.setVelocityYEach(0);
    ghost.velocityY = 0;
    tower.velocityY=0
    
}
  

     
  drawSprites();

}


// criação das janelas (levam ao game over)
function janelas() 
{
  if(frameCount %120 ===0)
  {
      var janela = createSprite(200,100);
      janela.x = Math.round(random(width*0.35 , width*0.65 ));
      janela.addImage(doorImg)
      janela.velocityY= 5;
      janela.lifetime = 200;

      doorsGroup.add(janela);

     janela.debug=false 
      ghost.debug = false
    }
}
