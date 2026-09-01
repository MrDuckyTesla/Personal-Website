function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5js");
  noCursor();
}

function draw() {
  background(220);
   circle(mouseX, mouseY, 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}