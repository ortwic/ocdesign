CDot = function (id, gFaktor, v0, zInd, fx, txt) 
{
    var self = this;
    
    this.id = id;       // id übernehmen
    this.left = 0;
    this.top = 0;
    this.wgt = 0;       // Gewicht definieren
    this.zInd = zInd;
    this.col = "#8af";  // Farbe definieren (wird nicht benutzt)
    // Transparenz definieren
    (fx)? this.opac=fx: this.opac=0;
    // Textinhalt definieren
    if(!txt) txt = "&bull;";
    this.txt = txt;     

    // Variablen für Parabelbogen
    this.a=9.81; // g
    if(gFaktor) this.a*=gFaktor; // Gravitation festlegen
    
    (v0)? this.b=v0: this.b=1; // Anfangsgeschwindigkeit festlegen
    
    this.c=1; // alter X-Wert
    this.d=0;
    
    // Variablen für Vektorberechnung
    this.t=0; // Zeit
    this.toy=0; // Anfangszeit
    this.tox=0; // Anfangszeit
    this.x=0; // horizontaler Weg
    this.y=0; // vertikaler Weg
    this.xs=0; // horizontaler Startpunkt
    this.ys=0; // vertikaler Startpunkt
    this.vox=v0; // horizontale Geschw.
    this.voy=0; // vertikale Geschw.
    
    this.obj = document.getElementById(this.id);
    this.iId = 0;
    
    // Private Functions
    this.fctRfshPos = function ()
    {
        var obj = document.getElementById(self.id);
        var ysNew = 0; // Neuer vertikaler Startpunkt
        var dtx, dty; // Delta t: Zeitdifferenz für x & y
        
        // Zeiteinheiten um Pixelanzahl hochzählen
        self.t += g_PxpTu;
        
        // Aktuelle Koordinaten auslesen
        self.y = parseInt(obj.style.top);
        
        // Wenn Grenze erreicht wird
        if(self.y+obj.offsetHeight > g_lin0y && self.x > g_lin0x1 && self.x < g_lin0x2) 
            {ysNew=g_lin0y;}
        if(self.y+obj.offsetHeight > g_lin1y && self.x > g_lin1x1 && self.x < g_lin1x2) 
            {ysNew=g_lin1y;}
           
        if(ysNew!=0) {
            // Neuen Startpunkt festlegen
            self.y = self.ys = ysNew-obj.offsetHeight;
            
            ////////////////////////// V-Reduktion funkioniert nicht /////////////////////////
            // aktuelle Geschw. beim Aufprall ist neue Anfangsgeschw. negativ
            // 2as = v^2 - vo^2 --> v = sqrt(2as + vo^2)
            self.voy = Math.sqrt(2 * (self.a*9.81) * self.y) * (-1);// * g_rbnc);
            // v = a * t;
            //self.voy = (self.a*9.81) * (self.t - self.toy) * (-0.5);
            tmp = self.t - self.toy;
            debug.innerHTML = "<font face='Arial'>v<sub>Aufprall</sub> = </font>" + self.voy + 
                "<br>y = " + self.y + "; t = " + tmp;
            //  "<br>t = " + self.t + "; to = " + self.toy;
            //////////////////////////////////////////////////////////////////////////////////
            
            // Ausgangszeit neu festlegen
            self.toy = self.t;
            
            // Waagrechte Geschw. reduzieren
            //self.vox *= g_rbnc; // so nicht
        } else {
            // Delta-t ermitteln
            dty = self.t - self.toy;
            
            // senkr. Ortskoordinate = Fallbeschleunigung + Startgeschwindigkeit + Startpunkt
            // s = 1/2 * g * t^2 + vo * t
            self.y = 0.5 * (self.a*9.81) * Math.pow(dty,2) + self.voy * dty + self.ys;
        }
        
        // Berechnung der waagrechten Koordinaten
        dtx = self.t - self.tox;
        // waagr. Ortskoordinate = Startgeschwindigkeit
        self.x = self.vox * dtx + self.xs;
        
        // Überwachung des unteren Fensterrands
        if(self.y+obj.offsetHeight > g_wdwH) 
        {
            // Vertikale Anpassung
            self.toy = self.t;
            self.ys = 0; // Startpunkt auf 0
            self.voy = 0; // Anfangsgeschw. auf 0
            self.y = 0; // Rücksetzung nicht zwingend erforderlich
            
            // Horizontale Anpassung
            self.tox = self.t;
            self.xs = 0;
            self.vox = self.b;
            self.x = 0;
        }
        
        // Überwachung des rechten Fensterrands
        if(self.x+obj.offsetWidth > g_wdwW) 
        {
            self.tox = self.t;
            self.xs = g_wdwW;
            self.vox *= -1;
            self.x = g_wdwW - obj.offsetWidth;
        }
        // Überwachung des linken Fensterrands
        if(self.x < 0) 
        {
            self.tox = self.t;
            self.xs = 0;
            self.vox = Math.abs(self.vox);
        }
        
        // Darstellung der Punkte
        obj.style.left = self.x + "px";
        obj.style.top = self.y + "px";
        
        //obj.innerHTML=self.id;
    };
}

CDot.prototype.drwDot = function () 
{
    var newDiv = 0;

    if(!this.div) { // Div darf nicht existieren, was nicht möglich ist
        newDiv = document.createElement("div");
        newDiv.id = this.id;
        newDiv.className = "dot";
        //newDiv.attachEvent('onmousedown',drgstr);
        //newDiv.attachEvent('onmouseup',drpstp);
        //newDiv.attachEvent('onscroll',drpstp);
        document.body.appendChild(newDiv);
        this.div = document.getElementById(this.id);
    }
    this.div.innerHTML =   this.txt;
    this.div.style.left =  this.left + "px";
    this.div.style.top =   this.top + "px";
    this.div.style.width = "auto"; // Wichtig, um offsetWidth auslesen zu können
    this.div.style.height = "auto"; // Wichtig, um offsetHeight auslesen zu können
    this.div.style.zIndex =   this.zInd; // Elemente unterlagernd darstellen
    //this.div.style.color = this.col; // Farbe zuweisen
    this.div.style.MozOpacity = this.opac/100;
    this.div.style.filter = "alpha(opacity="+this.opac+")";
    
    return 1;
}

CDot.prototype.setPos = function (x,y) 
{
    this.left = x;
    this.top = y;
}

CDot.prototype.startDot = function ()
{
    if(!this.iID) 
    {
        // Interval für jede Instanz setzen
        this.iID = window.setInterval(this.fctRfshPos, g_RfR);
    }
    else if(this.iID) 
    {
        window.clearInterval(this.iID);
    }
}

CDot.prototype.stopDot = function ()
{
    if(this.iID) 
    {
        window.clearInterval(this.iID);
    }
}
