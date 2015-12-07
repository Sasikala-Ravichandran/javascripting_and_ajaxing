window.onload = initAll;
var xhr = false;
var dataArray = new Array();
var url = "students.xml";

function initAll(){

  //setting up the event listener on the html element with callback function
    var allDivs = document.getElementsByTagName("div");
    console.log(allDivs);
    for(var i=0; i<allDivs.length; i++){
      console.log("on click");
      allDivs.onclick = oneDiv;
    }
//create Ajax obeject
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
  //sending Ajax request
    if(xhr){
      xhr.onreadystatechange = setDataArray;
      xhr.open("GET", url, true);
      xhr.send(null);
    }else{
      alert("Sorry, but I couldn't create a XMLHttpRequest")
    }
    
    
}

// handle xml response --- get data from xml file and assigning to js object
function setDataArray(){
  console.log("setDataArray");
  if(xhr.readyState === 4){
    if(xhr.status === 200){
        if(xhr.responseXML){
          console.log("came in");
          var allData = xhr.responseXML.getElementsByTagName("student");
           
           for(var i=0; i<allData.length; i++){
               var tempObj = new Object;
               tempObj.firstName = getVal(allData[i],"firstName");
               tempObj.lastName = getVal(allData[i],"lastName");
               tempObj.seat = getVal(allData[i],"seat"); 
               tempObj.lunchPeriod = getVal(allData[i],"lunchPeriod");
               tempObj.readingGroup = getVal(allData[i],"readingGroup");

               dataArray[i] = tempObj;
           }
   
        }
      }else{
       alert("There was a problem with the request " + xhr.status); 
    }
  }

  function getVal(theData, theTag){
    return theData.getElementsByTagName(theTag)[0].firstChild.nodeValue; 
  }
  console.log("end setDataArray");
}

//Dynamic behaviour when the event happens 
function oneDiv(evt){
  console.log("start featureOneDiv");
    var allDivs = document.getElementsByTagName("div");
    for(var i=0; i<allDivs.length; i++){
       allDivs[i].className = "";
    }
 
    var thisDiv = (evt) ? evt.target : window.event.srcElement;
    thisDiv.className = "pickedDiv";
    var thisStudent = null;
  
    for(var i=0; i<dataArray.length; i++){
        if(thisDiv.id === dataArray[i].seat){
          thisStudent = dataArray[i];
        }
    }
    if(thisStudent){
        var studentInfo = document.getElementById("detail");
        var thisMsg = "<span id='closeBox'>X</span><h3>";
        thisMsg += thisStudent.firstName + " " + thisStudent.lastName;
        thisMsg += "</h3>Seat: " + thisStudent.seat;
        thhisMsg += "<br />lunchPeriod: " + thisStudent.lunchPeriod;
        thisMsg  += "<br />readingGroup: "+ thisStudent.readingGroup;

        studentInfo.innerHTML = thisMsg;
        studentInfo.style.top = (thisDiv.offsetTop - 5) + "px";
        studentInfo.style.left = (thisDiv.offsetLeft - 35) + "px";
        studentInfo.style.visibility = "visible";

        document.getElementById("closeBox").onclick = function(){
          document.getElementById("detail").style.visibility = "hidden";
        }
      }
    }






