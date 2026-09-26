// =================================
// Program: Glyph Gatherer 2
// Description: Collect glyphs and avoid obsticles
// Version: 2.0
// Date Last Modified: 3/1/23
// =================================

let runOnce = true;
let player;
let objective;
let barriers = [];
let blocks = [];
let movingBarriers = [];
let levelOptions = [];
let objectives = [];
let score = 0;
let level = 0;
let deaths = 0;
let teleporters = [];

function setup() {
  createCanvas(800, 600);
  player = new Player(50, 50, 30);
  objective = new Objective(660, 350);
}

function draw() {
  background("rgb(66,59,59)");
  frameRate(50);
  
  // Update player & objectives
  objective.update();
  player.update();
  
  // Death update counter
  fill("rgb(158,28,3)");
  textSize(48);
  textAlign(CENTER);
  text("Deaths: " + deaths, width/2, (height / 8) * 7);
  
  // Test to find out what level the player is on
  if (level == 0) {
    levelSelect(player);
  }
  else if (level == 1) {
    levelOne();
  }
  else if (level == 2) {
    levelTwo();
  }
  else if (level == 3) {
    levelThree();
  }
  else if (level == 4) {
    levelFour();
  }
  else if (level == 5) {
    levelFive();
  }
  else if (level == 6) {
    levelSix();
  }
  else if (level == 7) {
    levelSeven();
  }
  
  // Show all the blocks
  for(let i = 0; i < blocks.length; i++) {
    blocks[i].show();
  }
  // Update the barriers
  for(let i = 0; i < barriers.length; i++) {
    barriers[i].update();
    
    // See if the player has died
    if (barriers[i].playerCollision(player)) {
      runOnce = true;
      deaths++;
    }
  }

  // See if the player hit the bottom
  if (player.y + player.size / 2 >= height) {
      runOnce = true;
      deaths++;
  }
  
  // Update the moving barriers
  for (let i = 0; i < movingBarriers.length; i++) {
    movingBarriers[i].update();
    
    // See if the player got smashed by the object
    if (movingBarriers[i].playerCollision(player)) {
      runOnce = true;
      deaths++;
    }
  }
}

function keyTyped() {
  if (key == " ") {
    player.boost();
  }
}

function changeTeleports() {
  // Change teleporters color based on objectives collected
  for (let i = 0; i < teleporters.length; i++) {
    teleporters[i].draw();
    if (score % 2 == 0) {
      teleporters[0].color = "rgb(206,17,206)"
      teleporters[1].color = "rgb(252,180,50)"
    }
    else {
      teleporters[1].color = "rgb(206,17,206)"
      teleporters[0].color = "rgb(252,180,50)"
    }
  }
}

function levelSelect() {
  if (runOnce == true) {
    noStroke();
    objective = new Objective(120, 100, 40, 40, "rgb(220,53,53)")
    objectives.push(objective);
    objectives.push(new Objective(280, 100, 40, 40, "rgb(244,165,21)"))
    objectives.push(new Objective(440, 100, 40, 40, "rgb(184,164,18)"))
    objectives.push(new Objective(600, 100, 40, 40, "rgb(10,226,10)"))
    objectives.push(new Objective(120, 255, 40, 40, "green"))
    objectives.push(new Objective(280, 255, 40, 40, "rgb(0,147,255)"))
    objectives.push(new Objective(440, 255, 40, 40, "rgb(24,24,207)"))
    blocks.push(new Block(0, 550, 800, 50));
    runOnce = false;
  }
  
  for(let i = 0; i < objectives.length; i++) {
    objectives[i].update();
    
    // See if the player has died
    if (objectives[i].playerCollision(player)) {
      runOnce = true;
      level = i + 1;
    }
  }
  
  // Add Numbers
  fill("rgb(0,0,0)");
  textSize(36);
  textAlign(CENTER);
  text("1", 140, 133);
  text("2", 300, 133);
  text("3", 460, 133);
  text("4", 620, 133);
  text("5", 140, 288);
  text("6", 300, 288);
  text("7", 460, 288);
  
  textSize(32);
  text("Welcome to Glyph Gatherer 2!", width/2, height/7 * 4)
  textSize(24);
  text("\nCollect all of the glyphs without hitting the barriers. \nTwice the levels, and square the difficulty!", width/2, height/7 * 4)
  
}

