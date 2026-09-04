let bg, isMobile;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5js");
  // noCursor();
  noSmooth(); noStroke();
  num = random();
  isMobile = /android|iphone|/i.test(navigator.userAgent);
  
  // if (isMobile) {
  //	if (num > 0.5) {bg = new Background1();}
  //	else {bg = new Background2(canvas);}
  // }
  // else {
	if (num > 0.6) {bg = new Background1();}
	else if (num > 0.2) {bg = new Background2(canvas);}
	else if (num > 0.15) {bg = new Background3();}
	else if (num > 0.1) {bg = new Background4();}
	else if (num > 0) {bg = new Background5();}
  // }
  
  
  
}

function draw() {
  background(60);
  // circle(mouseX, mouseY, 100);
  bg.update();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}