var adWidth = 728, adHeight = 90;

window.onload = function() {
    
    myFT.on('DOMLoaded', function() {
        myFT.on('instantads', function(event) {
            var variables = myFT.instantAds;
            preloadImages(variables);
            setUpDynamicVar(variables);
			setCta(variables);
			setClickTag(variables);
			
			
			document.head.appendChild(document.createElement("style")).innerHTML = variables.insertCSS; //Insert CSS
	
			wrapper.classList.add(checkPlatform()[0] + "-" + checkPlatform()[1]); // Adding browserstack class
	
        });
    })
}

function preloadImages(variables) {
	var imageCount = 4, imageLoaded = 0;
	
	productImg.src = variables.frame1_product_img;
	productImg.addEventListener("load", iLoad, false);

	logo.src = variables.frame1_logo_img;
	logo.addEventListener("load", iLoad, false);

	bgImg.src = variables.background_img;
	bgImg.addEventListener("load", iLoad, false);

	headlineImg.src = variables.frame1_headlineSVG_img;
	headlineImg.addEventListener("load", iLoad, false);

	function iLoad() {
        imageLoaded++;
        if(imageLoaded == imageCount) {
            init();
        }
    }
}

function setUpDynamicVar(variables) {

	if( variables.frame1_headline_txt && 
		variables.frame1_headline_txt.trim()
	){
		headlineImg.classList.add('dis-none');
	}
	setDynamicData(
		headlineTxt, 
		variables.frame1_headline_txt, 
		variables.frame1_headline_size_hex_xy
	);

	setDynamicData(
		offerCodeTop, 
		variables.frame1_offerCodeTop_txt, 
		variables.frame1_offerCodeTop_hex_xy
	);

	setDynamicData(
		offerCodeBottom, 
		variables.frame1_offerCodeBottom_txt, 
		variables.frame1_offerCodeBottom_hex_xy
	);

	setDynamicData(
		legal, 
		variables.legal_txt, 
		variables.legal_size_hex_xy.trim()
	);
	
	setXY(productImg, variables.frame1_product_xy);
	setXY(logo, variables.frame1_logo_xy);
	setXY(headlineImg, variables.frame1_headlineSVG_xy);

	if(variables.frame1_block_hex && variables.frame1_block_hex.trim()){
		frame1_block.style.setProperty('background-color', variables.frame1_block_hex.trim());
	}

	if(variables.legalPanel_txt && variables.legalPanel_txt.trim()){
		legalPanelTxt.innerHTML = variables.legalPanel_txt.trim();
	}
  }

  function setCta(variables){
	cta.innerHTML = variables.frame1_cta_txt;
	
	if(variables.frame1_cta_size_textHex_btnHex_xy){
		var ctaStyle = getConfig(variables.frame1_cta_size_textHex_btnHex_xy);
		
		if(ctaStyle[0]) cta.style.fontSize = ctaStyle[0] + "px";
		if(ctaStyle[1]) cta.style.color = ctaStyle[1];
		if(ctaStyle[2]) cta.style.backgroundColor = ctaStyle[2];
		if(ctaStyle[3]) cta.style.left = ctaStyle[3] + "px";
		if(ctaStyle[4]) cta.style.top = ctaStyle[4] + "px";			
		
	}
  }

function setClickTag(variables){
	myFT.applyClickTag(frame, 1 , variables.clicktag1_url);
}

function setDynamicData(element, copy, dynamicStyle) {
	var styling = getConfig(dynamicStyle);

	if (copy && copy.trim()) {
		element.innerHTML = copy.trim();
	}
	if (styling[0] && styling[0].trim()) {
		element.style.setProperty('font-size', styling[0].trim() + "px");
	}
	if (styling[1] && styling[1].trim()) {
		element.style.setProperty('color', styling[1].trim());
	}
	if (styling[2] && styling[2].trim()) {
		element.style.setProperty('left',  styling[2].trim() + 'px');
	}
	if (styling[3] && styling[3].trim()) {
		element.style.setProperty('top',  styling[3].trim() + 'px');
	}

}

