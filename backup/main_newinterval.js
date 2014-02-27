if (addEventListener) addEventListener("load",loadFn,false);
else attachEvent("onload", loadFn);

// window.addEventListener("load",loadFn,false);

var canvasBg;
var canBgCtx;

var canvasJet;
var canJetCtx;

var canvasEnemy;
var canEnemyCtx;

var bgImage;

var jet1;
var enemy1;
var interval;
var fps = 10;

var zStep = 2;



function loadFn(){
	document.getElementById("inner").innerHTML= 
		'<canvas id="canvasBg" class="canvasBg" width="800" height="500"></canvas>'+    //set size here rather than inset of the css file because: http://stackoverflow.com/questions/5034529/size-of-html5-canvas-via-css-versus-element-attributes
		'<canvas id="canvasJet" class="canvasJet" width="800" height="500"></canvas>' +   //because the size here is to decide how many pixels can  drawn here. if it is not specificed the default value is 300 *150
		'<canvas id="canvasEnemy" class="canvasEnemy" width="800" height="500"></canvas>';
	canvasBg = document.getElementById("canvasBg");
	canBgCtx = canvasBg.getContext("2d");
	
	canvasJet = document.getElementById("canvasJet");
	canJetCtx = canvasJet.getContext("2d");
	
	canvasEnemy = document.getElementById("canvasEnemy");
	canEnemyCtx = canvasEnemy.getContext("2d");
	
	loadAssets();
}
    

function loadAssets(){
	bgImage = new Image();
	bgImage.src = "sprite.png";
	bgImage.addEventListener("load",function(e){init(e,bgImage);},false);
}

function init(e,bgImage){
	initControl();
	realDrawGameBg(bgImage);
	startDrawing();
	jet1 = new Jet();
	enemy1 = new Enemy();
}


function initControl(){
	document.addEventListener("keydown",keyDownHander,false);
	document.addEventListener("keyup",keyUpHander,false);
}

function keyDownHander(e){
    var keyID = (e.keyCode) ? e.keyCode : e.which;
    if (keyID === 38 || keyID === 87) { //up arrow or W key
        e.preventDefault();//stop to popup the event to stop the default event handler to stop the default action scrol up and down.
        jet1.moveUp = 1;
        //alert("keydown up");
    }
    if (keyID === 39 || keyID === 68) { //right arrow or D key
        e.preventDefault();
        jet1.moveRight = 1;
    }
    if (keyID === 40 || keyID === 83) { //down arrow or S key
        e.preventDefault();
        jet1.moveDown = 1;
    }
    if (keyID === 37 || keyID === 65) { //left arrow or A key
        e.preventDefault();
        jet1.moveLeft = 1;
    }
}

function keyUpHander(e){
    var keyID = (e.keyCode) ? e.keyCode : e.which;
    if (keyID === 38 || keyID === 87) { //up arrow or W key
        e.preventDefault();//stop to popup the event to stop the default event handler to stop the default action scrol up and down.
    	jet1.moveUp = 0;
        //alert("keyup up");
    }
    if (keyID === 39 || keyID === 68) { //right arrow or D key
        e.preventDefault();
        jet1.moveRight = 0;
    }
    if (keyID === 40 || keyID === 83) { //down arrow or S key
        e.preventDefault();
        jet1.moveDown = 0;
    }
    if (keyID === 37 || keyID === 65) { //left arrow or A key
        e.preventDefault();
        jet1.moveLeft = 0;
    }
	
}

function startDrawing(){
	cleanInterval();
	interval = setInterval(draw,fps);
}

function draw(){
	jet1.draw();
	enemy1.draw();
}

function cleanInterval(){
	clearInterval(interval);
}

