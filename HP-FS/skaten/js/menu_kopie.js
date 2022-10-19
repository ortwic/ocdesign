/////////////////////
// const (Konstanten)
// für Einblendeffekt
var g_aIEMax=95, g_aMozMax=0.95; // Alpha am Ende
var g_aIEStp=5, g_aMozStp=0.05; // Alpha Schritte
var g_spd=10; // Geschwindigkeit

// andere Globale
var g_lstSub=0, g_hiEnd=0, g_id=0;

function showSub(src,which)
{
    if(which=="Config") {
        if(g_lstSub) g_lstSub.style.visibility="hidden";
        if(src) src.className="subOvr";
    } else {
        // Button erhöht
        src.className="cmdOvr";
    }

    // Argument überprüfen
    if(which) {
        // Submenü existiert bereits
        if(document.getElementById("sub"+which)) { 
            g_lstSub=document.getElementById("sub"+which);
            g_lstSub.style.visibility="visible";
            fadeIn(g_lstSub); 
        }
    }
    // Kein Element, kein Ergebnis
    else {
        g_lstSub=0;
        return 0;
    }
  
    return 1;
}

function fadeIn(sObj)
{
    if(g_id==0) g_hiEnd = parseInt(sObj.style.height);
	
    if(sObj.filters) {
        ieFade(0,0);
    } else {
        mozFade(0,0);
    }
}

function ieFade(a,h)
{
	var hStep = g_hiEnd / ((g_aIEMax-(100-g_aIEMax))/g_aIEStp);

    if(!g_lstSub) return 0; // IE-spezifischer Fehlerabfang
    
    g_lstSub.filters.alpha.opacity = a;
    g_lstSub.style.height = parseInt(h) + "px"; 
    

    a += g_aIEStp;
    h += hStep;

    if (a<g_aIEMax)
        g_id = setTimeout("ieFade("+a+","+h+")", g_spd); 
    else
        g_id=0;
}

function mozFade(a,h)
{
	// Gesamthöhe / Gesamtssteps - Offset // vereinfacht dargestellt
	var hStep = g_hiEnd / ((g_aMozMax-(1-g_aMozMax))/g_aMozStp); 

	g_lstSub.style.MozOpacity = a;
	g_lstSub.style.height = parseInt(h) + "px"; 

	a += g_aMozStp;
	h += hStep;

	if (a<=g_aMozMax) 
	    g_id = setTimeout("mozFade("+a+","+h+")", g_spd);
        else
            g_id=0;
}

function hideSub(src)
{
    // Button versenkt
    if(src) src.className='cmdDwn';

    // altes SubMenu verstecken
    if(g_lstSub) {
        g_lstSub.style.visibility="hidden";
        g_lstSub=0;
    }
}

/* **** Seitenwechsel **** */

function showPage(src,url)
{
    src.className="cmdOvr";

    if(g_lstSub)
        g_lstSub.style.visibility="hidden";

    if(url) {
        main.location.href=url;
        chgCssMain();
    }
}
