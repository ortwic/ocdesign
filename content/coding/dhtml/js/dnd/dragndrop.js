document.onmousemove=drag;

var drgObj=0;

// Position, an der das Objekt angeklickt wurde.
var xDrg = 0;
var yDrg = 0;

// Mausposition
var xPos = 0;
var yPos = 0;

function drgStart(obj, src)
{
    if(src) {
        src.style.background="#04A";
    }
	
    if(obj)
    {
        drgObj=obj;
        
        xDrg = xPos - drgObj.offsetLeft;
        yDrg = yPos - drgObj.offsetTop;

        return 0;
    }
}

function drag(e) 
{
    xPos = document.all ? window.event.clientX : e.pageX;
    yPos = document.all ? window.event.clientY : e.pageY;
    
    if(drgObj != 0) {
        drgObj.style.left = (xPos - xDrg) + "px";
        drgObj.style.top = (yPos - yDrg) + "px";
        debug.innerHTML= "X: "+drgObj.style.left+"; Y: "+drgObj.style.top+"; ";
    }
}

function drgStop(src,backVal)
{
    if(src) {
        src.style.background="#8AF";
    }
    drgObj=0;
    
    // Selectioninhalt leeren ?
    //debug.innerHTML = document.selection.type;
    //document.selection.empty();
    //debug.innerHTML += " --> " + document.selection;
    
    if(backVal) 
    {
        var id = src.id;
        var y = parseInt(src.style.top);
        var x1 = parseInt(src.style.left);
        var x2 = x1 + parseInt(src.style.width);
        
        // g_lin#y, g_lin#x1, g_lin#x2
        eval("g_"+id+"y="+y);
        eval("g_"+id+"x1="+x1);
        eval("g_"+id+"x2="+x2);
        
        eval("debug.innerHTML = id + ', ' + g_"+id+"y + ', ' + g_"+id+"x1 + ', ' + g_"+id+"x2");
    }
    return 0;
} 
