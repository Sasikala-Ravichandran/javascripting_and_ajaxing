window.onload = initAll;
var xhr = false;
var xPos, yPos;

//Capture the events

function initAll(){
	var allLinks = document.getElementsByTagName("a");
	for(var i=0; i<allLinks.length; i++){
		allLinks[i].onmouseover = showPreview;
	}
}

//create Ajax request
function showPreview(ev){
	console.log("event " + ev)
	if(ev){
		var url = ev.target;
		console.log("if");
	}else {
		ev = window.event;
		var url = ev.srcElement;
		console.log("else");
	}
	xPos = ev.clientX;
	yPos = ev.clientY;

	if(window.XMLHttpRequest){
      xhr = new XMLHttpRequest();
	}else{
       if(window.ActiveXObject){
          try{
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
          }
          catch(e) { }
       }
	}

	if(xhr){
       xhr.onreadystatechange  =showContent;
       xhr.open("GET",url, true);
       xhr.send(null);
	} else {
      alert("Sorry, but I couldn't create XMLHttpRequest");
	}
}

//Use Ajax response to display the content dynamically

function showContent(){
   if(xhr.readyState === 4){
   	  if(xhr.status === 200){
        var outMsg = xhr.responseText;
   	  }
   	  else{
   	  	var outMsg = "There was a problem with the request " + xhr.status;
   	  }

   	  var preview = document.getElementById("preview");
   	  preview.innerHTML = outMsg;
   	  preview.style.top = parseInt(yPos) + 2 +"px";
   	  preview.style.left = parseInt(xPos) + 2 + "px";
   	  preview.style.visibility = "visible";

   	  preview.onmouseout = function(){
   	  	document.getElementById("preview").style.visibility = "hidden";
   	  } 
   }
}