//Jet
function Jet() {
	this.srcX = 0;
	this.srcY = 500;
	this.targetX = 0;
	this.targetY = 0;
	
	this.objWidth = 100;
	this.objHeight = 40;
	this.imageWidth = this.objWidth;
	this.imageheight = this.objHeight;
	
	this.step = 2;
	this.moveUp = 0;
	this.moveDown = 0;
	this.moveLeft = 0;
	this.moveRight = 0;
	
	
	this.gameWidth = canvasBg.width;
	this.gameHeight = canvasBg.height;
}

Jet.prototype.draw = function(){
	cleanJet();
	this.direction();
	canJetCtx.drawImage(bgImage,this.srcX,this.srcY,this.imageWidth,this.imageheight,this.targetX,this.targetY,this.objWidth,this.objHeight);
};

Jet.prototype.direction = function(){
	var temp;
	if(this.moveUp == 1){ //only if, without else , that will enable the object to move diagonally. 
		temp = this.targetY - this.step;
		if(temp >= 0){
			this.targetY = temp;
		}
	}
	if(this.moveDown == 1){
		temp = this.targetY + this.step;
		if(temp <= this.gameHeight){
			this.targetY = temp;
		}
	}
	
	if(this.moveLeft == 1){
		this.targetX = this.targetX - this.step;
	}
	if(this.moveRight == 1){
		this.targetX = this.targetX + this.step;
	}
};


//Enemy
function Enemy() {
	this.gameWidth = canvasBg.width;
	this.gameHeight = canvasBg.height;
	
	this.objWidth = 100;
	this.objHeight = 40;
	this.imageWidth = this.objWidth;
	this.imageheight = this.objHeight;
	
	this.srcX = 0;
	this.srcY = 540;
	this.targetX = this.gameWidth;
	this.targetY = Math.floor(Math.random() * (this.gameHeight - this.objHeight));
	
	
	this.step = 4;
	this.moveUp = 0;
	this.moveDown = 0;
	this.moveLeft = 0;
	this.moveRight = 0;
	
	
}

Enemy.prototype.draw = function(){
	cleanEnemy();
	//zpath
	this.targetX = this.targetX - this.step;
	canEnemyCtx.drawImage(bgImage,this.srcX,this.srcY,this.imageWidth,this.imageheight,this.targetX,this.targetY,this.objWidth,this.objHeight);
};


Enemy.prototype.zpath = function(){
	if(!this.zstep){
		this.zstep = zStep;
	}
	this.targetY = this.targetY - this.zstep;
	if(this.targetY < 0 || this.targetY >gameHeight ){
		this.zstep = 0 - this.zstep;
	}
	
};










function realDrawGameBg(bgImagex){
	console.log("realDrawGameBg");
	// alert("ss");
	var bgImage = bgImagex;
	var srcX = 0;
	var srcY = 0;
	var targetX = 0;
	var targetY = 0;
	
	var gameWidth = canvasBg.width;
	var gameHeight = canvasBg.height;
	var imageWidth = 800;
	var imageheight = 500;
	
	canBgCtx.drawImage(bgImage,srcX,srcY,imageWidth,imageheight,targetX,targetY,gameWidth,gameHeight);
}

function cleanJet(){
	canJetCtx.clearRect(0, 0, canvasJet.width, canvasJet.height);
}


function cleanEnemy(){
	canEnemyCtx.clearRect(0, 0, canvasEnemy.width, canvasEnemy.height);
}








function cleanBnClickFn(){
	var canvasBg = document.getElementById("canvasBg");
	var canBgCtx = canvasBg.getContext("2d");
	canBgCtx.clearRect(0, 0, canvasBg.width, canvasBg.height);
}

function drawBnClickFn(){
	var canvasBg = document.getElementById("canvasBg");
	var canBgCtx = canvasBg.getContext("2d");
	canBgCtx.fillStyle = "#606060";
	canBgCtx.fillRect(188, 50, 200, 100);
}
function shootBnClickFn(){
	var canvasBg = document.getElementById("canvasBg");
	var canBgCtx = canvasBg.getContext("2d");
	canBgCtx.fillStyle = "#606060";
	canBgCtx.fillRect(10, 10, 20, 20);
}