function levelOne() {
  // Create the setup that runs every time the level is reset
  if (runOnce == true) {
    barriers = []
    blocks = []
    objective = new Objective(660, 350);
    player = new Player(100, 100, 30);
    // Level 1 barriers
    noStroke();
    barriers.push(new Barrier(300, 0, 50, 425));
    barriers.push(new Barrier(0, 250, 200, 50));
    barriers.push(new Barrier(100, 425, 350, 50));
    barriers.push(new Barrier(500, 425, 300, 50));
    barriers.push(new Barrier(500, 100, 50, 340));
    barriers.push(new Barrier(425, 100, 75, 50));
    barriers.push(new Barrier(10, 120, 40, 65));
    barriers.push(new Barrier(125, 120, 40, 65));
    // Level 1 blocks
    blocks.push(new Block(50, 150, 75, 25));
    runOnce = false;
  }
  
  // Check to see if the player collected the objective
  if (objective.playerCollision(player)) {
    score += 1;
    // Move objective
    if (score == 1) {
      objective = new Objective(50, 50);
    }
    if (score == 2) {
      objective = new Objective(360, 400);
    }
    if (score == 3) {
      // Set level to level 2
      level = 2;
      runOnce = true;
    }
  }
}

function levelTwo() {
  // Create the setup that runs every time the level is reset
  if (runOnce == true) {
    score = 0;
    barriers = [];
    blocks = [];
    movingBarriers = [];
    noStroke();
    player = new Player(375, 400, 30);
    blocks.push(new Block(350, 430, 50, 10));
    blocks.push(new Block(100, 500, 100, 25));
    objective = new Objective(100, 100);
    movingBarriers.push(new MovingBarrier(0, 25, 50, 125, width - 50, 2));
    
    // Level 2 barriers
    barriers.push(new Barrier(325, 300, 25, 140));
    barriers.push(new Barrier(400, 400, 140, 40));
    barriers.push(new Barrier(400, 230, 140, 50));
    barriers.push(new Barrier(0, 0, 800, 25));
    barriers.push(new Barrier(0, 150, 350, 30));
    barriers.push(new Barrier(590, 150, 210, 30));
    barriers.push(new Barrier(590, 280, 150, 150));
    barriers.push(new Barrier(200, 400, 25, 200));
    barriers.push(new Barrier(225, 400, 100, 25));
    barriers.push(new Barrier(200, 180, 25, 125));
    barriers.push(new Barrier(60, 280, 140, 25));
    barriers.push(new Barrier(0, 280, 20, 25));
    barriers.push(new Barrier(0, 490, 100, 110));
    runOnce = false;
  }
  
  // Check to see if the player collected the objective
  if (objective.playerCollision(player)) {
    score += 1;
    // Move objective
    if (score == 1) {
      objective = new Objective(250, 450);
    }
    else if (score == 2) {
      objective = new Objective(175, 230);
    }
    else if (score == 3) {
      objective = new Objective(375, 400);
    }
    else {
      // Change the level to 3
      level = 3;
      runOnce = true;
    }
  }
  
  // Draw the text to tell the player how arrow keys work
  fill("rgb(0,255,29)");
  textSize(18);
  textAlign(CENTER);
  text("Hold arrow keys to move quicker!", width/5, (height / 7) * 4);
}

function levelThree() {
  // Create the setup that runs every time the level is reset
  if (runOnce == true) {
    runOnce = false;
    score = 0;
    barriers = [];
    blocks = [];
    movingBarriers = [];
    noStroke();
    objective = new Objective(150, 100);
    player = new Player(375, 400, 30);
    
    blocks.push(new Block(350, 475, 50, 10));
    
    barriers.push(new Barrier(400, 445, 25, 40));
    barriers.push(new Barrier(325, 445, 25, 40));
    barriers.push(new Barrier(0, 420, 350, 25));
    barriers.push(new Barrier(400, 420, 250, 25));
    barriers.push(new Barrier(690, 420, 110, 25));
    barriers.push(new Barrier(0, 280, 75, 40));
    barriers.push(new Barrier(125, 280, 450, 40));
    barriers.push(new Barrier(625, 280, 225, 40));
    barriers.push(new Barrier(350, 0, 50, 295));
    barriers.push(new Barrier(70, 150, 175, 25));
    barriers.push(new Barrier(0, 0, 800, 20));
    
    movingBarriers.push(new MovingBarrier(0, 320, 50, 100, 750, 2.5));
    movingBarriers.push(new MovingBarrier(0, 485, 50, 115, 750, 1));
  }
  
  if (objective.playerCollision(player)) {
    score ++;
    // Move objective
    if (score == 1) {
      objective = new Objective(370, 550);
    }
    if (score == 2) {
      objective = new Objective(420, 40);
    }
    if (score == 3) {
      objective = new Objective(368, 430);
    }
    if (score == 4) {
      level = 4;
      runOnce = true;
    }
  }
}

