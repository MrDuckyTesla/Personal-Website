let numCircles = 35;
let xCoords = [];
let yCoords = [];
let colors = [[], [], []];
let diameter = [];
let randomNum = [[], []];

function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < numCircles; i++) {
    let d = random(15, 50);
    let x = random(d * -1, width + d);
    let y = random(d * -1, height + d);
    let r = random(0, 256);
    let g = random(0, 256);
    let b = random(0, 256);
    let s2 = random(3, 5);
    let rX = (random(0, 10000));
    let rY = (random(0, 10000));
    xCoords.push(x);
    yCoords.push(y);
    colors[0].push(r);
    colors[1].push(g);
    colors[2].push(b);
    diameter.push(d);
    randomNum[0].push(rX);
    randomNum[1].push(rY);
  }
}
function draw() {
  background(colors[0], colors[1], colors[2]);
  for(let i = 0; i < numCircles; i++) {
    let x = xCoords[i];
    let y = yCoords[i];
    let r = colors[0][i];
    let g = colors[1][i];
    let b = colors[2][i];
    let d = diameter[i];
    randomNum[0][i] += 0.01;
    randomNum[1][i] += 0.01;
    makeMan(x, y, d);
    
    if (x >= width + d) {
      x = (d * -1);
    }
    else if (x <= d * -1) {
      x = (d + width);
    }
    if (y >= height + d) {
      y = (d * -1);
    }
    else if (y <=  2 * d * -1) {
      y = (d * 2 + height);
    }
    x += (noise(randomNum[1][i], randomNum[0][i]) - 0.5) * (d / 10);
    y += (noise(randomNum[0][i], randomNum[1][i]) - 0.5) * (d / 10);
    xCoords[i] = x;
    yCoords[i] = y;
    fill(r, g,b);
  }
}

function makeMan(x, y, d) {
  circle(x, y, d);  // Head
  line(x, y + (d/2), x, y + (d * 1.5));  // Body
  line(x, y + d, x + d / 2, y + d / 2);  // Right Arm
  line(x, y + d, x - d / 2, y + d / 2);  // Left Arm
  line(x + d / 2, y + 2 * d, x, y + (d * 1.5));  // Right Leg
  line(x - d / 2, y + 2 * d, x, y + (d * 1.5));  // Left Leg
}

// square(x, y, d);
// triangle(x, y, x + (d/2), y + d, x + d, y);
// triangle(x, y + d, x + d, y + (d/2), x, y);
// triangle(x + (d/2), y, x, y + d, x + d, y + d);
// triangle(x + d, y, x + d, y + d, x, y + (d/2));
