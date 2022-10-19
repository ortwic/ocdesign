/* *********** */
/* * init.js * */
/* *********** */

MSIE = !!document.attachEvent; //navigator.userAgent.toLowerCase().indexOf("msie") > -1;
g_HiBw = !(location.href.indexOf("hd=off") > -1);               // High-Detail on/off

/* Script erzeugt, lädt und positioniert Grafiken */
/* ---- Globale Variablen definieren ---- */

// Hash, der alle Klassenreferenzen von 'Window' enthalten wird
var g_AllWindows = new Object();
var g_CurWindowId;
var g_IndWndws = 0;
    
// Innere Fenstermaße
var g_wdwWidth = 1280, g_wdwHeight = 768;

// Variablen für Logoanimation
var g_kspd=60;    
var g_bars=0;

// Variablen für Lichter
var g_spdLit = 20; 
var g_litS1Obj=0, g_litL1Obj=0;
var g_iAniLitS1=0, g_iAniLitL1=0;

var g_content;
    
// document.domain = "bplaced.net"

if(g_HiBw && !MSIE) {
    
    // load Scripts
    // loadScript("dhtml/classes.js"); // Nachladen macht Probleme in Chrome
    
    // Script Prototype Window
    // loadScript("dhtml/protwin/prototype.js");
    // loadScript("dhtml/protwin/effects.js");
    // loadScript("dhtml/protwin/window.js");
    // loadScript("dhtml/protwin/window_effects.js");
    
    document.write("<div id='loading'><div id='bg'></div><table><tr><td></td><td>\
                    <h1 class='h1' id='lblbar' style='text-indent:12px'>Seite&nbsp;wird&nbsp;geladen</h1>\
                    <h1 class='h1 bar' id='pgrbar'>&nbsp;</h1>\
                    </td>\<td></td></tr></table></div>");
    
    addEvent(this, "DOMContentLoaded", function() { // wird beim Seitenaufbau ausgeführt, evtl. fehleranfälliger
        
        // Progressbar füllen
        window.loadingDone = drwLoadingBars(98, 20);
        
        var g_content = document.getElementById("content");
        g_content.style.display = "none";
        
        {               
            // Preload star images
            g_litS1Obj = document.createElement("img");
            g_litS1Obj.className = "litS";
            g_litS1Obj.src = "img/litS1.png";
            document.getElementById("main").appendChild(g_litS1Obj);
            g_litL1Obj = document.createElement("img");
            g_litL1Obj.className = "litL";
            g_litL1Obj.src = "img/litL1.png";
            document.getElementById("main").appendChild(g_litL1Obj);
            
            // Draw Bar Blocks
            g_bars = BarBlocks( { bgBarBlockLeft: document.getElementById("bgBarBlockLeft"), 
                                  bgBarBlockTop: document.getElementById("bgBarBlockTop")
                                }, this ); // this-pointer for re-init onresize event
            g_bars.setNextAni( function() { aniLitS(g_litS1Obj, g_wdwWidth); } );
            
        }
    });
    
}
   
  /* ---- Script lädt Menü nach, wenn       ---- */
  /* ---- Benutzer von Unterseite eintritt. ---- */
  
// Nur wenn was nach dem "?" in der uri steht
if(location.search) { // && location.protocol=="http:" 
    var url=location.search;
    var parts=0;
    var array = url.split('/');
    parts = array.length;
    url = array[parts-2] + "/" + array[parts-1];

    // url = url.substring(1,url.length); // funktioniert nur online

    ////////// funktioniert so nicht ////////////
    // Seite in neuem Unterfenster laden
    // newWindow(url,url);
    // Zeile vermeidet, dass Seite in einer Endlosschleife aufgerufen wird
    // location.href = location.href.substring(0, location.href.indexOf("?"));
}

