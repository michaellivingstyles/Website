/* jQuery Mega Menu v1.02
* Last updated: June 29th, 2009. This notice must stay intact for usage 
* Author: JavaScript Kit at http://www.javascriptkit.com/
* Visit http://www.javascriptkit.com/script/script2/jScale/ for full source code
*/

jQuery.noConflict();

function genText( txt, sub )
{
	var s = txt.indexOf(sub);
	if( s < 0) return '';
	var e = txt.substring(s+sub.length);
	return txt.substring(0, s)+"<strong>"+sub+"</strong>"+e;
}

(function($) {
	$.fn.autocomplete = function(params) {
		
		//Selections
		var currentSelection = -1;
		var currentProposals = [];
		
		//Default parameters
		params = $.extend({
			hints: [],
			onSubmit: function(text){},
			onBlur: function(){}
		}, params);

		//Build messagess
		this.each(function() {
			//Container
			var searchContainer = $(".autocomplete-container");
			var input = $("#stext");
			//Proposals
			var proposals = $('#skey')  //$('<div></div>') //
			var proposalList = $('<p></p>')
			proposals.append(proposalList);
			input.keydown(function(e) {
				switch(e.which) {
					case 38: // Up arrow
					e.preventDefault();
					$('ul.proposal-list li').removeClass('selected');
					if((currentSelection - 1) >= 0){
						currentSelection--;
						$( "ul.proposal-list li:eq(" + currentSelection + ")" )
							.addClass('selected');
					} else {
						currentSelection = -1;
					}
					break;
					case 40: // Down arrow
					e.preventDefault();
					if((currentSelection + 1) < currentProposals.length){
						$('ul.proposal-list li').removeClass('selected');
						currentSelection++;
						$( "ul.proposal-list li:eq(" + currentSelection + ")" )
							.addClass('selected');
					}
					break;
					case 13: // Enter
						if(currentSelection > -1){
							var text = $( "ul.proposal-list li:eq(" + currentSelection + ")" ).html();
							input.val(text);
						}
						currentSelection = -1;
						proposalList.empty();
						params.onSubmit(input.val());
						break;
					case 27: // Esc button
						currentSelection = -1;
						proposalList.empty();
						input.val('');
						break;
				}
			});
				
			input.bind("change paste keyup", function(e){
				if(e.which != 13 && e.which != 27 
						&& e.which != 38 && e.which != 40){				
					currentProposals = [];
					currentSelection = -1;
					proposalList.empty();
					if(input.val() != '' && input.val().length >= 3){
						searchContainer.show(); 
						var word = "^" + input.val() + ".*";
						proposalList.empty();
						for(var test in params.hints){
							if(params.hints[test].match(word)){
								currentProposals.push(params.hints[test]);	
								var element = $('<dd></dd>')
									.html(genText(params.hints[test],input.val()));
								proposalList.append(element);
							}
						}
					}
					else searchContainer.hide();
				}
			});
			
			input.blur(function(e){
				currentSelection = -1;
				//proposalList.empty();
				params.onBlur();
			});
			//searchContainer.append(proposals);		
		});

		return this;
	};

})(jQuery);

