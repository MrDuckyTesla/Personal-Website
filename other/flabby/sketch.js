let bird, mario = [], score = 0, randomNum = [], numCircles = 50, bigList = [ [], [], [], [ [], [] ], [ [], [], [] ] ];

function setup() {
  createCanvas(800, 600);
  pird = new Pird(100, height/2, 30);
  mario.push(new Mario());
  randomNum.push(random(0, 10000));
  randomNum.push(random(0, 10000));
  for (let i = 0; i < numCircles; i++) {
    bigList[2].push(random(10, 15));
    bigList[0].push(random(bigList[2][i] * -1, width + bigList[2][i]));
    bigList[1].push(random(bigList[2][i] * -1, height + bigList[2][i]));
    bigList[3][0].push(random(0, 10000));
    bigList[3][1].push(random(0, 10000));
    bigList[4][0].push(random(0, 256));
    bigList[4][1].push(random(0, 256));
    bigList[4][2].push(random(0, 256));
  }
  
}

function draw() {
  noStroke();
  background(28);
  for(let i = 0; i < numCircles; i++) {
    let x = bigList[0][i];
    let y = bigList[1][i];
    let r = bigList[4][0][i];
    let g = bigList[4][1][i];
    let b = bigList[4][2][i];
    let d = bigList[2][i];
    bigList[3][0][i] += 0.01;
    bigList[3][1][i] += 0.01;
    
    if (x >= width + d) {
      x = (d * -1);
    }
    else if (x <= d * -1) {
      x = (d + width);
    }
    if (y >= height + d) {
      y = (d * -1);
    }
    else if (y <=  d * -1) {
      y = (d + height);
    }
    x += (noise(bigList[3][0][i], bigList[3][1][i]) - 0.5) * d/5;
    y += (noise(bigList[3][1][i], bigList[3][0][i]) - 0.5) * d/5;
    bigList[0][i] = x;
    bigList[1][i] = y;
    fill(r, g,b);
    circle(x, y, d);
  }
  pird.update(randomNum[0], randomNum[1], score);
  randomNum[0] += 0.01;
  randomNum[1] += 0.01;
  updateMario();
  createMario();
  fill("green");
  textSize(32);
  text("Score:  " + score, width - 150, 33);
}

function keyTyped() {
  if(key == " ") {
    pird.fly();
  }
}

function updateMario() {
  for(let i = mario.length - 1; i >= 0; i--) {
    mario[i].update();

    if(mario[i].offScreen()) {
      mario.splice(i, 1);
    }
    if (mario[i].pirdCollision(pird)) {
      noLoop();
      fill("rgb(255, 0, 0)");
      textSize(32);
      textAlign(CENTER);
      text("Game Over", width/2, height/2);
    }
    if(mario[i].pass(pird)) {
      score++;
    }
  }
}

function createMario() {
  if(frameCount % 100 == 0) {
    mario.push(new Mario());
  }
}