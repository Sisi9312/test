window.onload=function(){
	page({
		id:'div1', //容器
		nowNum:10 ,  //当前页
        allNum:10 ,  //总共多少页
        callBack:function(now,all){
          alert('当前页'+now+',总共页'+all);
        }
	})
}
function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}
	else
	{
		obj.attachEvent('on'+type+fn);
	}
}
function page(obj){
	if(!obj.id){return false;};
	var div=document.getElementById(obj.id);
	var nowNum=obj.nowNum?obj.nowNum:1;
	var allNum=obj.allNum?obj.allNum:5;
	var callBack=obj.callBack?obj.callBack:function(){};
	if(nowNum>=4&&allNum>=6)
	{
		var oA=document.createElement('a');
		oA.href="#1";
		oA.innerHTML="首页";
		div.appendChild(oA);
	}
	if(nowNum>=2)
    {
    	var oA=document.createElement('a');
		oA.href="#"+(nowNum-1);
		oA.innerHTML="上一页";
		div.appendChild(oA);
    }
	if(allNum<=5)
	{  
		for(var i=1;i<=allNum;i++)
		{
    		var oA=document.createElement('a');
    		oA.href="#"+i;
    		nowNum==i? oA.innerHTML=i: oA.innerHTML="["+i+"]";  
    		div.appendChild(oA);
		}
	}
	else
	{ 
        for(var i=1;i<=5;i++)
        {
           var oA=document.createElement('a');

           if((nowNum==1||nowNum==2))
           {
              oA.href="#"+i;
              nowNum==i?oA.innerHTML=i:oA.innerHTML="["+i+"]";
           } 
           else if((allNum-nowNum)==0||(allNum-nowNum)==1)
           {
             oA.href="#"+(allNum-5+i);
             if((allNum-nowNum)==0&&i==5){
             	oA.innerHTML=allNum;
             }
             else if((allNum-nowNum)==1&&i==4){
                oA.innerHTML=(allNum-5+i);
             }
             else
             {
             	oA.innerHTML="["+(allNum-5+i)+"]";
             }
           }
           else
           {
           oA.href="#"+(nowNum-3+i);
           i==3?oA.innerHTML=nowNum:oA.innerHTML="["+(nowNum-3+i)+"]";
           }  
           div.appendChild(oA);
        }
	}
	if((allNum-nowNum)>=1)
    {
    	var oA=document.createElement('a');
		oA.href="#"+(nowNum+1);
		oA.innerHTML="下一页";
		div.appendChild(oA);
    }
    if((allNum-nowNum)>=3&&allNum>=6){
    	var oA=document.createElement('a');
		oA.href="#"+allNum;
		oA.innerHTML="尾页";
		div.appendChild(oA);
    }
    callBack(nowNum,allNum);
    var a=div.getElementsByTagName('a');
    for(var i=0;i<a.length;i++){
    	addEvent(a[i],'click',function(){
    	var nowNum=parseInt(this.getAttribute('href').substring(1));
    	div.innerHTML='';
    	page({
    	  id:obj.id,
          nowNum:nowNum,
          allNum:allNum,
          callBack:callBack
    	});	
    	});
    }
}