var jkmegamenu={

maxwidth: 1170,
effectduration: 300, //duration of animation, in milliseconds
delaytimer: 200, //delay after mouseout before menu should be hidden, in milliseconds
showtimer: 400,
//No need to edit beyond here
megamenulabels: [],
megamenus: [], //array to contain each block menu instances
zIndexVal: 1000, //starting z-index value for drop down menu
$shimobj: null,

addshim:function($){
	$(document.body).append('<IFRAME id="outlineiframeshim" src="'+(location.protocol=="https:"? 'blank.htm' : 'about:blank')+'" style="display:none; left:0; top:0; z-index:999; position:absolute; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)" frameBorder="0" scrolling="no"></IFRAME>')
	this.$shimobj=$("#outlineiframeshim")
},

alignmenu:function($, e, megamenu_pos){
	var megamenu=this.megamenus[megamenu_pos]
	var firstmenu = this.megamenus[0]
	var $anchor=megamenu.$anchorobj
	var $menu=megamenu.$menuobj
	var menuleft= firstmenu.offsetx
	//($(window).width()-(megamenu.offsetx-$(document).scrollLeft())>megamenu.actualwidth)? megamenu.offsetx : megamenu.offsetx-megamenu.actualwidth+megamenu.anchorwidth //get x coord of menu
	//var menutop=($(window).height()-(megamenu.offsety-$(document).scrollTop()+megamenu.anchorheight)>megamenu.actualheight)? megamenu.offsety+megamenu.anchorheight : megamenu.offsety-megamenu.actualheight
	if( menuleft < 0) menuleft = 0
	var menutop=megamenu.offsety+megamenu.anchorheight  //get y coord of menu
	$menu.css({left:menuleft+"px", top:menutop+"px"})
	if( $(window).width() < this.maxwidth){ 
				var m = document.getElementById("megamenu1")
				m.style.width =  $(window).width()+"px"
				var dbg = document.getElementById("debug")
				dbg.innerHTML = "xxwidth="+m.style.width
				megamenu.actualwidth = $(window).width()
	}
	else{
		var m = document.getElementById("megamenu1")
		m.style.width =  this.maxwidth+"px"
		megamenu.actualwidth = this.maxwidth
	}
	this.$shimobj.css({width:megamenu.actualwidth+"px", height:megamenu.actualheight+"px", left:menuleft+"px", top:menutop+"px", display:"block"})
},

showmenu:function(e, megamenu_pos){
	var megamenu=this.megamenus[megamenu_pos]
	var $menu=megamenu.$menuobj
	var $menuinner=megamenu.$menuinner
	if ($menu.css("display")=="none"){
		this.alignmenu(jQuery, e, megamenu_pos)
		$menu.css("z-index", ++this.zIndexVal)
		$menu.show(this.effectduration, function(){
			$menuinner.css('visibility', 'visible')
		})
	}
	else if ($menu.css("display")=="block" && e.type=="click"){ //if menu is hidden and this is a "click" event (versus "mouseout")
		this.hidemenu(e, megamenu_pos)
	}
	return false
},

hidemenu:function(e, megamenu_pos){
	var megamenu=this.megamenus[megamenu_pos]
	var $menu=megamenu.$menuobj
	var $menuinner=megamenu.$menuinner
	$menuinner.css('visibility', 'hidden')
	this.$shimobj.css({display:"none", left:0, top:0})
	$menu.hide(this.effectduration)
	megamenu.$anchorobj.css('border-bottom', '0px solid #FFF')
},

definemenu:function(anchorid, menuid, revealtype){
	this.megamenulabels.push([anchorid, menuid, revealtype])
},

render:function($){
	for (var i=0, labels=this.megamenulabels[i]; i<this.megamenulabels.length; i++, labels=this.megamenulabels[i]){
		if ($('#'+labels[0]).length!=1 || $('#'+labels[1]).length!=1) //if one of the two elements are NOT defined, exist
			return
		this.megamenus.push({$anchorobj:$("#"+labels[0]), $menuobj:$("#"+labels[1]), $menuinner:$("#"+labels[1]).children('ul:first-child'), revealtype:labels[2], hidetimer:null, showtimer:null})
		var megamenu=this.megamenus[i]	
		megamenu.$anchorobj.add(megamenu.$menuobj).attr("_megamenupos", i+"pos") //remember index of this drop down menu
		megamenu.actualwidth=megamenu.$menuobj.outerWidth()
		megamenu.actualheight=megamenu.$menuobj.outerHeight()
		megamenu.offsetx=megamenu.$anchorobj.offset().left
		megamenu.offsety=megamenu.$anchorobj.offset().top
		megamenu.anchorwidth=megamenu.$anchorobj.outerWidth()
		megamenu.anchorheight=megamenu.$anchorobj.outerHeight()
		$(document.body).append(megamenu.$menuobj) //move drop down menu to end of document
		megamenu.$menuobj.css("z-index", ++this.zIndexVal).hide()
		megamenu.$menuinner.css("visibility", "hidden")
		megamenu.$anchorobj.bind(megamenu.revealtype=="click"? "click" : "mouseenter", function(e){
			this.setAttribute("style","border-bottom:3px solid #000")
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			menuinfo.showtimer=setTimeout(function(){ //add delay before hiding menu
					jkmegamenu.showmenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_megamenupos")))
				}, jkmegamenu.showtimer)
			clearTimeout(menuinfo.hidetimer) //cancel hide menu timer
			//return jkmegamenu.showmenu(e, parseInt(this.getAttribute("_megamenupos")))
		})
		megamenu.$anchorobj.bind("mouseleave", function(e){
			//this.setAttribute("style","border-bottom:3px solid #FFF")
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			if (e.relatedTarget!=menuinfo.$menuobj.get(0) && $(e.relatedTarget).parents("#"+menuinfo.$menuobj.get(0).id).length==0){ //check that mouse hasn't moved into menu object
				menuinfo.hidetimer=setTimeout(function(){ //add delay before hiding menu
					jkmegamenu.hidemenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_megamenupos")))
				}, jkmegamenu.delaytimer)
			}
			clearTimeout(menuinfo.showtimer) 
		})
		megamenu.$menuobj.bind("mouseenter", function(e){
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			//menuinfo.$anchorobj.css('border-bottom', '3px solid #000')
			clearTimeout(menuinfo.hidetimer) //cancel hide menu timer
		})
		megamenu.$menuobj.bind("click mouseleave", function(e){
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			menuinfo.hidetimer=setTimeout(function(){ //add delay before hiding menu
				jkmegamenu.hidemenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_megamenupos")))
			}, jkmegamenu.delaytimer)
		})
	} //end for loop
	if(/Safari/i.test(navigator.userAgent)){ //if Safari
		$(window).bind("resize load", function(){
			for (var i=0; i<jkmegamenu.megamenus.length; i++){
				var megamenu=jkmegamenu.megamenus[i]
				var $anchorisimg=(megamenu.$anchorobj.children().length==1 && megamenu.$anchorobj.children().eq(0).is('img'))? megamenu.$anchorobj.children().eq(0) : null
				if ($anchorisimg){ //if anchor is an image link, get offsets and dimensions of image itself, instead of parent A
					megamenu.offsetx=$anchorisimg.offset().left
					megamenu.offsety=$anchorisimg.offset().top
					megamenu.anchorwidth=$anchorisimg.width()
					megamenu.anchorheight=$anchorisimg.height()
				}
			}
		})
	}
	else{
		$(window).bind("resize", function(){
			for (var i=0; i<jkmegamenu.megamenus.length; i++){
				var megamenu=jkmegamenu.megamenus[i]	
				megamenu.offsetx=megamenu.$anchorobj.offset().left
				megamenu.offsety=megamenu.$anchorobj.offset().top
			}
			var dbg = document.getElementById("debug");
			dbg.innerHTML = jkmegamenu.megamenus[0].$anchorobj.attr("style")+"xxx"+$(window).width()+jkmegamenu.megamenus.length+"--"+jkmegamenu.megamenus[jkmegamenu.megamenus.length-1].offsetx;
		})
	}
	jkmegamenu.addshim($)
}

}

