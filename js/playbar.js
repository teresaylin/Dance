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
    var barpos = $("#bubblebar").offset();
    console.log(currentTime)
    var leftMargin = width * currentTime / duration;
    console.log(leftMargin)
    console.log(document.getElementById('player'))
    $("#bubblebar").append("<div class='bubble' id='bubble" +formationNumber.toString()+"' formnumber='"+formationNumber.toString()+"' time='"+currentTime+"' style='position : absolute ; top:" +(barpos.top + 5)+ "px; left: "+(barpos.left + leftMargin)+ "px' onclick = 'onBubbleClick(this)'></div>");

    console.log(barpos)
    console.log($("#bubble" + formationNumber.toString()))

    $('#bubble' + previous.toString()).css({'background-color':'black'});
    $('#bubble' + formationNumber.toString()).css({'background-color':'white'});
    previous = formationNumber
}

function onBubbleClick(bubble){
    var formationID = bubble.getAttribute("formnumber");
    var time = bubble.getAttribute("time");

    console.log(time);
    console.log(document.getElementById('player').currentTime);
    document.getElementById('player').currentTime = time;
    $('#bubble' + formationID.toString()).css({'background-color':'white'});
    $('#bubble' + previous.toString()).css({'background-color':'black'});
    // selected_formation = "#formation" + formationID.toString();
    // console.log("showing " + selected_formation.toString())
    // $(selected_formation).show();
    previous = formationID
    //TODO add how to change slides when a bubble is clicked (I only handled the playbar)
}



function onTimelineClick(event){
    var p = clickPercent(event)
    document.getElementById('player').currentTime = p*document.getElementById('player').duration;
    console.log(p);
}


function clickPercent(event) {
    return (event.clientX - document.getElementById('audioplayerbar').getBoundingClientRect().left) / width;
}
