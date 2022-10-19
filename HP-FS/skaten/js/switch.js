
var g_cssFil="main.css";

//setTimeout("document.getElementById('subConfig').style.visibility='visible';",20); // Testzeile

function chgCss(src,fil) {
    if(src) src.className='subOvr';

    if(fil) {
	    g_cssFil = fil;
	    
        if (document.getElementsByTagName) {
            document.getElementsByTagName('link')[0].href = "css/"+fil;
			chgCssMain(); 
		}
	}
}

function chgCssMain() {	    
    if (document.getElementsByTagName) {
	    if (document.getElementsByTagName('link')[0].href) {
			main.document.getElementsByTagName('link')[0].href = "../css/"+g_cssFil;
			//setTimeout("main.document.getElementsByTagName('link')[0].href = '../css/"+g_cssFil+"';",200); // !! Notlösung
			return 1;
		}
		else {
		    window.status=(document.getElementsByTagName('link')[0].href);
		    alert('CSS-Datei konnte nicht geladen werden!');
		}
	}
	else {
		alert("Dieses Script wird von Ihrem Browser nicht unterstüzt!");
	}
	return 0;
}

/* ************************ */
/* ******** Cookie ******** */
/* ************************ */

function getCookie(name) {
    var cname = name + "=";
    var dc = document.cookie;
    if (dc.length > 0) {
      var start = dc.indexOf(cname);
      if (start != -1) {
        start += cname.length;
        var stop = dc.indexOf(";", start);
        if (stop == -1) stop = dc.length;
        return unescape(dc.substring(start,stop));
      }
    }
    return 0;
}

function setCookie(name, value, days, path) {
    if(isNaN(days)) days = 0;
    if(!path) path = '/';

    var expire = new Date();
	days = expire.getTime() + (parseInt(days)*1000*60*60*24);
	expire.setTime(days);

    document.cookie = name + "=" + escape(value) + "; expires=" + expire.toGMTString();// + ";path=" + path;
} 

/* ***************************** */
/* ******** Drag'n'Drop ******** */
/* ***************************** */

document.onmousemove=drag;

var drgObj=0;

// Position, an der das Objekt angeklickt wurde.
var xDrg = 0;
var yDrg = 0;

// Mausposition
var xPos = 0;
var yPos = 0;

function drgStart(src) {
    //.style.background="silver";
    drgObj=src;
    document.getElementById('bar').style.background="silver";
	
    if(src)
    {
        xDrg = xPos - drgObj.offsetLeft;
        yDrg = yPos - drgObj.offsetTop;

        return false;
    }
}

function drag(src) {
    xPos = document.all ? window.event.clientX : src.pageX;
    yPos = document.all ? window.event.clientY : src.pageY;
    if(drgObj != 0) {
        drgObj.style.left = (xPos - xDrg) + "px";
        drgObj.style.top = (yPos - yDrg) + "px";
    }
}

function drgStop() {
    document.getElementById('bar').style.background="gray";
    drgObj=0;
} 

function useFullWidth(fw) {
    if(fw) { 
        document.getElementById('ifMain').style.width="100%";
        return true;
    } else {
        var newWidth = document.getElementById('tblMenu').offsetWidth+16;
        
        document.getElementById('ifMain').style.width = newWidth;
        return false;
    }
}
