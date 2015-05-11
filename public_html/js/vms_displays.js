/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var displays = [];


function createDisplay (displayName, displayUnits, dataPath, factor){
    var main = document.getElementById('main');
    var frame = document.createElement('div');
    var title = document.createElement('div');
    var value = document.createElement('div');
    var units = document.createElement('div');
    
    frame.setAttribute('id', displayName + 'DisplayFrame');
    frame.className = 'displayFrame';
    main.appendChild(frame);
    
    title.setAttribute('id', displayName + 'DisplayTitle');
    title.className = 'displayTitle';
    title.innerHTML = displayName;
    frame.appendChild(title);
        
    value.setAttribute('id', displayName + 'DisplayValue');
    value.className = 'displayValue';
    value.innerHTML = '0.0';
    frame.appendChild(value);
    
    units.setAttribute('id', displayName + 'DisplayUnits');
    units.className = 'displayUnits';
    units.innerHTML = displayUnits ;
    frame.appendChild(units);
    
    displays[displayName] = frame;
    displays[displayName].dataPath = dataPath; 
    displays[displayName].factor = factor;
};

function updateDisplays(){
    Object.keys(displays).forEach(function(key){
       var d = displays[key];
        if (d.dataPath !== '') {
            $.get(d.dataPath, function(data){
                data = Number(data) * Number(d.factor);
//                console.log(key + ' value is ' + data);
                document.getElementById(key + 'DisplayValue').innerHTML = Number(data).toFixed(1);
//                alert(key + 'DisplayValue = '  + data);
            });    
        }
    });
};