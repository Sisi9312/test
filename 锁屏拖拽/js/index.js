/*锁屏拖拽*/
window.onload = function() {
	var div = document.getElementsByClassName('lockScreen')[0];
	var h3 = document.getElementsByTagName('h3')[0];
	var drog = new Drog();
	div.style.height = drog.getInner().height + "px";
	drog.drop(h3);
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
	removeEvent: function(item, type, fn) {
		if(item.removeEventListener) {
			item.removeEventListener(type, fn, false); //IE9以前的版本不支持
		} else if(item.detachEvent) //兼容IE
		{
			item.detachEvent("on" + type, fn);
		}
	},
	/*偏移位置*/
	offset: function(item) {
		var left = item.offsetLeft;
		var top = item.offsetTop;
		var parent = item.offsetParent;
		while(parent) //兼容ie
		{
			left += parent.offsetLeft;
			top += parent.offsetTop;
			parent = parent.offsetParent;
		}
		return {
			left: left,
			top: top
		}
	},
	/*得到屏幕可用宽度高度*/
	getInner: function() {
		var width = null;
		var height = null;
		if(window.innerHeight) {
			width = window.innerWidth;
			height = window.innerHeight;
		} else {
			width = document.documentElement.clientWidth || document.body.clienWidth;
			height = document.documentElement.clientHeight || document.body.clientHeight;
		}
		return {
			width: width,
			height: height
		}
	},
	/*获得css样式*/
	getStyle:function(item,type){
		return item.currentStyle?item.currentStyle[type]:getComputedStyle(item)[type];
	},
	/*点住子元素拖拽其父元素*/
	drop: function(obj) {
		var _this = this;
		this.addEvent(obj, 'mousedown', function(e) {
			var e = e || window.event;
			var chaX = e.clientX - _this.offset(obj.parentNode).left;
			var chaY = e.clientY - _this.offset(obj.parentNode).top;
					if(_this.setCapture)
				{
					_this.setCapture();
				}
			function move(e) {
				var e = e || window.event;
				var width = parseInt(_this.getStyle(obj.parentNode, 'width'));
				var height = parseInt(_this.getStyle(obj.parentNode, 'height'));
				var left = e.clientX - chaX;
				var top = e.clientY - chaY;
				if(left < 0) {
					left = 0;
				} else if(left > _this.getInner().width - width) {
					left = _this.getInner().width - width;
				}
				if(top < 0) {
					top = 0;
				} else if(top > _this.getInner().height - height) {
					top = _this.getInner().height - height;
				}
				
				obj.parentNode.style.left = left + 200 + "px";
				obj.parentNode.style.top = top + 100 + "px";
			
			}

			function up() {
				_this.removeEvent(document, "mousemove", move);
				if(_this.releaseCapture)
				{
					_this.releaseCapture();
				}
			}
			_this.addEvent(document, 'mousemove', move);
			_this.addEvent(document, 'mouseup', up);
		})
	}

}