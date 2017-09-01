function Byc(){//百叶窗效果
	this.iNow=0;
	this.flag=true;
}
Byc.prototype={
    tochange:function(div){//让变化有层次感
    	var that=this;
    	var timer=setInterval(function(){
           if(that.iNow==div.length)
   	  	   {
   	  	   	clearInterval(timer);
   	  	   	that.flag=!that.flag;
   	  	   	that.iNow=0;
   	  	   }else{
   	  	   	    if(that.flag)
   	  	        {
   	  	    	    div.eq(that.iNow).animate({
                	top:0});
   	  	        }else{
                    div.eq(that.iNow).animate({
            	     top:-30});
                }
                that.iNow++;
            }
    	},100)
    },
    init:function(obj){//控制整体变化
    	var that=this;
    	  setInterval(function(){
            that.tochange(obj);
         },4000);
    }
}
$(function(){
   var byc=new Byc();
   var div=$('#byc div');
   byc.init(div);
   var byc1=new Byc();
   var div=$('#byc1 div');
   setTimeout(function(){byc1.init(div)},2000);
})