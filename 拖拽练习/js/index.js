function Base() {}
Base.prototype = {
	getStyle: function(item, attr) { //取得渲染过后的属性值
		return item.currentStyle ? item.currentStyle[attr] : getComputedStyle(item)[attr];
	},
	animate: function(item, obj) {
		var timer = null;
		var that = this;
		var attr = obj['attr'] != undefined ? obj['attr'] : 'left'; //属性值，如果没有传，则默认left
		var start = obj['start'] != undefined ? obj['start'] : parseInt(this.getStyle(item, attr));
		var speed = obj['speed'] != undefined ? obj['speed'] : 5; //速度，默认为5
		var rise = obj['rise']; //增长值
		var target = obj['target'];
		var mul = obj['mul'];
		var time = obj['time'] != undefined ? obj['time'] : 20;
		if(target == undefined && rise != undefined) {
			target = start + rise;
		} else if(target == undefined && rise == undefined && mul == undefined) {
			throw new Error('必须输入一个增长值或者目标值');
		}
		if(mul == undefined) {
			mul = {};
			mul[attr] = target;
		}
		clearInterval(timer);
		if(start > target) speed = -speed;
		timer = setInterval(function() {
			var tag = true;
			for(var i in mul) {
				attr = i;
				target = mul[i];
				var styleSize = parseInt(that.getStyle(item, attr));
				if(speed > 0 && (target - styleSize) <= speed) {
					item.style[attr] = target + "px";
				} else if(speed < 0 && (Math.abs(target - styleSize)) <= -speed) {
					item.style[attr] = target + "px";
				} else {
					item.style[attr] = styleSize + speed + "px";
				}
				if(styleSize != target) {
					tag = false;
				}
			}
			if(tag) clearInterval(timer);
		}, time);

	},
	nextAll: function(item) {
		var p = item.nextSibling;
		var arr = [];
		while(p) {
			if(p.nodeType == 1) {
				arr.push(p);
			}
			p = p.nextSibling;
		}
		return arr;
	},
	siblings: function(item) {
		var arr = [];
		var p = item.parentNode.children;
		for(var i = 0; i < p.length; i++) {
			if(p[i] !== item) arr.push(p[i]);
		}
		return arr;
	},
	addEvent: function(item, type, fn) {
		if(item.addEventListener) {
			item.addEventListener(type, fn, false);
		} else if(item.attachEvent) {
			item.attachEvent("on" + type, fn);
		}
	},
	removeEvent: function(obj, type, fn) //添加事件
	{
		if(obj.removeEventListener) {
			obj.removeEventListener(type, fn, false); //IE9以前的版本不支持
		} else if(obj.detachEvent) //兼容IE
		{
			obj.detachEvent("on" + type, fn);
		}
	},
	offset: function(item) {
		var xleft = item.offsetLeft;
		var xtop = item.offsetTop;
		var parent = item.offsetParent;
		while(parent) {
			xleft += parent.offsetLeft;
			xtop += parent.offsetTop;
			parent = parent.offsetParent;
		}
		return {
			left: xleft,
			top: xtop
		};
	},
	outerHeight: function(item) {
		var h = null;
		var w = null;
		h = parseInt(this.getStyle(item, 'height')) + 2 * parseInt(this.getStyle(item, 'paddingTop')) + 2 * parseInt(this.getStyle(item, 'border'));
		w = parseInt(this.getStyle(item, 'width')) + 2 * parseInt(this.getStyle(item, 'paddingLeft')) + 2 * parseInt(this.getStyle(item, 'border'));
		return {
			width: w,
			height: h
		};
	}
}

function base() {
	return new Base();
}

