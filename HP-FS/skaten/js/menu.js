/////////////////////
// const (Konstanten)
// f�r Einblendeffekt
var g_aMax=95; // Alpha am Ende
var g_upStep=20, g_downStep=18; // Schritte
var g_spd=10; // Geschwindigkeit

/* **** Seitenwechsel **** */

function showPage(src,url) {
    src.className="cmdOvr";

    hideSubs();

    if(url) {
        main.location.href=url;
        chgCssMain();
    }
}

/* **************** */
/* *  clsSubs.js  * */
/* **************** */

/* Animation der Men�s */
function CSub(id) {
    if(typeof(document.getElementById(id))=="undefined") return 0;
    this.div = document.getElementById(id); // Beschriftungs-Div
    
    this.self = this;
    this.idIv=0;            // ID des Intervals
    this.isVis=false;
    this.lstSubHeight=0; // Wert, wie weit Men� aktuell nach links ger�ckt ist
    this.minSubHeight=0;   // Minimale H�he des Men�s
    this.maxSubHeight=parseInt(this.div.style.height); // Wert, wie weit Men� nach rechts ausfahren soll
    //state.innerHTML += id + ": " + this.div.style.height + "<br>"; // DEBUG
}

CSub.prototype.shwHideSub = function (src) {
    var subPos=0; // Wert, wie weit Men� gerade ausgefahren
    
    // Button erh�ht
    if(src) src.className="cmdOvr";
        
    if(this.isVis) { // Wenn Sub sichtbar
        // Verstecke sichtbares Sub ... mit Animation, wenn Men� voll ausgefahren
        if(this.minSubHeight<=parseInt(this.div.style.height)) 
        {
            subPos = this.div.offsetHeight;
            // hide Menu
            aniFadeUpSide(this.div, this.minSubHeight, subPos);
        }
        else // ... ohne Animation, beim 2. Aufruf
        {
            this.div.style.height=this.minSubHeight + "px";
        }
        
        this.isVis = false; // Men� ist versteckt
    } else { // Ansonsten zeige Men�
        // Andere Subs verstecken
        hideSubs();
    
        // Speichere ID und Position des aktuellen Men�s
        this.lstSubHeight = subPos;
        
        // Pr�fe, ob Men� in Ausgangszustand
        if(subPos<=this.lstSubHeight) {
            this.div.style.visibility = "visible";
            // show Menu (Objekt, relative Koordinate maximal, aktuelle Koordinate);
            aniFadeDownSide(this.div, this.maxSubHeight, subPos);
            this.div.style.height=subPos+"px"; //Einblendung ohne Fading
        }
        
        this.isVis = true; // Men� ist sichtbar
    }   
}

CSub.prototype.getVis = function () {
    return this.isVis;
}

function hideSubs() {
    for(i=0; i<g_subArray.length; i++) {
        if(g_subArray[i].getVis()) g_subArray[i].shwHideSub();
    }
}

/* ************************************** */
/* Rekursive Funktionen zur Men�animation */
/* ************************************** */
function aniFadeDownSide(obj, max, height) {
    var step = Math.ceil((max-height)/g_downStep); // erst schnell, dann langsam
    var opac = Math.ceil(g_aMax*(height/max));
    
    // H�he anpassen
    obj.style.height = parseInt(height) + "px"; 
    // Transparenz anpassen
    if(obj.filters) {
        obj.filters.alpha.opacity = opac;
        //state.innerHTML = "IE";
    } else {
        obj.style.opacity = opac*1e-2;
        //state.innerHTML = "Moz";
    }
    
    //window.status = opac;
    height += step;

    if (height<max) {
        this.idIv = setTimeout(function(){aniFadeDownSide(obj, max, height)}, g_spd); 
    } else {
        // fall bis nicht aufs letzte px ausgefahren
        obj.style.height = max + "px"; 
        this.idIv=0;
    }
}

function aniFadeUpSide(obj, min, height) {    
    var step = Math.ceil(height/g_upStep);  // erst schnell, dann langsam
    var opac = Math.ceil(g_aMax-(g_aMax/height)); // nimmt erst sehr langsam ab, dann schnell

    // H�he anpassen
    obj.style.height = height + "px"; 
    // Transparenz anpassen
    if(obj.filters) {
        obj.filters.alpha.opacity = opac;
        //state.innerHTML = "IE";
    } else {
        obj.style.opacity = opac*1e-2;
        //state.innerHTML = "Moz";
    }
    
    //window.status = opac;
    height-=step;
    
    if (height>min) {
        this.idIv = setTimeout(function(){aniFadeUpSide(obj, min, height)}, g_spd); 
    } else {
        this.idIv=0;
        obj.style.visibility = "hidden";
    }
}
