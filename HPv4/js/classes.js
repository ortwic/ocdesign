var g_spdBars = 20;   // Anispeed for barblocks
var g_spdMain = 20;   // Anispeed for mouseover
var g_spdSubs = 20;   // Anispeed for submenus
var g_subs    = [];   // Container for submenus

/* **** Erzeugen der Linienblocks **** */
function BarBlocks(blocks, resize) {
    var self      = this;
    var blockIDs  = [];
    var blockDivs = [];
    var divBars   = new Object();
    var maxBars   = [];
    var curIvalID = 0; // ID für Interval
    var curBarNo; // Zählvariable für Animation
    
    var nextAni = function() {};    
    
    var newBar = function( newDiv, base, left, top, width ) {
        if(!newDiv) {
            newDiv = document.createElement("div");
            newDiv.className = "bars";
            base.appendChild(newDiv);
        }
        
        if(width < 0) { width *= -1; newDiv.style.background="#804060" } // Debug
        
        newDiv.style.left =  left + "px";
        newDiv.style.top =   top + "px";
        newDiv.style.width = width + "px"; 
        
        return newDiv;
    };
    
    self.aniLines = function(no) {
        obj = divBars[blockIDs[no]];
        // showStat(blockIDs[no] + ", " + curBarNo, true);
        if(obj && obj[curBarNo]) {
            obj[curBarNo].className = "bars";
            curBarNo++;
            if(obj[curBarNo]) {
                obj[curBarNo].className = "barsH";
            } else {
                clearInterval(curIvalID);
                curIvalID = 0;
                curBarNo = 0;
                if(no < blockIDs.length-1) {                 
                    start(++no);
                } else {
                    nextAni();
                }
            }
        }
    };
    
    function init() {
        var left, top, width;
        var deltaTop = 10; // Abstand zw. Balken
        
        // Parameter Block 1
        var topIdentR1  = 240; // ungefähre Einrückung von Oben
        var minWidth = 120; // Einrückung von Links
        var aR1 = topIdentR1/(44e5); // Streckungsfaktor
        
        top  = topIdentR1;
        for(i = 0; i < maxBars[0]; i++) {
            width = parseInt( -0.9 * aR1 * top * Math.pow(top - topIdentR1, 2) + minWidth);            
            divBars[blockIDs[0]][i] = newBar( divBars[blockIDs[0]][i], blockDivs[0], 0, top, width );
           
            top -= deltaTop;
            //showStat(top + ";&nbsp;" +left+ ";&nbsp;" + width);
        }
        
        var blockWidth = 1280;
        var aR2 = maxBars[1]/(222e2); // Streckungsfaktor
        var sqrt = 0; // temp. Variable
        top  = maxBars[1] * 10;
        // w = ( blockDivs[1].offsetLeft + blockDivs[1].offsetWidth );
        // showStat( blockDivs[1].id + ": " + w );
        for(i = 0; i < maxBars[1]; i++) {        
            // left-Formel
            // f(top) = 0.5*blockWidth +/- Math.sqrt(4/a*(top-ye));
            sqrt = 4 / aR2*(top);
            if(sqrt < 0) sqrt = 0;
            left = parseInt(Math.sqrt(sqrt));
            
            // width-Formel
            // f(top) = 1.0*blockWidth +/- 0.5*Math.sqrt(4/a*((maxBars[1]-2)*deltaTop-top);
            a = maxBars[1] * 0.00012;
            sqrt = 4 / a * ( (maxBars[1] - maxBars[1] / 5) * deltaTop - top);
            if(sqrt < 0) sqrt = 0;
            //width = parseInt(1.0*blockWidth - 0.5 * Math.sqrt(sqrt))-left;
            width = parseInt(1.08 * blockWidth - 0.5 * Math.sqrt(sqrt)) - left - 320; // TODO!!! Formeln optimieren
            
            divBars[blockIDs[1]][i] = newBar( divBars[blockIDs[1]][i], blockDivs[1], left, top, Math.abs(width) );
            
            top -= deltaTop;
            //showStat((top) + ";&nbsp;" +left+ ";&nbsp;" + width);
        }
    }
    
    function start(no) {
        if(!no) no = 0;
        if(curIvalID == 0) {
            curBarNo = 0;
            curIvalID = setInterval( function() { self.aniLines(no); }, g_spdBars);
        }
    }

    // initialisation parts
    for( i in blocks ) {
        blockIDs.push(i);
        blockDivs.push(blocks[i]);
        divBars[i] = [];
        maxBars.push(parseInt(blocks[i].attributes.rel.value));
    }
    
    if(resize) addEvent( resize, "resize", init );
    
    init();
    
    return {
        startAni: start,
        setNextAni: function(f) { if(typeof(f) == "function") nextAni = f; }
    }
}

