
    //向量               
    function Vector(x, y) {
            this.x = x;
            this.y = y;
    }

    Vector.prototype = {
            //向量 旋转
            rotate: function (theta) {
                    var x = this.x;
                    var y = this.y;
                    this.x = Math.cos(theta) * x - Math.sin(theta) * y;
                    this.y = Math.sin(theta) * x + Math.cos(theta) * y;
                    return this;
            },
            //向量 缩放
            mult: function (f) {
                    this.x *= f;
                    this.y *= f;
                    return this;
            },
            //向量 复制
            clone: function () {
                    return new Vector(this.x, this.y);
            },
            //向量 长度
            length: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            //向量 相减
            subtract: function (v) {
                    this.x -= v.x;
                    this.y -= v.y;
                    return this;
            },
            //向量 设置
            set: function (x, y) {
                    this.x = x;
                    this.y = y;
                    return this;
            }
    };
                   
    //花瓣
    function Petal(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
            this.stretchA = stretchA;
            this.stretchB = stretchB;
            this.startAngle = startAngle;
            this.angle = angle;
            this.bloom = bloom;
            this.growFactor = growFactor;
            this.r = 1;
            this.isfinished = false;
    }

    Petal.prototype = {
            draw: function () {
                    var ctx = this.bloom.garden.ctx;
                    var v1, v2, v3, v4;
                    v1 = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle));
                    v2 = v1.clone().rotate(Garden.degrad(this.angle));
                    v3 = v1.clone().mult(this.stretchA); //.rotate(this.tanAngleA);
                    v4 = v2.clone().mult(this.stretchB); //.rotate(this.tanAngleB);
                    ctx.strokeStyle = this.bloom.c;
                    ctx.beginPath();
                    ctx.moveTo(v1.x, v1.y);
                    ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
                    ctx.stroke();
            },
            render: function () {
                    if (this.r <= this.bloom.r) {
                            this.r += this.growFactor; // / 10;
                            this.draw();
                    } else {
                            this.isfinished = true;
                    }
            }
    };
                   
    //花
    function Bloom(p, r, c, pc, garden) {
            this.p = p;
            this.r = r;
            this.c = c;
            this.pc = pc;
            this.petals = [];
            this.garden = garden;
            this.init();
            this.garden.addBloom(this);
    }
                   
    Bloom.prototype = {
            draw: function () {
                    var p, isfinished = true;
                    this.garden.ctx.save();
                    this.garden.ctx.translate(this.p.x, this.p.y);
                    for (var i = 0; i < this.petals.length; i++) {
                            p = this.petals[i];
                            p.render();
                            isfinished *= p.isfinished;
                    }
                    this.garden.ctx.restore();
                    if (isfinished == true) {
                            this.garden.removeBloom(this);
                    }
            },
            init: function () {
                    var angle = 360 / this.pc;
                    var startAngle = Garden.randomInt(0, 90);
                    for (var i = 0; i < this.pc; i++) {
                            this.petals.push(new Petal(Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max), Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max), startAngle + i * angle, angle, Garden.random(Garden.options.growFactor.min, Garden.options.growFactor.max), this));
                    }
            }
    };
                   
    //场景
    function Garden(ctx, element) {
            this.blooms = [];
            this.element = element;
            this.ctx = ctx;
    }

  Garden.prototype = {
        render: function () {
                for (var i = 0; i < this.blooms.length; i++) {
                        this.blooms[i].draw();       
                }
        },
        addBloom: function (b) {
                this.blooms.push(b);
        },
        removeBloom: function (b) {
                var bloom;
                for (var i = 0; i < this.blooms.length; i++) {
                        bloom = this.blooms[i];
                        if (bloom === b) {
                                this.blooms.splice(i, 1);
                                return this;
                        }
                }
        },
        createRandomBloom: function (x, y) {
                this.createBloom(x, y, Garden.randomInt(Garden.options.bloomRadius.min, Garden.options.bloomRadius.max), Garden.randomrgba(Garden.options.color.rmin,Garden.options.color.rmax,Garden.options.color.gmin,Garden.options.color.gmax,Garden.options.color.bmin,Garden.options.color.bmax,Garden.options.color.opacity), Garden.randomInt(Garden.options.petalCount.min, Garden.options.petalCount.max));
        },
        createBloom: function (x, y, r, c, pc) {//半径，颜色，数量
                new Bloom(new Vector(x, y), r, c, pc, this);
        },
        clear: function () {
                this.blooms = [];
                this.ctx.clearRect(0, 0, this.element.width, this.element.height);
        }
};