// setTimeout("init()", 6500); // offline Testing    
addEvent(this, "load", init);
function init() {

    function showIEWarning() {
        var firefox = "http://www.mozilla.org/de/firefox";
        alert("Sie nutzen den " + navigator.appName + "!\n\n" +
                "Sie wurden auf die Low-Detail Version umgeleitet, da diese Seite nicht " +
                "auf Ihren Browser optimiert wurde. Bitte verwenden Sie einen anderen " +
                "Browser, wie beispielsweise Firefox von " + firefox + ".\n\n" + 
                "");
        // window.setTimeout(function() { window.location = hpv4; }, 10000);
        // return 0;
        
        // addEvent(document.getElementById("btnWarningOk"), "click", function() { 
            // warningDlg.style.display = "none";
        // });

    }
    
    // Überwachen, ob Fenstergröße verändert wird
    addEvent(this, "resize", reSize);
    reSize();
    if(g_HiBw && !MSIE) {
        initHiBw();
    } else {
        
    }
    
    // document.getElementsByTagName("body")[0].style.backgroundImage = "url('img/navBg.jpg')";
    // document.getElementById("main").style.display = "block";
    
    /* ==== Buttons initialisieren ==== */
    cmdDivs = document.getElementsByName("mainMenuItem"); // IE needs id-attribute set to get this elements
    for( i = 0; i < cmdDivs.length; ++i ) {
        if( cmdDivs[i].tagName == "DIV" ) {
            id = cmdDivs[i].attributes.rel.value;
            new CButton(cmdDivs[i]); // Main-Menu
            if(id) new CSub(id); // Sub-Menu
        }
    }
    
    if(MSIE && g_HiBw) {
        g_HiBw = false;
        showIEWarning();
    }
    
    // divs = document.getElementsByTagName("DIV");
    // for( i = 0; i < divs.length; ++i ) {
        // divs[i].style.border = "1px solid yellow";
        // if(divs[i].id) {
            // divs[i].innerHTML = "<div style='position:absolute;bottom:0;z-index:50000;\
            // background:yellow;color:black;font-size:6pt'>" + divs[i].id + "</div>" + divs[i].innerHTML;
        // }
    // }
    if(typeof loadingDone == "function") {
        loadingDone();
        loadingDone = null;
    }
}

function initHiBw() {            
    // Animationen starten //           // regelt wie lange der Abstand der Animationen sein soll
    setInterval(function() { g_bars.startAni(); }, 20000); 
       
    // Logo-Animation 
    var aniLogo = function(obj, offset) {
        var h = 93, count = 101, cur = offset * h;        
        return setInterval(function() {
            cur = (cur - h) % (h * count);
            obj.style.backgroundPosition = "0px " + cur + "px";
        }, g_kspd);  
    };    
    var ocAni = document.getElementById("ocAni");
    ocAni.className = "";
    [25, 88, 76, 64].forEach(function(k) {
        aniLogo(oc.dom.createDiv("ocAni ocAni" + k, ocAni), k);
    });
    
    // HTML5: onmessage-event für XSS
    // http://help.dottoro.com/ljjqtjsj.php
    addEvent(this, "message", function (e) {
        title = e.data.split('&')[1];
        showStat(title ? title + " wurde geladen." : "Seite nicht gefunden!", true );
    });
    
    main = document.getElementById("main_content");
    links = document.getElementsByName("navA");
    for(i in links) {
        addEvent(links[i], "click", function(e) { 
            var title = e.target.title;
            showStat(title + " wird geladen...<br>", true);
            var rel = (e.target.attributes.rel) ? e.target.attributes.rel.value.split(',') : '' ;
            
            // TODO
            // g_AllWindows[g_CurWindowId] = newWindow(e.target.title, "loading..."); 
            
            // Alternative IFrames
            var name = title.toLowerCase() + "_content";
            var iframe = "<iframe frameborder='0' id='" + name + "' src='" + e.target + 
                         "' width='100%' height='100%'> </iframe>";
            newWindow(title, iframe, rel);
        });
    }    
    
    // Willkommensfenster anzeigen
    newWindow("Redirection >> Design >> OC.Modelling", 
              "If you're searching for mods for games like Need For Speed/World Racing etc. please head to... <br><br>" + 
              "<i><b>>> Left menu >> Design >> OC.Modelling</b></i>", 
              // "<a href='../content/design/addons.html' target='main' rel='0,500' title='OC.Modeling' rev='840'>OC.Modeling</a>", 
                [640,40,120,540], 
                { nav: false, min: false, max: false, dest: true});
                
    var iframe = "<iframe frameborder='0' id='start_content' src='../content/home/start.htm' width='100%' height='100%'> </iframe>";
    newWindow("Willkommen", iframe, [400,200,240,160], 
              { nav: false, min: false, max: false, dest: true});
              
    
}

