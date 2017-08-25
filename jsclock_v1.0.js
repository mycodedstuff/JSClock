var jsClock = function(div_id){
    var clock_action = [], thisObj = this, background = "transparent", clockBackground = ["black"], clockForeground = "yellow", fontColor = "black", font = "bold 50px Arial, san-serif", shadowColor = "rgba(0,0,0,0.75)", shadowBlur = 15, zeroIndicationColor = "rgb(0,200,0)", nonZeroIndicationColor = "rgb(200,0,0)", clock_exist = false, zeroIndacatorShadowColor = "black", zeroIndicatorShadowBlur = 10, resizeFactor = 1, template = "simple", templateArray = ["simple","bar","eco","cover"], refreshRate = 20, dimensions = [480,160],hr_handColor = "rgb(244,67,54)", min_handColor = "rgb(33,150,243)", sec_handColor = "rgb(255,152,0)",opacity = 1;
    var clock_canvas = document.createElement("canvas");
    var errors = function(error){
        throw new Error(error);
    }
    var initialize_var = function(templateName){
        if(templateName == "bar"){
            dimensions = [325,200];
            clockBackground = ["rgb(230, 126, 34)"];
            clockForeground = "white";
        }else if(templateName == "eco"){
            dimensions = [130,130];
            clockBackground = ["rgb(220,220,220)","rgb(168,168,168)"];
            clockForeground = "rgb(0,0,0)";
            font = "bold 18px Arial,san-serif";
            shadowBlur = 5;
            thisObj.context.setHrHandColor = function(color = "rgb(213, 1, 0)"){
                hr_handColor = color;
            }
            thisObj.context.setMinHandColor = function(color = "rgb(5, 127, 149)"){
                min_handColor = color;
            }
            thisObj.context.setSecHandColor = function(color = "rgb(243, 156, 18)"){
                sec_handColor = color;
            }
            thisObj.context.getHrHandColor = function(){
                return hr_handColor;
            }
            thisObj.context.getMinHandColor = function(){
                return min_handColor;
            }
            thisObj.context.getSecHandColor = function(){
                return sec_handColor;
            }
        }else if(templateName == "cover"){
            dimensions = [150,150];
            clockBackground = ["rgb(220,220,220)"];
            clockForeground = "rgb(0,0,0)";
            shadowBlur = 6;
            thisObj.context.setHrHandColor = function(color = "rgb(213, 1, 0)"){
                hr_handColor = color;
            }
            thisObj.context.setMinHandColor = function(color = "rgb(5, 127, 149)"){
                min_handColor = color;
            }
            thisObj.context.setSecHandColor = function(color = "rgb(243, 156, 18)"){
                sec_handColor = color;
            }
            thisObj.context.getHrHandColor = function(){
                return hr_handColor;
            }
            thisObj.context.getMinHandColor = function(){
                return min_handColor;
            }
            thisObj.context.getSecHandColor = function(){
                return sec_handColor;
            }
        }
    }
    this.clockType = "clock"; this.context = new jsCtxObject(); this.clock = new jsClockObject(); this.div_id = div_id;
    this.runClock = function(){
        if(template == "simple"){
            if(this.clockType.toLowerCase() === "clock"){
                jsSimpleClock(this.div_id,this.context,this.clock);
            }else if(this.clockType.toLowerCase() === "timer"){
                jsSimpleTimer(this.div_id,this.context,this.clock);
            }else{
                errors("JSClock doesn't recognize the clockType provided.");
            }
        }else if(template == "bar"){
            if(this.clockType.toLowerCase() === "clock"){
                jsBarClock(this.div_id,this.context,this.clock);
            }else if(this.clockType.toLowerCase() === "timer"){
                jsBarTimer(this.div_id,this.context,this.clock);
            }else{
                errors("JSClock doesn't recognize the clockType provided.");
            }
        }else if(template == "eco"){
            if(this.clockType.toLowerCase() === "clock"){
                jsEcoClock(this.div_id,this.context,this.clock);
            }else if(this.clockType.toLowerCase() === "timer"){
                jsEcoTimer(this.div_id,this.context,this.clock);
            }else{
                errors("JSClock doesn't recognize the clockType provided.");
            }
        }else if(template == "cover"){
            if(this.clockType.toLowerCase() === "clock"){
                jsCoverClock(this.div_id,this.context,this.clock);
            }else if(this.clockType.toLowerCase() === "timer"){
                jsCoverTimer(this.div_id,this.context,this.clock);
            }else{
                errors("JSClock doesn't recognize the clockType provided.");
            }
        }
    };
    
    this.stopClock = function(){
        while(clock_action.length > 0){clearInterval(clock_action.pop());}
    }
    
    this.destroyClock = function(){
        this.stopClock();
        document.getElementById(div_id).innerHTML = "";
    }
    
    this.addEventListener = function(event,functionName){
        thisObj.context.ctx.canvas.addEventListener(event,functionName);
    }
    
    this.scale = function(size){
        resizeFactor = size;
        if(clock_exist){
            clock_canvas.setAttribute("width",dimensions[0] * resizeFactor + "px");
            clock_canvas.setAttribute("height",dimensions[1] * resizeFactor + "px");
        }
        document.getElementById(div_id).style = "width: " + dimensions[0] * resizeFactor + "px; height: " + dimensions[1] * resizeFactor + "px;";
    }
    
    function jsClockObject(){
        this.hr = 0; this.min = 0; this.sec = 0;
        this.setTime = function (hr,min,sec){
            this.hr = hr < 24?hr:errors("Error: Provided hours is greater than 24.");
            this.min = min < 60?min:errors("Error: Provided minutes is greater than 60.");
            this.sec = sec < 60?sec:errors("Error: Provided seconds is greater than 60.");
        }
    }
    
    function jsCtxObject(){
        var ctx;
        this.setFont = function(fontStyle = "bold",fontSize = "50px",fontName){
            font = fontStyle+" "+fontSize+" "+fontName+", Arial, san-serif";
        }
        this.getFont = function(){
            return font;
        }
        this.setClockBackground = function(color = ["black"]){
            clockBackground = color;
        }
        this.getClockBackground = function(){
            return clockBackground;
        }
        this.setClockForeground = function(color = "yellow"){
            clockForeground = color;
        }
        this.getClockForeground = function(){
            return clockForeground;
        }
        this.setBackground = function(color = "yellow"){
            background = color;
        }
        this.getBackground = function(){
            return background;
        }
        this.setFontColor = function(color = "black"){
            fontColor = color;
        }
        this.getFontColor = function(){
            return fontColor;
        }
        this.setClockShadowColor = function(color = "rgba(0,0,0,0.75)"){
            shadowColor = color;
        }
        this.getClockShadowColor = function(){
            return shadowColor;
        }
        this.setShadowBlur = function(radius = 15){
            shadowBlur = radius;
        }
        this.getShadowBlur = function(){
            return shadowBlur;
        }
        this.getZeroIndicationColor = function(){
            return zeroIndicationColor;
        }
        this.setZeroIndicationColor = function(color = "rgb(0,200,0)"){
            zeroIndicationColor = color;
        }
        this.setNonZeroIndicationColor = function(color = "rgb(200,0,0)"){
            nonZeroIndicationColor = color;
        }
        this.getNonZeroIndicationColor = function(){
            return nonZeroIndicationColor;
        }
        this.setZeroIndicatorShadowColor = function(color = "black"){
            zeroIndacatorShadowColor = color;
        }
        this.getZeroIndicatorShadowColor = function(){
            return zeroIndacatorShadowColor;
        }
        this.getZeroIndicatorShadowBlur = function(){
            return zeroIndacatorShadowBlur;
        }
        this.setZeroIndicatorShadowBlur = function(radius = 10){
            zeroIndicatorShadowBlur = radius;
        }
        this.setOpacity = function(opacityValue = 1){
            opacity = opacityValue;
        }
    }
    
    function design_jsclock(div_id,ctx_obj,dimesions = [480,160]){
        document.getElementById(div_id).style = "width: " + dimesions[0] * resizeFactor + "px; height: " + dimesions[1] * resizeFactor + "px;";
        clock_canvas.setAttribute("width",dimesions[0] * resizeFactor + "px");
        clock_canvas.setAttribute("height",dimesions[1] * resizeFactor + "px");
        var containing_div = document.getElementById(div_id);
        containing_div.appendChild(clock_canvas);
        ctx_obj.ctx = clock_canvas.getContext("2d");
    }

    function jsSimpleClock(div_id,context,clock){
        var ctx_obj = context;
        if(!clock_exist){design_jsclock(div_id,ctx_obj); clock_exist=true;}
        var clock_obj = clock;
        ctx_obj.ctx.clearRect(0,0,ctx_obj.ctx.canvas.width,ctx_obj.ctx.canvas.height);
        animateSimpleClock(ctx_obj.ctx,clock_obj);
        clock_action.push(setInterval(function(){
            clock_obj.sec++;
            if(clock_obj.sec == 60){
                clock_obj.sec = 0;
                clock_obj.min++;
            }
            if(clock_obj.min == 60){
                clock_obj.min = 0;
                clock_obj.hr++;
            }
            if(clock_obj.hr == 24){
                clock_obj.hr = 0;
            }
            clock_action.push(setInterval(function(){
                ctx_obj.ctx.clearRect(0,0,ctx_obj.ctx.canvas.width,ctx_obj.ctx.canvas.height);
                animateSimpleClock(ctx_obj.ctx,clock_obj);
            },100));
        },1000));
    }

    function animateSimpleClock(ctx,time){
        var dataArray = [{text:time.hr, position:1, divisor: 23},{text:time.min, position:3, divisor: 59},{text:time.sec, position:5, divisor: 59}];
        ctx.save();
        ctx.scale(resizeFactor, resizeFactor);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = background;
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        dataArray.forEach(function(item,index){
            ctx.beginPath();
            ctx.shadowBlur = 10 * resizeFactor;
            ctx.shadowColor = "black";
            ctx.fillStyle = (dataArray[index].text == 0)?zeroIndicationColor:nonZeroIndicationColor;
            ctx.arc(80 * dataArray[index].position,130,10,0,Math.PI * 2,false);
            ctx.fill();
            ctx.shadowColor = "transparent";
            ctx.beginPath();
            ctx.lineWidth = 15;
            ctx.font = font;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = fontColor;
            ctx.fillText(dataArray[index].text<10?"0"+dataArray[index].text:""+dataArray[index].text,80 * dataArray[index].position,80);
            ctx.shadowOffsetY = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowBlur = shadowBlur * resizeFactor;
            ctx.shadowColor = shadowColor;
            ctx.strokeStyle = clockBackground[0];
            ctx.arc(80 * dataArray[index].position,80,60,2.35,0.78,false);
            ctx.stroke();
            ctx.strokeStyle = clockForeground;
            ctx.beginPath();
            ctx.arc(80 * dataArray[index].position,80,60,2.35,(2.35 + (4.718 * dataArray[index].text/dataArray[index].divisor)) , false);
            ctx.stroke();
        });
        ctx.restore();
    }

    function jsSimpleTimer(div_id,context,clock){
        var ctx_obj = context;
        if(!clock_exist){design_jsclock(div_id,ctx_obj); clock_exist=true;}
        var clock_obj = clock;
        ctx_obj.ctx.clearRect(0,0,ctx_obj.ctx.canvas.width/ resizeFactor,ctx_obj.ctx.canvas.height/resizeFactor);
        animateSimpleClock(ctx_obj.ctx,clock_obj);
        if(clock_obj.hr != 0 || clock_obj.min!=0 || clock_obj.sec != 0){
            clock_action.push(setInterval(function(){
                clock_obj.sec--;
                if(clock_obj.sec == -1 && clock_obj.min == 0 && clock_obj.hr == 0){
                    thisObj.stopClock();
                }else{
                    if(clock_obj.sec == -1){
                        clock_obj.sec = 59;
                        clock_obj.min--;
                    }
                    if(clock_obj.min == -1){
                        clock_obj.min = 59;
                        clock_obj.hr--;
                    }
                    if(clock_obj.min == -1){
                        clock_obj.min = 23;
                    }
                    clock_action.push(setInterval(function(){
                        ctx_obj.ctx.clearRect(0,0,ctx_obj.ctx.canvas.width/ resizeFactor,ctx_obj.ctx.canvas.height/resizeFactor);
                        animateSimpleClock(ctx_obj.ctx,clock_obj);
                    },100));
                }
            },1000));
        }else{
            console.warn("Timer won't start until timer is set to a time other than 0:0:0.");
        }
    }
    
    function animateBarClock(ctx,time){
        var dataArray = [{text:time.hr, position:0, divisor: 23},{text:time.min, position:110, divisor: 59},{text:time.sec, position:220, divisor: 59}];
        ctx.save();
        ctx.scale(resizeFactor, resizeFactor);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = background;
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        dataArray.forEach(function(item,index){
            ctx.beginPath();
            ctx.shadowColor = shadowColor;
            ctx.shadowBlur = shadowBlur;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.fillStyle = clockBackground[0];
            ctx.moveTo (20 + dataArray[index].position, 10);
            ctx.lineTo (80 + dataArray[index].position, 10);
            ctx.quadraticCurveTo (90 + dataArray[index].position, 10, 90 + dataArray[index].position, 20);
            ctx.lineTo (90 + dataArray[index].position, 160);
            ctx.quadraticCurveTo (90 + dataArray[index].position, 170, 80 + dataArray[index].position, 170);
            ctx.lineTo (20 + dataArray[index].position, 170);
            ctx.quadraticCurveTo (10 + dataArray[index].position, 170, 10 + dataArray[index].position, 160);
            ctx.lineTo (10 + dataArray[index].position, 20);
            ctx.quadraticCurveTo (10 + dataArray[index].position, 10, 20 + dataArray[index].position, 10);
            ctx.fill ();
            ctx.beginPath();
            ctx.shadowColor = "transparent";
            ctx.fillStyle = clockForeground;
            ctx.moveTo ((20 + dataArray[index].position), 170 - (160 * dataArray[index].text/(dataArray[index].divisor)));
            ctx.lineTo (80 + dataArray[index].position, 170 - (160 * dataArray[index].text/(dataArray[index].divisor)));
            if(dataArray[index].text > 5){
            ctx.quadraticCurveTo (90 + dataArray[index].position,  170 - (160 * dataArray[index].text/(dataArray[index].divisor)), 90 + dataArray[index].position,  180 - (160 * dataArray[index].text/(dataArray[index].divisor)));
            }else if(dataArray[index].text == 5){
                ctx.quadraticCurveTo (90 + dataArray[index].position,  170 - (160 * dataArray[index].text/(dataArray[index].divisor)), 90 + dataArray[index].position,  170 - (160 * dataArray[index].text/(dataArray[index].divisor)));
            }else{
                ctx.quadraticCurveTo (90 + dataArray[index].position,  170 - (160 * dataArray[index].text/(dataArray[index].divisor)), 90 + dataArray[index].position,  160 - (160 * dataArray[index].text/(dataArray[index].divisor)));
            }
            ctx.lineTo (90 + dataArray[index].position, 160);
            ctx.quadraticCurveTo (90 + dataArray[index].position, 170, 80 + dataArray[index].position, 170);
            ctx.lineTo (20 + dataArray[index].position, 170);
            ctx.quadraticCurveTo (10 + dataArray[index].position, 170, 10 + dataArray[index].position, 160);
            ctx.lineTo (10 + dataArray[index].position, 20);
            ctx.quadraticCurveTo (10 + dataArray[index].position, 10, 20 + dataArray[index].position, 10);
            ctx.fill ();
            ctx.beginPath();
            ctx.lineWidth = 15;
            ctx.font = font;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = fontColor;
            ctx.fillText(dataArray[index].text<10?"0"+dataArray[index].text:""+dataArray[index].text,52 + dataArray[index].position,85);
        });
        ctx.restore();
    }
    
    function jsBarClock(div_id,context,clock){
        if(!clock_exist){design_jsclock(div_id,context,[360,200]); clock_exist=true;}
        context.ctx.clearRect(0,0,context.ctx.canvas.width,context.ctx.canvas.height);
        animateBarClock(context.ctx,clock);
        clock_action.push(setInterval(function(){
            clock.sec++;
            if(clock.sec == 60){
                clock.sec = 0;
                clock.min++;
            }
            if(clock.min == 60){
                clock.min = 0;
                clock.hr++;
            }
            if(clock.hr == 24){
                clock.hr = 0;
            }
            clock_action.push(setInterval(function(){
                context.ctx.clearRect(0,0,context.ctx.canvas.width,context.ctx.canvas.height);
                animateBarClock(context.ctx,clock);
            },100));
        },1000));
    }
    
    function jsBarTimer(div_id,context,clock){
        var ctx_obj = context;
        if(!clock_exist){design_jsclock(div_id,ctx_obj,[325,200]); clock_exist=true;}
        var clock_obj = clock;
        ctx_obj.ctx.clearRect(0,0,ctx_obj.ctx.canvas.width,ctx_obj.ctx.canvas.height);
        animateBarClock(ctx_obj.ctx,clock_obj);
        if(clock_obj.hr != 0 || clock_obj.min!=0 || clock_obj.sec != 0){
            clock_action.push(setInterval(function(){
                clock_obj.sec--;
                if(clock_obj.sec == -1 && clock_obj.min == 0 && clock_obj.hr == 0){
                    thisObj.stopClock();
                }else{
                    if(clock_obj.sec == -1){
                        clock_obj.sec = 59;
                        clock_obj.min--;
                    }
                    if(clock_obj.min == -1){
                        clock_obj.min = 59;
                        clock_obj.hr--;
                    }
                    if(clock_obj.min == -1){
                        clock_obj.min = 23;
                    }
                    clock_action.push(setInterval(function(){
                        ctx_obj.ctx.clearRect(0,0,ctx_obj.ctx.canvas.width,ctx_obj.ctx.canvas.height);
                        animateBarClock(ctx_obj.ctx,clock_obj);
                    },100));
                }
            },1000));
        }else{
            console.warn("Timer won't start until timer is set to a time other than 0:0:0.");
        }
    }
    
    function jsEcoClock(div_id,context,clock){
        if(!clock_exist){design_jsclock(div_id,context,[130,130]); clock_exist=true;}
        context.ctx.clearRect(0,0,context.ctx.canvas.width,context.ctx.canvas.height);
        animateEcoClock(context.ctx,clock);
        clock_action.push(setInterval(function(){
            clock.sec++;
            if(clock.sec == 60){
                clock.sec = 0;
                clock.min++;
            }
            if(clock.min == 60){
                clock.min = 0;
                clock.hr++;
            }
            if(clock.hr == 24){
                clock.hr = 0;
            }
            clock_action.push(setInterval(function(){
                context.ctx.clearRect(0,0,context.ctx.canvas.width,context.ctx.canvas.height);
                animateEcoClock(context.ctx,clock);
            },100));
        },1000));
    }
    
    function jsEcoTimer(div_id,context,clock){
        var ctx_obj = context;
        if(!clock_exist){design_jsclock(div_id,ctx_obj,[130,130]); clock_exist=true;}
        var clock_obj = clock;
        ctx_obj.ctx.clearRect(0,0,ctx_obj.ctx.canvas.width,ctx_obj.ctx.canvas.height);
        animateEcoClock(ctx_obj.ctx,clock_obj);
        if(clock_obj.hr != 0 || clock_obj.min!=0 || clock_obj.sec != 0){
            clock_action.push(setInterval(function(){
                clock_obj.sec--;
                if(clock_obj.sec == -1 && clock_obj.min == 0 && clock_obj.hr == 0){
                    thisObj.stopClock();
                }else{
                    if(clock_obj.sec == -1){
                        clock_obj.sec = 59;
                        clock_obj.min--;
                    }
                    if(clock_obj.min == -1){
                        clock_obj.min = 59;
                        clock_obj.hr--;
                    }
                    if(clock_obj.min == -1){
                        clock_obj.min = 23;
                    }
                    clock_action.push(setInterval(function(){
                        ctx_obj.ctx.clearRect(0,0,ctx_obj.ctx.canvas.width,ctx_obj.ctx.canvas.height);
                        animateEcoClock(ctx_obj.ctx,clock_obj);
                    },100));
                }
            },1000));
        }else{
            console.warn("Timer won't start until timer is set to a time other than 0:0:0.");
        }
    }
    
    function animateEcoClock(ctx,time){
        var dataArray = [{text:time.hr, position:1, divisor: 23},{text:time.min, position:3, divisor: 59},{text:time.sec, position:5, divisor: 59}];
        ctx.save();
        ctx.scale(resizeFactor, resizeFactor);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = background;
        ctx.beginPath();
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 20;
        var grd = ctx.createRadialGradient(65,65,55,65,65,27.5);
        if(clockBackground.length == 1){
            grd.addColorStop(0,clockBackground[0]);
            grd.addColorStop(1,clockBackground[0]);
        }else if(clockBackground.length >=2){
            grd.addColorStop(0,clockBackground[0]);
            grd.addColorStop(1,clockBackground[1]);
        }
        ctx.strokeStyle = grd;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowColor = shadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.arc(65,65,50,0 , Math.PI * 2, false);
        ctx.stroke();
        ctx.shadowColor = "transparent";
        ctx.lineWidth = 9;
        ctx.strokeStyle = clockForeground;
        ctx.arc(65,65,50,0, Math.PI * 2, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(65,65,40,0,Math.PI *2,false);
        var shadowgrd = ctx.createRadialGradient(65,65,40,65,65,30);
        ctx.font = font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = fontColor;
        ctx.fillText((time.hr<10?"0"+time.hr:time.hr) + ":"+ (time.min<10?"0"+time.min:time.min) + ":" + (time.sec<10?"0"+time.sec:time.sec),65,65);
        ctx.strokeStyle = hr_handColor;
        ctx.beginPath();
        ctx.arc(65,65,50,-(Math.PI/2 - 0.12) + ((Math.PI * 2) * (time.hr/12)), -(Math.PI/2 + 0.12) + ((Math.PI * 2) * (time.hr/12)),true);
        ctx.stroke();
        ctx.strokeStyle = min_handColor;
        ctx.beginPath();
        ctx.arc(65,65,50,-(Math.PI/2 - 0.12) + ((Math.PI * 2) * (time.min/60)), -(Math.PI/2 + 0.12) + ((Math.PI * 2) * (time.min/60)),true);
        ctx.stroke();
        ctx.strokeStyle = sec_handColor;
        ctx.beginPath();
        ctx.arc(65,65,50,-(Math.PI/2 - 0.12) + ((Math.PI * 2) * (time.sec/60)), -(Math.PI/2 + 0.12) + ((Math.PI * 2) * (time.sec/60)),true);
        ctx.stroke();
        ctx.restore();
    }
    
    function jsCoverClock(div_id,context,clock){
        if(!clock_exist){design_jsclock(div_id,context,[150,150]); clock_exist=true;}
        context.ctx.clearRect(0,0,context.ctx.canvas.width,context.ctx.canvas.height);
        animateCoverClock(context.ctx,clock);
        clock_action.push(setInterval(function(){
            clock.sec++;
            if(clock.sec == 60){
                clock.sec = 0;
                clock.min++;
            }
            if(clock.min == 60){
                clock.min = 0;
                clock.hr++;
            }
            if(clock.hr == 24){
                clock.hr = 0;
            }
            clock_action.push(setInterval(function(){
                context.ctx.clearRect(0,0,context.ctx.canvas.width,context.ctx.canvas.height);
                animateCoverClock(context.ctx,clock);
            },100));
        },1000));
    }
    
    function animateCoverClock(ctx,time){
        var dataArray = [{text:time.hr, position:1, divisor: 23},{text:time.min, position:3, divisor: 59},{text:time.sec, position:5, divisor: 59}];
        ctx.save();
        ctx.scale(resizeFactor, resizeFactor);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = background;
        ctx.beginPath();
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.arc(75,75,70,0,Math.PI * 2 , false);
        ctx.fillStyle = clockForeground;
        ctx.fill();
        ctx.beginPath();
        ctx.beginPath();
        ctx.strokeStyle = sec_handColor;
        ctx.lineWidth = 20;
        ctx.arc(75,75,60,-(Math.PI/2 + 0.2) + (Math.PI * 2 * (time.sec/60)),-(Math.PI/2 - 0.2) + (Math.PI * 2 * (time.sec/60)),false);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = min_handColor;
        ctx.arc(75,75,40,-(Math.PI/2 + 0.2) + (Math.PI * 2 * (time.min/60)),-(Math.PI/2 - 0.2) + (Math.PI * 2 * (time.min/60)),false);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = hr_handColor;
        ctx.arc(75,75,20,-(Math.PI/2 + 0.2) + (Math.PI * 2 * (time.hr/12)),-(Math.PI/2 - 0.2) + (Math.PI * 2 * (time.hr/12)),false);
        ctx.stroke();
        ctx.beginPath();
        ctx.shadowBlur = shadowBlur;
        ctx.shadowColor = shadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.lineWidth = 2;
        ctx.strokeStyle = clockBackground[0];
        ctx.arc(75,75,70,0,Math.PI * 2,false);
        ctx.stroke();
        ctx.restore();
    }
            
    this.template = function(templateName){
        if(!clock_exist){
            if(templateArray.indexOf(templateName.toLowerCase()) != -1){
                template = templateName;
                initialize_var(templateName);
            }else{
                console.warn("JSClock doen't recognize the clock template provided.");
            }
        }else{
            console.warn("Can't change template once clock is created.");
        }
    }
}