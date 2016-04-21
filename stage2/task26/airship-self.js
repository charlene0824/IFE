/**
 * 飞船实例
 * @param {[type]} radiu 飞船运行的半径
 */
function Airship(id,radiu){
	this.id = this.id;
	this.statue;
	this.energy;
	this.img = new Image();
	this.speed;
	this.x;
	this.y;
	this.angle;
	this.radiu=radiu;
	this.delta;
}

/**
 * 飞船的初始化
 * @return {[type]} 初始化信息
 */
Airship.prototype.init = function(){
	this.statue = "stop";
	this.energy = 100;
	this.img.src = "./airship.png";
	//this.speed = 20;
	this.x = 100;
	this.y = 0;
	this.angle = 0; 
	this.delta = 1/100;

}

/**
 * 飞船的能源系统
 * @return {[type]} 飞船的充电与放电
 */
Airship.prototype.energySystem = function(){
	var self = this;
	var charge = function(){
		if( self.statue == "stop" ){
			self.energy += 1;
			if( self.energy >= 100){
				self.energy == 100;
			}
		}
	}

	var expand = function(){
		if( self.statue == "fly"){
			this.energy -= 1 ;
			if( self.energy == 0){
				self.energy = 0;
				this.statue = "stop";
			}
		}
	}

	return {
		charge: charge,
		expand: expand
	}
}


Airship.prototype.dynamicSystem = function(){
	var self=this;
	//定义飞行时的坐标以及角度的变化
	var fly = function(){
		if(self.status == "fly"){
			ctx.save();
			ctx.translate(400, 400);
			
			self.angle = self.angle + self.delta;
			if(self.angle >= 2 * Math.PI) {
				self.angle = self.angle - 2 * Math.PI;
			}
			self.x = self.radiu * Math.sin(self.angle);
			self.y = self.radiu * Math.cos(self.angle);
			ctx.restore();
		}
		var stop = function(){
			self.status = "stop";
		}
	
	}
}
Airship.prototype.stateManger = function(){
	var self = this;
  //istantiate several states of the spaceship
  var states = {
    fly: function(state) {
        self.Statue = "fly";
        self.dynamicSystem().fly();
        self.energySystem().expand();
    },
    stop: function(state) {
        self.currState = "stop";
        self.dynamicManager().stop();
        self.powerManager().charge();
    },
    destroy: function(state) {
        self.currState = "destroy";
        self.mediator.remove(self);
        // AnimUtil.onDraw(self.mediator.getSpaceships());
    }

	}

	/**
	* [changeState 执行指令改变飞船状态]
	* @param  {[type]} state [spaceship state: fly, stop, destroy]
	* @return {[type]}       [description]
	*/
	var changeState = function(state) {
	  //根据状态执行指令
	  states[state] && states[state]();
	  ConsoleUtil.show("Spaceship No." + self.id + " state is " + state);
	};

	return {
	  changeState: changeState
	};
};

//信号系统 飞船接收指令模块
Airship.prototype.signalManager = function() {
  var self = this;
  return {
    receive: function(msg, from) {
      if (self.status != msg.cmd && self.id == msg.id) {
        self.stateManager().changeState(msg.cmd);
      }
    }
  };
};

 Airship.prototype.show = function(){
 	ctx.save();
 	ctx.translate(400, 400);
 	//console.log(this.angle);
 	
 	ctx.rotate(this.delta);
	ctx.drawImage(this.img, this.x-this.img.width * 0.5, this.y - this.img.height * 0.5);

 	ctx.restore();
 		
 	//console.log("eeeeeeeeeeeeee");

 }