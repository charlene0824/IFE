function TextArea(cont){
	this.cont = cont;
	this.line;
	this.lineCont;
	this.text;
	this.lineNum;
}

TextArea.prototype.init = function(){

	var self = this;

	this.lineNum = 1;

	this.createCont();
	this.createLine();

	this.text.onkeyup = function(e){
		console.log(e.keyCode);
		if(e.keyCode == 13){
			console.log("keyCode");
			self.lineNum++;
			self.createLine();
		}
	}

	//文本框的滚动事件 
	this.text.onscroll = function(e){
		console.log('scroll');
		self.line.style.top =  - this.scrollTop +'px';
		console.log(TextArea.extend().getStyle(self.line,"top"));
		console.log(self.line.style.top);

	}

}

//创建行的容器
TextArea.prototype.createCont = function(){
	this.lineCont = document.createElement('div')
	this.line = document.createElement('div');

	this.text = document.createElement('textarea');
	
	this.lineCont.className = 'line';
	this.line.className = 'in-line';

	this.text.className = 'text';
	this.lineCont.appendChild(this.line);
	this.cont.appendChild(this.lineCont);
	this.cont.appendChild(this.text);
}

//创建新的行号
TextArea.prototype.createLine = function(){
	var span = document.createElement('span');
	span.innerHTML = this.lineNum;
	span.className = 'line-num';
	this.line.appendChild(span);

}
//检查文本框中的内容
TextArea.prototype.check = function(){
	var checked = this.text.value;
	var pre_order = ['go','tra','mov'];
	var post_order = ['top','rig','bac','lef'];
	var is_arr  = /(.+)/g;//匹配\r \n之外的任何字符
	var is_num = /[0-9]/;

	//得到各个命令
	var order = checked.match(is_arr);
	for (var i = 0; i < order.length; i++) {
		var order_part = order[i].split(' ');//各个空格分开的字符串

		//如果长度为一 只能是go
		if(order_part.length == 1){
			if(order_part[0] != pre_order[0]){
				return i;
				
				
			}
		}
		// 如果长度是二
		if(order_part.length == 2) {
		
			console.log(is_num.test(order_part[order_part.length - 1]));
			if(is_num.test(order_part[order_part.length - 1])){
				console.log('2-1');
				
				if(order_part[0] != pre_order[0]){
					console.log("test");
					return i;
				}
			}else {
				console.log(pre_order.indexOf(order_part[0]))
				if(pre_order.indexOf(order_part[0])<1 || post_order.indexOf(order_part[1])<0){
					console.log("break");
					return i;
				}
			}
		}
		if(order_part.length == 3){


			if(order_part[0] == pre_order[0]){
				
				return i;
			}

			if(pre_order.indexOf(order_part[0])<1 || post_order.indexOf(order_part[1])<0 || !is_num.test(order_part[order_part.length - 1])){
				
				return i
			}
		} 
		if(order_part.length > 3) {
			return i
		}
	}
	console.log('cheng');
	return true;


}

//工具方法
TextArea.extend = function(){
	//获得计算后的样式
	var getStyle = function(ele,style){
		return document.defaultView.getComputedStyle? document.defaultView.getComputedStyle(ele,null)[style]:ele.currentStyle[style];
	}
	return{
		getStyle:getStyle,
	}
}
//删除行号------------------------未完成
/*TextArea.prototype.deleteLine = function(){
	this.line.onkeyup = function(e){
		if(e.keyCode == 8)
	}
}
*/
