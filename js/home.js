function debugout(txt)
{
	var dbg = document.getElementById("debug");
	dbg.innerHTML = txt;
}
/*-------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------*/
function mouseOverCatalog(index)
{	
      var divid = "shopbyhomeimg"+index;
	var curDiv = document.getElementById(divid);
	//debugout(String(index)+"mouseover"+curDiv.className);
	curDiv.className ="shopbyhomeimgexp";

}
function mouseOutCatalog(index)
{
	var st = "sbtitle"+index;
	var stt = document.getElementById(st);
	var t = String(stt.innerHTML);
	if( t.length < 17)  //EXPAND
	{
		var divid = "shopbyhomeimg"+index;
		var curDiv = document.getElementById(divid);
		//debugout(String(index)+"mouseover"+curDiv.className);
		curDiv.className ="shopbyhomeimg";
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
			var divid = "shopbyhomeimg"+ i;
			var anoDiv = document.getElementById(divid);
			anoDiv.style.display = "none";
		}
		var conDiv = document.getElementById("catalogcontent"+ i);
		conDiv.style.display = "block";
	}
	for( var i = 1; i <= 3; i++)
	{
		var colDiv = document.getElementById("shopbyhomecol"+ i);
		if( i < 3){
			colDiv.style.marginRight = "1.2821%";
		}
		if( i % 3 != (index % 3) )  colDiv.style.width = "32.905983%";
	}
}

function showCatalog(index)
{
	var divid = "shopbyhomeimg"+ index;
	var curDiv = document.getElementById(divid);
	curDiv.style.marginBottom = "30px";
	for( var i = 1; i <= 6; i++)
	{
		if( i != index){
			var divid = "shopbyhomeimg"+ i;
			var anoDiv = document.getElementById(divid);
			anoDiv.style.display = "block";
		}
		var conDiv = document.getElementById("catalogcontent"+ i);
		conDiv.innerHTML = "";
		conDiv.style.display = "none";
	}
	for( var i = 1; i <= 3; i++)
	{
		var colDiv = document.getElementById("shopbyhomecol"+ i);
		if( i < 3){
			colDiv.style.marginRight = "2.5640%";
		}
		if( i % 3 != (index % 3) )  colDiv.style.width = "31.62393%";
	}
}

function genCatalog(index)
{
		var divid = "shopbyhomeimg"+ index;
		var curDiv = document.getElementById(divid);
		curDiv.style.marginBottom = "15px";
		for( var j = 1; j <= 3; j++)
		{
			var con1 = "";
			var con2 = "";
			//var marginPercent = "3.8961%";
			//if( j == index % 3 ) marginPercent = "4.05405%";
			for (var i=1; i < 100; i++) {
				var path = "img/home"+index+"-"+j + "-" + i + ".jpg";
				var margin= getImgMargin(index-1, j-1, i-1);
				if( margin == -1)
				{
				 	if( index > 3 && i == 1)
				 	{
				 		con1 = "<img src=img/home-fill.jpg>";
				 	}
				 	break;
				}
				if(index < 4 ||  j != index % 3 || i == 1)
				{
						con1 += genImgrow(index, j, i, margin);
				}
				else{
						con2 += genImgrow(index, j, i, margin);
				}
				if( margin < 3)  i += margin;
				else if( margin == 3) i += 2;
			}
			divid = "catalogcontent" + j; 
			var conDiv = document.getElementById(divid);
			conDiv.innerHTML=con1;
			if( index > 3 &&  j == index % 3 ) 
			{
				divid = "catalogcontent" + index; 
				var conDiv = document.getElementById(divid);
				conDiv.innerHTML=con2;
			}
		}
}

function genImgrow(index, col, i, margin)
{
	var con = "";

	var path = "img/home"+index+"-"+col + "-" + i + ".jpg";
	con += '<div class="catalogimgrow" >';
	if( margin == 0)
	{
		con += '<div class="catalogimglink" >';
		con += '<a><img src="'+path+'" /><span>'+getImgTip(index-1, col-1, i-1)+'</span></a>';
	}
	else if( margin < 3){
		con += '<div class="catalogimgrowleft"><div class="catalogimglink" ><a><img src = "' 
				+ path+ '" /><span>'+getImgTip(index-1, col-1, i-1)+'</span></a></div></div>';
		path = "img/home"+index+"-"+col + "-" +( i+1) + ".jpg";
		con += '<div class="catalogimgrowright"><div class="catalogimglink" ><a><img src = "' + path + '"/><span>'+getImgTip(index-1, col-1, i)+'</span></a></div>';
		if( margin == 2)
		{
			path = "img/home"+index+"-"+col + "-" +( i+2) + ".jpg";
			con += '<div class="catalogimglink" ><a><img src="'+path+'"><span>'+getImgTip(index-1, col-1, i+1)+'</span></a></div>';
		}
	}else if( margin == 3){
		con += '<div class="catalogimgrowleft"><div class="catalogimglink" ><a><img src = "' 
				+ path+ '" /><span>'+getImgTip(index-1, col-1, i-1)+'</span></a></div>';
		path = "img/home"+index+"-"+col + "-" +( i+1) + ".jpg";
		con +=  '<div class="catalogimglink" ><a><img src = "' 
				+ path+ '" /><span>l'+getImgTip(index-1, col-1, i)+'</span></a></div>';
		path = "img/home"+index+"-"+col + "-" +( i+2) + ".jpg";
		con += '</div><div class="catalogimgrowright"><div class="catalogimglink" ><a><img src = "' + path + '"/><span>'+getImgTip(index-1, col-1, i+1)+'</span></a></div>';
	}else if( margin == 4){
		con += '<div class="catalogimgrowleft"><div class="catalogimglink" ><a><img src = "' 
				+ path+ '" /><span>'+getImgTip(index-1, col-1, i-1)+'</span></a></div></div>';
	}
	con += '</div></div><div class="clear"></div>';
	return con;
}

