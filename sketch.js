let bg, isMobile, canvas;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
  	canvas.parent("p5js");
  	noSmooth(); noStroke();
  	// isMobile = /android|iphone|/i.test(navigator.userAgent);
	if (getBackground() == null) {setBackground("Random");}
	if (getBkgColor() == null) {setBkgColor("60, 60, 60");}
	if (getOpacity() == null) {setOpacity(30);}
	if (getOpaColor() == null) {setOpaColor("255, 255, 255");}
	if (getPixelation() == null) {setPixelation(10);}
	if (getTextSize() == null) {setTextSize(40);}
	if (getTextColor() == null) {getTextColor("0, 0, 0");}
	changeSaved();
	// Opacity value
	document.documentElement.style.setProperty("--bg-opacity", getOpacity() / 100);
	// Opacity color
	colorSaved = getOpaColor().split(",");
	document.documentElement.style.setProperty("--bg-rval", Number(colorSaved[0]));
	document.documentElement.style.setProperty("--bg-gval", Number(colorSaved[1]));
	document.documentElement.style.setProperty("--bg-bval", Number(colorSaved[2]));
	// Text size
	document.documentElement.style.setProperty("--tx-fval", getTextSize()+"px");
	// Text color
	colorSaved = getTextColor().split(",");
	document.documentElement.style.setProperty("--tx-trval", Number(colorSaved[0]));
	document.documentElement.style.setProperty("--tx-tgval", Number(colorSaved[1]));
	document.documentElement.style.setProperty("--tx-tbval", Number(colorSaved[2]));
	// Stroke size
	document.documentElement.style.setProperty("--tx-sval", getStrokeSize()+"px");
	// Stroke color
	colorSaved = getStrokeColor().split(",");
	document.documentElement.style.setProperty("--tx-srval", Number(colorSaved[0]));
	document.documentElement.style.setProperty("--tx-sgval", Number(colorSaved[1]));
	document.documentElement.style.setProperty("--tx-sbval", Number(colorSaved[2]));
	// const x = document.getElementById("p5js");

}

let t = new ToolKit();


function draw() {
  	bg.update();
	if (getPixelation() != 1) {t.pixelate(getPixelation());}
}

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}

function changeSnow() {bg = new SnowFall();}
function changeBounce() {bg = new BallBounce(canvas);}
function changeSnake() {bg = new SnakeMove();}
function changeRadial() {bg = new ParticalRadial();}
function changeRandom() {
	num = random();
	if (num > 0.75) {bg = new SnowFall();}
	else if (num > 0.5) {bg = new BallBounce(canvas);}
	else if (num > 0.25) {bg = new SnakeMove();}
	else if (num > 0) {bg = new ParticalRadial();}
} function changeSaved() {
	switch (getBackground()) {
		case "Off": bg = new Off(); break;
		case "Bouncy": changeBounce(); break;
		case "Repel": changeSnow(); break;
		case "Radial": changeRadial(); break;
		case "Follow": changeSnake(); break;
		case "Random": changeRandom(); break;
		default: changeRandom(); break;
	}
}


function setBackground(background) {localStorage.setItem("background", background);}
function getBackground() {return localStorage.getItem("background");}
function resetBackground() {
	setBackground("Random");
	sliderBkg.value = 5;
	outputBkg.textContent = "Random";
	changeSaved();
}

let colorBkgChanged = true;
function setBkgColor(color) {localStorage.setItem("bkgcolor", color); colorBkgChanged = true;}
function getBkgColor() {return localStorage.getItem("bkgcolor");}
function resetBkgColor() {
	setBkgColor("60, 60, 60"); 
	sliderBkgClrR.value = 60;
	sliderBkgClrG.value = 60;
	sliderBkgClrB.value = 60;
	outputBkgClr.textContent = "Color: "+getNewBkgColorStr();
}

function setPixelation(pixelation) {localStorage.setItem("pixel", pixelation)}
function getPixelation() {return localStorage.getItem("pixel");}
function resetPixelation() {
	setPixelation(10);
	sliderPix.value = 10;
	outputPix.textContent = "Pixelation: "+getPixelation()+"x";
}

function setOpacity(opacity) {localStorage.setItem("opacity", opacity);}
function getOpacity() {return localStorage.getItem("opacity");}
function resetOpacity() {
	setOpacity(30);
	sliderOpa.value = 30;
	outputOpa.textContent = getOpacityVal(sliderOpa.value);
	document.documentElement.style.setProperty(
		"--bg-opacity",
		sliderOpa.value / 100
	);
}

function setOpaColor(color) {localStorage.setItem("opacolor", color);;}
function getOpaColor() {return localStorage.getItem("opacolor");}
function resetOpaColor() {
	setOpaColor("255, 255, 255"); 
	sliderOpaClrR.value = 255;
	sliderOpaClrG.value = 255;
	sliderOpaClrB.value = 255;
	document.documentElement.style.setProperty("--bg-rval", sliderOpaClrR.value);
	document.documentElement.style.setProperty("--bg-gval", sliderOpaClrG.value);
	document.documentElement.style.setProperty("--bg-bval", sliderOpaClrB.value);
	outputOpaClr.textContent = "Color: "+getNewOpaColorStr();
}

function setTextSize(size) {localStorage.setItem("textsize", size)}
function getTextSize() {return localStorage.getItem("textsize");}
function resetTextSize() {
	setTextSize(40);
	sliderPix.value = 40;
	document.documentElement.style.setProperty("--tx-fval", getTextSize()+"px");
	outputTxtP.textContent = sliderPix.value+"px";
}

function setTextColor(color) {localStorage.setItem("txtcolor", color);;}
function getTextColor() {return localStorage.getItem("txtcolor");}
function resetTextColor() {
	setTextColor("0, 0, 0"); 
	sliderTxtClrR.value = 0;
	sliderTxtClrG.value = 0;
	sliderTxtClrB.value = 0
	document.documentElement.style.setProperty("--tx-trval", sliderTxtClrR.value);
	document.documentElement.style.setProperty("--tx-tgval", sliderTxtClrG.value);
	document.documentElement.style.setProperty("--tx-tbval", sliderTxtClrB.value);
	outputTxtClr.textContent = "Color: "+getNewTxtColorStr();
}

function setStrokeSize(size) {localStorage.setItem("strokesize", size)}
function getStrokeSize() {return localStorage.getItem("strokesize");}
function resetStrokeSize() {
	setStrokeSize(1);
	sliderStrP.value = 1;
	document.documentElement.style.setProperty("--tx-sval", getStrokeSize()+"px");
	outputStrP.textContent = "Stroke: "+sliderStrP.value+"px";
}

function setStrokeColor(color) {localStorage.setItem("strcolor", color);;}
function getStrokeColor() {return localStorage.getItem("strcolor");}
function resetStrokeColor() {
	setStrokeColor("255, 255, 255"); 
	sliderStrClrR.value = 255;
	sliderStrClrG.value = 255;
	sliderStrClrB.value = 255
	document.documentElement.style.setProperty("--tx-srval", sliderStrClrR.value);
	document.documentElement.style.setProperty("--tx-sgval", sliderStrClrG.value);
	document.documentElement.style.setProperty("--tx-sbval", sliderStrClrB.value);
	outputClrStr.textContent = "Color: "+getNewStrColorStr();
}
