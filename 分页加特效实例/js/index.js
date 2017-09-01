window.onload=function(){
  var json={
    title:[
      '效果1',
      '效果2',
      '效果3',
      '效果4',
      '效果5',
      '效果6',
      '效果7',
      '效果8',
      '效果9',
      '效果10',
      '效果11',
      '效果12',
      '效果13',
      '效果14',
      '效果15',
      '效果16',   
       '效果17',
      '效果18',
      '效果19',
      '效果20',
      '效果21',
      '效果22',
      '效果23',
      '效果24',
       '效果25',
      '效果26',   
       '效果27',
      '效果28',
      '效果29',
      '效果30',
      '效果31',
      '效果32',
      '效果33',
      '效果34',
       '效果35',
      '效果36',   
       '效果37',
      '效果38',
      '效果39',
      '效果40',
      '效果41',
      '效果42',
    ]
  };
  var arr=[];
          var iNow=3;
	page({
		id:'div1', //容器
		nowNum:1 ,  //当前页
        allNum:Math.ceil(json.title.length/4) ,  //总共多少页
        callBack:function(now,all){// 回调函数
 
         var num=now*4<json.title.length?4:(json.title.length%4);
         var oUl=document.getElementsByClassName('clearfix')[0];
         var oLi=oUl.getElementsByTagName('li');
          if(oUl.innerHTML==""){
            for(var i=0;i<num;i++)
            {
              var oli=document.createElement('li');
              oli.innerHTML=json.title[(now-1)*4+i];
              oUl.appendChild(oli);
            }
            for(var i=0;i<oLi.length;i++)
            {
              arr.push([oLi[i].offsetLeft,oLi[i].offsetTop]);
            }
             for(var i=0;i<oLi.length;i++)
            {
               oLi[i].style.position = 'absolute';
               oLi[i].style.left=arr[i][0]+'px';
               oLi[i].style.top=arr[i][1]+'px';
               oLi[i].style.margin = '0';
            }
          }
          else {
            var timer=setInterval(function(){
            $(oLi[iNow]).animate({
              left: 300,
              top: 400,
              opacity :0
            });
            if(iNow==0)
            {
              clearInterval(timer);
                for(var i=0;i<num;i++)
               {
                 oLi[i].innerHTML=json.title[(now-1)*4+i];
               }
                 iNow=num-1;
              var timer2=setInterval(function(){
            $(oLi[iNow]).animate({
              left: arr[iNow][0],
              top: arr[iNow][1],
              opacity :100
            });
            if(iNow==0)
            {
              clearInterval(timer2);
              iNow=num-1;
            }
            else{
              iNow--;
            }
           },100);
            }
            else{
              iNow--;
            }
            },100);
          }
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