/*0: whole line 1:left right 2:left right right 3:left left right 4:left none*/
function getImgMargin(index, col, n) {  
    var catalogImages = [ [[0,0],[0,1,0,1,0,0,1,0],[1,0,3,0,0,4]],
    						[[0,0,1,0,1,0,2,0,0],[0,0,0,0],[0,0,1,0,1,0,1,0]],
    						[[0,0,1,0,0,0],[1,0,2,0,0,2,0,0],[0,0,0]],
    						[[],[0,1,0,0,1,0],[]],
    						[[0,0,1,0,0],[0,0,0],[0,0,1,0,0]],
    						[[0,1,0,0,0,0,1,0],[0,1,0,0,1,0],[0]] ];
    if( n >= catalogImages[index][col].length) return -1; 
    return catalogImages[index][col][n];
}

function getImgTip(index, col, n) {  
    var catalogImageTips= [ [["LOFT & BUNK BEDS","BED ACCESSORIES"],["BEDS","BEDHEADS","MATTRESSES","DRESSERS","WARDROBES","RUGS","WALLARTS","DECORS"],["BEDSIDES","TALLBOYS","ARMCHAIRS","BLANKET","LAMPS","COAT RACKS <br>& VALETS"]],
    						[["COFFEE TABLES","TV UNITS","SIDE TABLES","CONSOLE &<BR>HALL TABLES","ACCENT STOOLS","ACCENT<BR>CHESTS &<BR>CABINETS" ,"HALLWAY<BR>STANDS","STORAGE<BR>UNITS","SHOE<BR>CABINETS"],["DESIGNER REPLICAS","OTTOMANS","BEAN BAGS","RUGS"],["SOFAS & SOFA BEDS","ACCENT CHAIRS","BOOKCASES","DISPLAY<BR>SHELVES","PENDANTS","LAMPS","WALLARTS","DECORS"]],
    						[["DINING TABLES","SIDEBOARDS & BUFFETS","WINE RACKS","DISPLAY<BR>CABINETS","KITCHEN ISLANDS","RUGS"],["DINING<BR>CHAIRS","BAR STOOLS","HUTCH<BR>CABINETS","DINING<BR>STOOLS","BAR TABLES","PENDANTS","WALLARTS","DECORS"],["DINING BENCHES","KITCHENWARE","TABLEWARE"]],
    						[[],["DESKS","OFFICE<BR>CHAIRS","FILE<BR>CABINETS","OFFICE STORAGE","BOOKCASES","DESK LAMPS"],[]],
    						[["KIDS BEDS","KIDS TABLES & DESKS","KIDS CHAIRS","KIDS CHESTS<BR>& CABINETS","KIDS STORAGE"],["LOFT & BUNK BEDS","TOYS & PLAY","KIDS RUGS"],["COTS","CHANGING TABLES","BABY GEARS","BASSINETS<BR>& CRADLES","TODDLAR BED & COT<BR>MATTRESSES"]],
    						[["OUTDOOR TABLES","OUTDOOR<BR>CHAIRS","OUTDOOR<BR>STOOLS","OUTDOOR BENCHES","OUTDOOR SHELVES","OUTDOOR BEAN BAGS","HAMMOCKS<BR>&SWINGS","OUTDOOR<BR>HEATING"],["OUTDOOR DINING SETS","GAZEBOS &<BR>UMBRELLAS","DAY BEDS &<BR>SUN LOUNGES","OUTDOOR RUGS","OUTDOOR<BR>LIGHTS","OUTDOOR<BR>DECOR"],["OUTDOOR SOFAS &<BR>LOUNGE SETS"]] ];
    if( n >= catalogImageTips[index][col].length) return ""; 
    var tip = "<strong>"+catalogImageTips[index][col][n]+"</strong>";
    tip += "<br>125  Styles";
    return tip;
}

/*-------------------------------------------------------------------------------------------*/