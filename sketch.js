let bg, isMobile, canvas;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
  	canvas.parent("p5js");
  	noSmooth(); noStroke();
  	// isMobile = /android|iphone|/i.test(navigator.userAgent);
	changeRandom();
    background(60);
  
  
  
}

function draw() {
  	bg.update();
  
}

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
  	background(60);
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
}
