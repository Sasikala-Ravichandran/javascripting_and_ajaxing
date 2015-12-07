window.onload = initAll;
var xhr = false;
var textRequest;
function initAll(){
  document.getElementById("requestText").onclick = function(){
     textRequest = true;
     makeRequest();
     return false;
   }
   document.getElementById("requestXml").onclick = function(){
       textRequest = false;
       makeRequest();
       return false;
  }

}

function makeRequest(){
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
     //xhr.onreadystatechange = showState;
     xhr.onreadystatechange  =showContentTextOrXml;
     //xhr.onreadystatechange  =showContent;
     xhr.open("GET","colors.xml", true);
     xhr.send(null);
   } else {
      document.getElementById("updateArea").innerHTML = "Sorry, but I couldn't create XMLHttpRequest";
   }
}

function showState(){
	var currMsg = document.getElementById("updateArea").innerHTML;
	document.getElementById("updateArea").innerHTML = currMsg +
	 "<p> The current state is " + xhr.readyState +" and the statue is " + xhr.status + "</p>";
}

function showContent(){
	if(xhr.readyState === 4){
		if(xhr.status === 200){
            var outMsg = xhr.responseText;
		}else {
            var outMsg = "There is a problem witht the request "+ xhr.status;
		}
		document.getElementById("updateArea").innerHTML = outMsg;
	}
}

function showContentTextOrXml(){
	if(xhr.readyState === 4){
		if(xhr.status === 200){
            var outMsg = (textRequest) ? xhr.responseText : xhr.responseXML;
		}else {
            var outMsg = "There is a problem witht the request "+ xhr.status;
		}
		document.getElementById("updateArea").innerHTML = outMsg;
	}
}
