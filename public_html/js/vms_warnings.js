/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var warnings = [];


function createWarning (warningName, warningValue, dataPath){
    var main = document.getElementById('main');
    var frame = document.createElement('div');
    var title = document.createElement('div');
    var value = document.createElement('div');
    var units = document.createElement('div');
    
    frame.setAttribute('id', warningName + 'WarningFrame');
    frame.className = 'warningFrame';
    main.appendChild(frame);
    
    title.setAttribute('id', warningName + 'WarningTitle');
    title.className = 'warningTitle';
    title.innerHTML = warningName;
    frame.appendChild(title);
        
    warnings[warningName] = frame;
    warnings[warningName].dataPath = dataPath; 
    warnings[warningName].value = warningValue;
};

function updateWarningValues(){
    Object.keys(warnings).forEach(function(key){
       var w = warnings[key];
        if (w.dataPath !== '') {
            $.get(w.dataPath, function(data){
                data = Number(data)
                if (data > w.value){
                    document.getElementById(key + 'WarningFrame').style.backgroundColor = 'orange';
                }  else {
                    document.getElementById(key + 'WarningFrame').style.backgroundColor = 'initial';
                }
            });    
        }
    });
 };
