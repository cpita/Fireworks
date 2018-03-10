function getMousePos(ev) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height/rect.height;
    mousePos.x = (ev.clientX - rect.left) * scaleX;
    mousePos.y = (ev.clientY - rect.top) * scaleY;
}

document.onkeydown = function (e) {
    if(mode == "PARTICLE"){
        if(e.keyCode == 38){
            changeColorUp = true;
        }
    }else if(mode == "MANUAL"){
        var posX = mousePos.x;
        var posY = mousePos.y;
        var colorR = Math.round(Math.random()*255);
        var colorG = Math.round(Math.random()*255);
        var colorB = Math.round(Math.random()*255);
        if(e.keyCode == 87){
            fireworkBasics.push(new FireworkBasic(posX,posY,colorR,colorG,colorB));
            if(record_state == "rec"){
                recording.push({time:recordTic,type:"FireworkBasic",x:posX,y:posY,colorR:colorR,colorG:colorG,colorB:colorB});
            }
        }else if(e.keyCode == 65){
            fireworkBasics.push(new Palmera(posX,posY,colorR,colorG,colorB));
            if(record_state == "rec"){
                recording.push({time:recordTic,type:"Palmera",x:posX,y:posY,colorR:colorR,colorG:colorG,colorB:colorB});
            }
        }else if(e.keyCode == 83){
            fireworkBasics.push(new BigFirework(posX,posY,colorR,colorG,colorB));
            if(record_state == "rec"){
                recording.push({time:recordTic,type:"BigFirework",x:posX,y:posY,colorR:colorR,colorG:colorG,colorB:colorB});
            }
        }else if(e.keyCode == 68){
            fireworkBasics.push(new Tochamen(posX,posY,colorR,colorG,colorB));
            if(record_state == "rec"){
                recording.push({time:recordTic,type:"Tochamen",x:posX,y:posY,colorR:colorR,colorG:colorG,colorB:colorB});
            }
        }else if(e.keyCode == 32){
            fireworkBasics.push(new Nebula(posX,posY,colorR,colorG,colorB));
            if(record_state == "rec"){
                recording.push({time:recordTic,type:"Nebula",x:posX,y:posY,colorR:colorR,colorG:colorG,colorB:colorB});
            }
        }
    }
};

document.onkeyup = function (e) {
    if(e.keyCode == 38){
        changeColorUp = false;
    }
};

spectacle_play.onclick = function () {
        spectacle_state = "play";
        updateGUI();
        mainLoop = window.setInterval(loop,1000/FPS);

};

spectacle_pause.onclick = function () {
        spectacle_state = "pause";
        updateGUI();
        clearInterval(mainLoop);
};

record_start.onclick = function () {
    record_state = "rec";
    recording = [];
    recordTic = 0;
    updateGUI();
};

record_stop.onclick = function () {
    record_state = "norec";
    updateGUI();
    saveRec();
};

document.getElementById("select").onchange = function () {
    if(document.getElementById("select").selectedIndex == 0) {
        currentSpectacle = "RANDOM";
        spectacleTarget = 60;
    }
    else currentSpectacle = localStorage.key(document.getElementById("select").selectedIndex-1);
    recording = JSON.parse(localStorage.getItem(currentSpectacle));
    videoTic = 0;
};

document.getElementById("delete").onclick = function () {
    if(confirm("Quieres borrar la secuencia " + localStorage.key(document.getElementById("select").selectedIndex-1) + "?")){
        localStorage.removeItem(localStorage.key(document.getElementById("select").selectedIndex-1));
        document.getElementById("select").removeChild(opciones[document.getElementById("select").selectedIndex-1]);
        opciones.splice(document.getElementById("select").selectedIndex-1,1);
        currentSpectacle = "RANDOM";
    }
};

canvas.addEventListener("mousemove",getMousePos);

init();