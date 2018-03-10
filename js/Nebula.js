var Nebula = function (x,y,colorR,colorG,colorB) {
    this.x = x;
    this.y = y;
    this.radius = BASIC_FIREWORK_RADIUS;
    this.colorR = colorR;
    this.colorG = colorG;
    this.colorB = colorB;
    this.finished = false;
    this.phase = "first";
    this.type = "Nebula";

    var fireworks = [];
    for(var i = 0;i < BASIC_FIREWORK_SIZE;i++){
        fireworks[i] = {
            x:this.x,
            y:this.y,
            radius:this.radius,
            colorR:this.colorR,
            colorG:this.colorG,
            colorB:this.colorB,
            colorA:1,
            dX:(Math.random()*2-1)*1.5,
            dY:(Math.random()*2-1)*1.5,
            grey:Math.round(Math.random()*127+128),
            ticCounter:0,
            timeToAppear:Math.random()*100+30,
            finished:false
        };
    }

    this.update = function () {
        if(this.phase == "first"){
            for(var i = 0;i < BASIC_FIREWORK_SIZE;i++){
                fireworks[i].x += fireworks[i].dX;
                fireworks[i].y += fireworks[i].dY;
                fireworks[i].colorA -= .01;
                ctx.fillStyle = "rgba("+fireworks[i].colorR+","+fireworks[i].colorG+","+fireworks[i].colorB+","+fireworks[i].colorA+")";
                ctx.beginPath();
                ctx.arc(fireworks[i].x,fireworks[i].y,fireworks[i].radius,0,2*Math.PI);
                ctx.closePath();
                ctx.fill();
            }
            if(fireworks[0].colorA <= 0){
                this.phase = "second";
            }
        }else if(this.phase == "second"){
            var finish = 0;
            for(var j = 0;j < BASIC_FIREWORK_SIZE;j++){
                if(!fireworks[j].finished){
                    finish++;
                    fireworks[j].ticCounter++;
                    if(fireworks[j].ticCounter >= fireworks[j].timeToAppear){
                        ctx.fillStyle = "rgb("+fireworks[j].grey+","+fireworks[j].grey+","+fireworks[j].grey+")";
                        ctx.beginPath();
                        ctx.arc(fireworks[j].x,fireworks[j].y,fireworks[j].radius,0,2*Math.PI);
                        ctx.closePath();
                        ctx.fill();
                    }
                    if(fireworks[j].ticCounter >= fireworks[j].timeToAppear+10){
                        fireworks[j].finished = true;
                    }
                }
            }
            if(finish == 0)this.finished = true;
        }
    }
};