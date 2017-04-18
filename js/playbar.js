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