/* ************************************** */
/* **** Fenster mit dem Seiteninhalt **** */
/* ************************************** */
function newWindow(title, content, size, para) {
    var left    = (size && size[2] > 0) ? size[2] : 160 + g_IndWndws*12;
    var top     = (size && size[3] > 0) ? size[3] : 100 + g_IndWndws*22;
    var width   = (size && size[0] > 0) ? size[0] : (g_wdwWidth > 990) ? width = 771 : g_wdwWidth - 240;
    var height  = (size && size[1] > 0) ? size[1] : g_wdwHeight - 270;
    var zInd    = 100 + g_IndWndws;
    var minWidth = 360, minHeight = 80, maxWidth = 1040;
    
    // var name = title.toLowerCase() + "_content";
    // var hist = "javascript:document.getElementById(\"" + name + "\").contentWindow.history"
    // var titlebar = //"<a href='" + hist + ".back()' target='" + name + "'>&lt;&lt;</a>" + " &nbsp;" +
                   //"<a href='" + hist + ".forward()' target='" + name + "'>&gt;&gt;</a>" + " &nbsp; " + 
                   // title;// + " - " + name;
    // content = "<iframe frameborder='0' id='" + name + "' src='" + content + "' width='100%' height='100%'> </iframe>";
        
    g_IndWndws++;
    g_CurWindowId = title;
    if(!g_AllWindows[g_CurWindowId]) {
        g_AllWindows[g_CurWindowId] = new Window( {
            className: "brightHpv4Wdw", 
            blurClassName: "darkHpv4Wdw", 
            title: title, 
            left: left, 
            top: top, 
            width: width, 
            height: height, 
            minWidth: minWidth, 
            minHeight: minHeight, 
            maxWidth: maxWidth, 
            zIndex: zInd,
            minimizable: (para && typeof(para.min) != "undefined") ? para.min : true, 
            maximizable: (para && typeof(para.max) != "undefined") ? para.max : true, 
            destroyOnClose: (para && typeof(para.dest) != "undefined") ? para.dest : false
        } ); 
        g_AllWindows[g_CurWindowId].setHTMLContent( content );
    }
    else 
    {
        g_AllWindows[g_CurWindowId].setHTMLContent( content );
    }
    g_AllWindows[g_CurWindowId].show();
    g_AllWindows[g_CurWindowId].toFront();
}

function pushWindowsInBg(bg) {    
    for( k in g_AllWindows ) {
        var zInd = parseInt(g_AllWindows[k].getZIndex());
        
        if(bg && zInd > 0) {
            // showStat( "<br>" + k + ": " + g_AllWindows[k].getZIndex() ); // !! Debug
            g_AllWindows[k].setZIndex(g_AllWindows[k].getZIndex()-5000); // Neuen zIndex laden (Bug: setzt Fenster aktiv)

        } else {
            if(zInd < 99)
            {
                g_AllWindows[k].setZIndex(5000+zInd); // Neuen zIndex laden (Bug: setzt Fenster aktiv)
            }
        }
    }
}

/* **** Funktion zum neuen Arangieren des Fensterinhalts, wenn Fenstergröße verändert wurde **** */
function reSize() {
    // Fenstermaße einlesen
    g_wdwWidth = document.body.clientWidth ? document.body.clientWidth : window.innerWidth;
    g_wdwHeight = document.body.clientHeight ? document.body.clientHeight : window.innerHeight;
    
    // Ausgabe d. inneren Auflösung
    // showStat(g_wdwWidth + " x " + g_wdwHeight, true); 
    
    // rechter FadeOut Hintergrund
    curObj = document.getElementById("fO");
    curObj.style.width = (g_wdwWidth > 1280) ? g_wdwWidth - 1260 : 10;
}

