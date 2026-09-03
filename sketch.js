let bg;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5js");
  // noCursor();
  noSmooth(); noStroke();
  num = random();
  if (num > 0.5) {
	bg = new Background1();
  }
  else {
  	bg = new Background2(canvas);
  }
  
}

function draw() {
  background(60);
  // circle(mouseX, mouseY, 100);
  bg.update();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}