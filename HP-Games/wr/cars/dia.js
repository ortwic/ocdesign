var i=1, j, id, anzahl;
var MSIE = navigator.userAgent.toLowerCase().indexOf("msie") > -1;

function init(val)
{
anzahl = val;

}

function data()
{
	if (document.getElementById("ds").style.zIndex==1)
		document.getElementById("ds").style.zIndex=4;
	else
		document.getElementById("ds").style.zIndex=1;
}

function prev()
{
	for(i=1;i<=anzahl;i++)
	{
	if (document.getElementById(i).style.zIndex==3) 
		{

			if (i!=1)
				j=i-1;
			else
				j=anzahl;

			if (document.getElementById("check").style.color!="black")  { 
				if (MSIE && document.all) {
					document.getElementById("prev").style.visibility="hidden";
					document.getElementById("next").style.visibility="hidden";
					document.getElementById(i).filters.alpha.opacity=0;
					document.getElementById(j).style.zIndex=3;
					iefade(100,0);
				}
				else {
					document.getElementById("prev").style.visibility="hidden";
					document.getElementById("next").style.visibility="hidden";
					document.getElementById(j).style.opacity=0;
					document.getElementById(j).style.zIndex=3;
					mozfade(1.0,0); 
				}
				break;
			} 
			else
				document.getElementById(j).style.zIndex=3;
			document.getElementById(i).style.zIndex=1;
			break;
		}
	}
}

function next()
{
	for(i=1;i<=anzahl;i++)
	{
	if (document.getElementById(i).style.zIndex==3) 
		{
			if (i!=anzahl)
				j=i+1;
			else
				j=1;

			if (document.getElementById("check").style.color!="black")  { 
				if (MSIE && document.all) {
					document.getElementById("prev").style.visibility="hidden";
					document.getElementById("next").style.visibility="hidden";
					document.getElementById(i).filters.alpha.opacity=0;
					document.getElementById(j).style.zIndex=3;
					iefade(100,0);
				}
				else {
					document.getElementById("prev").style.visibility="hidden";
					document.getElementById("next").style.visibility="hidden";
					document.getElementById(j).style.opacity=0;
					document.getElementById(j).style.zIndex=3;
					mozfade(1.0,0); 
				}
				break;
			} 
			else
				document.getElementById(j).style.zIndex=3;
			document.getElementById(i).style.zIndex=1;
			break;

		}
	}
}

function iefade(a,b)
{
	document.getElementById(i).filters.alpha.opacity = a;
	document.getElementById(j).filters.alpha.opacity = b;

	a-=5;
	b+=5;
	if (a>0)

		id = setTimeout("iefade("+a+","+b+")", 4); 
	else {
		document.getElementById(i).style.zIndex=1;
		document.getElementById(i).filters.alpha.opacity = 100;
		document.getElementById("prev").style.visibility="visible";
		document.getElementById("next").style.visibility="visible";
	}
}

function mozfade(a,b)
{
	var c = new Number(a);
	var d = new Number(b);
	document.getElementById(i).style.opacity = c;
	document.getElementById(j).style.opacity = d;

	c-=0.05;
	d+=0.05;
	if (a>0) 
		id = setTimeout("mozfade("+c+","+d+")", 4);
	else {
		document.getElementById(i).style.zIndex=1;
		document.getElementById(i).style.opacity = 1.0;
		document.getElementById("prev").style.visibility="visible";
		document.getElementById("next").style.visibility="visible";
	}
}

function sw() //Überprüfen ob Haken gesetzt ist.
{
	if (document.getElementById("check").style.color=="black")
		document.getElementById("check").style.color="#FFC000";
	else {
		document.getElementById("check").style.color="black";
		clearTimeout(id);
		document.getElementById("prev").style.visibility="visible";
		document.getElementById("next").style.visibility="visible";

		/*for(k=1;k<=anzahl;k++) 
			document.getElementById(k).filters.alpha.opacity = 100;
			document.getElementById(k).style.opacity = 1.0;		
		*/
		/*	document.getElementById("2").filters.alpha.opacity = 100;
			document.getElementById("3").filters.alpha.opacity = 100;
			document.getElementById("4").filters.alpha.opacity = 100;
		*/
		}
}