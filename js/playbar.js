var width = 920;
var duration = 215.596563; //this is kinda rip

var previous = 0;

function play_playbar() {
    var playerthing = document.getElementById('player');
    if (playerthing.paused == true) {
        console.log("hi")
        playerthing.play();
        document.getElementById('play').className = "pause";
    } else {
        playerthing.pause();
        document.getElementById('play').className = "play";
    }
}

function time() {
    var percent = width * (document.getElementById('player').currentTime / document.getElementById('player').duration);
    document.getElementById('playmarker').style.marginLeft = percent + "px";
}

function addBubble(currentTime, formationNumber){
    // var barpos = $("#bubblebar").offset();
    console.log(currentTime)
    var leftMargin = width * currentTime / duration;
    console.log(leftMargin)
    console.log(document.getElementById('player'))
    $("#bubblebar").append("<div class='bubble' id='bubble" +formationNumber.toString()+"' formnumber='"+formationNumber.toString()+"' time='"+currentTime+"' style='position : absolute ; top: 0 px; left: " + leftMargin + "px' onclick = 'onBubbleClick(this)' onmouseover='onBubbleMouseOver(this)' onmouseout='onBubbleMouseOut(this)'></div>");

    // console.log(barpos)
    console.log($("#bubble" + formationNumber.toString()))

    $('#bubble' + previous.toString()).css({'background-color':'black'});
    $('#bubble' + formationNumber.toString()).css({'background-color':'rgb(168, 45, 61)'});
    previous = formationNumber
}

function onBubbleClick(bubble){
    var formationID = bubble.getAttribute("formnumber");

    select_slide(formationID)
}




function onTimelineClick(event){
    var p = clickPercent(event)
    document.getElementById('player').currentTime = p*document.getElementById('player').duration;
    console.log(p);
}


function clickPercent(event) {
    return (event.clientX - document.getElementById('audioplayerbar').getBoundingClientRect().left) / width;
}


function onBubbleMouseOver(evt) {
  var formationID = bubble.getAttribute("formnumber");
  console.log("mousein")
  console.log(evt)
  evt.style.height = "12px"
  evt.style.width = "12px"
  //on_formation_highlight(formationID)
}

function onBubbleMouseOut(evt){
    var formationID = bubble.getAttribute("formnumber");
    evt.style.height = "10px"
    evt.style.width = "10px"
    console.log("mouseout")
    //on_formation_highlight(formationID)
}
