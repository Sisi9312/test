/*简单拖拽*/
window.onload = function() {
	var div=document.getElementsByTagName('h3')[0];
	var drog = new Drog();
	drog.drop(div);
	/*
	  使用方法
	 var XX=new Drog();
	 XX.drog(item);
	 XX任意变量名
	 item拖拽的目标
	 */
}
function Drog() {}
Drog.prototype = {
	/* 添加事件*/
	addEvent: function(item, type, fn) {
		if(item.addEventListener) {
			item.addEventListener(type, fn, false);
		} else if(item.attachEvent) {
			item.attachEvent("on" + type, fn); //IE9以前的版本不支持
		}
	},
	/*删除事件*/
	removeEvent: function(item, type, fn) 
	{
		if(item.removeEventListener) {
			item.removeEventListener(type, fn, false); //IE9以前的版本不支持
		} else if(item.detachEvent) //兼容IE
		{
			item.detachEvent("on" + type, fn);
		}
	},
	/*偏移位置*/
	offset:function(item){
		var left=item.offsetLeft;
		var top=item.offsetTop;
		var parent=item.offsetParent;
		while(parent)//兼容ie
		{
			left+=parent.offsetLeft;
			top+=parent.offsetTop;
			parent=parent.offsetParent;
		}
		return {
			left:left,
			top:top	
		}
	},
	/*点住子元素拖拽其父元素*/
	drop:function(obj){
		var _this=this;
		this.addEvent(obj,'mousedown',function(e){
			var e=e||window.event;
		    var chaX=e.clientX-_this.offset(obj.parentNode).left;
		    var chaY=e.clientY-_this.offset(obj.parentNode).top;
			function move(e){
				var e=e||window.event;
			    obj.parentNode.style.left=e.clientX-chaX+"px";
			    obj.parentNode.style.top=e.clientY-chaY+"px";
			}
			function up(){
				_this.removeEvent(document, "mousemove", move);
			}
			_this.addEvent(document,'mousemove',move);
			_this.addEvent(obj,'mouseup',up);
		})
	}
	
}

