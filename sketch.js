let bg, isMobile, canvas;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
  	canvas.parent("p5js");
  	noSmooth(); noStroke();
  	// isMobile = /android|iphone|/i.test(navigator.userAgent);
	changeSaved();
	document.documentElement.style.setProperty("--bg-opacity", getOpacity() / 100);
	colorSaved = getOpaColor().split(",");
	document.documentElement.style.setProperty("--bg-rval", Number(colorSaved[0]));
	document.documentElement.style.setProperty("--bg-gval", Number(colorSaved[1]));
	document.documentElement.style.setProperty("--bg-bval", Number(colorSaved[2]));
	// const x = document.getElementById("p5js");

}

function draw() {
  	bg.update();
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
	if (getBackground() == null) {setBackground("Random");}
	if (getBkgColor() == null) {setBkgColor("60, 60, 60");}
	if (getOpacity() == null) {setOpacity(30);}
	if (getOpaColor() == null) {setOpaColor("255, 255, 255");}
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
