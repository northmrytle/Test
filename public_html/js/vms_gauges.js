/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gauges = [];

 function createGauge(
        parentElement, 
        gaugeName, 
        dataPath, 
        factor, 
        min, 
        max, 
        height, 
        width){
    this.parent = document.getElementById(parentElement);
    this.frame = document.createElement('div');
    this.face = document.createElement('div');
    
    this.frame.setAttribute('id', gaugeName + 'Gauge');
    this.frame.className = 'gaugeFrame';
    this.parent.appendChild(frame);
               
    this.face.setAttribute('id', gaugeName + 'Face');
    this.face.setAttribute('class','gaugeFace');
    this.frame.appendChild(face);
    
    this.gauge = Raphael( gaugeName + 'Face', width, height);
    this.face = this.gauge.image("img/gauge_face.png", 1, 1, height, width );
    
    for (i = 3; i <= 9; i++) {
        var a = Number(45 * Math.PI /180) * i;
        //x = cx + r * cos(a)
        //y = cy + r * sin(a)
        var r = width /4;
        
        x = width/2 + r * Math.cos(a);
        y = height/2 + 3 + r * Math.sin(a);

        var tickValue = ((max - min)/6) * (i - 3);
        var tick = gauge.text(x,y, tickValue);
        var fontSize = width /10;
        tick.attr("stroke", "red");
        tick.attr("fill", "red");
        tick.attr("font-size", fontSize);
        }; 

    this.title = this.gauge.text(width/2 ,height/2 + r * 1.25, gaugeName);
    this.title.attr("stroke", "red");
    this.title.attr("fill", "red");
    this.title.attr("font-size",fontSize - 5);

//    this.circle =  this.gauge.circle(height/2, width/2, 83);
//    this.circle.toFront();
//    this.circle.attr("stroke", "black");
//    this.circle.attr("stroke-width", 6);
  
    this.needle = this.gauge.image("img/gauge_pointer.png", 1, 1, height, width);
    
    this.dataPath = dataPath;
    this.factor = factor;
    this.value = 0;
    this.minValue = min;
    this.maxValue = max;
  
    this.setValue = function (newValue){
        var increment = 270 / max - min;
        this.needle.animate({transform: "r" + newValue * increment}, 1000, "<>");
        this.value = newValue;
    };

    gauges[gaugeName] = this; 
 };

function updateGauges() {
    Object.keys(gauges).forEach(function(key) {
        var g = gauges[key];
        $.get(g.dataPath, function(data){
            data = Number(data) * Number(g.factor);
            data = data.toFixed(2);
            g.setValue(data);
        });                                
    });
 };
