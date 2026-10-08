let pX, py;  // The coordinates of the Player
let gX, gY;  // The coordinates of the Goal
let pD;  // The diameter pf the player Circle
let gD = 5;  // The diameter pf the goal Circle
let randomNum = [[], [], []];
let swotch = true;
let score = 0;
let drank = 0;

function setup() {
  createCanvas(1365, 590);
  pD = random(15, 45);
  pX = width/2;
  pY = height/2;
  resetGoal();
  randomNum[0].push(random(0, 10000));
  randomNum[0].push(random(0, 10000));
  randomNum[1].push(random(0, 10000));
  randomNum[1].push(random(0, 10000));
  randomNum[2].push(random(0, 10000));
  randomNum[2].push(random(0, 10000));
  console.log(randomNum);
}

function draw() {
  background(50);
  // Move the player
  movePlayer(10);
  randomNum[0][0] += 0.01;
  randomNum[1][0] += 0.01;
  pX += (noise(randomNum[1][0], randomNum[0][0]) - 0.5) * drank;
  pY += (noise(randomNum[0][0], randomNum[1][0]) - 0.5) * drank;
  // Drawing the Player
  fill(255, 0, 0);
  circle(pX, pY, pD);
  
  pD += (noise(randomNum[2][0], randomNum[2][1]) - 0.5) / 2;
  if (pD >= 45) {
    pD = 45;
  }
  if (pD <= 15) {
    pD = 15;
  }
  randomNum[2][0] += 0.01;
  randomNum[2][1] += 0.01;

  getBackHere(pD);
  // Drawing the Goal
  stroke(255, 255, 0);
  strokeWeight(0);
  fill("gold");
  randomNum[0][1] += 0.01;
  randomNum[1][1] += 0.01;
  gX += (noise(randomNum[1][1], randomNum[0][1]) - 0.5) * drank;
  gY += (noise(randomNum[0][1], randomNum[1][1]) - 0.5) * drank;
  circle(gX, gY, gD);
  getBackHere2(gD);
  // Draw the score and timer on the canvas
  stroke(0, 0, 0);
  strokeWeight(0);
  fill("black");
  textSize(28);
  text("Score:  " + score + "    Time:  " + ((floor(millis() / 86400000))) + "." + ((floor(millis() / 3600000)) % 24) + "." + ((floor(millis() / 60000)) % 60) + "." + ((floor(millis() / 1000)) % 60) + "." + ((floor(millis() / 100)) % 10) + ((floor(millis() / 10)) % 10) + "    Size:  " + round(pD, 1), 0, 20);
  // Draw the fps on the canvas
  text("Fps:  " + floor(frameRate()), width - 120, 20);
  // Check to see if the player has reached the Goal
  if(checkOnGoal()) {
    resetGoal();
    score++;
    drank += 2.5;
  }
}

/*
The resetGoal function resets the x and
y coordinate of the goal.
*/

function resetGoal() {
  gX = random(gD, width - gD);
  gY = random(gD, height - gD);
}


/*
The movePlayer function moves the player
*/

function movePlayer(speed) {
  // If the player is holding down the "a" key
  if(keyIsDown(65)) {
    pX -= speed;
  }
  // If the player is holding down the "w" key
  if(keyIsDown(87)) {
    pY -= speed;
  }
  // If the player is holding down the "s" key
  if(keyIsDown(83)) {
    pY += speed;
  }
  // If the player is holding down the "d" key
  if(keyIsDown(68)) {
    pX += speed;
  }
  // If the player is holding down the "left arrow" key
  if(keyIsDown(LEFT_ARROW)) {
    pX -= speed;
  }
  // If the player is holding down the "right arrow" key
  if(keyIsDown(RIGHT_ARROW)) {
    pX += speed;
  }
  // If the player is holding down the "up arrow" key
  if(keyIsDown(UP_ARROW)) {
    pY -= speed;
  }
  // If the player is holding down the "down arrow" key
  if(keyIsDown(DOWN_ARROW)) {
    pY += speed;
  }
}

/*
Checks to see if the Player is on the Goal. If so, 
returns true and otherwise returns false.
*/

function checkOnGoal() {
  // Get the distance from the centers of each circle
  let d = dist(pX, pY, gX, gY);
  // Test to see if the distance is less than the sum
  // of the radii of the circles
  if(d <= gD/2 + pD/2) {
    return true;
  }
  else {
    return false;
  }
}

/*
The getBackHere function moves the player back 
into bounds if they are out of bounds.
*/

function getBackHere(d) {
    if (pX >= width + d) {
      pX = (d * -1);
    }
    else if (pX <= d * -1) {
      pX = (d + width);
    }
    if (pY >= height + d) {
      pY = (d * -1);
    }
    else if (pY <=  d * -1) {
      pY = (d + height);
    }
}

function getBackHere2(d) {
    if (gX >= width + d) {
      gX = (d * -1);
    }
    else if (gX <= d * -1) {
      gX = (d + width);
    }
    if (gY >= height + d) {
      gY = (d * -1);
    }
    else if (gY <=  d * -1) {
      gY = (d + height);
    }
}
