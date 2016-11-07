function debugout(txt)
{
	var dbg = document.getElementById("debug");
	dbg.innerHTML = txt;
}

function mouseOverCatalog(index)
{	
      var divid = "shopbycatimg"+index;
	var curDiv = document.getElementById(divid);
	curDiv.className ="shopbycatimgexp";
	debugout(String(index)+"mouseover");
}
function mouseOutCatalog(index)
{
	var st = "sbtitle"+index;
	var stt = document.getElementById(st);
	var t = String(stt.innerHTML);
	if( t.length < 17)  //EXPAND
	{
		var divid = "shopbycatimg"+index;
		var curDiv = document.getElementById(divid);
		curDiv.className ="shopbycatimg";
	}
	debugout(String(index)+t.length);
}
	
function clickCatalog(index)
{
	var st = "sbtitle"+index;
	var stt = document.getElementById(st);
	if( stt.innerHTML == "CLICK TO COLLAPSE"){
		stt.innerHTML = "CLICK TO EXPAND";
	}
	else{
		stt.innerHTML = "CLICK TO COLLAPSE"
	}
}