/* ******************* */
/* *   CButtons.js   * */
/* ******************* */

CButton = function (div) {
    if(!div) return 0;
    
    var self = this;
    this.div = div; // Beschriftungs-Div
    this.divBg = 0;
    this.divBgH = 0;
    this.rel = div.attributes.rel.value;
    this.a = document.getElementById( this.rel );     
    
    this.type = (this.a.parentNode && this.a.parentNode.attributes.rel) 
                ? parseInt(this.a.parentNode.attributes.rel.value) : 2;
    this.left = this.div.offsetLeft;
    this.top = this.div.offsetTop;
    //this.width = 135;
    //this.height = 21;
    // showStat("zI: "+div.style.zIndex);
    // this.zInd = parseInt( div.style.zIndex ) - 4;
    this.zInd = 74;
    this.opac = 0;
        
    this.idFadeAni = 0; // ID für Interval
    
    // register events
    addEvent( self.a, "mouseover", function(e) { return self.startAniOver(e) } );
    addEvent( self.a, "mouseout", function(e) { return self.startAniOut(e) } );
    if(this.type > 0) {
        addEvent( self.a, "click", function(e) { return hideSubs(e) } );
    }
    
    this.aniOver = function() {
        if(self.opac < 100)
        {
            self.divBgH.style.opacity = self.opac/100;
            self.opac += 10;
        }
        else
        {
            window.clearInterval(self.idFadeAni);
            self.idFadeAni=0;
        }
    }

    this.aniOut = function() {
        if(self.opac > 0)
        {
            self.divBgH.style.opacity = self.opac/100;
            self.opac -= 2;
        }
        else
        {
            window.clearInterval(self.idFadeAni);
            // Eigentlich nicht notwendig, da opacity=0
            self.divBgH.style.zIndex = self.zInd - 1;
            self.idFadeAni=0;
        }
    }

    this.aniOverIE6 = function() {     
        if(self.opac < 101)
        {
            self.divBgH.style.filter = "alpha(opacity="+self.opac+");";
            self.opac += 20;
        }
        else
        {
            window.clearInterval(self.idFadeAni);
            self.idFadeAni=0;
        }
    }

    this.aniOutIE6 = function() {
        if(self.opac > 0)
        {
            self.divBgH.style.filter = "alpha(opacity="+self.opac+");";
            self.opac -= 4;
        }
        else
        {
            window.clearInterval(self.idFadeAni);
            // Eigentlich nicht notwendig, da opacity=0
            self.divBgH.style.zIndex = 73;
            self.idFadeAni=0;
        }
    }
    
    // Button Bg erzeugen (Initialisierung), wenn Hauptmenübutton
    if(this.type < 2) {
        this.drwDiv("Bg");
    } else { // Submenübutton     
        this.div.className = "cmdBg2";
        //this.div.style.background = "#404040";
    }
    
    return self;
}

CButton.prototype.drwDiv = function (type) {
    var newDiv = 0;

    // Button Bg
    newDiv = document.createElement("div");
    newDiv.className = "cmdBg"+this.type;
    this.div.appendChild(newDiv);
    this.divBg = newDiv; // Hintergrund

    this.divBg.style.position =   "absolute";
    this.divBg.style.zIndex =     this.zInd;
    
    // Button Bg Highlight
    newDiv = document.createElement("div");
    newDiv.className = "cmdBgH"+this.type;
    this.div.appendChild(newDiv);
    this.divBgH = newDiv; // Hintergrund

    this.divBgH.style.position =   "absolute";
    this.divBgH.style.zIndex =     this.zInd - 1;
    this.divBgH.style.opacity =    0;
    //if(!src.divBgH.style.opacity) this.divBgH.style.filter = "alpha(opacity=0)";
 
    return 1;
}