// Styling String spliter
function getConfig(str) {
	return str.split("|").reduce(function (acc, curr, index, arr) {
	  return acc.concat(curr.split(","));
	}, []);
  }

// Styling Left Top position 
function setXY(element, xyPos){
	if (xyPos && 
		xyPos.trim() &&
		xyPos.split(",").length !== 0 &&
		xyPos.trim().split(",")[0]
	) {
		element.style.setProperty('left',  xyPos.trim().split(",")[0] + 'px');
	}
	if (xyPos && 
		xyPos.trim() &&
		xyPos.split(",").length !== 0 &&
		xyPos.trim().split(",")[1]
	) {
		element.style.setProperty('top',  xyPos.trim().split(",")[1] + 'px');
	}
}

//Animation 

function init() {
	var easing = Back.easeOut.config(1.7);
	tl = new TimelineMax();
	tl.set(wrapper, { opacity: 1 });
	tl.to("#frame1_block", .5, { y: 0, autoAlpha: 1}, "+=0.5");
	tl.to(["#headlineTxt","#headlineImg"], .3, { autoAlpha: 1, ease: easing, scale: 1}, "+=0.5");
	tl.to("#productImg", .3, {x:0, y: 0, autoAlpha: 1, ease: easing, scale: 1}, "+=0.2");
	tl.to(["#offerCodeTop","#offerCodeBottom"], .3, { autoAlpha: 1, ease: easing, scale: 1}, "+=0.3");
	tl.to("#cta", .5, { autoAlpha: 1, y: 0}, "+=0.5");
	tl.to("#legal", .5, { autoAlpha: 1}, "-=0.5");

	legal.addEventListener("click", function(){
		legalUp();
	})
	legalClose.addEventListener("click", function(){
		legalDown();
	})

}

function legalUp(){
	lUp = new TimelineMax();
	lUp.to(".legalPanel",0.2,{ y: 0 });
}
function legalDown(){
	lDown = new TimelineMax();
	lDown.to(".legalPanel",0.3,{ y: adHeight });
}

// Browser Checking

function checkPlatform() {
	try {
	  var a = new Array();
  
	  if (navigator.platform.toLowerCase().indexOf("mac") > -1) {
		a[0] = "macOS";
	  } else if (navigator.platform.toLowerCase().indexOf("win") > -1) {
		a[0] = "windows";
	  } else {
		if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
		  a[0] = "iOS";
		} else if (navigator.userAgent.match(/Opera Mini/i)) {
		  a[0] = "opera";
		} else if (navigator.userAgent.match(/Android/i)) {
		  a[0] = "android";
		} else if (navigator.userAgent.match(/BlackBerry/i)) {
		  a[0] = "BlackBerry";
		} else if (
		  navigator.userAgent.match(/IEMobile/i) ||
		  navigator.userAgent.match(/WPDesktop/i)
		) {
		  a[0] = "WindowsPhone";
		}
	  }
  
	  var MSIE = window.navigator.userAgent.indexOf("MSIE ");
  
	  var Edge = window.navigator.userAgent.indexOf("Edge/");
  
	  var Trdt = window.navigator.userAgent.indexOf("Trident/");
  
	  if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
		a[1] = "chrome";
	  } else if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
		a[1] = "firefox";
	  } else if (
		navigator.vendor &&
		navigator.vendor.toLowerCase().indexOf("apple") > -1
	  ) {
		a[1] = "safari";
	  } else if (MSIE > 0 || Edge > 0 || Trdt > 0) {
		a[1] = "IE";
	  }
  
	  return a;
	} catch (error) {
	  console.error("Error on checkPlatform(): " + error.message);
	}
  }
  
  //Cross browser code ends...