function aniLitS(obj, left) {
    var g_LineRow2Max = 24; // TODO!
    var leftIdentR2   = 320 - 16; // Scheitelpunkt von Links, muss konstant sein, da Grafik nicht skalierbar
    var aR2 = g_LineRow2Max / (888e2); // Streckungsfaktor // warum 888 und nicht 222?
    var topIdentR2 = 60 - 16; // Einrückung von Oben
    var minLeft = document.getElementById("logoBg").offsetLeft;//+document.getElementById("logoBg").offsetWidth;
    var top;
    
    obj.style.display = "block";
    
    if(obj)
    {
        // Parabel-Formel
        // f(top) = aR2*Math.pow(left-leftIdentR2,2)+topIdentR2;
        top = aR2*Math.pow((left-leftIdentR2),2)+topIdentR2;
                
        obj.style.left =  left + "px";
        obj.style.top =   parseInt(top) + "px";
        
        //showStat(parseInt(top)+"; "+left+"<br>");
        
        left -= 32;
        
        if(left>minLeft)
        {
            setTimeout("aniLitS(g_litS1Obj,"+left+")",g_spdLit);
        }
        else
        {
            obj.style.display="none";
            aniLitL(g_litL1Obj);
        }
    }
}

function aniLitL(obj, deltaWH) {
    var top, left, width, opac;
    var maxWidth=256*2; // sollte 2^n betragen
    
    // Ausrichtung an Logokoordinaten
    var logo=document.getElementById("logoBg");
    top = logo.offsetTop + logo.offsetHeight/2;
    left = logo.offsetLeft + logo.offsetWidth/2;
    
    if(!deltaWH) deltaWH=maxWidth; // zu addierendes Differenzmaß initialisieren, wenn nicht vorhanden
    
    obj.style.display="block";
    
    if(obj)
    {
        if(parseInt(deltaWH)>0)
        {
            width = parseInt(maxWidth - deltaWH);
            //left -= parseInt(deltaWH/2);
            top -= width/2;
            left -= width/2;
            opac = deltaWH/maxWidth; // deltaWH/=2 --> f(x) = -e^x
            
            obj.style.top =   top + "px";
            obj.style.left =  left + "px";
            obj.style.width =  width + "px";
            obj.style.height =  width + "px";
            
            // Transparenz anwenden
            if(MSIE && obj.filters.alpha) {
                obj.filters.alpha.opacity = opac *100;
            } else { //if(obj.style.opacity) {
                obj.style.opacity = opac;
            }
            
            deltaWH /= 1.5; 
                            
            setTimeout("aniLitL(g_litL1Obj,"+deltaWH+")",g_spdLit);
        }
        else
        {
            obj.style.display="none";
        }
    }
}

function drwLoadingBars(max, speed) {
    var cur = 0;    // max = 98; //147;
    var bar = document.getElementById("pgrbar");
    document.getElementById("loading").style.display = "block";
    
    var isLoading = setInterval(function() {
        r = 255 - cur * 241 / max;      // BG-Blau wirds mit 241, 131, 92
        g = 192 - cur * 60 / max;       // Dunkelrot mit 90, 192, 0
        b = cur * 253 / max;          // Hellblau mit 241, 60, 253
        color="#"+RGB2Hex(r,g,b);
        //showStat(parseInt(r) + ", " + parseInt(g) + ", " + parseInt(b) + "<br/>" + color + "<br/>" + 255/max); // Debug
        bar.innerHTML += "<font color='" + color + "'>I</font>";
        if(++cur > max) { clearInterval(isLoading); }
    }, speed);
    
    return function() {
        clearInterval(isLoading);
        //bar.style.display = "none";
        document.getElementById("loading").style.display="none";    
    };
}

function showStat(string, override) {
    // override = false;
    // println(string, document.getElementById("stat"));
    document.getElementById("stat").innerHTML = string;
}

/* ---- Scripte, zum Konvertieren der Farbwerte ---- */

function RGB2Hex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(N) {
    if (N==null) return "00";
    N=parseFloat(N); 
    if (N==0 || isNaN(N)) return "00";
    N=Math.max(0,N); 
    N=Math.min(N,255); 
    N=Math.round(N);
    return "0123456789ABCDEF".charAt((N-N%16)/16) + "0123456789ABCDEF".charAt(N%16);
}

function Hex2RGB(h) {
    if(!h) return 0;

    var RGB = new Array();
    var s=0;
    if(h.charAt(0)=="#") s++;
    
    RGB[0] = parseInt(h.substring(0+s,2+s),16);
    RGB[1] = parseInt(h.substring(2+s,4+s),16);
    RGB[2] = parseInt(h.substring(4+s,6+s),16);
    
    return RGB;
}
