var BigFirework = function (x,y,colorR,colorG,colorB) {
    this.x = x;
    this.y = y;
    this.radius = BIG_FIREWORK_RADIUS;
    this.colorR = colorR;
    this.colorG = colorG;
    this.colorB = colorB;
    this.phase = "first";
    this.finished = false;
    this.type = "BigFirework";

    this.bigFireworks = [];
    for(var i = 0;i < BIG_FIREWORK_SIZE;i++){
        this.bigFireworks[i] = {
            x:this.x,
            y:this.y,
            radius:this.radius,
            colorR:this.colorR,
            colorG:this.colorG,
            colorB:this.colorB,
            colorA:1,
            dX:(Math.random()*2-1)*2,
            dY:(Math.random()*2-1)*2
        };
    }

    this.update = function () {
        if(this.phase == "first"){
            for(var i = 0;i < BIG_FIREWORK_SIZE;i++){
                this.bigFireworks[i].x += this.bigFireworks[i].dX;
                this.bigFireworks[i].y += this.bigFireworks[i].dY;
                this.bigFireworks[i].colorA -= .01;
                ctx.fillStyle = "rgba("+this.bigFireworks[i].colorR+","+this.bigFireworks[i].colorG+","+this.bigFireworks[i].colorB+","+this.bigFireworks[i].colorA+")";
                ctx.beginPath();
                ctx.arc(this.bigFireworks[i].x,this.bigFireworks[i].y,this.bigFireworks[i].radius,0,2*Math.PI);
                ctx.closePath();
                ctx.fill();
            }
            if(this.bigFireworks[0].colorA <= 0){
                this.phase = "second";
            }
        }else if(this.phase == "second"){
            for(var i = 0;i < BIG_FIREWORK_SIZE;i++){
                var x = this.bigFireworks[i].x;
                var y = this.bigFireworks[i].y;
                var cr = this.bigFireworks[i].colorR;
                var cg = this.bigFireworks[i].colorG;
                var cb = this.bigFireworks[i].colorB;
                this.bigFireworks[i] = new FireworkBasic(x,y,cr,cg,cb);
            }
            this.phase = "third";
        }else if(this.phase == "third"){
            for(var i = 0;i < BIG_FIREWORK_SIZE;i++){
               this.bigFireworks[i].update();
            }
            this.finished = this.bigFireworks[0].finished;
        }
    }
};












