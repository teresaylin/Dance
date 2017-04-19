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
    var percent = 700 * (document.getElementById('player').currentTime / document.getElementById('player').duration);
    document.getElementById('playmarker').style.marginLeft = percent + "px";
}

function addBubble(currentTime, formationNumber){
    var leftMargin = 700 * currentTime / document.getElementById('player').duration+ "px";
    $("#bubblebar").append("<div id='bubble' formnumber='" +formationNumber+"' time='"+currentTime+"' style='margin-left:" +leftMargin +"' onclick = 'onBubbleClick(this)'></div>");
}

function onBubbleClick(bubble){
    var formationID = bubble.getAttribute("formnumber");
    var time = bubble.getAttribute("time");

    console.log(time);
    console.log(document.getElementById('player').currentTime);
    document.getElementById('player').currentTime = time;
    //TODO add how to change slides when a bubble is clicked (I only handled the playbar)
}
