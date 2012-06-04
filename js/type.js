var getID=document.getElementById("love"); 
var text=getID.innerHTML;
var speed=80; //Set each character interval time
var jj=-1;var kk=0; var wds=0;
function typeOut(){
  ++jj;
	if (kk == 0 && text.charAt(jj) == "<") {
	    kk = 1;
	    wds = 0;
	}
	else if (kk == 1 && text.charAt(jj) == ">") {
	    kk = 0;
	    wds = 0;
	}
	else if (kk == 1) {
	    wds = 0;
	}
	if (kk == 0 && text.charAt(jj) != ">" && jj <= text.length) {
	    wds = 1;
        getID.innerHTML = text.substr(0, jj);
    }
    if (wds >0 && jj <= text.length) {
  
        setTimeout("typeOut()", speed);
    }
    else if (jj <= text.length) {
        typeOut();
    }
}



    if (document.getElementById) {

        getID.style.visibility="visible";   
        typeOut();
        var removeBox=document.getElementById("box");
        speedTime=(text.length)*80; // The total time the typeWriter take
        setTimeout("removeBox.parentNode.removeChild(removeBox)",(speedTime-4000)); //4000--the time the text taking which not involved the element consumed 
       
    }          