function showCatalog(index)
{
	var imgid = "shopbycatimg"+index;
	var img = document.getElementById(imgid);
	img.style.display = "none";
	imgid = "shopbycatimgexp"+index;
	img = document.getElementById(imgid);
	img.style.display = "block";
}

function hideCatalog(index)
{
	var imgid = "shopbycatimgexp"+index;
	var img = document.getElementById(imgid);
	img.style.display = "none";
	imgid = "shopbycatimg"+index;
	img = document.getElementById(imgid);
	img.style.display = "block";
}