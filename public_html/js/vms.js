/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var displayMode = 'day';  

 $(document).ready(function(){
    renderHelm();
    $("body").on("swipeleft",function(){
        displaySettings();
    });
    $("body").on("swiperight",function(){
        if (IsVisible == 1) {
            hideSettings();
        } else { 
        toggleDisplayMode();
        };
    });
});
 
 window.onresize = function() {
    resize();
};


$.mobile.loading().hide();


function renderHelm() {
    createDisplay('Fuel Flow','Gallons Per Hour', 'http://helm.vms.net/flow/flowCount0',0.4755096);     //.0005 * .264172 * 3600
    //createDisplay('Speed', 'Miles per Hour', '');
    //createDisplay('Distance', 'Miles')
    createDisplay('Total Fuel', 'Gallons','http://helm.vms.net/flow/flowCount1',0.000132086);           //.0005 * .264172
//    createGauge('main', 'Fuel Flow', 'http://helm.vms.net/flow/flowCount0',0.4755096,0,30,170,170);
//    createWarning('Flow Limit', 10 * 0.000132086 , 'http://helm.vms.net/flow/flowCount0');               
//    createWarning('Engine Temp', 120, 'http://helm.vms.net/flow/flowCount0');
//    createWarning('Water Temp', 120, 'http://helm.vms.net/flow/flowCount0');
//    createWarning('Depth', 120, 'http://helm.vms.net/flow/flowCount0');
//    createGraph('main', 'Fuel Flow', 'http://helm.vms.net/flow/flowCount0.log',0.4755096,0,30,50,250);
//    createGraph('main', 'fuelFlow');

    updateValues();
//    setInterval('updateValues()', 1000);
    resize();
    ajaxSetup();
//    getSystemName();
    
    try {
        setDisplayMode(localStorage.displayMode);
    } catch(err) {
        setDisplayMode(displayMode);
    }
    
 };


function updateValues(){
    updateDisplays();
//    updateGauges();
//    updateWarningValues();
//    updateGraphs();
 };


function setDisplayMode(newMode){

    displayMode = newMode;
    document.getElementById('vms_body').className = displayMode;  
    
    try {
        localStorage.displayMode = displayMode;
    } catch(err) {}
  
};


function toggleDisplayMode(){
    
    if (displayMode === 'day') {          
        setDisplayMode('night');
    } else {
        setDisplayMode('day');
    }
    
    try {
        localStorage.displayMode = displayMode;
    } catch(err) {}
    
};


function displayLightBox() {
    var body = document.getElementById('vms_body');
    var fade = document.createElement('div');
    var light = document.createElement('div');
    var close = document.createElement('div');
    
    fade.setAttribute('id','fade');
    fade.className = 'fade';
    body.appendChild(fade);
    
    light.setAttribute('id','light');
    light.className = 'light';
//    light.innerHTML='<object type="text/html" data="settings.html" ></object>';
    
    close.setAttribute('id','close');
    close.className = 'close';
    close.setAttribute('onclick','closeLightBox();');
    light.appendChild(close);
    body.appendChild(light);

    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
};


function closeLightBox(){
    var light = document.getElementById('light');
    var fade = document.getElementById('fade');
    var close = document.getElementById('close');
    
    light.parentNode.removeChild(light);
    fade.parentNode.removeChild(fade);
    close.parentNode.removeChild(close);    
};


function ajaxSetup(){
   $.ajaxSetup({'beforeSend': function(xhr){
        if (xhr.overrideMimeType)
            xhr.overrideMimeType("text/plain");
        }
    });
};


function resize(){
    var height = document.body.clientHeight;
    var width = document.body.clientWidth;
    
    Object.keys(displays).forEach(function(key){
        var newWidth = ((width-6)/2)-10 + 'px';
        var element = key + 'DisplayFrame'
        document.getElementById(element).style.width = newWidth;
    });    
    
    Object.keys(gauges).forEach(function(key){
        var g = gauges[key];
        var newWidth = ((width-0)/1)-16 + 'px';
        var element = key + 'Gauge';
        document.getElementById(element).style.width = newWidth;
//             console.log('resizing gauge ' + key + ' to ' + newWidth);
        });    

    Object.keys(warnings).forEach(function(key){
        var newWidth = Number(((width-6)/3)-11).toFixed(0) + 'px';
        var element = key + 'WarningFrame';
        document.getElementById(element).style.width = newWidth;
    });   
    
    Object.keys(graphs).forEach(function(key){
        var g = graphs[key];
        var newWidth = ((width-0)/1)-16 + 'px';
        var element = key + 'Graph';
        document.getElementById(element).style.width = newWidth; 
//        console.log('resizing graph ' + key + ' to ' + newWidth);
        });  
};
    
function removeElementById(element){
    var e = document.getElementById(element);
    e.parentNode.removeChild(e);
};

function isNumeric(n) { 
      return !isNaN(parseFloat(n)) && isFinite(n); 
};