function getCata(cata)
{
	var c = [["BEDROOM","LIVING & HALLWAY","DINING & KITCHEN","KIDS & BABY","HOME OFFICE","DESIGNER REPLICAS","BATHROOM & LAUNDRY"],["Decor Accents","Wall Decor","Textiles","Candles & Incense","Giftware","Storage & Display","	Outdoor Decor"],["Ceiling Lights","Lamps","Wall Lights","Outdoor Lights","Other Lighting","Fans & Heaters"],["Door Mats","Shag Rugs","Modern Rugs","Oriental Rugs","Kids Rugs","Outdoor Rugs","Runner Rugs","Round Rugs","Wool Rugs","Jute Rugs","Cotton Rugs","Hide Rugs"],["Cookware","Bakeware","Kitchen Knives & Accs","Tableware","Glassware","Kitchen Accessories","Kitchen Appliances","Storage & Disposal"],["Outdoor","Pet Supplies"]]
	var href = []
	return c[cata]
}

function getCataContent(cata, index)
{
	var c =[ [["Beds","Loft & Bunk Beds","Bed Heads", "Bedside Tables","Tallboys",					"Dressers","Mattresses","Mattress Bases","Wardrobes","Blanket Boxes","Bed Accessories","Coat Racks & Valets","Bedroom Suites" ], ["Coffee Tables","TV Units","Sofas & Sofa Beds","Accent Chairs","Side Tables","Console & Hall Tables","Bookcases","Display Shelves","Accent Chests & Cabinets","Storage & Wall Units","Hallway Stands","Ottomans","Shoe Cabinets","Accent Stools","Bean Bags","Room Dividers"],["Dining Table Sets","Dining Tables","Dining Chairs","Dining Benches","Dining Stools","Bar Tables","Bar Stools","Sideboards & Buffets","Hutch Cabinets","Display Cabinets","Wine Racks & Bar","Kitchen Islands"],["Loft & Bunk Beds","Kids Beds","Kids Tables & Desks","Kids Chairs","Kids Chests & Cabinets","Kids Storage","Toys & Play","Cots","Changing Tables","Bassinets & Cradles","Baby Gears","Toddlar Bed & Cot Mattresses"],["Desks","Office Chairs","File Cabinets","Office Storage","Bookcases"],["Rep. Tables","Rep. Chairs","Rep. Sofas","Rep. Stools"],["Vanity Cabinets","Bathroom & Laundry Storage Cabinets","Laundry Hampers & Baskets","Bathroom Shelves & Racks","Bathroom Seats"]],
		[["Sculptures & Figurines","Scale Models","Vases & Vessels","Chimes & Bells","Water Features","Bookends","Flowers & Greenery","Decor Pieces","Photo Frames","Pots & Planters","Decor Plates & Bowls","Door Stoppers"],
		["Clocks","Mirrors","Art Prints & Paintings","Wall Sculptures","Wall Shelves & Hooks","Other Wall Arts"],
		["Cushions","Throws","Beddings","Table Linens","Towels & Floor Mats"],
		["Candle & Incense Holders","Candles & Incense","Lanterns & Hurricanes","Oil Burners"],
		["Games","Globes","Stationery","Other Giftware","Bags"],
		["Jesellery Boxes & Holders","Trays & Baskets","Storage Boxes","Display Easels & Blackboards","Domes & Stands"],
		["Birdhouses & Bird Baths","Garden Statues & Sculptures","Garden Urns & Fountains","Letter Boxes","Garden Wall Arts","Other Garden Decor Pieces"]],
		[["Pendant Lights","Chandeliers","Batten Fix Lights","Oyster Lights","Downlights","Spotlights","Track Lights"],
		 ["Table Lamps","Desk Lamps","Floor Lamps","Leadlights & Tiffany Lamps"],
		 ["Wall Sconces","Recessed Lights","Bunker Lights","Vanity Lights"],
		 ["Outdoor Ceiling Lights","Outdoor Wall Lights","Bollard Lights","Post Lanterns","Garden Lights","Deck Lights","Floodlights"],
		 ["LED Stripe Lights","Holiday Lights","Light Bulds & Globes"],
		 ["Ceiling Fans","Wall Fans","Pedestal & Floor Fans","Exaust Fans","Bathroom Heaters","Accessories & Replacements"]],
		[[],[],[],[],[],[],[],[],[],[],[],[]],
		[["Cookware Sets","Frypans","Saucepans","Saute Pans","Stock Pots","Woks","French Ovens & Casseroles","Chef Pans","Grill Pans","Steamer","Other Cookware"],
		 ["Baking Sets","Baker & Baking Dishes","Cocottes & Ramekins","Mixing Bowls","Cake Pans & Baking Sheets","Roasting Pans","Baking Accessories","Measuring Gadgets"],
		 ["Knife Block Sets","Kitchen Knives","Knife Blocks & Racks","Knife Sharpeners","Cutting Boards"],
		 ["Dinner Sets","Plates","Bowls","Cups  & Mugs","Teapots","Cutleries","Serving Boards","Salt & Peper Mills & Shakers","Cake Stands","Other Tableware"],["Stemware","Tumblers","Beer Glassware","Decanters","Bottles & Pitchers","Beverage Dispensers"],
		["Kitchen Clocks & Timers","Kitchen Scales","Kitchen Shears & Peelers","Graters & Juicers","Paper Roll Holders","Other Kitchen Accessories"],
		 ["Toasters","Blenders & Mixers","Electric Kettles","Slow Cookers","Deep Fryers","Electric Pressure Cookers","Ice Cream & Yoghurt Makers","Griddles"],
		 ["Bread Bins & Baskets","Canisters & Containers","Storage Jars","Ultensil Holders","Compost & Disposal Bins"] ],
		[["Outdoor Dining Sets","Outdoor Tables","Outdoor Chairs","Outdoor Stools","Outdoor Sofas & Lounge Sets","Gazebos & Umbrellas","Day Beds & Sun Lounges","Outdoor Benches","Outdoor Shelves & Storage","Outdoor Bean Bags","Hammocks & Swings","Outdoor Heating"],["For Dogs","For Cats","For Birds","For Fishs","For Other Pets"]]
		]
	return c[cata][index];
}

	/*
	<div id="column1" class="column">
            <dl>
              <dt><a href="http://www.livingstyles.com.au/bedroom-737/" >BEDROOM</a></dt>
              <dd id="columndd1"><a href="http://www.livingstyles.com.au/bar-stools-734/">Beds</dd>
            </dl>
          </div>
       */