function levelFour() {
  // Create the setup that runs every time the level is reset
  if (runOnce == true) {
    runOnce = false;
    score = 0;
    barriers = [];
    blocks = [];
    movingBarriers = [];
    noStroke();
    blocks.push(new Block(350, 425, 50, 10));
    
    movingBarriers.push(new MovingBarrier(0, 525, 25, 75, 775, 5));
    movingBarriers.push(new MovingBarrier(125, 75, 50, 100, 625));
    movingBarriers.push(new MovingBarrier(125, 200, 25, 50, 160, 2, 2));
    movingBarriers.push(new MovingBarrier(175, 200, 25, 50, 160, 1.5, 2));
    movingBarriers.push(new MovingBarrier(225, 200, 25, 50, 160, 1, 2));
    movingBarriers.push(new MovingBarrier(275, 200, 25, 50, 160, 2.5, 2));
    movingBarriers.push(new MovingBarrier(0, 150, 50, 25, 50, 1))
    
    objective = new Objective(25, 475);
    player = new Player(375, 410, 30);

    barriers.push(new Barrier(0, 410, 350, 25));
    barriers.push(new Barrier(300, 435, 150, 25));
    barriers.push(new Barrier(400, 410, 125, 25));
    barriers.push(new Barrier(100, 0, 25, 200));
    barriers.push(new Barrier(125, 175, 325, 25));
    barriers.push(new Barrier(225, 0, 575, 75));
    barriers.push(new Barrier(500, 175, 25, 250));
    barriers.push(new Barrier(525, 175, 125, 25));
    barriers.push(new Barrier(700, 175, 100, 25));
    barriers.push(new Barrier(600, 325, 125, 150));
  }
  
  // Move objectives and change level
  if (objective.playerCollision(player)) {
    score ++;
    if (score == 1) {
      objective = new Objective(25, 25);
    }
    else if (score == 2) {
      objective = new Objective(150, 25);
    }
    else if (score == 3) {
      objective = new Objective(550, 225);
    }
    else if (score == 4) {
      level = 5
      runOnce = true
    }
  }
}

function levelFive() {
  // Create the setup that runs every time the level is reset
  if (runOnce == true) {
    runOnce = false;
    score = 0;
    barriers = [];
    blocks = [];
    movingBarriers = [];
    movingBarriers.push(new MovingBarrier(0, 50, 50, 150, 750, 2))
    movingBarriers.push(new MovingBarrier(50, 0, 150, 50, 550, 2, 2))
    movingBarriers.push(new MovingBarrier(0, 250, 50, 150, 750, 2.5))
    objective = new Objective(775, 265)
    player = new Player(550, 225, 30)
    noStroke();
    blocks.push(new Block(525, 235, 50, 10));
    barriers.push(new Barrier(0, 0, 50, 50));
    barriers.push(new Barrier(200, 0, 650, 50));
    barriers.push(new Barrier(0, 200, 50, 50));
    barriers.push(new Barrier(0, 400, 50, 200));
    barriers.push(new Barrier(200, 400, 500, 25 ));
    barriers.push(new Barrier(200, 550, 50, 50));
    barriers.push(new Barrier(200, 200, 325, 50));
    barriers.push(new Barrier(575, 200, 225, 50));
    barriers.push(new Barrier(525, 425, 50, 75));
  }
  
  // Move objective
  if (objective.playerCollision(player)) {
    score ++;
    if (score == 1) {
      objective = new Objective(25, 75);
    }
    else if (score == 2) {
      objective = new Objective(100, 550);
    }
    else if (score == 3) {
      objective = new Objective(540, 215);
    }
    else if (score == 4) {
      level = 6
      runOnce = true
    }
  }
}

