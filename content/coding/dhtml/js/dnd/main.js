var gDotNo = 0; // Anzahl der Elemente
var gDots = new Array(); // neues Array
var gObsId=0; // Intervall-Id für Observation

var g_RfR=10; // Aktualisierungsrate
var g_RPx=2; // pro Pixel
var g_gF=1; // G-Faktor
var g_v0=0; // Anfangsgeschwindigkeit
var g_rbnc=0.8; // Rebounce des Objekts

function start()
{
    var objNo = parseInt(document.getElementById("txtObjNo").value);
    var objFrq = parseInt(document.getElementById("txtObjFrq").value);
    var fctFx = 100 / objNo; // Effektfaktor
    
    g_RfR = parseFloat(document.getElementById("txtRfshRt").value); // Zeitfaktor
    g_PxpTu = parseFloat(document.getElementById("txtPxpTu").value); // pro Pixel
    g_gF = parseFloat(document.getElementById("txtGF").value)/10; // G-Faktor
    g_v0 = parseFloat(document.getElementById("txtV0").value)/10; // Anfangsgeschw.
    g_rbnc = parseFloat(document.getElementById("txtRbnc").value)/100; // Rebounce in %

    // Start mit dem Erzeugen der Punkte
    id=window.setInterval("newDot("+fctFx+");", objFrq);
    
    // Erzeugen der Punkte aufhalten
    setTimeout("clearInterval("+id+")", (objNo+1)*objFrq);
    
}

function reset()
{
    while(gDotNo>0)
    {
        gDotNo--;
        gDots
        gDots[gDotNo].stopDot();
    }
    
    // Überwachung abschalten
    if(gDotNo==0)
        window.clearInterval(gObsId);
}

function newDot(fctFx) 
{
    var zInd = gDotNo*(-1);
    var opac = 100;
    var txtVal = 0;
    
    
    // Inhalt der DIVs definieren
    if(document.getElementById("inImg").checked) {
        txtVal = "<img src='"+document.getElementById("inImg").value+"'>"; 
    } 
    else if(document.getElementById("txtSign").value)
        txtVal = document.getElementById("txtSign").value;
    else
        txtVal = gDotNo+1;
    
    // Effekt berechnen
    if(document.getElementById("chkFx").checked) {
        opac = opac-gDotNo*fctFx; 
    }
    
    // pro Arrayzelle eine Objektinstanz
    gDots[gDotNo] = new CDot("dot"+gDotNo, g_gF, g_v0, zInd, opac, txtVal); 
    gDots[gDotNo].drwDot();
    gDots[gDotNo].startDot();
    gDotNo++;
    
    // Überwache 1. Element
    //if(gDots[0]) gObsId=window.setInterval("observe("+gDots[gDotNo]+");", 10);
    if(gDots[0]) gObsId=window.setInterval("observe();", 20);
}

function movDot(id) // für was?
{
    var obj = document.getElementById(id);
    
    obj.style.top = 5;
}

function observe(obj)
{
    var t = gDots[0].t;
    var x = parseInt(gDots[0].x);   // "px" entfernen
    var y = parseInt(gDots[0].y);   // "px" entfernen
    var g = gDots[0].a;
    var vx = gDots[0].b;            // vx = vo
    var vy = Math.sqrt(2*9.81*g*y); // vy = sqrt(2*g*h)
    var aRad = 0;
    
    opT.innerHTML = t; // Aktuelle Zeit
    opX.innerHTML = x; // Aktuelle X-Koordinate
    opY.innerHTML = y; // Aktuelle Y-Koordinate
    
    // Aktuelle Geschwindigkeit: Vres = sqrt(vx^2 + vy^2) 
    opV.innerHTML = parseInt(Math.sqrt(Math.pow(vx,2) + (2*9.81*g*y)));
    
    // Aktueller Winkel: tan alpha = vx / vy
    aRad = Math.atan(vy/vx);
    // Umrechnung von Rad auf Deg: aRad*180/Pi
    opW.innerHTML = parseInt(aRad*180/Math.PI);
}