function genMenu(index)
{
	var pattern = [[1,1,1,1,3,1],[1,1,2,2,1,1],[1,2,1,1,1,0],[3,3,3,3,0,0],[1,2,1,2,2,0],[1,1,0,0,0,0]]
       var menu = document.getElementById("megamenu"+index)
       var mcon = ""	
	var cata = getCata(index-1)
	var n = 0;
	for(var col = 1; col <= 5; col++)
	{
		mcon += '<div id="column'+col+'" class="column">'
		for (var i = 1; i <=pattern[index-1][col-1]; i++)
		{
			if( i > 1) mcon += '<div class="clear"></div><p>&nbsp;</p>'
			var s = '<a href="http://www.livingstyles.com.au/" >'+cata[n]+'</a>'
			mcon += '<dl><dt>'+s+'</dt>'
			var con = getCataContent(index-1, n)
			for( var j = 0; j < con.length; j ++)
				mcon += '<dd><a href="http://www.livingstyles.com.au/">'+con[j] + "</a></dd>"
			mcon += '</dl>'
			if( i == pattern[index-1][col-1] ) mcon += '</div>'		
			n++;
		}
	}	
	if( pattern[index-1][5] > 0)
	{
		mcon += '<div id="column6" class="column"><dl><dt>FEATURED DEPT.</dt>'
		path = ['img/cat1.png','img/cat2.png','img/cat3.png']
		for( var i = 0; i < 3; i++)
		mcon += '<dd><a  href="http://www.livingstyles.com.au/"><img src="'+path[i]+'"></dd>'
       	mcon += '</dl></div>'	
       }
	menu.innerHTML = mcon

}

	var alltypes = ["TABLES","CHAIRS","STOOLS","SOFAS","OTHER SEATS","TV UNITS","BEDS","MATTRESSES",
				   "DRAWERS","CABINETS","STORAGES","DECORS","LIGHTING","RUGS","TEXTILES","NURSERY",
				   "COOKWARE","TABLEWARE","REPLICAS"];
	var typeimgs = [11,5,5,9,6,2];
