let bg, isMobile, canvas;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
  	canvas.parent("p5js");
  	// noCursor();
  	noSmooth(); noStroke();
  	num = random();
  	// isMobile = /android|iphone|/i.test(navigator.userAgent);
  
	if (num > 0.75) {bg = new SnowFall();}
	else if (num > 0.5) {bg = new BallBounce(canvas);}
	else if (num > 0.25) {bg = new SnakeMove();}
	else if (num > 0) {bg = new ParticalRadial();}
    background(60);
  
  
  
}

function draw() {
  	// background(60);
  	// circle(mouseX, mouseY, 100);
  	bg.update();
  
}

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
  	background(60);
}

function changeSnow() {
	bg = new SnowFall();
}

function changeBounce() {
	bg = new BallBounce(canvas);
}

function changeSnake() {
	bg = new SnakeMove();
}

function changeRadial() {
	bg = new ParticalRadial();
}
