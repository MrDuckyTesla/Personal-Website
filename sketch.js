let bg;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5js");
  // noCursor();
  noSmooth(); noStroke();
  num = random();
  if (num > 0.8) {
	bg = new Background1();
  }
  else if (num > 0.6) {
  	bg = new Background2(canvas);
  }
  else if (num > 0.4) {  
  	bg = new Background3();
  }
  else if (numm > 0.2) {
	bg = new Background4();
  }
  else {
	bg = new Background5();
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