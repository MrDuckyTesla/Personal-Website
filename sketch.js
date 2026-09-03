let bg;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5js");
  // noCursor();
  noSmooth(); noStroke();
  num = random();
  if (num > 0.66) {
	bg = new Background1();
  }
  else if (num > 0.33) {
  	bg = new Background2(canvas);
  }
  else {  
  	bg = new Background3();
  }
  
  bg = new Background5();
  
}

function draw() {
  background(60);
  // circle(mouseX, mouseY, 100);
  bg.update();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}