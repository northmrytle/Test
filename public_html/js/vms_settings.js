/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var IsVisible = 0;
var systemName = 'vms';

function displaySettings(){
    
//    displayLightBox();
       
    var main = document.getElementById('main');
    var Frame = document.createElement('div');
    var Title = document.createElement('div');
    var MenuItem = document.createElement('div');
    
    Frame.setAttribute('id', 'settingsMenuFrame');
    Frame.className = 'menuFrame';
    Frame.style.display = 'none';
    main.appendChild(Frame);
    
    Title.setAttribute('id', 'settingsMenuTitle');
    Title.className = 'menuTitle';
    Title.innerHTML = 'VMS Settings';
    Frame.appendChild(Title);
    
    MenuItem.setAttribute('id','settingsMenuItemWifi');
    MenuItem.className = 'menuItem';
    MenuItem.innerHTML = 'WiFi Setup';
    MenuItem.setAttribute('onclick', 'displayWifiMenu()');
    Frame.appendChild(MenuItem);
    
    main.appendChild(Frame);
    $('#settingsMenuFrame').show('slide', { direction: 'right' }, 500); 
    IsVisible = 1;
}

function hideSettings(){
    $('#settingsMenuFrame').hide('slide', { direction: 'right' }, 500); 
    IsVisible = 0;
    ;}

function displayWifiMenu(){
    $( '#settingsMenuFrame' ).load( 'http://helm.vms.net/config/wifi.php' );
}

function getSystemName(){
    try {
        systemName = localStorage.systemName;
    } catch(err) {}
    
    alert()
    $.get('http://helm.vms.net/config/systemName', function(data){
            document.getElementById('appTitle').innerHTML = data.trim() + ' - VMS';
            console.log('getting systemName');
        });                                
    
    
}