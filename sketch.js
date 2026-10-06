let bg, isMobile, canvas, draggingWindow, offsetX, offsetY, spawnX = 0, spawnY = 0, highestZ = 2;

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
	if (getTextColor() == null) {setTextColor("0, 0, 0");}
	if (getStrokeSize() == null) {setStrokeSize(1);}
	if (getStrokeColor() == null) {setStrokeColor("255, 255, 255");}
	// Draw background
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
	window.colorBkgChanged = true;
	
	document.addEventListener("click", (e) => {
		if (bg instanceof BallBounce &&!e.target.closest("a, button, input, select, textarea, #iframes")) {
			bg.toggleForce();
		}
	}, true);
	

}

let t = new ToolKit();


function draw() {
  	bg.update();
	if (getPixelation() != 1) {t.pixelate(getPixelation());}
	if (spawnX >= 300 || spawnY >= 300) {
		spawnX = 0; spawnY = 0;
	}
}

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
	document.documentElement.style.setProperty("--tx-wid", windowWidth/2+"px");
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
