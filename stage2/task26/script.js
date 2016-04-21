
var airship;
//airship.init();
//airship.show();
	

//document.body.onload=game;
//init();

function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
	
}
function init(){
	//获得canvas context
	can=document.getElementById("drawing");
	ctx=can.getContext("2d");
	ctx.beginPath();
	ctx.arc(400,400,50,0,2*Math.PI,false);
	ctx.fillStyle="#2EACEB";
	ctx.fill();
	airship=new Airship(300);
	//ane=new aneObj;
	airship.init();
}
	
window.requestAnimFrame=(function(){
	return window.requestAnimationFrame||
	       window.webkitRequestAnimationFrame||
	       window.mozRequestAnimationFrame||
	       function(callback){
	       	window.setTimeout(callback,1000/60);
	       }
})();

//控制鱼的动画效果
function gameloop(){
	//浏览器开发商们提供了这个requestAnimationFrame()针对动画效果的API函数
	//requestAnimFrame导致帧与帧之间的时间间隔不统一
	window.requestAnimFrame(gameloop);
	
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;

	if(deltaTime>40){
		deltaTime=40;
	}
	ctx.clearRect(0,0,800,800);
	airship.fly();
	airship.show();
}

var flybutton=document.getElementById("fly");
flybutton.onclick=game;
