var loveTime=Date.parse("May 5 2012 18:00:00 GMT+0800"); // Set your own love time
 
function timeElapse(){
    var nowTime=new Date();
  var timeMinus=(nowTime-loveTime)/1000;
	var dayMinus=Math.floor(timeMinus/(3600*24));
	var dayLeft=timeMinus%(3600*24);
	var hourMinus=Math.floor(dayLeft/3600);
	if(hourMinus<10){
		hourMinus="0"+hourMinus;
	}
	var hourLeft=dayLeft%3600;	
	var minMinus=Math.floor(hourLeft/60);
	if(minMinus<10){
		minMinus="0"+minMinus;
	}
	var secMinus=Math.floor(hourLeft%60);
	if(secMinus<10){
		secMinus="0"+secMinus;
	}
	topID=document.getElementById("top");
	//Replace these words by what you want
	var topContent="<div id=\"top-box\"><span class=\"top-content\">I have now fallen love for you for </span><span class=\"top-time\">"+dayMinus+"</span><span class=\"top-timeElapse\">Days </span><span class=\"top-time\">"+hourMinus+"</span><span class=\"top-timeElapse\">Hours</span><span class=\"top-time\"> "+minMinus+"</span><span class=\"top-timeElapse\">Minutes </span><span class=\"top-time\">"+secMinus+"</span><span class=\"top-timeElapse\">Seconds</span></div>";
	topID.innerHTML=topContent;
	
		setTimeout("timeElapse()",500);                
   
	
}

        if(document.getElementById){
                timeElapse();
        }    
