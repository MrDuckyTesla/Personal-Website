let bg, isMobile, canvas;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
  	canvas.parent("p5js");
  	noSmooth(); noStroke();
  	// isMobile = /android|iphone|/i.test(navigator.userAgent);
	changeSaved();
	document.documentElement.style.setProperty(
		"--bg-opacity",
		getOpacity() / 100
	);
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

let colorChanged = true;
function setColor(color) {localStorage.setItem("color", color); colorChanged = true;}
function getColor() {return localStorage.getItem("color");}
function resetColor() {
	setColor("60, 60, 60"); 
	sliderClrR.value = 60;
	sliderClrG.value = 60;
	sliderClrB.value = 60;
	outputClr.textContent = getNewColorStr();
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
