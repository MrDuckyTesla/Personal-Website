// Create a list to store all snowflakes
let snowList = [], avg;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5js");
  // noCursor();
  noSmooth(); noStroke();
  
  avg = (windowWidth + windowHeight) / 4;
  // Add snowflakes to the list with a random size
  for (let i = 0; i < avg; i++) {
    // Radius gets a random number from 10 to 40 
    snowList.push(new Snowflake(random(avg/10)+10));
  }
}

function draw() {
  background(220);
  // circle(mouseX, mouseY, 100);
  
  // Go through list and update snowflakes
  for (let i = 0; i < snowList.length; i++) {
    snowList[i].update();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}