CButton.prototype.startAniOver = function (e) {
    // Laufende Animation anhalten
    if(this.idFadeAni) 
    {
        window.clearInterval(this.idFadeAni);
        this.idFadeAni=0;
        // Wenn FadeOut noch nicht abgeschlossen
        if(this.opac > 0 ) this.divBgH.style.zIndex = this.zInd - 1;
    }
    this.divBgH.style.zIndex = this.zInd + 2;
    this.opac=0;
    
    // Aufruf der Fading-Funktion
    if(MSIE) 
    {
        this.divBgH.style.filter = "alpha(opacity=0);"
        this.idFadeAni = window.setInterval(this.aniOverIE6, g_spdMain);
    }
    else 
    {
        this.idFadeAni = window.setInterval(this.aniOver, g_spdMain);
    }
}

CButton.prototype.startAniOut = function (e) {
    e = e || window.event;
    // Laufende Animation anhalten
    if(this.idFadeAni) 
    {
        window.clearInterval(this.idFadeAni);
        this.idFadeAni=0;
        // Wenn FadeIn noch nicht abgeschlossen
        if(this.opac < 1) this.divBgH.style.zIndex = this.zInd - 1;
    }
    // Aufruf der Fading-Funktion
    if(MSIE) 
    {
        this.idFadeAni = window.setInterval(this.aniOutIE6, g_spdMain);
    }
    else 
    {
        this.idFadeAni = window.setInterval(this.aniOut, g_spdMain);
    }
    
    // Focus des Links aufheben
    e.target.blur();
}

/* **************** */
/* *   CSubs.js   * */
/* **************** */

/* Animation der Menüs */
function CSub(id) {    
    var div = document.getElementById("sub" + id);
    if(!div) return 0;
    
    var self    = this;
    this.div    = div; // Beschriftungs-Div
    var values  = this.div.attributes.rel.value.split(",");
    this.a      = document.getElementById( id ); 
    this.tbl    = document.getElementById( "tbl" + id ); 
    
    g_subs.push( self );
    
    this.idIv           = 0;
    this.isVis          = false;
    this.lstSubIn       = 0; // Wert, wie weit Menü aktuell nach links gerückt ist
    this.minSubIn       = parseInt(values[0]); // Wert, wie weit Menü nach links gerückt sein soll
    this.maxSubOut      = parseInt(values[1]); // Wert, wie weit Menü nach rechts ausfahren soll
    this.minSubHeight   = (values[2]) ? parseInt(values[2]) : 24; // Minimale Höhe des Menüs
    this.maxSubHeight   = (values[3]) ? parseInt(values[3]) :168; // Maximale Höhe des Menüs
    
    // register events
    addEvent( self.a, "click", function(e) { return self.shwHideSub(e) } );
    addEvent( self.tbl, "click", function(e) { return self.shwHideSub(e) } );
    
    this.pushSubsInFg = function() {
        var isSubVis = function() {
            for( i = 0; i < g_subs.length; ++i ) {
                if(g_subs[i].getVis()) {
                    return true;
                }
            }
            return false;
        }
        pushWindowsInBg(isSubVis());
    }
    
    /* Rekursive Funktionen zur Menüanimation */
    this.aniFadeOutSide = function(left) { // left = aktueller Ausfahrwert
        var obj = self.div;
        var max = self.maxSubOut;
        
        // t = ?
        // t = 1/g_spdSubs*Math.floor(left)/4;        
        // var step = Math.pow(max,t); // f(g_spdSubs) = 1/20 * 130^(1/20*t)
        // var step = parseInt(Math.abs(left)/10)+1; // alt !!
        var step = max / 10;
        
        // Aktualisierung der Koordinaten
        left+=Math.floor(step);
        obj.style.left = left + "px"; 
        
        if(left < max) {
            self.idIv = setTimeout( function() { self.aniFadeOutSide(left); }, g_spdSubs ); 
        } else {
            // fall bis nicht aufs letzte px ausgefahren
            obj.style.left = max + "px"; 
            self.idIv = 0;
            
            aniFadeDownSide(obj.offsetHeight);
        }
    }

    function aniFadeDownSide(height) {
        var obj = self.div;
        var max = self.maxSubHeight;
        var step = Math.ceil((max - height) / 5); 
        
        obj.style.height = parseInt(height) + "px"; 
        height += step;

        if (height < max) {
            self.idIv = setTimeout( function() { aniFadeDownSide(height); }, g_spdSubs); 
        } else {        
            // fall bis nicht aufs letzte px ausgefahren
            obj.style.height = max + "px"; 
            self.idIv = 0;
        }
    }

    this.aniFadeUpSide = function(height) {        
        var obj = self.div;
        var min = self.minSubHeight;        
        var step = height / 10; 

        obj.style.height = parseInt(height) + "px"; 
        height -= step;
        
        if (height > min) {
            self.idIv = setTimeout( function() { self.aniFadeUpSide(height); }, g_spdSubs ); 
        } else {
            self.idIv=0; 
            aniFadeInSide(parseInt(obj.offsetLeft));
        }
    }

    function aniFadeInSide(left) {     
        var obj = self.div;
        var min = self.minSubIn;
        var step = 8;

        obj.style.left = left + "px"; 
        left -= step;

        if (left>min) {
            self.idIv = setTimeout( function() { aniFadeInSide(left); }, g_spdSubs); 
        } else {        
            obj.style.left = min + "px"; 
            self.idIv=0; // Lösche Animations-ID
        }
    }
    
    // Positionierung der Elemente
    if(!g_HiBw) {
        div.style.left = this.maxSubOut+"px";
        div.style.height = this.maxSubHeight+"px";
        div.style.visibility = "hidden";
    } else {
        this.div.style.left = this.minSubIn + "px";
    }
}

