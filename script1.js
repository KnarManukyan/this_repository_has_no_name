const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const rand = function(num) {
    return Math.floor(Math.random() * num);
}

const heroImg1 = new Image();
heroImg1.src = "1.png";
const heroImg2 = new Image();
heroImg2.src = "2.png";
const heroImg3 = new Image();
heroImg3.src = "3.png";
const heroImg4 = new Image();
heroImg4.src = "4.png";
const heroImg5 = new Image();
heroImg5.src = "5.png";
const heroImg6 = new Image();
heroImg6.src = "6.png";
const heroImg7 = new Image();
heroImg7.src = "7.png";
const heroImg8 = new Image();
heroImg8.src = "8.png";

const multimouthImg = new Image();
multimouthImg.src = "multimouth.png";
const devilImg = new Image();
devilImg.src = "devil.png";
const octopusImg = new Image();
octopusImg.src = "octopus.png";
const ninjaImg = new Image();
ninjaImg.src = "ninja.png";
const background1 = new Image();
background1.src = "cafeteria.jpg";
const APointImg = new Image();
APointImg.src = "A-Point.png";
const FPointImg = new Image();
FPointImg.src = "F-Point.png";

const leftKey = 37;
const upKey = 38;
const rightKey = 39;

const gameData = {

    hero: {
        pic: [heroImg1,heroImg2,heroImg3,heroImg4,heroImg5,heroImg6,heroImg7,heroImg8],
        x: -100,
        y: 400,
        xDelta: 0,
        yDelta: 0,
        w: 300,
        h: 200
    },
    monsters: {
        multimouth: {
            pic: multimouthImg,
            x: 150,
            y: 000,
            xDelta: 0,
            yDelta: 0,
            w: 250,
            h: 250
        },
        devil: {
            pic: devilImg,
            x: 450,
            y: 000,
            xDelta: 0,
            yDelta: 0,
            w: 250,
            h: 250
        },
        octopus: {
            pic: octopusImg,
            x: 700,
            y: 000,
            xDelta: 0,
            yDelta: 0,
            w: 250,
            h: 250
        }/*,
        exam: {
            pic: ,
            x: ,
            y: ,
            xDelta: ,
            yDelta: ,
            h: ,
            w: ,			
        }*/
    },
    ninja: {
        pic: ninjaImg,
        x: 0,
        y: 0,
        xDelta: 0,
        yDelta: 0,
        w: 0,
        h: 0
    },
    background: {
        pic: background1,
        x: 0,
        w: 1500
    },
    score: {
        score: 0,
        APoint: 0,
        FPoint: 0,
        lvlCountA: [25,20,15,15],
        lvlCountF: [5,7,9,11]
    }
} 

const hero = gameData.hero;
const multimouth = gameData.monsters.multimouth;
const octopus = gameData.monsters.octopus;
const devil = gameData.monsters.devil;
const exam = gameData.monsters.exam;
const ninja = gameData.ninja;
const monsters = [multimouth, octopus, devil/*, exam*/];
const APoint = gameData.score.APoint;
const FPoint = gameData.score.FPoint;
const score = gameData.score;
const background = gameData.background;
const arrayA = [];
const arrayF = [];
var isJumping = false;
var isFalling = false;
var imgNum = 0;
var isMoving = false;
var level = 1;

const forEach = function(arr, func) {
    const helper = function(index) {
        if(index === arr.length){
            return;
        }
        func(arr[index]);   
        helper(index+1);    
    }
    helper(0);
}

const createPoints = function(level){

	const pointsLoop = function(count, arr, pic, point){

		if(count<=0){
			return;
		}

		point[arr] = {
            img: pic,
            x: rand(19*background.w),
            y: rand(300)+300,
        }

		return pointsLoop(count-1,arr+1, pic, point);
	}

    pointsLoop(score.lvlCountA[level-1], 0, APointImg, arrayA);
    pointsLoop(score.lvlCountF[level-1], 0, FPointImg, arrayF);
}
createPoints(1);

const drawPoints = function(){
    const makePoints = function(arr,point,img){

        if(arr === point.length){
            return;
        }

        context.drawImage(img,point[arr].x,point[arr].y,30,30);
        return makePoints(arr+1);
    }

    makePoints(0,arrayA,APointImg);
    makePoints(0,arrayF,FPointImg);
}


const draw = function(){

    for(i=0; i<=19; i++){
        context.drawImage(background.pic,background.x + i*background.w,0,background.w,canvas.height);
    }
    
    context.font = '20px Arial'
    context.drawImage(APointImg,0,0,30,30);
    context.drawImage(FPointImg,0,40,30,30);
    context.fillStyle = 'yellow';
    context.fillText('X',40,21);
    context.fillText(APoint,65,21)
    context.fillStyle = 'red';    
    context.fillText('X',40,63);    
    context.fillText(FPoint,65,63)

    forEach(monsters, function(monsters){
        context.drawImage(monsters.pic, monsters.x, monsters.y, monsters.w, monsters.h);
    }) 

    context.drawImage(hero.pic[imgNum], hero.x, hero.y, hero.w, hero.h);
    context.drawImage(ninja.pic, ninja.x, ninja.y, ninja.h, ninja.w);
    move();
}

const move = function(){

    if(isMoving === true){
        if(imgNum <= 6){
            imgNum ++;
        } else {
           imgNum = 0;
        }
    } else {
        imgNum = 0;
    }

    if(isMoving === true){
        background.x -= 5;
    }
    
}

const update = function(){
    //collision and movement
    hero.y += hero.yDelta;
}

const jump = function(){

    if(isJumping === true){
        imgNum = 4;
        if(isFalling === false){
            hero.yDelta = -5;
            if(hero.y === 200){
                isFalling = true;
            }
        } else {
            hero.yDelta = 5;
            if(hero.y === 400){
                isJumping = false;
                isFalling = false;
                hero.yDelta = 0;
            }
        }
    }
}

const loop = function(){

    context.clearRect(0,0,1200,600);
    update();
    draw();
    jump();
    // drawPoints();
    requestAnimationFrame(loop);
}

loop();

document.addEventListener('keydown', function(event) {

    if(event.keyCode === leftKey) {
        
    }
    if(event.keyCode === rightKey) {
        isMoving = true;
    }
    if (event.keyCode === upKey && isJumping === false) {
        isJumping = true;
    }
}, false);
document.addEventListener('keyup', function(event){

    if(event.keyCode === rightKey){
        isMoving = false;
    }
}, false)
