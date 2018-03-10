var FireworkBasic = function (x,y,colorR,colorG,colorB) {
    this.x = x;
    this.y = y;
    this.radius = BASIC_FIREWORK_RADIUS;
    this.colorR = colorR;
    this.colorG = colorG;
    this.colorB = colorB;
    this.finished = false;
    this.type  = "FireworkBasic";

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
            dX:(Math.random()*2-1)*3,
            dY:(Math.random()*2-1)*3
        };
    }

    this.update = function () {
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
            this.finished = true;
        }
    }
};