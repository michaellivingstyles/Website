/* jQuery Mega Menu v1.02
* Last updated: June 29th, 2009. This notice must stay intact for usage 
* Author: JavaScript Kit at http://www.javascriptkit.com/
* Visit http://www.javascriptkit.com/script/script2/jScale/ for full source code
*/

jQuery.noConflict();

var jkmegamenu={

maxwidth: 1170,
effectduration: 300, //duration of animation, in milliseconds
delaytimer: 200, //delay after mouseout before menu should be hidden, in milliseconds

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
	var $anchor=megamenu.$anchorobj
	var $menu=megamenu.$menuobj
	var menuleft=($(window).width()-(megamenu.offsetx-$(document).scrollLeft())>megamenu.actualwidth)? megamenu.offsetx : megamenu.offsetx-megamenu.actualwidth+megamenu.anchorwidth //get x coord of menu
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
	megamenu.$anchorobj.css('border-bottom', '3px solid #FFF')
},

definemenu:function(anchorid, menuid, revealtype){
	this.megamenulabels.push([anchorid, menuid, revealtype])
},

render:function($){
	for (var i=0, labels=this.megamenulabels[i]; i<this.megamenulabels.length; i++, labels=this.megamenulabels[i]){
		if ($('#'+labels[0]).length!=1 || $('#'+labels[1]).length!=1) //if one of the two elements are NOT defined, exist
			return
		this.megamenus.push({$anchorobj:$("#"+labels[0]), $menuobj:$("#"+labels[1]), $menuinner:$("#"+labels[1]).children('ul:first-child'), revealtype:labels[2], hidetimer:null})
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
			clearTimeout(menuinfo.hidetimer) //cancel hide menu timer
			return jkmegamenu.showmenu(e, parseInt(this.getAttribute("_megamenupos")))
		})
		megamenu.$anchorobj.bind("mouseleave", function(e){
			//this.setAttribute("style","border-bottom:3px solid #FFF")
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			if (e.relatedTarget!=menuinfo.$menuobj.get(0) && $(e.relatedTarget).parents("#"+menuinfo.$menuobj.get(0).id).length==0){ //check that mouse hasn't moved into menu object
				menuinfo.hidetimer=setTimeout(function(){ //add delay before hiding menu
					jkmegamenu.hidemenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_megamenupos")))
				}, jkmegamenu.delaytimer)
			}
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
	var c = [["BEDROOM","LIVING & HALLWAY","DINING & KITCHEN","KIDS & BABY","HOME OFFICE","DESIGNER REPLICAS","BATHROOM & LAUNDRY"],["D��cor Accents","Wall D��cor","Textiles","Candles & Incense","Giftware","Storage & Display","	Outdoor D��cor"],["Ceiling Lights","Lamps","Wall Lights","Outdoor Lights","Other Lighting","Fans & Heaters"],["Door Mats","Shag Rugs","Modern Rugs","Oriental Rugs","Kids Rugs","Outdoor Rugs","Runner Rugs","Round Rugs","Wool Rugs","Jute Rugs","Cotton Rugs","Hide Rugs"],["Cookware","Bakeware","Tableware","Glassware","Kitchen Knives & Accs","Kitchen Appliances","Storage & Disposal","Kitchen Accessories"],["Outdoor","Pet Supplies"]]
	var href = []
	return c[cata]
}

function getCataContent(cata, index)
{
	var c =[ [["Beds","Loft & Bunk Beds","Bed Heads", "Bedside Tables","Tallboys",					"Dressers","Mattresses","Mattress Bases","Wardrobes","Blanket Boxes","Bed Accessories","Coat Racks & Valets","Bedroom Suites" ], ["Coffee Tables","TV Units","Sofas & Sofa Beds","Accent Chairs","Side Tables","Console & Hall Tables","Bookcases","Display Shelves","Accent Chests & Cabinets","Storage & Wall Units","Hallway Stands","Ottomans","Shoe Cabinets","Accent Stools","Bean Bags","Room Dividers"],["Dining Table Sets","Dining Tables","Dining Chairs","Dining Benches","Dining Stools","Bar Tables","Bar Stools","Sideboards & Buffets","Hutch Cabinets","Display Cabinets","Wine Racks & Bar","Kitchen Islands"],["Loft & Bunk Beds","Kids Beds","Kids Tables & Desks","Kids Chairs","Kids Chests & Cabinets","Kids Storage","Toys & Play","Cots","Changing Tables","Bassinets & Cradles","Baby Gears","Toddlar Bed & Cot Mattresses"],["Desks","Office Chairs","File Cabinets","Office Storage","Bookcases"],["Rep. Tables","Rep. Chairs","Rep. Sofas","Rep. Stools"],["Vanity Cabinets","Bathroom & Laundry Storage Cabinets","Laundry Hampers & Baskets","Bathroom Shelves & Racks","Bathroom Seats"]],
		[["Sculptures & Figurines","Scale Models","Vases & Vessels","Chimes & Bells","Water Features","Bookends","Flowers & Greenery","D��cor Pieces","Photo Frames","Pots & Planters","D��cor Plates & Bowls","Door Stoppers"],
		["Clocks","Mirrors","Art Prints & Paintings","Wall Sculptures","Wall Shelves & Hooks","Other Wall Arts"],
		["Cushions","Throws","Beddings","Table Linens","Towels & Floor Mats"],
		["Candle & Incense Holders","Candles & Incense","Lanterns & Hurricanes","Oil Burners"],
		["Games","Globes","Stationery","Other Giftware","Bags"],
		["Jesellery Boxes & Holders","Trays & Baskets","Storage Boxes","Display Easels & Blackboards","Domes & Stands"],
		["Birdhouses & Bird Baths","Garden Statues & Sculptures","Garden Urns & Fountains","Letter Boxes","Garden Wall Arts","Other Garden D��cor Pieces"]],
		[["Pendant Lights","Chandeliers","Batten Fix Lights","Oyster Lights","Downlights","Spotlights","Track Lights"],
		 ["Table Lamps","Desk Lamps","Floor Lamps","Leadlights & Tiffany Lamps"],
		 ["Wall Sconces","Recessed Lights","Bunker Lights","Vanity Lights"],
		 ["Outdoor Ceiling Lights","Outdoor Wall Lights","Bollard Lights","Post Lanterns","Garden Lights","Deck Lights","Floodlights"],
		 ["LED Stripe Lights","Holiday Lights","Light Bulds & Globes"],
		 ["Ceiling Fans","Wall Fans","Pedestal & Floor Fans","Exaust Fans","Bathroom Heaters","Accessories & Replacements"]],
		[[],[],[],[],[],[],[],[],[],[],[],[]],
		[["Cookware Sets","Frypans","Saucepans","Saute Pans","Stock Pots","Woks","French Ovens & Casseroles","Chef Pans","Grill Pans","Steamer","Other Cookware"],
		 ["Baking Sets","Baker & Baking Dishes","Cocottes & Ramekins","Mixing Bowls","Cake Pans & Baking Sheets","Roasting Pans","Baking Accessories","Measuring Gadgets"],
		 ["Dinner Sets","Plates","Bowls","Cups  & Mugs","Teapots","Cutleries","Serving Boards","Salt & Peper Mills & Shakers","Cake Stands","Other Tableware"],["Stemware","Tumblers","Beer Glassware","Decanters","Bottles & Pitchers","Beverage Dispensers"],
		 ["Knife Block Sets","Kitchen Knives","Knife Blocks & Racks","Knife Sharpeners","Cutting Boards"],
		 ["Toasters","Blenders & Mixers","Electric Kettles","Slow Cookers","Deep Fryers","Electric Pressure Cookers","Ice Cream & Yoghurt Makers","Griddles"],
		 ["Bread Bins & Baskets","Canisters & Containers","Storage Jars","Ultensil Holders","Compost & Disposal Bins"],
		 ["Kitchen Clocks & Timers","Kitchen Scales","Kitchen Shears & Peelers","Graters & Juicers","Paper Roll Holders","Other Kitchen Accessories"]],
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

       var menu = document.getElementById("megamenu"+index)
       var mcon = ""	
	var cata = getCata(index-1)
	for (var i = 1; i <=cata.length; i++)
	{
		if( i <= 5) mcon += '<div id="column'+i+'" class="column">'
		else mcon += '<div class="clear"></div><p>&nbsp;</p>'
		var s = '<a href="http://www.livingstyles.com.au/" >'+cata[i-1]+'</a>'
		mcon += '<dl><dt>'+s+'</dt>'
		var con = getCataContent(index-1, i-1)
		for( var j = 0; j < con.length; j ++)
			mcon += '<dd><a href="http://www.livingstyles.com.au/">'+con[j] + "</a></dd>"
		mcon += '</dl>'
		if(i < 5 || i == cata.length ) mcon += '</div>'
	}	

	mcon += '<div id="column6" class="column"><dl><dt>FEATURED DEPT.</dt>'
	path = ['img/cat1.png','img/cat2.png','img/cat3.png']
	for( var i = 0; i < 3; i++)
		mcon += '<dd><a  href="http://www.livingstyles.com.au/"><img src="'+path[i]+'"></dd>'
       mcon += '</dl></div>'
	menu.innerHTML = mcon

}

jQuery(document).ready(function($)
{
	genMenu(1)
	jkmegamenu.render($)
})