function genTypes()
{
	var rows = Math.ceil(alltypes.length / 6);
	var mcon = "";
	var index = 0;
	for(var row = 1; row <= rows; row++)
	{
		mcon += '<div class="shopbytypesrow">';
		for( var col = 1; col <= 6; col++)
		{
			mcon += '<div id="type'+index+'" class="shopbytypescol';
			if( col != 6)  mcon += ' shopbytypescolsep';
			mcon += '" onmouseover="mouseOverType('+index+')" onmouseout="mouseOutType('+index+')" ';
			mcon += '" onclick="clickType('+index+')">';
			mcon += '<img class="shopbytypescolbg" src="img/type-fill.jpg">';
			mcon += '<img class= "shopbytypescolicon"  src="img/type_'+alltypes[index].toLowerCase()+'.svg">';
			mcon += '<label id="typel'+index+'"></label>';
			mcon += '<img id="typei'+index+'" src="img/ico_close_wh.svg" class="shopbytypescolicon" style="width:50px;left:50%;transform:translate(-50%);display:none">';
			mcon += '<p id = "typep'+index+'">'+alltypes[index].toUpperCase()+'</p>';
			mcon += '<a><img id="typeshow'+index+'" style="display:none"></a>';
			mcon += '</div>';
			if( ++index >= alltypes.length) break;
		}
		mcon += '</div>';
		if( index >= alltypes.length) break;
	 }
	 var s = document.getElementById("shopbytypes");
	 s.innerHTML = mcon;
}

