

  // Namen aller vorhandener Submenüs
  var g_subIDs = new Array("subStart","subBremstechniken","subTricks","subMaterial","subAbout","subLinks","subConfig");
  var g_subArray = new Array(g_subIDs.length);
  var g_fWdth = false;

  var ckiVal = getCookie("CSS");

  // aus Frame befreien 
  // if (self != top)  { 		
      // parent.location.href=self.location.href; 
  // } 

  // geladenes Cookie für diese Seite darstellen
  if(ckiVal) {
      var cfgVals = ckiVal.split(";");
      if(cfgVals[0]) {
          g_cssFil = cfgVals[0];
          g_fWdth = cfgVals[1];
      } 
  } else { // oder per Zufall auswählen
    var cssFiles = new Array("main.css",
                             "main_blub.css",
                             "main_yellow.css",
                             "main_yellob.css",
                             "main_red.css",
                             "main_pinb.css",
                             "main_green.css",
                             "main_greb.css",
                             "main_snyora.css",
                             "main_orab.css");
      g_cssFil = cssFiles[parseInt(Math.random()*cssFiles.length)];
  }
  document.getElementsByTagName('link')[0].href = "css/"+g_cssFil;
  
function init() {
  var url=location.search;
  
  /* -------- Submenüs erzeugen -------- */
  for(i=0; i<g_subIDs.length; i++) {
    g_subArray[i] = new CSub(g_subIDs[i]);
  }
  
  // Events 
  //document.onmouseup = hideSubs;

  if(url) { // && location.protocol=="http:"
      var parts=0;
      var array = url.split('/');
      parts=array.length;
      url = array[parts-2] + "/" + array[parts-1];
	
      // url = url.substring(1,url.length); // funktioniert nur online
  } else {
      url = "start/warum.htm";
  }

  // Seite in IFrame laden.
  main.location.href=url;

  // Seitenbreite an Menübreite anpassen (verzögert, da ansonsten problematisch)
  window.setTimeout("useFullWidth("+g_fWdth+")",200);
  // BUG: .checked = false; --> funktioniert nicht!
  if(g_fWdth) document.getElementById("chkFullWidth").checked = g_fWdth; 

}