function Dylb(obj) {
	this.oBox = obj.box; //容器
	this.oImgList = obj.imglist; //图片外层div
	this.aImg = obj.img; //得到图片集合
	this.iPadding = obj.padding; //图片间距，固定值
	this.iLeft = -obj.padding; //记录图片间距的动态值
	this.width = obj.width; //图片宽度
	this.height = obj.height; //图片高度
	this.left = null; //记录中间图片距离左边的距离，为了整体居中
	this.iStarindex = null; //记录中间图片位置
}

Dylb.prototype = {
	/*写入样式 */
	setCss: function(item, obj) {
		var style = item.style;
		for(var i in obj) {
			style[i] = obj[i];
		}
	},
	/*切换图片，index表示中间图片的位置，left表示中间图片的left值*/
	tab: function(index, left) {
		var iLeft = left ? (left - this.padding) : this.iLeft;
		for(var i = 0; i < this.aImg.length; i++) {
			this.setCss(this.aImg[i], { transition: '0.5s all ease' })
			iLeft += this.iPadding;
			if(i < index) {
				this.setCss(this.aImg[i], { left: iLeft + 'px', '-webkit-transform': 'rotateY(45deg) translateZ(-100px)' });
			} else if(i > index) {
				this.setCss(this.aImg[i], { left: iLeft + 'px', '-webkit-transform': 'rotateY(-45deg) translateZ(-100px)' });
			} else {
				iLeft += this.iPadding;
				this.left = iLeft;
				this.iStarindex = i;
				this.setCss(this.aImg[i], { left: iLeft + 'px', '-webkit-transform': 'translateZ(200px)' });
				iLeft += this.iPadding;
			}
		}
		this.setCss(this.oImgList, { 'margin-left': -this.width / 2 - this.left + 'px' });
	},
	/*图片初始化*/
	imgInit: function() {
		var that = this;
		for(var i = 0; i < this.aImg.length; i++) {
			this.setCss(this.aImg[i], { width: this.width + 'px', height: this.height + 'px' });
			this.aImg[i].index = i;
			this.aImg[i].addEventListener('click', function() {
				var iLeft = (this.index - that.iStarindex) * that.iPadding;
				that.tab(this.index);
				console.log(this.index);
			})
		}
		this.setCss(this.oImgList, { height: this.height + 'px', top: '50%', 'margin-top': -this.height / 2 + 'px', 'bottom': '0', left: '50%', 'transform-style': 'preserve-3d' });
	},
	/*倒影轮播初始化*/
	init: function() {
		this.imgInit();
		this.tab(Math.floor(this.aImg.length / 2));
	}
}
window.onload = function() {
	var obj = {
		box: document.getElementById('content'),
		imglist: document.getElementById('imgList'),
		img: document.getElementById('imgList').getElementsByTagName('img'),
		padding: 100,
		width: 300,
		height: 200
	}
	var dylb = new Dylb(obj);
	dylb.init();
}