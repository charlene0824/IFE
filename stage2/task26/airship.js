function Airship(radiu){
	this.statue;
	this.energy;
	this.img = new Image();
	this.speed;
	this.x;
	this.y;
	this.angle;
	this.radiu=radiu;
}

Airship.prototype.init = function(){
	this.statue = "stop";
	this.energy = 100;
	this.img.src = "./airship.png";
	this.speed = 20;
	this.x = 100;
	this.y = 0;
	this.angle = 0;
	this.delta = 5;

}

Airship.prototype.fly = function(){
	ctx.save();
	ctx.translate(400, 400);
	
	this.angle = this.angle+this.delta;
	if(this.angle >= 2 * Math.PI) {
		this.angle = this.angle - 2 * Math.PI;
	}
	this.x = this.radiu * Math.sin(this.angle);
	this.y = this.radiu * Math.cos(this.angle);
	ctx.restore();
}
 Airship.prototype.show = function(){
 	ctx.save();
 	ctx.translate(400, 400);
 	console.log("cheng");
 	var img = this.img;
 	//console.log(img.width);
 	console.log(this.x);
 	console.log(this.y);
 	var x = this.x;
 	var y = this.y;
 	this.img.onload = function(){ ctx.drawImage(img, x, y);};
 	console.log("eeeeeeeeeeeeee");
 	ctx.restore();
 }