Garden.options = {
        petalCount: {
                min: 8,
                max: 15
        },
        petalStretch: {
                min: 0.1,
                max: 3
        },
        growFactor: {
                min: 0.1,
                max: 1
        },
        bloomRadius: {
                min: 8,
                max: 10
        },
        density: 10,
        growSpeed: 1000 / 60,
        color: {
                rmin:128,rmax:255,gmin:0,gmax:128,bmin:0,bmax:128,opacity:0.1
        },
        tanAngle: 60
};
                   
    Garden.random = function (min, max) {
    return Math.random() * (max - min) + min;
    };
    Garden.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    };               
    Garden.circle = 2 * Math.PI;       
    Garden.degrad = function (angle) {return Garden.circle / 360 * angle;};
    Garden.raddeg = function (angle) {return angle / Garden.circle * 360;};
    Garden.rgba = function (r, g, b, a) {return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';};
    Garden.randomrgba=function(i,n,h,m,l,d,k){
        var c=Math.round(Garden.random(i,n));
        var f=Math.round(Garden.random(h,m));
        var j=Math.round(Garden.random(l,d));
        var e=5;
        if(Math.abs(c-f)<=e&&Math.abs(f-j)<=e&&Math.abs(j-c)<=e){
                return Garden.rgba(i,n,h,m,l,d,k)
        }
        else{
                return Garden.rgba(c,f,j,k)
        }
};

    //心的点
    function getHeartPoint(deg){
            var rad=deg/Math.PI;
            var offsetX=19.5*(16*Math.pow(Math.sin(rad),3));
            var offsetY=-20*(13*Math.cos(rad)-5*Math.cos(2*rad)-2*Math.cos(3*rad)-Math.cos(4*rad));
            return new Array(490+offsetX,300+offsetY)
    }

    //显示信息
  
    var gardenCav = document.getElementById("myCanvas");
    var gardenCxt = gardenCav.getContext("2d");
    gardenCxt.globalCompositeOperation = "lighter";
    var garden = new Garden(gardenCxt, gardenCav);

    setInterval(function () {garden.render();}, Garden.options.growSpeed);

    function startHeartAnimation(){
            var count=50;
            var deg=10;
            var points=new Array();
            var loop=setInterval(function(){
                    var bloomPoint=getHeartPoint(deg);
                    var e=true;
                    for(var f=0;f<points.length;f++){
                            var point=points[f];
                            var j=Math.sqrt(Math.pow(point[0]-bloomPoint[0],2)+Math.pow(point[1]-bloomPoint[1],2));
                            if(j<Garden.options.bloomRadius.max*1.3){
                                    e=false;break;       
                            }
                    }
            if(e){
                    points.push(bloomPoint);
                    garden.createRandomBloom(bloomPoint[0],bloomPoint[1]);
            }
            if(deg>=30){
                    clearInterval(loop);
                    showMessages();
            }
            else{
                    deg+=0.2;
            }},count);
    }            
    

    setTimeout("startHeartAnimation()",(speedTime-3500));
    var browserInfos=navigator.userAgent;
    var isFirefox=document.getElementById && browserInfos.match(/Firefox/);
    var isChrome=document.getElementById && browserInfos.match(/Chrome/);
    if(isFirefox){
  	function loveWords(){	                                    
		    
                    $("#loveU").fadeIn(5000,function(){loveForever()});                   
            
		}
        function loveForever(){
                         $("#loveUForever").fadeIn(5000);
        }
              
         setTimeout("loveWords()",(speedTime+15000));		
	
	}

    else if(isChrome){
		function loveWords(){	                                    
		    
                    $("#loveU").fadeIn(5000,function(){loveForever()});                   
            
		}
        function loveForever(){
                         $("#loveUForever").fadeIn(5000);
        }
              
         setTimeout("loveWords()",(speedTime+1000));		
	
	}