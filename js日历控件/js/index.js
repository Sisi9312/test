function Dates(){
	
}
Dates.prototype.init=function(ele){
	var that=this;

   this.addEvent(ele,'click',function(e){
   		var div=document.getElementsByClassName('calendar')[0];
   	    if(!div)
   	    {
	   that.createDiv(ele);
         var div1=document.getElementsByClassName('calendar')[0];
         that.addEvent(div1,'click',function(e){
         	window.event?window.event.cancelBubble = true : e.stopPropagation();
         })
       }
       window.event?window.event.cancelBubble = true : e.stopPropagation();
	});
	this.addEvent(document,'click',function(){
		var div=document.getElementsByClassName('calendar')[0];
			if(div)
			{
	        var body=document.getElementsByTagName('body')[0];
	         body.removeChild(div);	
	        }
	});
	
}
Dates.prototype.createDiv=function(ele)
{
	var that=this;
	var div = document.createElement('div');
	var h6 = document.createElement('h6');
	var prev = document.createElement('b');
	var span = document.createElement('span');
	var next = document.createElement('b');
	div.className = "calendar";
	prev.className = 'prev';
	next.className = 'next';
	span.className = "span";
	div.appendChild(h6);
	h6.appendChild(prev);
	h6.appendChild(span);
	h6.appendChild(next);
	var ul = document.createElement('ul');
	div.appendChild(ul);
	for(var i = 0; i < 7; i++) {
		var li = document.createElement('li');
		li.innerHTML = this.getWeek(i);
		ul.appendChild(li);
	}
	var ul = document.createElement('ul');
	ul.className = "dateUl";
	var newDate = new Date();
	var nMonth = newDate.getMonth();

	this.addEvent(prev, 'click', function() {
        var nMonth = newDate.getMonth();
		newDate.setMonth(--nMonth);
		that.active({
			ul: ul,
			span: span,
			ndate:newDate,
			e:ele
		});	
	});
	this.addEvent(next, 'click', function() {
		var nMonth = newDate.getMonth();
		newDate.setMonth(++nMonth);
		that.active({
			ul: ul,
			span: span,
			ndate:newDate,
			e:ele
		});
	});
	this.active({
		ul: ul,
		span: span,
		ndate:newDate,
		e:ele
	});
	div.style.left=this.offsetLeft(ele)+"px";
	div.style.top=this.offsetTop(ele)+"px";
	div.appendChild(ul);
	document.getElementsByTagName('body')[0].appendChild(div);
}
Dates.prototype.active=function(obj) //重置日历
{
	obj.ul.innerHTML = '';
   var year=obj.ndate.getFullYear();
   var month=obj.ndate.getMonth();
	obj.span.innerHTML = year + "年" + (month + 1) + "月";
	var activeDate = new Date(year, month, 1);
	var firstLi = 1 - activeDate.getDay(); //目的是为了算出第一个li的日期
	activeDate.setDate(firstLi); //自动算出第一个li是几号，并重置actvieDate的年月日
	var d = new Date();
	for(var i = 0; i < 35; i++) {
		var date = activeDate.getDate(); //得到日期
		var m = activeDate.getMonth() + 1;
		var li = document.createElement('li');
		if(m != (month + 1)) {
			li.style.color = "#ccc";
		}
		li.innerHTML = date;
		if(date == d.getDate() && activeDate.getMonth() == d.getMonth() && activeDate.getFullYear() == d.getFullYear()) {
			li.className = "active";
		}
		li.rili=activeDate.getFullYear()+"-"+(activeDate.getMonth()+1)+"-"+date;
		this.addEvent(li,'click',function()
		{
			obj.e.value=this.rili;		
				var div=document.getElementsByClassName('calendar')[0];
	var body=document.getElementsByTagName('body')[0];
	body.removeChild(div);
		})
		activeDate.setDate(date + 1);
		obj.ul.appendChild(li);
	}
}
Dates.prototype.getWeek=function(day) //得到星期几
{
	var week = "";
	switch(day) {
		case 0:
			week = "日";
			break;
		case 1:
			week = "一";
			break;
		case 2:
			week = "二";
			break;
		case 3:
			week = "三";
			break;
		case 4:
			week = "四";
			break;
		case 5:
			week = "五";
			break;
		case 6:
			week = "六";
			break;
	}
	return week;
}
Dates.prototype.offsetLeft=function(ele)//元素到页面的左边位置
{
	var left=ele.offsetLeft;
	var parent=ele.offsetParent;
	while(parent)
	{
		left+=parent.offsetLeft;
		parent=parent.offsetParent;
	}
	return left;
}
Dates.prototype.offsetTop=function(ele)//元素到页面的顶点位置
{
    var top=ele.offsetTop;
	var parent=ele.offsetParent;
	var i=0;
	while(parent)
	{
	top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return top;
}
Dates.prototype.addEvent=function(obj, type, fn){
	if(obj.addEventListener) {
		obj.addEventListener(type, fn, false);
	} else if(obj.attachEvent) //兼容IE
	{
		obj.attachEvent("on" + type, fn);
	}
}
window.onload = function() {
	var input=document.getElementsByTagName("input")[0];
	var date=new Dates();
	date.init(input);	
}