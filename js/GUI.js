var spectacle_play = document.getElementById("play");
var spectacle_pause = document.getElementById("pause");
var record_start = document.getElementById("start");
var record_stop = document.getElementById("stop");
var spectacle_state = "play";

var grey = 150;
var sube = true;
var recording = [];

function updateGUI() {
    document.getElementById("SPECTACLE").style.textDecoration = "none";
    document.getElementById("CONTINUOUS_SPECTACLE").style.textDecoration = "none";
    document.getElementById("PARTICLE").style.textDecoration = "none";
    document.getElementById("MANUAL").style.textDecoration = "none";
    if(mode == "SPECTACLE"){
        document.getElementById("SPECTACLE").style.textDecoration = "underline";
    }else if(mode == "CONTINUOUS_SPECTACLE"){
        document.getElementById("CONTINUOUS_SPECTACLE").style.textDecoration = "underline";
    }else if(mode == "PARTICLE"){
        document.getElementById("PARTICLE").style.textDecoration = "underline";
    }else if(mode == "MANUAL"){
        document.getElementById("MANUAL").style.textDecoration = "underline";
    }

    if(mode == "MANUAL"){
        spectacle_play.style.display = "none";
        spectacle_pause.style.display = "none";
        if(record_state == "norec"){
            record_start.style.display = "block";
            record_stop.style.display = "none";
        }else{
            record_start.style.display = "none";
            record_stop.style.display = "block";
        }
    }else {
        record_start.style.display = "none";
        record_stop.style.display = "none";
        if(spectacle_state == "play"){
            spectacle_play.style.display = "none";
            spectacle_pause.style.display = "block";
        }else{
            spectacle_play.style.display = "block";
            spectacle_pause.style.display = "none";
        }
    }

    if(record_state == "norec"){
        document.getElementById("barra").style.backgroundColor = "rgb(150,150,150)";
        document.title = "fireworks.io";
        grey = 150;
    }else{
        if(sube){
            grey++;
            if(grey >= 200)sube = false;
        }else{
            grey--;
            if(grey <= 120)sube = true;
        }
        document.getElementById("barra").style.backgroundColor = "rgb("+grey+","+grey+","+grey+")";
        document.title = "Grabando..."
    }

    if(mode == "SPECTACLE"){
        document.getElementById("select").style.display = "block";
        if(document.getElementById("select").selectedIndex != 0){
            document.getElementById("delete").style.display = "block";
        }else document.getElementById("delete").style.display = "none";
    }else {
        document.getElementById("select").style.display = "none";
        document.getElementById("delete").style.display = "none";
    }

}



































