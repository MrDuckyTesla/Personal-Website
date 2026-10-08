// Name: Nico Lamas (MrDuckyTesla)
// Date: 5/1/23
// License:
// This program uses p5.js licensed under GNU Lesser General Public License v2.1
// p5.js: https://p5js.org/p5.js License: https://github.com/processing/p5.js/blob/main/license.txt

// Note to self:
// Add visual indicators to see if enemy is larger or smaller than player (like a stroke thats red or green depending on the size)
// Also make larger enemies fall/jump slower, and smaller enemies fall/jump faster
// Rectangle name funny thing (or make it a powerup)
// Settings dosent reset color to white
// Fix crash with playerName
// Maybe get rid of size sub and just subtract 100 from size/add 1 to LV
// Add back button or restart button after death (also make enemies keep going, player disappears)
// Add mouse/keyboard setting
// Make "You Were Eaten" draw over all cells
// Give spawn invincibility
// Show on top right corner stats like time, framerate, status (invincibility/FREEZE/whatever powerups as well), maybe even size and name?
// Visual effects for invincibility (rainbow or smth), also make enemies ignore invincible cells
// Make collision ELLIPSE shaped... (Impossable)
// Add Jake/Cade rage mode (60 FPS)
// Add Mexican mode apparently, IDK, Noah told me to
// Add 3d mode, seizue mode, rng mode, and tesla mode
// Add more logic to enemy, so its not just binary with coords (give it 2 coords, with one being its main/closest target, and another being its main/closest enemy)

let player, enemies = [], numEnemies = 7, uniqueID = 0;

function setup() {
  createCanvas(499, 499);
  // Create the menu/player
  menu = new Menu();
  player = new Player();
  // Create and add all the enemies to a list
  for(let i = 0; i < numEnemies; i++) {
    uniqueID ++;
    enemies.push(enemy = new Enemy(player, uniqueID));
  }
}

function draw() {
  background(28);
  if (player.playerName.toLowerCase() == "xedic" || player.playerName.toLowerCase() == "noah") {
    for (let i = 0; i < numEnemies; i++) {
      enemies.splice(i, 1);
    }
    menu.play = true;
    menu.settings = false;
    textSize(20);
    fill (player.color[0], player.color[1], player.color[2]);
    player.playerName = "Incompetent";
    text(player.playerName, width/2, height/1.5 - 40 - (40*1.5 + 40/1.5));
    textSize(50);
    textAlign(CENTER);
    fill("rgb(255, 0, 0)");
    text("YOU Try Writing\nBetter Code, NOAH.", width/2, height/4);
    text("YOU Try Writing\nBetter Code, NOAH.", width/2, height/2);
    text("YOU Try Writing\nBetter Code, NOAH.", width/2, height/(4/3));
    // Stop the program
    noLoop();
  }
  // If the menu is false
  if (menu.play) {
    noCursor();
    noStroke();
    // Slow down the framerate
    frameRate(30);
    player.update();
    // Update the enemies
    for(let i = 0; i < numEnemies; i++) {
      for (let j = 0; j < numEnemies; j++) {
        // If an enemy collides, splice and replace it
        if (enemies[i].collisionEnemy(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h, enemies[j].size, enemies[j].sizeSub) == "dead"){
          enemies.splice(j, 1);
          uniqueID ++;
          enemies.push(enemy = new Enemy(player, uniqueID));
        }
      }
      // Update the enemies
      temp = iterateMin(enemies, i, player);
      // If the player name is dev, change the difficulty to "dev" mode
      if (player.playerName.toLowerCase() == "dev") {
        enemies[i].jump(0, temp[0], temp[1], temp[2]);
      }
      // Else, keep the difficulty normal
      else {
        enemies[i].jump(menu.difficulty, temp[0], temp[1], temp[2]);
      }
      enemies[i].update();
      // If the players name is "MrDuckyTesla", or "MDT", dont kill it
      if (player.playerName.toLowerCase() != "mrduckytesla") {
        if (player.playerName.toLowerCase() != "mdt") {
          // If the player is dead
          if (enemies[i].collision() == "true" && player.playerName.toLowerCase() != "tesla") {
            textSize(100);
            textAlign(CENTER);
            fill("rgb(255, 0, 0)");
            text("You Were\nEaten.", width/2, height/2);
            // Stop the program
            noLoop();
          }
        }
      }
      // If an enemy collides, splice and replace it
      if (enemies[i].collision() == "dead") {
        enemies.splice(i, 1);
        uniqueID ++;
        enemies.push(enemy = new Enemy(player, uniqueID));  
      }
    }
  }
  // If the menu is true
  else {
    // Show the menu
    menu.show(player);
  }
}
// Iterate through every enemy, and find the nearest entity
function iterateMin(list, index, player) {
  // List to store all x coords, y coords, size, number to add and the adding boolean
  let nearList = [[], [], []];
  // Push the player
  nearList[0].push([player.x, player.y, player.size]);
  nearList[1].push(list[index].size > player.size);
  nearList[2].push([dist(player.x, player.y, list[index].x, list[index].y), 0, true, 0]);  // Normal distance
  nearList[2].push([dist(player.x + width, player.y, list[index].x, list[index].y), width, true, 0]);  // Right Distance
  nearList[2].push([dist(player.x - width, player.y, list[index].x, list[index].y), -width, true, 0]);  // Left Distance
  nearList[2].push([dist(player.x, player.y + height, list[index].x, list[index].y), height, false, 0]);  // Up Distance
  nearList[2].push([dist(player.x, player.y - height, list[index].x, list[index].y), -height, false, 0]);  // Down Distance
  
  // Push the enemies
  let counter = 1;
  for(let i = 0; i < list.length; i++) {
    if (list[i].uniqueID != list[index].uniqueID) {
      nearList[0].push([list[i].x, list[i].y, list[i].size]);
      nearList[1].push(list[index].size > list[i].size);
      nearList[2].push([dist(list[i].x, list[i].y, list[index].x, list[index].y), 0, false, i]);  // Normal distance
      nearList[2].push([dist(list[i].x + width, list[i].y, list[index].x, list[index].y), width, true, counter]);  // Right Distance
      nearList[2].push([dist(list[i].x - width, list[i].y, list[index].x, list[index].y), -width, true, counter]);  // Left Distance
      nearList[2].push([dist(list[i].x, list[i].y + height, list[index].x, list[index].y), height, false, counter]);  // Up Distance
      nearList[2].push([dist(list[i].x, list[i].y - height, list[index].x, list[index].y), -height, false, counter]);  // Down Distance
      counter ++;
    }
  }
  // Push all distances
  let minList = [];
  for (let i = 0; i < nearList[2].length - 1; i++) {
      minList.push(nearList[2][i][0]);
  }
  // Get smallest distance
  let minDist = min(minList);
  // Iterate until the enemy/player of the smallest distance is found
  for(let i = 0; i < nearList[2].length; i++) {
    // If current iteration is the smallest distance
    if (nearList[2][i][0] == minDist) {
      // If x coord needs adding
      if (nearList[2][i][2] == true) {
        // Return the x and y coords
        return [nearList[0][nearList[2][i][3]][0] + nearList[2][i][1], nearList[0][nearList[2][i][3]][1], nearList[1][nearList[2][i][3]]];
      }
      // If y coord needs adding
      else if (nearList[2][i][2] == false){
        // Return the x and y coords
          return [nearList[0][nearList[2][i][3]][0], nearList[0][nearList[2][i][3]][1] + nearList[2][i][1], nearList[1][nearList[2][i][3]]];
      }
    }
  }
}