var mario,mario_running,mario_collided;
var bg,bgImage;
var bricksGroup, brickImage;
var coinImage,coinsGroup;
var coinScore=0;
var mushImage,turImage,obsGroup;
var gameState ="PLAY"
function preload(){
    // loading images
    mario_running= loadAnimation("images/mar1.png","images/mar2.png", "images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png")
    bgImage= loadImage("images/bgnew.jpg")
    brickImage=loadImage("images/brick.png")
    coinSound=loadSound("sounds/coinSound.mp3")
    coinImage=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png")
    mushImage=loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png")
    turImage=loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png")
    dieSound=loadSound("sounds/dieSound.mp3")
    mario_collided=loadAnimation("images/dead.png")
    jumpSound=loadSound("sounds/jump.mp3")
}

function setup() {
    createCanvas(1000, 600);
    // making background sprite , ading image to the sprite, scaling the sprite(image)
    bg= createSprite(580,300)
    bg.addImage(bgImage)
    bg.scale=0.5
    //It creates an sprite  and scale it. It also make the image animated
    mario=createSprite(200,505,20,50)
    mario.addAnimation("running",mario_running)
    //mario.addAnimation("collided",mario_collided)
    mario.scale=0.3
    //It creates ground sprite and making it invisible. 
    ground=createSprite(200,585,400,10)
    ground.visible=false

    //Create group
    bricksGroup=new Group()
    coinsGroup=new Group()
    obsGroup=new Group()
}

function draw() {

    //vl for bg
    bg.velocityX=-6
    
    //scroll bg
    if(bg.x<100){
        bg.x=bg.width/4
    }

    //jump 
    if(keyWentDown("space")){
        mario.velocityY=-16;  
        jumpSound.play()  
    }

    //gravity
    mario.velocityY= mario.velocityY+0.5

    //mario colliding with ground
    mario.collide(ground)

    //call function generateBricks 
    generateBricks();
    
    //making mario collide with the brick
    for(var i = 0; i < bricksGroup.length; i++){
        var temp=bricksGroup.get(i)
        if(temp.isTouching(mario)){
            mario.collide(temp)
        }    
    }


    generateCoins();

    for(var i = 0; i <coinsGroup.length; i++){
        var temp=coinsGroup.get(i)
        if(temp.isTouching(mario)){
            temp.destroy()
            coinSound.play()
            temp=null
            coinScore++
        }
    }
    
    //preventing mario moving out with the bricks
    if(mario.x<200){
        mario.x=200
    }

    //prevent mario moving out from then top 
    if(mario.y<50){
        mario.y=50
    }
    generateobs()

    drawSprites() 
    textSize(20)
    fill("brown")
    text("coins collected:"+coinScore,500,50)

}




function generateBricks(){
    if(frameCount%70===0){
        var brick=createSprite(1200,120,40,10)
        brick.velocityX=-5
        brick.y=random(50,450)
        brick.addImage(brickImage)
        brick.scale=0.5
        bricksGroup.add(brick)
        brick.lifetime=250
    }
}
function generateCoins(){
    if(frameCount%50===0){
        var coin=createSprite(1200,random(80,350),40,10)
        coin.addAnimation("coin",coinImage)
        coin.velocityX=-3
        coin.scale=0.1 
        coinsGroup.add(coin) 
        coin.lifetime=450
    }
}

function generateobs(){
    if(frameCount%50===0){
        var obs=createSprite(1200,545,40,10)
        obs.velocityX=-4
        obs.scale=0.2
        var r=Math.round(random(1,2))
        switch(r){
            case 1:
                obs.addAnimation("mush",mushImage)
                break
            case 2:
                obs.addAnimation("tur",turImage)
                break
            default:
                break
        }
        obs.lifetime=300;
        obsGroup.add(obs)
        
    }
}