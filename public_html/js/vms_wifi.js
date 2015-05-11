/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function displayWifiMenu(){
    var main = document.getElementById('light');
    removeElementById('settingsMenuFrame');
    
    var Frame = document.createElement('div');
    var Title = document.createElement('div');
    var MenuItem = document.createElement('div');
    
    Frame.setAttribute('id', 'wifiMenuFrame');
    Frame.className = 'menuFrame';
    main.appendChild(Frame);
    
    Title.setAttribute('id', 'wifiMenuTitle');
    Title.className = 'menuTitle';
    Title.innerHTML = 'Wifi Setup';
    Frame.appendChild(Title);    
    
    MenuItem.setAttribute('id','settingsMenuItemWifi');
    MenuItem.className = 'menuItem';
    MenuItem.innerHTML = 'Display Remote Networks';
    MenuItem.setAttribute('onclick', 'displaySSIDList()');
    
    Frame.appendChild(MenuItem);
    
}


function displaySSIDList(){
    var ssidList;
    
    $.post('http://helm.vms.net/flow/listSSIDs.py',function(data){
            console.log(data);
        
    });
    $.get('http://helm.vms.net/flow/ssid',function(data){
            console.log(data);
            alert(data);
        });
//     console.log(ssidList);   
     
    
    
}