function mouseOverType(index)
{	
	var curDiv = document.getElementById("type"+index);
	if( curDiv.className.indexOf("disable") >= 0 ) return;
	var curDiv = document.getElementById("typep"+index);
	curDiv.className = "shopbytypescolphover";
	curDiv = document.getElementById("typel"+index);
	curDiv.className = "shopbytypescollabelhover";
}

function mouseOutType(index)
{	
	var curDiv = document.getElementById("type"+index);
	if( curDiv.className.indexOf("disable") >= 0 ) return;
	var curDiv = document.getElementById("typei"+index);
	if( curDiv.style.display == "none")
	{
		var curDiv = document.getElementById("typel"+index);
		curDiv.className = "";
		curDiv = document.getElementById("typep"+index);
		debugout(String(index)+"mouseover"+curDiv.className);
		curDiv.className = "";
	}

}

function showType(index)
{
	var total = typeimgs[index];
	if( total <= 0) return;
	var row = Math.floor(index / 6);
	var col = 0;
	if( total < 5 && total < index % 6) col = (index % 6) - total;
	var start = 6*row + col;
	for( var j = 0; j < start; j++)
	{
		var curDiv = document.getElementById("type"+j);
		curDiv.className += " shopbytypesdisable";
	}
	for( var i = 0; i < total; i++)
	{
		if( start + i == index) start += 1;
		var divid = "typeshow"+ (start + i);
		var curDiv = document.getElementById(divid);
		curDiv.src =  'img/type_'+alltypes[index].toLowerCase()+(i+1)+'.jpg';
		curDiv.style.display = "block";
		curDiv = document.getElementById("typel"+(start+i));
		curDiv.style.display = "none";
	}
	for( var j = start+i; j < alltypes.length; j++)
	{
		if( j == index) continue;
		var curDiv = document.getElementById("type"+j);
		curDiv.className += " shopbytypesdisable";
	}
}

function hideType(index)
{
	var total = typeimgs[index];
	if( total <= 0) return;
	var row = Math.floor(index / 6);
	var col = 0;
	if( total < 5 && total < index % 6) col = index % 6 - total;
	var start = 6*row + col;
	for( var j = 0; j < alltypes.length; j++)
	{
		var curDiv = document.getElementById("type"+j);
		var classVal = curDiv.getAttribute("class");
		classVal = classVal.replace("shopbytypesdisable","");
		curDiv.setAttribute("class",classVal );
	}
	for( var i = 0; i < total; i++)
	{
		if( start + i == index) start += 1;
		var divid = "typeshow"+ (start + i);
		var curDiv = document.getElementById(divid);
		curDiv.style.display = "none";
		curDiv = document.getElementById("typel"+(start+i));
		curDiv.style.display = "block";
	}
}

function clickType(index)
{
	var curDiv = document.getElementById("type"+index);
	if( curDiv.className.indexOf("disable") >= 0 ) return;
	
	var curDiv = document.getElementById("typei"+index);
	if( curDiv.style.display == "none"){
		curDiv.style.display = "block";
		showType(index);
	}
	else{
		curDiv.style.display = "none";
		hideType(index);
	}
}

