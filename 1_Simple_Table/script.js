window.onload = newCard;
var usedNums = new Array(76);
function newCard(){
  if(document.getElementById){
    for(var i=0; i<24; i++){
      setSquare(i);
    }
  } else {
    alert("Sorry, your browser doesn't support the script");
  }
}

function setSquare(thisSquare){
  var currSquare = "square" + thisSquare;
  var colPlace = new Array(0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4);
  var colBasis = colPlace[thisSquare] *15;
  var newNum;
  console.log("colBasis " + colBasis);
  do{
    newNum = colBasis + getNewNum() + 1;
    console.log("thisSquare " + thisSquare);
    console.log("newNum " + newNum);
    console.log("usedNums " + usedNums[newNum]);
  }while(usedNums[newNum])
  usedNums[newNum] = true;
  document.getElementById(currSquare).innerHTML = newNum;
}

function getNewNum(){
  return Math.floor(Math.random() * 15);
}