function levelSix() {
  // Create the setup that runs every time the level is reset
  if (runOnce == true) {
    runOnce = false;
    score = 0;
    barriers = [];
    blocks = [];
    player = new Player(540, 215, 30)
    blocks.push(new Block(675, 550, 125, 10))
    blocks.push(new Block(675, 450, 125, 10))
    objective = new Objective(450, 300)
    blocks.push(new Block(520, 230, 50, 10))
    barriers.push(new Barrier(250, 225, 270, 25))
    barriers.push(new Barrier(0, 0, 800, 25))
    barriers.push(new Barrier(570, 225, 230, 25))
    barriers.push(new Barrier(0, 225, 175, 25))
    // barriers.push(new Barrier(750, 450, 50, 150))
    barriers.push(new Barrier(395, 250, 25, 225))
    barriers.push(new Barrier(420, 450, 230, 25))
    barriers.push(new Barrier(650, 450, 25, 150))
    barriers.push(new Barrier(750, 25, 50, 200))
    barriers.push(new Barrier(0, 25, 50, 200))
    barriers.push(new Barrier(125, 350, 150, 25))
    barriers.push(new Barrier(200, 375, 25, 225))
    movingBarriers = [];
    movingBarriers.push(new MovingBarrier(50, 75, 25, 125, 675, 5.3)) 
    movingBarriers.push(new MovingBarrier(0, 350, 75, 25, 50, 1))
    noStroke()
    teleporters = [];
    teleporters.push(new Teleport(200, 150))
    teleporters.push(new Teleport(725, 500, "rgb(252,180,50)"))
  }
  
  // Change teleporters color based on objectives collected
  changeTeleports()
    
    // See if the player should get teleported
    if (teleporters[0].teleportPlayer(player) && score % 2 == 0) {
      player.x += 525
      player.y += 350
    }
    else if(teleporters[1].teleportPlayer(player) && score % 2 == 1) {
      player.x -= 525
      player.y -= 350
    }
  
  // Move Objectives
  if (objective.playerCollision(player)) {
    score++
    if (score == 1) {
      objective = new Objective(550, 550);
    }
    else if (score == 2) {
      objective = new Objective(700, 50);
    }
    else if (score == 3) {
      objective = new Objective(100, 500);
    }
    else if (score == 4) {
      level = 7
      runOnce = true
    }
  }
  
  // Text to tell the player about teleporters
  fill("rgb(0,255,29)");
  textSize(18);
  textAlign(CENTER);
  text("You can teleport by running into the purple square!", width/2, (height / 10));
}

function levelSeven() {
  // Create the setup that runs every time the level is reset
  if (runOnce == true) {
    runOnce = false;
    score = 0;
    barriers = [];
    blocks = [];
    player = new Player(100, 400, 30)
    blocks.push(new Block(50, 425, 425, 10))
    blocks.push(new Block(0, 350, 50, 10))
    objective = new Objective(369, 400)
    barriers.push(new Barrier(175, 435, 100, 240))
    barriers.push(new Barrier(0, 0, 50, 250))
    barriers.push(new Barrier(0, 360, 50, 255))
    barriers.push(new Barrier(125, 225, 675, 25))
    barriers.push(new Barrier(125, 350, 50, 100))
    barriers.push(new Barrier(275, 350, 50, 100))
    barriers.push(new Barrier(425, 350, 50, 100))
    barriers.push(new Barrier(600, 350, 50, 250))
    movingBarriers = [];
    movingBarriers.push(new MovingBarrier(0, 250, 50, 100, 750, 10.6))
    movingBarriers.push(new MovingBarrier(200, 0, 25, 50, 175, 1.5, 2))
    movingBarriers.push(new MovingBarrier(300, 0, 25, 50, 175, 2.5, 2))
    movingBarriers.push(new MovingBarrier(400, 0, 25, 50, 175, 2, 2))
    movingBarriers.push(new MovingBarrier(500, 0, 25, 50, 175, 3, 2))
    movingBarriers.push(new MovingBarrier(600, 0, 25, 50, 175, 3.5, 2))
    movingBarriers.push(new MovingBarrier(50, 50, 25, 50, 725, 3))
    movingBarriers.push(new MovingBarrier(50, 150, 25, 50, 725, 3.75))
    noStroke()
    teleporters = [];
    teleporters.push(new Teleport(700, 100))
    teleporters.push(new Teleport(700, 300, "rgb(252,180,50)"))
  }
  
  // Change teleporters color based on objectives collected
  changeTeleports()
    
    // See if the player should get teleported
    if (teleporters[0].teleportPlayer(player) && score % 2 == 0) {
      player.y += 200
    }
    else if(teleporters[1].teleportPlayer(player) && score % 2 == 1) {
      player.y -= 200
    }
  
  // Move Objectives
  if (objective.playerCollision(player)) {
    score++
    if (score == 1) {
      objective = new Objective(350, 100);
    }
    else if (score == 2) {
      objective = new Objective(369, 550);
    }
    else if (score == 3) {
      objective = new Objective(25, 300);
    }
    else if (score == 4) {
      level = 8
      runOnce = true
    }
  }
}
