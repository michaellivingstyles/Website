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
		var callName = "genCatalog("+index+")";
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
		var conDiv = document.getElementById("catalogcontent"+ i);
		conDiv.style.display = "block";
	}
	for( var i = 1; i <= 3; i++)
	{
		var colDiv = document.getElementById("shopbycatcol"+ i);
		if( i < 3){
			colDiv.style.marginRight = "1.2821%";
		}
		if( i != (index % 3) )  colDiv.style.width = "32.905983%";
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
		var conDiv = document.getElementById("catalogcontent"+ i);
		conDiv.style.display = "none";
	}
	for( var i = 1; i <= 3; i++)
	{
		var colDiv = document.getElementById("shopbycatcol"+ i);
		if( i < 3){
			colDiv.style.marginRight = "2.5640%";
		}
		if( i != (index % 3) )  colDiv.style.width = "31.62393%";
	}
}

function genCatalog(index)
{
		var divid = "shopbycatimg"+ index;
		var curDiv = document.getElementById(divid);
		curDiv.style.marginBottom = "15px";
		for( var j = 1; j <= 3; j++)
		{
			var con = "";
			for (var i=1; i < 100; i++) {
				var path = "img/home"+index+"-"+j + "-" + i + ".jpg";
				var m= getImgMargin(j-1, i-1);
				if( m == -1) break;
				if( m == 0){ con += '<img src="'+path+'" />';}
			else{ con += '<img style="margin-right:15px;" src = "' + path+ '" />';}
			}
			divid = "catalogcontent" + j; 
			var conDiv = document.getElementById(divid);
			conDiv.innerHTML=con;
		}
}


function getImgMargin(col, n) {  
    var catalogImages1 = [[0,0],[0,1,0,1,0,0,1,0],[1,0,1,0,0]];
    if( n >= catalogImages1[col].length) return -1; 
    return catalogImages1[col][n];
}
