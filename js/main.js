var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var mode = "SPECTACLE";
var record_state = "norec";
var recordTic = 0;
var videoTic = 0;
var currentSpectacle = "RANDOM";
var opciones = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var changeColorUp = false;
var spectacleCount = 0;
var spectacleTarget = 60;
var colorChangeRate = 5;

var mainLoop;
var fireworkBasics;
var mousePos = {
    x:0,
    y:0
};

var basicFireworkColor = {
    r:255,
    g:0,
    b:0
};


function init() {
    mainLoop = window.setInterval(loop,1000/FPS);
    fireworkBasics = [];
    updateGUI();
    for(var i = 0;i < localStorage.length;i++){
        var nuevaOpcion = document.createElement("OPTION");
        nuevaOpcion.label = localStorage.key(i);
        opciones.push(nuevaOpcion);
        document.getElementById("select").appendChild(nuevaOpcion);
    }
}

function loop() {
    clearCanvas();
    updateGUI();
    drawElements();
    changeColor();
    if(mode == "PARTICLE"){
        genBasicFirework();
    }else if(mode == "CONTINUOUS_SPECTACLE"){
        genSpectacleFirework(.99);
    }else if(mode == "SPECTACLE"){
        if(currentSpectacle == "RANDOM"){
            genSpectacle();
        }else {
            playRecording();
        }
    }else if(mode == "MANUAL" && record_state == "rec"){
        record();
    }
}

function playRecording() {
    for(var i = 0;i < recording.length;i++){
        if(recording[i].time == videoTic){
            if(recording[i].type == "FireworkBasic"){
                fireworkBasics.push(new FireworkBasic(recording[i].x,recording[i].y,recording[i].colorR,recording[i].colorG,recording[i].colorB));
            }else if(recording[i].type == "BigFirework"){
                fireworkBasics.push(new BigFirework(recording[i].x,recording[i].y,recording[i].colorR,recording[i].colorG,recording[i].colorB));
            }else if(recording[i].type == "Palmera"){
                fireworkBasics.push(new Palmera(recording[i].x,recording[i].y,recording[i].colorR,recording[i].colorG,recording[i].colorB));
            }else if(recording[i].type == "Tochamen"){
                fireworkBasics.push(new Tochamen(recording[i].x,recording[i].y,recording[i].colorR,recording[i].colorG,recording[i].colorB));
            }else if(recording[i].type == "Nebula"){
                fireworkBasics.push(new Nebula(recording[i].x,recording[i].y,recording[i].colorR,recording[i].colorG,recording[i].colorB));
            }

        }
    }
    videoTic++;
}

function record() {
    recordTic++;
}

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function genBasicFirework(){
    fireworkBasics.push(new FireworkBasic(mousePos.x,mousePos.y,basicFireworkColor.r,basicFireworkColor.g,basicFireworkColor.b));
}

function genSpectacleFirework(prob) {
    var x = Math.round(Math.random()*canvas.width);
    var y = Math.round(Math.random()*canvas.height);
    var colorR = Math.round(Math.random()*255);
    var colorG = Math.round(Math.random()*255);
    var colorB = Math.round(Math.random()*255);
    var chance = Math.random();

    if(chance > 0.99){
        fireworkBasics.push(new Tochamen(x,y,colorR,colorG,colorB));
    }else if(chance > 0.95){
        fireworkBasics.push(new BigFirework(x,y,colorR,colorG,colorB));
    }else if(chance > 0.9){
        fireworkBasics.push(new Nebula(x,y,colorR,colorG,colorB));
    }else if(chance > 0.8){
        fireworkBasics.push(new Palmera(x,y,colorR,colorG,colorB));
    }else if(chance > 0.7){
        fireworkBasics.push(new FireworkBasic(x,y,colorR,colorG,colorB));
    }

}

function genSpectacle() {
    spectacleCount++;
    if(spectacleCount == spectacleTarget){
        if(spectacleTarget > 3){
            spectacleTarget--;
        }
        spectacleCount = 0;
        genSpectacleFirework(.90);
    }
}

function drawElements() {
    for(var i = 0;i < fireworkBasics.length;i++){
        if(fireworkBasics[i].finished){
            fireworkBasics.splice(i,1);
            continue;
        }
        fireworkBasics[i].update();
    }
}

function changeColor() {
    if(changeColorUp){
        if(basicFireworkColor.r > basicFireworkColor.g && basicFireworkColor.r > basicFireworkColor.b && basicFireworkColor.g >= basicFireworkColor.b){
            basicFireworkColor.g += colorChangeRate;
        }else if(basicFireworkColor.r > basicFireworkColor.b && basicFireworkColor.g >= basicFireworkColor.r){
            basicFireworkColor.r -= colorChangeRate;
        }else if(basicFireworkColor.b < basicFireworkColor.g && basicFireworkColor.b >= basicFireworkColor.r ){
            basicFireworkColor.b += colorChangeRate;
        }else if(basicFireworkColor.b >= basicFireworkColor.g && basicFireworkColor.g > basicFireworkColor.r){
            basicFireworkColor.g -= colorChangeRate;
        }else if(basicFireworkColor.r >= basicFireworkColor.g && basicFireworkColor.r < basicFireworkColor.b){
            basicFireworkColor.r += colorChangeRate;
        }else if(basicFireworkColor.b > basicFireworkColor.g && basicFireworkColor.b <= basicFireworkColor.r){
            basicFireworkColor.b -= colorChangeRate;
        }
    }
}

function saveRec() {
    if(recording.length == 0)return;
    if(confirm("Quieres guardar esta secuencia?")){
        var nombre = prompt("Elige un nombre para tu secuencia");
        var nuevaOpcion = document.createElement("OPTION");
        nuevaOpcion.label = nombre;
        opciones.push(nuevaOpcion);
        document.getElementById("select").appendChild(nuevaOpcion);
        localStorage.setItem(nombre,JSON.stringify(recording));
    }
}