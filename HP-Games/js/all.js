// Überprüfe Frameposition
//if(!parent.main) location.href="../index_low.html?"+location.pathname+location.hash;

MSIE = navigator.userAgent.toLowerCase().indexOf("msie") > -1;

function chgList(obj)
{
    var value=obj.options[obj.selectedIndex].value;

    if(value.indexOf(".htm")>0)
        location=value;
}

function openList(obj)
{
    var id, i;
    
    if(obj.style.display!="none") // verstecken
    {
        i=obj.childNodes.length;
        {
        id = setInterval(function(){
            i--;
            if(i < 1) {obj.style.display="none"; clearInterval(id);}
            if(obj.childNodes[i].tagName=="LI") obj.childNodes[i].style.display="none";
            },10);
        }
    }
    else // sichtbar machen
    {
        obj.style.display="block";

        i=0;
        {
        id = setInterval(function(){
            
            if(i < obj.childNodes.length) {
                if(obj.childNodes[i].tagName=="LI") {obj.childNodes[i].style.display="block";}
            } else {clearInterval(id);}
            i++;
            },10);
        }
    }
}

function initList(obj)
{
    obj.parentNode.style.position="absolute";
    obj.style.display="none";
    for(var i=0; i<obj.childNodes.length; i++)
    {
        window.status+=obj.childNodes[i].tagName;
        if(obj.childNodes[i].tagName=="LI") {obj.childNodes[i].style.display="none";}
    }
}