/*-------------------------------------------------------------*/
	var Membersp = ["NATURE PHOTOGRAPHY","WOODEN WONDERS","THE ORIENTAL PRINCESS","STEPPING IN","BOLD BEDSPREADS","AFTERNOON DRINKS"];
	var desc = ["Anthony Glick Beach and Wildlife Prints","Bohemian Wooden Furniture Designs","Treasured Pieces and Master Ornaments","Colourful and Quirky Coir Doormats","Modern and Retro Quilt Cover Sets","Beverage Cabinets and Plush Seats"];
function genMembersp()
{
	var rows = Math.ceil(Membersp.length / 3);
	var mcon = "";
	var index = 0;
	for(var row = 1; row <= rows; row++)
	{
		mcon += '<div class="membersprow">';
		for( var col = 1; col <= 3; col++)
		{			
			mcon += '<div id="membersp'+index+'" class="memberspcol';
			if( col != 3)  mcon += ' memberspcolsep';
			mcon += '">';
			mcon += '<div id="membersppreview'+index+'" style="display:none"></div>';
			mcon += '<div id="memberspc'+index+'" style="display:block">';
			mcon += '<img class="memberspcolimg"  src="img/camp'+(index+1)+'.jpg">';
			mcon += '<p id="membersptitle'+index+'">'+Membersp[index] + "<br>";
			mcon += '<span>'+desc[index] + '</span></p>';
			mcon += '<label>Ends <strong>Tomorrow 23:00</strong></label>';
			mcon += '<div class="memberspbut">';
			mcon += '<div class="memberspbut1"><a id="memberspbut1-'+index+'"   onclick="clickMembersp('+index+')"><p>PREVIEW</p></a></div>';
			mcon += '<div class="memberspbut2"><a id="memberspbut2-'+index+'" ><p>SHOP SALE ›</p></a></div>';
			mcon += '</div></div></div>';
			if( ++index >= Membersp.length) break;
		}
		mcon += '</div>';
		if( index >= Membersp.length) break;
	 }
	 var s = document.getElementById("membersp");
	 s.innerHTML = mcon;
}

function showMembersp(index)
{
	var curDiv = document.getElementById("membersppreview"+index);
	if(curDiv.innerHTML.length == 0)
	{
		var mcon = '<div class="memberspcolpreview" >';
		mcon += '<a onclick="clickMembersp('+index+')"><img class="memberspcolpreviewicon"  src="img/ico_close.svg"></a>';
		mcon += '</div>';
		var n = 1;
		for( var row = 0; row < 2; row++)
		{
			mcon += '<div class="memberspcolpreview">';
			for( var i = 1; i <= 3; i++)
			{
				mcon += '<div class="memberspcolpreviewcol'
				if( i != 3) mcon += ' memberspcolpreviewcolsep';
				mcon += '">';
				mcon += '<a href=""><img class="memberspcolimg"  src="img/camp'+(index+1)+"-"+n+'.jpg"></a>';
				mcon += '</div>';
				n++;
			}
			mcon += '</div><div class="clear"></div>';
		}
		mcon += '<div class="memberspcolpreview" >';
		mcon += '<div class="memberspcolpreviewbut"><a href="" ><p>VIEW ALL  ›</p></a></div>';
		mcon += '</div><div class="clear"></div>';
		curDiv.innerHTML = mcon;
	}
	curDiv.style.display = "block";
}

function hideMembersp(index)
{
	var curDiv = document.getElementById("membersppreview"+index);
	curDiv.style.display = "none";
}

function clickMembersp(index)
{
	var curDiv = document.getElementById("memberspc"+index);
	if( curDiv.style.display == "none"){
		hideMembersp(index);
		curDiv.style.display = "block";
	}
	else{
		curDiv.style.display = "none";
		showMembersp(index);
	}
}

/*-------------------------------------------------------------*/
var proposals = ['html5tricks', 'html55','html4','jquery', 'css3', 'chief', 'dog', 'drink', 'elephant', 'fruit', 'grave','hotel', 'illness', 'London', 'motorbike']

