var Palmera = function (x,y,colorR,colorG,colorB) {
    this.x = x;
    this.y = y;
    this.radius = BASIC_FIREWORK_RADIUS;
    this.colorR = colorR;
    this.colorG = colorG;
    this.colorB = colorB;
    this.finished = false;
    this.type = "Palmera";

    var fireworks = [];
    for(var i = 0;i < BASIC_FIREWORK_SIZE;i++){
        fireworks[i] = {
            x:0,
            y:0,
            radius:this.radius,
            colorR:this.colorR,
            colorG:this.colorG,
            colorB:this.colorB,
            colorA:1,
            initX:this.x,
            initY:this.y,
            f:[Math.random()/5000+0.002,Math.random()*0.4+0.8],//0.01,2 || 0.009-0.011,1-3 0.002
            dX:(Math.random() > .5)?(Math.random()*2+0.5):(Math.random()*(-2)-0.5)
        };
    }

    this.update = function () {
        for(var i = 0;i < BASIC_FIREWORK_SIZE;i++){
            fireworks[i].x += fireworks[i].dX;
            fireworks[i].y = parabola(fireworks[i].f,fireworks[i].x, fireworks[i].dX > 0);
            fireworks[i].colorA -= .006;
            ctx.fillStyle = "rgba("+fireworks[i].colorR+","+fireworks[i].colorG+","+fireworks[i].colorB+","+fireworks[i].colorA+")";
            ctx.beginPath();
            ctx.arc(fireworks[i].x + fireworks[i].initX,fireworks[i].y+fireworks[i].initY,fireworks[i].radius,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();
        }
        if(fireworks[0].colorA <= 0){
            this.finished = true;
        }
    };

    function parabola(f,x,isPositive) {
        if(isPositive) return x * x * f[0] - x * f[1];
        else return x * x * f[0] + x * f[1];
    }

};