function Drog() {}
Drog.prototype = {
	div: document.getElementsByClassName("content_div_nr"),
	//给span定位
	dLocation: function(obj) {
		var item = obj['item']; //必填
		var jj = obj['jj'] != undefined ? obj['jj'] : 80; //横向间距.默认80
		var index = obj['index']; //必填
		var top = obj['top'] != undefined ? obj['top'] : 45; //纵向间距，默认45
		var n = 5;
		var left = jj * ((index - 1) % n);
		tag = parseInt((index - 1) / n);
		item.style.top = tag * top + "px";
		item.style.left = left + "px";
	},
	//返回定位值
	fLocation: function(obj) {
		var item = obj['item']; //必填
		var jj = obj['jj'] != undefined ? obj['jj'] : 80; //横向间距.默认80
		var index = obj['index']; //必填
		var top = obj['top'] != undefined ? obj['top'] : 45; //纵向间距，默认45
		var n = 5;
		var left = jj * ((index - 1) % n);
		tag = parseInt((index - 1) / n);
		return {
			top: tag * top,
			left: left
		}
	},
	//给每个span定位,且添加点击移动事件
	allLocation: function(i) {
		var span = this.div[i].getElementsByClassName('spanM');
		var j = 0;
		var that = this;
		while(p = span[j++]) {
			this.dLocation({
				item: p, //元素
				index: j, //位置
			});
			base().addEvent(p, 'click', function() {
				that.moveChange(this);
				that.countSize(this);
			});
			this.drop(p, document.getElementsByClassName("content")[0]);

		}
	},
	countSize: function(item) { //计算需移动的值
		var that = this;
		item.style.border = "1px solid deepskyblue";
		var parent = item.parentNode;
		var sibling = base().siblings(parent.parentNode)[0].getElementsByClassName('content_div_nr')[0];
		var f = this.fLocation({
			item: item,
			index: sibling.getElementsByClassName('spanM').length + 1,
		});
		if(parent.getAttribute('tag') == 'left') {
			var left = f.left;
			var top = f.top;
			var chaX = parseInt(base().getStyle(item.parentNode, 'width')) - parseInt(base().getStyle(item, 'left')) + left;
			var chaY = top;
			//animate传的是目标值不是增长值，所以需做下面 的步骤
			$(item).animate({ top: chaY, left: chaX + parseInt(base().getStyle(item, 'left')) }, 320, function() {
				that.dLocation({
					item: item,
					index: sibling.getElementsByClassName('spanM').length + 1
				});
				item.style.border = "1px solid #000";
				sibling.appendChild(item);
			});
		} else {
			var div = document.getElementsByClassName("content_wdgz")[0];
			var left = f.left;
			var top = f.top;
			var chaX = -(parseInt(base().getStyle(div, 'width')) - left + parseInt(base().getStyle(item, 'left')));
			var chaY = top;
			$(item).animate({ top: chaY, left: chaX  - parseInt(base().getStyle(item, 'left'))}, 320, function() {
				that.dLocation({
					item: item,
					index: sibling.getElementsByClassName('spanM').length + 1
				});
				item.style.border = "1px dashed #000";
				sibling.appendChild(item);
			});
		}
	},
	moveChange: function(item) {
		var arr = base().nextAll(item);
		for(k = 0; k < arr.length; k++) {
			if(parseInt(base().getStyle(arr[k], 'left')) == 0) {
				$(arr[k]).animate({ top: parseInt(base().getStyle(arr[k], 'top')) - 45, left: 320 }, 160);
			} else {
				base().animate(arr[k], {
					attr: 'left', //变化属性
					speed: 10, //增长速度
					rise: -80 //增长值
				});
			}
		}
	},
	drop: function(item, moveBlock) {
		var that = this;
		base().addEvent(item, 'mousedown', function(e) {
			var flag = 0;
			var e = e || window.event;
			var ileft = base().offset(item).left;
			var itop = base().offset(item).top;
			var mLeft = base().offset(moveBlock).left;
			var mTop = base().offset(moveBlock).top;
			var chaX = e.clientX - ileft;
			var chaY = e.clientY - itop;
			var ptop = base().offset(item.parentNode).top;
			function inDiv(e) {
				var div = document.getElementsByClassName('content_div_nr');
				if(e.clientX >= base().offset(div[0]).left && e.clientX < parseInt(base().getStyle(div[0], 'width')) + base().offset(div[0]).left && e.clientY >= ptop && e.clientY <= parseInt(base().getStyle(div[0], 'height')) + ptop) {
					var span = div[0].getElementsByClassName('span')[0];
					if(!span) {
						var span1 = document.createElement('span');
						span1.className = 'span';
						span1.style.height = parseInt(base().getStyle(item, 'height')) + "px";
						div[0].appendChild(span1);
						that.dLocation({
							item: span1, //元素
							index: div[0].getElementsByClassName("spanM").length + 1, //位置
						});
						var s = div[1].getElementsByClassName('span')[0];
						if(s) {
							div[1].removeChild(s);
						}
					}
				} else if(e.clientX > base().offset(div[1]).left && e.clientX < parseInt(base().getStyle(div[1], 'width')) + base().offset(div[1]).left && e.clientY >= ptop && e.clientY <= parseInt(base().getStyle(div[1], 'height')) + ptop) {
					var span = div[1].getElementsByClassName('span')[0];
					if(!span) {
						var span1 = document.createElement('span');
						span1.className = 'span';
						span1.style.height = parseInt(base().getStyle(item, 'height')) + "px";
						div[1].appendChild(span1);
						that.dLocation({
							item: span1, //元素
							index: div[1].getElementsByClassName("spanM").length + 1, //位置
						});
					}
					var s = div[0].getElementsByClassName('span')[0];
					if(s) {
						div[0].removeChild(s);
					}
				}
			}

			function move(e) {
				if(flag == 0) {
					that.moveChange(item);
					moveBlock.appendChild(item);
					item.style.left = ileft - mLeft + "px";
					item.style.top = itop - mTop + "px";
					flag++;
				}
				var e = e || window.event;
				var left = e.clientX - chaX - mLeft;
				var top = e.clientY - chaY - mTop;
				if(left < 0) {
					left = 0;
				} else if(left > base().outerHeight(moveBlock).width - base().outerHeight(item).width - parseInt(base().getStyle(moveBlock, 'borderLeft'))) {
					left = base().outerHeight(moveBlock).width - base().outerHeight(item).width - parseInt(base().getStyle(moveBlock, 'borderLeft'));
				}
				if(top < 0) {
					top = 0;
				} else if(top > base().outerHeight(moveBlock).height - base().outerHeight(item).height - parseInt(base().getStyle(moveBlock, 'borderTop'))) {
					top = base().outerHeight(moveBlock).height - base().outerHeight(item).height - parseInt(base().getStyle(moveBlock, 'borderTop'));
				}
				item.style.left = left + "px";
				item.style.top = top + "px";
				inDiv(e);
				if(typeof(item.setCapture) != "undefined") {
					item.setCapture();
				}
			}

			function yidong() {
				var div = document.getElementsByClassName('content')[0];
				var span2 =document.getElementsByClassName('span')[0];
				var pSpan = span2.parentNode;
				var mleft = base().offset(pSpan).left - base().offset(div).left + parseInt(base().getStyle(span2, 'left'));
				var mtop = base().offset(pSpan).top - base().offset(div).top + parseInt(base().getStyle(span2, 'top'));
				$(item).animate({ top: mtop, left: mleft }, 160, function() {
					
					pSpan.appendChild(item);
					item.className = 'spanM';
					that.dLocation({
						item: item,
						index:item.parentNode.getElementsByClassName('spanM').length
					});
					item.parentNode.removeChild(span2);
				});
			}

			function up(e) {
				if(flag == 1) {
					yidong();
					flag=null;
				}
				base().removeEvent(document, "mousemove", move);
				if(typeof(item.releaseCapture) != "undefined") {
					item.releaseCapture();
				}
			}
			base().addEvent(document, 'mousemove', move);
			base().addEvent(item, 'mouseup', up);
		})
	},
	init: function() {
		for(var i = 0; i < this.div.length; i++) {
			this.allLocation(i);
		}
	}
}

window.onload = function() {
	var drog = new Drog();
	drog.init();
}