var fadeTimer1 = null;
var fadeTimer2 = null;
      
jQuery(document).ready(function($)
{
	for( var i = 1; i <= 6; i++) genMenu(i)
	jkmegamenu.render($)
	$('.autocomplete-container').autocomplete({
		hints: proposals,
		onSubmit: function(text){
			$('#message').html('Selected: <b>' + text + '</b>');			
		}
	});
	$("#search").click(function(){
	       $(".navbar-menu").fadeOut(500)
	       $(".navbar-search").fadeOut(500,function(){
	       	//$(".searchbar").fadeIn(500,function(){
	       		$(".searchbarleft").css("left","50%")
	       		$(".searchbar").fadeIn(500)
	       		$(".searchbarleft").animate({left:'25%'})
	       		$("#stext").val('')
	       		$("#stext").focus()
	       	//})
	        })
    	})
    	$("#close").click(function(){ 		
    		$('.autocomplete-container').fadeOut(500)
      	 $(".searchbar").fadeOut(500, function(){
      	 	$(".navbar-menu").fadeIn(500)
	       	$(".navbar-search").fadeIn(500)
	        })
    	})
    	
    	var numberOfImages = $('.bxslider li').length; 
      if( numberOfImages > 1 ) {
        $('.bxslider').bxSlider({
            mode: 'fade',
            speed: 1000,
            auto: true,
            pause:8000
            //,autoHover: true
            //,prevSelector: '.leftcontrol'
        });
      }

      $('.bx-wrapper .bx-prev').hide();
      $('.bx-wrapper .bx-next').hide();
      $('.bx-wrapper').hoverIntent(function(){
      	  clearTimeout(fadeTimer1);
      	  clearTimeout(fadeTimer2);
	        $('.bx-wrapper .bx-prev').fadeIn();
	        $('.bx-wrapper .bx-next').fadeIn();
      },function(){
      	fadeTimer1=setTimeout(function(){
		        $('.bx-wrapper .bx-prev').fadeOut();
		        $('.bx-wrapper .bx-next').fadeOut();
		}, 1500);
      });
      $('.bx-wrapper .bx-prev').hoverIntent(function(){
		clearTimeout(fadeTimer1);
		clearTimeout(fadeTimer2);
      },function(){
      	fadeTimer2=setTimeout(function(){
		        $('.bx-wrapper .bx-prev').fadeOut();
		        $('.bx-wrapper .bx-next').fadeOut();
		}, 1500);
      });
      
      genTypes();
      genMembersp();
 	$('#smlink1').click(function(){ 	
 		if( $('#smlink1').hasClass("smactive") ) return;
 		var a = $('#smlink2');
 		var b = $(".shopbyhome");
		if( $('#smlink3').hasClass("smactive") ){ a = $('#smlink3'); b = $(".membersp");}
    		a.removeClass("smactive")
    		$('#smlink1').addClass("smactive");
    		b.fadeOut(500, function(){
      	 	$(".shopbytypes").fadeIn(500)
	        })
    	});
 	$('#smlink2').click(function(){ 	
 		if( $('#smlink2').hasClass("smactive") ) return;
 		var a = $('#smlink1');
 		var b = $(".shopbytypes");
		if( $('#smlink3').hasClass("smactive") ){ a = $('#smlink3'); b = $(".membersp");}
    		a.removeClass("smactive")
    		$('#smlink2').addClass("smactive");
    		b.fadeOut(500, function(){
      	 	$(".shopbyhome").fadeIn(500)
	        })
    	});
    	$('#smlink3').click(function(){ 	
 		if( $('#smlink3').hasClass("smactive") ) return;
 		var a = $('#smlink1');
 		var b = $(".shopbytypes");
		if( $('#smlink2').hasClass("smactive") ){ a = $('#smlink2'); b = $(".shopbyhome");}
    		a.removeClass("smactive")
    		$('#smlink3').addClass("smactive");
    		b.fadeOut(500, function(){
      	 	$(".membersp").fadeIn(500)
	        })
    	});

})