CSub.prototype.shwHideSub = function (e) {
    e = e || window.event;
    var subPos=0; // Wert, wie weit Menü gerade ausgefahren
    
    if(this.getVis()) { // Wenn Sub sichtbar               
        this.isVis = false; // Menü ist versteckt
        
        if(!g_HiBw) { 
            this.div.style.visibility = "hidden";
            return 1;
        }
        
        // Erniedrige zIndex
        this.div.style.zIndex = parseInt(this.div.style.zIndex)-1;
        
        // Verstecke sichtbares Sub ... mit Animation, wenn Menü voll ausgefahren
        if(this.maxSubOut == parseInt(this.div.style.left) && this.minSubHeight<=parseInt(this.div.style.height)) 
        {
            subPos = this.div.offsetHeight;
            // hide Menu
            this.aniFadeUpSide(subPos);
        }
        else // ... ohne Animation, beim 2. Aufruf
        {            
            this.div.style.left=this.minSubIn + "px";
            this.div.style.height=this.minSubHeight + "px";
        }
    } else { // Ansonsten zeige Menü
        hideSubs(); // hide other subs
        this.isVis = true; // Menü ist sichtbar   
        
        if(!g_HiBw) { 
            this.div.style.visibility = "visible";
            return 1;
        }
        
        // Speichere ID und Position des aktuellen Menüs
        this.lstSubIn = subPos = this.div.offsetLeft;
        
        // Erhöhere zIndex, um über andere Subs zu liegen
        this.div.style.zIndex = parseInt(this.div.style.zIndex)+1;
        
        // Prüfe, ob Menü in Ausgangszustand
        if(subPos <= this.lstSubIn) 
        {
            // show Menu (Objekt, relative Koordinate maximal, aktuelle Koordinate);
            this.aniFadeOutSide(subPos);
            this.div.style.left = subPos + "px"; 
        }
    }   
    this.pushSubsInFg();
}

CSub.prototype.getVis = function () {
    return this.isVis;
}

function hideSubs(e) {
    e = e || window.event;
    for( i = 0; i < g_subs.length; ++i ) {
        if(g_subs[i].getVis()) {
            g_subs[i].shwHideSub();
        }
    }
}
