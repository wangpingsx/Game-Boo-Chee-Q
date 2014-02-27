window.addEventListener("load",loadFn,false);

function loadFn(){
	//'<button type="button" id="shootBn">shoot</button><button type="button" id="cleanBn">clean</button><button type="button" id="drawBn">draw</button><canvas id="canvasBg" class="canvasBg"></canvas>';
	document.getElementById("inner").innerHTML= 
		'<button type="button" id="shootBn">shoot</button>'+
		'<button type="button" id="cleanBn">clean</button>'+
		'<button type="button" id="drawBn">draw</button>'+
		'<canvas id="canvasBg" class="canvasBg"></canvas>';
	var canvasBg = document.getElementById("canvasBg");
	var canBgCtx = canvasBg.getContext("2d");
	// canBgCtx.fillStyle = "yellow";
	// canBgCtx.fillRect(188, 50, 200, 100);
	
	var cleanBn = document.getElementById("cleanBn");
	var drawBn = document.getElementById("drawBn");
	var shootBn = document.getElementById("shootBn");
	cleanBn.addEventListener("click",cleanBnClickFn,false);
	drawBn.addEventListener("click",drawBnClickFn,false);
	shootBn.addEventListener("click",shootBnClickFn,false);
	
	
	 drawGameBgPic();
}

function getGameBgContext(){
	var canvasBg = document.getElementById("canvasBg");
	var canBgCtx = canvasBg.getContext("2d");
	return canBgCtx;
}
function drawGameBgPic(){
	var bgImage = new Image();
	bgImage.src = "sprite.png";
	bgImage.addEventListener("load",function(e){realDrawGameBg(e,bgImage);},false);
}
function realDrawGameBg(e,bgImagex){
	//var bgImage = e.target;
	var bgImage = bgImagex;
	// alert(bgImage);
	var srcX = 0;
	var srcY = 0;
	var targetX = 0;
	var targetY = 0;
	var canvasBg = document.getElementById("canvasBg");
	var gameWidth = canvasBg.width;
	var gameHeight = canvasBg.height;
	var imageWidth = 800;
	var imageheight = 500;
	// var canBgCtx = getGameBgContext();
	var canvasBg = document.getElementById("canvasBg");
	var canBgCtx = canvasBg.getContext("2d");
	canBgCtx.drawImage(bgImage,srcX,srcY,imageWidth,imageheight,targetX,targetY,gameWidth,gameHeight);
	
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





