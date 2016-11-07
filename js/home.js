function debugout(txt)
{
	var dbg = document.getElementById("debug");
	dbg.innerHTML = txt;
}

function mouseOverCatalog(index)
{	
      var divid = "shopbycatimg"+index;
	var curDiv = document.getElementById(divid);
	//debugout(String(index)+"mouseover"+curDiv.className);
	curDiv.className ="shopbycatimgexp";

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
		//debugout(String(index)+"mouseover"+curDiv.className);
		curDiv.className ="shopbycatimg";
	}
}
	
function clickCatalog(index)
{
	var divid = "sbtitle"+index;
	var stt = document.getElementById(divid);
	if( stt.innerHTML == "CLICK TO COLLAPSE"){
		stt.innerHTML = "CLICK TO EXPAND";
		showCatalog(index);
	}
	else{
		stt.innerHTML = "CLICK TO COLLAPSE";
		var callName = "genCatalog"+index+"()";
		eval(callName);
		hideCatalog(index);
	}
}

function hideCatalog(index)
{
	for( var i = 1; i <= 6; i++)
	{
		if( i != index){
			var divid = "shopbycatimg"+ i;
			var anoDiv = document.getElementById(divid);
			anoDiv.style.display = "none";
		}
	}
	for( var i = 1; i <= 3; i++)
	{
		var conDiv = document.getElementById("catalogcontent"+ i);
		conDiv.style.display = "block";
	}
}

function showCatalog(index)
{
	var divid = "shopbycatimg"+ index;
	var curDiv = document.getElementById(divid);
	curDiv.style.marginBottom = "30px";
	for( var i = 1; i <= 6; i++)
	{
		if( i != index){
			var divid = "shopbycatimg"+ i;
			var anoDiv = document.getElementById(divid);
			anoDiv.style.display = "block";
		}
	}
	for( var i = 1; i <= 3; i++)
	{
		var conDiv = document.getElementById("catalogcontent"+ i);
		conDiv.style.display = "none";
	}
}
function genCatalog1()
{
		var index = 1;
		var divid = "shopbycatimg"+ index;
		var curDiv = document.getElementById(divid);
		curDiv.style.marginBottom = "15px";
		divid = "catalogcontent" + index; 
		var conDiv = document.getElementById(divid);
		var path = "img/home1-1-1.jpg,0,img/home1-1-2.jpg,0";
		var p = path.split(",");
		var con = "";
		var len = p.length;
		for (var i=0; i < len; i+=2) {
			if( p[i+1] > 0) con += '<img style="margin-right:'+p[i+1]+'px;" src = "' + p[i] + '" />';
			else con += '<img src="'+p[i]+'" />';
		}
		conDiv.innerHTML=con;
}

