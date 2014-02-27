if (addEventListener) addEventListener("load",loadFn,false);
else attachEvent("onload", loadFn);

// window.addEventListener("load",loadFn,false);

//function allMyCode(){//TODO open this before submit
	"use strict";
	
	//loadFn(); //TODO open this before submit
	
	var canvasBg;
	var canBgCtx;
	
	var canvasJet;
	var canJetCtx;
	
	var canvasEnemy;
	var canEnemyCtx;
	
	var canvasBullet;
	var	canBulletCtx;
	
	var bgImage;
	
	
	//jet	
	var jet1;
	var jetStep = 15;

	//enemy
	var interval;
	var fps = 2000;
	var zStepY = 2;
	var enemies = [];
	var totalEnemies = 0;
	var spawnAmount = 3; 
	
	//bullet
	var bullets = [];
	var bulletsAmount = 20;
	var bulletStep = 50;
	var shooting = 1;
	var currentBulletNo = 0;
	var bulletInterval;
	var bulletFps = 10;
	
	
	//loop -- replace interval.
	var isPlaying = false;
	var requestAnimFrame =  window.requestAnimationFrame ||
	                        window.webkitRequestAnimationFrame ||
	                        window.mozRequestAnimationFrame ||
	                        window.msRequestAnimationFrame ||
	                        window.oRequestAnimationFrame;
	
	
	
	
	var gameLavel = 4;
	
	function loop() {
	    if (isPlaying) {
	        jet1.draw();
	        drawAllEnemies();
	        requestAnimFrame(loop);
	        //drawnAllBullets();
	    }
	}
	
	function startLoop() {
	    isPlaying = true;
	    loop();
	}
	
	function stopLoop() {
	    isPlaying = false;
	}
	
	
	function loadFn(){ 
		BetterInnerHTML(document.getElementById("inner"), // http://www.optimalworks.net/resources/betterinnerhtml/
			'<canvas id="canvasBg" class="canvasBg" width="800" height="500"></canvas>'+    //set size here rather than inset of the css file because: http://stackoverflow.com/questions/5034529/size-of-html5-canvas-via-css-versus-element-attributes
			'<canvas id="canvasJet" class="canvasJet" width="800" height="500"></canvas>' +   //because the size here is to decide how many pixels can  drawn here. if it is not specificed the default value is 300 *150
			'<canvas id="canvasEnemy" class="canvasEnemy" width="800" height="500"></canvas>' + 
			'<canvas id="canvasBullet" class="canvasBullet" width="800" height="500"></canvas>'
		);
		
		canvasBg = document.getElementById("canvasBg");
		canBgCtx = canvasBg.getContext("2d");
		
		canvasJet = document.getElementById("canvasJet");
		canJetCtx = canvasJet.getContext("2d");
		
		canvasEnemy = document.getElementById("canvasEnemy");
		canEnemyCtx = canvasEnemy.getContext("2d");
		
		canvasBullet = document.getElementById("canvasBullet");
		canBulletCtx = canvasBullet.getContext("2d");
		
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
		if(Object){
			jet1 = Object.create(Jet);
			jet1.init();
		}else{
			jet1 = new Jet();
		}
			
	    initBullets(bulletsAmount);
	    startShooting();
	    
	    startLoop();
	    startSpawnEnemies();
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
	
	
	
	//Jet
	var Jet = {
		srcX : 0,
		srcY : 0,
		targetX : 0,
		targetY : 0,
		
		gunX : 0,
		gunY : 0,
		
		objWidth : 0,
		objHeight : 0,
		imageWidth : 0,
		imageheight : 0,
		
		step : 0,
		moveUp : 0,
		moveDown : 0,
		moveLeft : 0,
		moveRight : 0,
		
		gameWidth : 0,
		gameHeight : 0,
		
		flyingXRangeA : 0,
		flyingYRangeA : 0,
		flyingXRangeZ : 0,
		flyingYRangeZ : 0,
		
		draw : jetDraw,
		direction: jetDirection,
		init: jetInit,
		updateGunPosition : updateGunPosition
	};
	function jetInit(){
		this.srcX = 0;
		this.srcY = 500;
		this.targetX = 0;
		this.targetY = 0;
		
		this.objWidth = 100;
		this.objHeight = 86;
		this.imageWidth = this.objWidth;
		this.imageheight = this.objHeight;
		

		
		this.step = jetStep;
		this.moveUp = 0;
		this.moveDown = 0;
		this.moveLeft = 0;
		this.moveRight = 0;
		
		
		this.gameWidth = canvasBg.width;// the var Jet = {} like a define of a Java class, if will be load into system and initialized at early time, so if some value is not ready,  
		this.gameHeight = canvasBg.height;// it will failed, that is why I putted this two line here, becase this canvasBg is not ready. 
		
		
		this.flyingXRangeA = 0;
		this.flyingYRangeA = 0;
		this.flyingXRangeZ = this.gameWidth - this.objWidth;
		this.flyingYRangeZ = this.gameHeight - this.objHeight;
	}
	
	function updateGunPosition(){
		this.gunX = this.targetX + this.objWidth;
		this.gunY = this.targetY + this.objHeight/2 - 8;
	}
	
	function jetDraw(){
		cleanJet();
		this.direction();
		canJetCtx.drawImage(bgImage,this.srcX,this.srcY,this.imageWidth,this.imageheight,this.targetX,this.targetY,this.objWidth,this.objHeight);
	}
	function jetDirection(){
		var temp;
		if(this.moveUp === 1){ //only if, without else , that will enable the object to move diagonally. 
			temp = this.targetY - this.step;
			if(temp >= this.flyingYRangeA){// top         check if out of boundary 0 
				this.targetY = temp;
			}
		}
		if(this.moveDown === 1){
			temp = this.targetY + this.step;
			if(temp <= this.flyingYRangeZ){// bottom
				this.targetY = temp;
			}
		}
		
		if(this.moveLeft === 1){
			temp = this.targetX - this.step;
			if(temp >= this.flyingXRangeA){ //0  left boundary
				this.targetX = temp;
			}
		}
		if(this.moveRight === 1){ 
			temp = this.targetX + this.step;
			if(temp <= this.flyingXRangeZ){ //x right boundary
				this.targetX = temp; 
			}
		}
				
		this.updateGunPosition();
	}
	
	
	
	
	
	
	
	//Enemy
	function Enemy() {
		this.gameWidth = canvasBg.width;
		this.gameHeight = canvasBg.height;
		
		this.objWidth = 100;
		this.objHeight = 89;
		this.imageWidth = this.objWidth;
		this.imageheight = this.objHeight;
		this.flyingXRangeA = 0;
		this.flyingYRangeA = 0;
		this.flyingXRangeZ = this.gameWidth - this.objWidth;
		this.flyingYRangeZ = this.gameHeight - this.objHeight;
		
		this.srcX = 0;
		this.srcY = 586;
		this.targetX = this.gameWidth;
		this.targetY = Math.floor(Math.random() * (this.flyingYRangeZ));
		
		
		this.step = 4;
		this.moveUp = 0;
		this.moveDown = 0;
		this.moveLeft = 0;
		this.moveRight = 0;
		
		this.ifZpathX = returnNChance(50);
		
	}
	
	Enemy.prototype.draw = function(){
		// cleanEnemy();
		if(gameLavel > 3){
			if(this.ifZpathX){
				this.zPathX();
			}
		}
		
		this.targetX = this.targetX - this.step;
		canEnemyCtx.drawImage(bgImage,this.srcX,this.srcY,this.imageWidth,this.imageheight,this.targetX,this.targetY,this.objWidth,this.objHeight);
		
		this.boundaryChecking();
	};
	
	
	
	Enemy.prototype.zPathX = function(){
		//console.log("zpath");
		if(!this.zStepY){
			this.zStepY = zStepY;
			if(returnNChance(50)){ // randomly generate the init direction
				this.zStepY = 0 - this.zStepY;
			}
		}
		
		if(!this.zstepYRangeA){//generate a radom moving range.  (y-y/2 <-->y + y/2)
			if(this.targetY < this.objHeight *3){//to avoid shaking. if the plane locates at the top of screen, then make it zmoving from top to botton.
				this.zstepYRangeA = this.flyingYRangeA;
				this.zstepYRangeZ = this.flyingYRangeZ;
			}else{
				this.zstepYRangeA = this.targetY - Math.floor(this.targetY/2);
				this.zstepYRangeZ = this.targetY + Math.floor(this.targetY/2);
				if(this.zstepYRangeA < 0){
					this.zstepYRangeA = 0;
				}
				if(this.zstepYRangeZ > this.flyingYRangeZ){
					this.zstepYRangeZ = this.flyingYRangeZ;
				}
			}
		}
		
		this.targetY = this.targetY - this.zStepY;
		
		if(this.targetY < this.zstepYRangeA || this.targetY >this.zstepYRangeZ ){//change direction.
			this.zStepY = 0 - this.zStepY;
		}
		
	};
	
	Enemy.prototype.boundaryChecking = function(){
		if(this.targetX < this.flyingXRangeA - this.objWidth){
			console.log("the enimey is flying out of boundary!");
			disposeEnimy(this);
		}
	};
	
	function disposeEnimy(enimy){
		enemies.splice(enemies.indexOf(enimy),1);
		totalEnemies--;
	}
	
	function drawAllEnemies(){
		cleanEnemy();
		for(var i = 0; i < enemies.length;i++){
			enemies[i].draw();
		}
	}
	
	function startSpawnEnemies(){
		cleanInterval();
		interval = setInterval(function() {spawnEnemies(spawnAmount)},fps);
	}
	
	function spawnEnemies(n){
		for(var i=0; i<n; i++){
			enemies[totalEnemies] = new Enemy();
			totalEnemies++;
		}
	}
	
	function cleanInterval(){
		clearInterval(interval);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
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
	
	
	
	
	//bullet
	
	function initBullets(n){
		for (var i=0;i<n;i++){
			if(Object){
				bullets[i] = Object.create(Bullet);
			}else{
				bullets[i] = new Bullet();
			}
			bullets[i].init();
		}
	}
	
	var Bullet ={
		srcX : 0,
		srcY : 0,
		targetX : 0,
		targetY : -20,
		
		objWidth : 0,
		objHeight : 0,
		imageWidth : 0,
		imageheight : 0,
		
		step : 0, 
		
		
		gameWidth : 0,
		gameHeight : 0,
		
		explosion : null,
		
		init : bulletInit,
		draw : bulletDraw,
		recycle : bulletRecycle,
		checkHitEnemy : checkHitEnemy
	};
	function bulletInit(){
		this.srcX = 100;
		this.srcY = 500;
		this.targetX = 0;
		this.targetY = -20;
		
		this.objWidth = 32;
		this.objHeight = 14;
		this.imageWidth = 32;
		this.imageheight = 14;
		
		this.step = bulletStep;
		
		if(Object){
				this.explosion = Object.create(Explosion);
		}else{
			this.explosion = new Explosion();
		}
		this.explosion.init();
			
		
		
		this.gameWidth = canvasBg.width;  
		this.gameHeight = canvasBg.height;
	}
	function bulletDraw(){
		this.targetX = this.targetX + Math.floor(Math.random() * this.step);
		canBulletCtx.drawImage(bgImage,this.srcX,this.srcY,this.imageWidth,this.imageheight,this.targetX,this.targetY,this.objWidth,this.objHeight);
		if(this.checkHitEnemy()){
			this.explosion.draw();
		}
	}
	function shootxxx(){
		//console.log("shoot");
		if(shooting){
			var bullet = bullets[currentBulletNo];
			currentBulletNo++;
			if(currentBulletNo >= bulletsAmount){
				currentBulletNo = 0;
			}
			bullet.targetX = jet1.gunX;
			bullet.targetY = jet1.gunY;
		}
		drawnAllBullets();
	}
	
	function drawnAllBullets(){
		cleanBullet();
		for(var i = 0; i<bullets.length; i++){
			var bullet = bullets[i];
			if(bullet.targetY != -20){
				bullet.draw();
			}
			if(bullet.targetY > bullet.gameWidth){
				bullet.recycle();
			}
		}
	}
	function bulletRecycle(){
		this.targetY = -20;
	}
	
	function checkHitEnemy() {
	    for (var i = 0; i < enemies.length; i++) {
	        if (this.targetX >= enemies[i].targetX &&
	            this.targetX <= enemies[i].targetX + enemies[i].objWidth &&
	            this.targetY >= enemies[i].targetY &&
	            this.targetY <= enemies[i].targetY + enemies[i].objHeight) {
	                this.explosion.targetX = enemies[i].targetX - (this.explosion.objWidth / 2);
	                this.explosion.targetY = enemies[i].targetY;
	                //this.explosion.hasHit = true;
	                this.recycle();
	                disposeEnimy(enemies[i]);
	                return true;
	        }
	    }
	}
	
	
	function cleanBullet(){
		canBulletCtx.clearRect(0, 0, canvasBullet.width, canvasBullet.height);
	}
	
	function startShooting(){
		cleanBulletInterval();
		bulletInterval = setInterval(function(){shootxxx()},bulletFps);
	}
	
	function cleanBulletInterval(){
		clearInterval(bulletInterval);
	}
	
	
	
	//explore
	
	var Explosion ={
		srcX : 0,
		srcY : 0,
		targetX : 0,
		targetY : 0,
		
		objWidth : 0,
		objHeight : 0,
		imageWidth : 0,
		imageheight : 0,
		
		showTime : 0,
		tempi:0,
		hasHit : false,
		
		gameWidth : 0,
		gameHeight : 0,
		
		init : explosionInit,
		draw : explosionDraw
	};
	function explosionInit(){
		this.srcX = 100;
		this.srcY = 400;
		this.targetX = 0;
		this.targetY = 0;
		
		this.objWidth = 50;
		this.objHeight = 50;
		this.imageWidth = 50;
		this.imageheight = 50;
		
		this.showTime = 30;// useless? because this this object be drawn on bullet canvase/ 
		
    	this.hasHit = false;
		
		this.gameWidth = canvasBg.width;  
		this.gameHeight = canvasBg.height;
	}
	function explosionDraw(){
		if(this.tempi < this.showTime){
			this.tempi++;
			canBulletCtx.drawImage(bgImage,this.srcX,this.srcY,this.imageWidth,this.imageheight,this.targetX,this.targetY,this.objWidth,this.objHeight);
		}else{
			this.tempi = 0;
		}
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
	
	
	
	
	function returnNChance(n){
		if(n > 100){
			alert("returnNChance cannot bigger than 100");
		}
		return Math.floor(Math.random() *100) < n;
	}

//}//TODO open this before submit
