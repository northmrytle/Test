/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var graphs = [];

 function createGraph(
        parentElement,
        graphName,
        dataPath, 
        factor, 
        min, 
        max, 
        height, 
        width
        ){
    this.parent = document.getElementById(parentElement);
    this.frame = document.createElement('div');
    this.title = document.createElement('div');
    this.face = document.createElement('div');
    
    this.frame.setAttribute('id', graphName + 'Graph');
    this.frame.className = 'graphFrame';
    this.parent.appendChild(frame);
    
    this.title.setAttribute('id', graphName + 'GraphTitle');
    this.title.className = 'graphTitle';
    this.title.innerHTML = graphName;
    this.frame.appendChild(title);

    this.face.setAttribute('id', graphName + 'GraphPlot');
    this.face.setAttribute('class','graphPlot');
    this.frame.appendChild(face);
    
    this.xValues = [];
    this.yValues = [];
    this.path = '';
    
    this.graphPlot = Raphael( graphName + 'GraphPlot', width , height);
//    console.log('height ' + height + ' width ' + width);
    
    var graphWidth = this.graphPlot.canvas.offsetWidth; 
    var graphHeight = this.graphPlot.canvas.offsetHeight;
   
    var bX = graphHeight - 10;
    var bPath = 'M20,' + bX + 'L' + graphWidth + ',' + bX;
//    console.log (bPath);
   
    this.graphPlot.path(bPath);              
    this.graphPlot.text(10, graphHeight - 10 , "0");
    this.graphPlot.text(10, 10, max);
    
//    localStorage.setItem(graphName , '');
        
    this.setValuex = function(newValue){
        
        if (newValue > 0.00){
            
            var strokeColor = '';
            if  (displayMode == 0 ){
                strokeColor = 'red';
            } else {
                strokeColor = 'black';
            }
         
            this.graphPlot.remove();
            
            this.graphPlot = Raphael( graphName + 'GraphPlot', width , height);
            var graphWidth = graphPlot.canvas.offsetWidth; 
            var graphHeight = graphPlot.canvas.offsetHeight;
            
            var bX = graphHeight - 10;
            var bPath = 'M20,' + bX + 'L' + graphWidth + ',' + bX;

            this.graphPlot.path(bPath).attr('stroke',strokeColor);             
            this.graphPlot.text(10, graphHeight - 10 , "0").attr('stroke',strokeColor);
            this.graphPlot.text(10, 10, max).attr('stroke',strokeColor);
            
            
//            yValues = localStorage.getItem(graphName + yValues);
            
            var scaleHeight = bX - 10;
            var scaleUnit = scaleHeight/max;
            var newValue = newValue * factor ;
            var newY = (newValue * scaleUnit * -1) + bX;
                        
//            console.log('bX ' + bX + ', scaleHeight ' + scaleHeight + ', scaleUnit ' + scaleUnit + ', newValue ' + newValue + ', newY' + newY);
            
            yValues.push(newY);
        
            if (yValues.length > (graphWidth/5) /*- 10*/ ) {
                yValues.shift();
            };
                 
            path = 'M';
            for (i = 0; i < yValues.length; i++){
                path += ((i * 5)+20) + ',' + (yValues[i]) + 'L';
  
            };
            
            this.graphPlot.path(path).attr('stroke',strokeColor);
            
//            localStorage.yValues = yValues;

//            localStorage.setItem( graphName + 'GraphPath', this.path);
                       
        }
    };
  
    graphs[graphName] = this; 
    
};

function updateGraphs() {
    Object.keys(graphs).forEach(function(key) {
        var g = graphs[key];
        $.get(g.dataPath, function(data){
             g.setValuex(data);
        });
    });
};