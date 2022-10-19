// Überprüfe Frameposition
if(!parent.main) location.href="../index.html?"+location.pathname+location.hash;

// lade Stylesheet
if(parent.chgCssMain) parent.chgCssMain();

// Überwache Event
document.onmouseup=doSth;

function doSth(e)
{
    if(!e) e = window.event;

    var obj = 0, objTyp;
    if (e.target) obj = e.target; // FF
    else if (e.srcElement) obj = e.srcElement; // IE
    if (obj.nodeType == 3) // defeat Safari bug
        obj = obj.parentNode;
	
    objTyp = obj.className; 

    if(objTyp=="pic"||objTyp=="PIC")
    {
        pic = obj.src.slice(obj.src.indexOf('_')+1,obj.src.length);
        location.href="images/"+pic;
    }
}

