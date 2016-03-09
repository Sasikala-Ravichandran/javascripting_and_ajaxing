window.onload = initAll;
var xhr = false;
var fruits = new Array();
function initAll(){
  document.getElementById("searchField").onkeyup = searchSuggest;
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  } else {
    if(window.ActiveXObject){
      try{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e) { }
    }
  }
  if(xhr){
    xhr.onreadystatechange  =setFruitsArray;
    xhr.open("GET","fruits.xml", true);
    xhr.send(null);
  } else {
    alert("Sorry, but I couldn't create XMLHttpRequest");
  }
}

function setFruitsArray(){
  if(xhr.readyState === 4){
    if(xhr.status === 200){
      if(xhr.responseXML){
        var allFruits = xhr.responseXML.getElementsByTagName("fruit");
        console.log(allFruits[1].getElementsByTagName("label")[0].firstChild);
        for(var i=0; i<allFruits.length; i++){
          fruits[i] = allFruits[i].getElementsByTagName("label")[0].firstChild;
        }
        console.log(fruits[1]);
      }
    } else {
      alert("There was a problem with the request " + xhr.status);
    }
  }
}

function searchSuggest(){
  var str = document.getElementById("searchField").value;
  document.getElementById("searchField").className = "";
  if(str !=""){
    document.getElementById("popups").innerHTML = "";
    for(var i=0; i<fruits.length-1 ; i++){
      var thisFruit = fruits[i].nodeValue;
      if(thisFruit.toLowerCase().indexOf(str.toLowerCase()) === 0){
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = thisFruit;
        tempDiv.onclick = makeChoice;
        tempDiv.className = "suggestions";
        document.getElementById("popups").appendChild(tempDiv);
      }
    }
    var foundCt= document.getElementById("popups").childNodes.length;
    if(foundCt === 0){
      document.getElementById("searchField").className = "error";
    }
    if(foundCt === 1){
      document.getElementById("searchField").value = 
      document.getElementById("popups").firstChild.innerHTML;
      document.getElementById("popups").innerHTML = "";
    }
  }
}	

function makeChoice(evt){
  var thisDiv = (evt) ? evt.target :window.event.srcElement;
  document.getElementById("searchField").value = thisDiv.innerHTML;
  document.getElementById("popups").innerHTML = "";
}