// Name: Nico Lamas (MrDuckyTesla)
// Date: 5/1/23
// License:
// This program uses p5.js licensed under GNU Lesser General Public License v2.1
// p5.js: https://p5js.org/p5.js License: https://github.com/processing/p5.js/blob/main/license.txt

class Background4 {
	constructor() {
		this.player, this.enemies = [], this.numEnemies = 5, this.uniqueID = 0;
		// Create the menu/player
		// menu = new Menu();
		this.player = new Player();
		// Create and add all the enemies to a list
		for(let i = 0; i < this.numEnemies; i++) {
		  this.uniqueID ++;
		  this.enemies.push(new Enemy(this.player, this.uniqueID));
		}
	}
	
	update() {
		// If the menu is false
		// if (menu.play) {
		  // Slow down the framerate
		  frameRate(30);
		  this.player.update();
		  // Update the enemies
		  for(let i = 0; i < this.numEnemies; i++) {
		    for (let j = 0; j < this.numEnemies; j++) {
		      // If an enemy collides, splice and replace it
		      if (this.enemies[i].collisionEnemy(this.enemies[j].x, this.enemies[j].y, this.enemies[j].w, this.enemies[j].h, this.enemies[j].size, this.enemies[j].sizeSub) == "dead"){
		        this.enemies.splice(j, 1);
		        this.uniqueID ++;
		        this.enemies.push(new Enemy(this.player, this.uniqueID));
		      }
		    }
		    // Update the enemies
		    let temp = iterateMin(this.enemies, i, this.player);
		    // If the player name is dev, change the difficulty to "dev" mode
		    if (this.player.playerName.toLowerCase() == "dev") {
		      this.enemies[i].jump(0, temp[0], temp[1], temp[2]);
		    }
		    // Else, keep the difficulty normal (it was all an illusion of choice)
		    else {
		      this.enemies[i].jump(2, temp[0], temp[1], temp[2]);
		    }
		    this.enemies[i].update();
		    // If the players name is "MrDuckyTesla", or "MDT", dont kill it
		    if (this.player.playerName.toLowerCase() != "mrduckytesla") {
		      if (this.player.playerName.toLowerCase() != "mdt") {
		        // If the player is dead
		        // if (enemies[i].collision() == "true" && player.playerName.toLowerCase() != "tesla") {
		        //   textSize(100);
		        //   textAlign(CENTER);
		        //   fill("rgb(255, 0, 0)");
		        //   text("You Were\nEaten.", width/2, height/2);
		        //   // Stop the program
		        //   noLoop();
		        // }
		      }
		    }
		    // If an enemy collides, splice and replace it
		    if (this.enemies[i].collision() == "dead") {
		      this.enemies.splice(i, 1);
		      this.uniqueID ++;
		      this.enemies.push(new Enemy(this.player, this.uniqueID));  
		    }
		  }
		// }
		// If the menu is true
		// else {
		//   // Show the menu
		//   menu.show(player);
		// }
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

class Player {
  constructor(menu) {
    // Creating varables for class
    this.playerName = "PLAYER"
    this.x = width/2;
    this.prevX = 0
    this.y = height/2;
    this.size = 40;
    this.sizeSub = 0;  // This subtracts from your size if exceed 140
    this.color = [random((this.size - this.sizeSub), 256), random((this.size - this.sizeSub), 256), random((this.size - this.sizeSub), 256)];
    // Gravity
    this.vel = 0;
    this.grav = 1;
    this.lift = 2;
    this.res = 0.95;
    // The level of the player (size / 100 + 1)
    this.level = this.sizeSub/100 + 1;
  }
  show() {
    noStroke();
    // The difference between the prevous X, and your current X
    let deltaX = this.prevX - this.x;
    // Determines the player of the enemy using atlan2
    this.angle = atan2((this.vel+this.y) - this.y, (-deltaX+this.x) - this.x);
    fill(this.color[0], this.color[1], this.color[2]);
    this.level = this.sizeSub/100 + 1;
    textAlign(CENTER);
    textSize((this.size - this.sizeSub)/3);
    // Display the text above the player
    text("\n" + this.playerName, this.x, this.y - (this.w*1.5 + (this.size - this.sizeSub)/1.5));
    // Push current state before translating/rotating
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    // Change the width and height off of velocity
    if(this.vel < 0) {
      this.w = -this.vel*4;
      this.h =  (this.size - this.sizeSub) - (-this.vel*6);
    }
    else {
      this.w = this.vel*5;
      this.h = (this.size - this.sizeSub)/2 - this.vel*5;
    }
    if (this.w <= 20) {
      this.w = 20;
    }
    if (this.h <= 20) {
      this.h = 20;
    }
    if (this.w >= 80) {
      this.w = 80;
    }
    if (this.h >= 60) {
      this.h = 60;
    }
    // Create body with graident
    for (let counter = round(this.size - this.sizeSub); counter != 0; counter --) {
      fill((this.color[0] - counter), (this.color[1] - counter), (this.color[2] - counter));
      ellipse(this.x - this.x, this.y - this.y, this.w+counter/2, this.h+counter/2);
    }
    // Create eyes
    fill(0);
    if (this.vel < 0) {
      circle(this.vel, this.y + (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
      circle(this.vel, this.y - (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
    }
    else {
      circle(-this.vel, this.y + (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
      circle(-this.vel, this.y - (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
    }
  pop();
  // Return state before translating/rotating
  }
  update() {
    // Subtracts the size if larger than 140
    if((this.size - this.sizeSub) > 140) {
      this.sizeSub += 100;
    }
    // Update gravity
    this.vel += this.grav;
    this.vel *= this.res;
    this.y += this.vel;
    // Allow the user to move
    this.jump();
    // Bring the player back if out of bounds
    this.getBackHere();
    this.show();
  }
  getBackHere() {
    // Bring back the player if out of bounds
    if (this.x >= width + this.h) {
      this.x = (this.h * -1);
    }
    else if (this.x <= this.h * -1) {
      this.x = (this.h + width);
    }
    if (this.y >= height + this.w) {
      this.y = (this.w * -1);
    }
    else if (this.y <=  this.w * -1) {
      this.y = (this.w + height);
    }
  }
  jump() {
    // Allow the player to move
    this.prevX = this.x;
    if (keyIsDown(32) || keyIsDown(87) || keyIsDown(38) || mouseIsPressed === true ) {  //|| mouseY < this.y) {
      this.vel -= this.lift;
    }
    if (keyIsDown(65) || keyIsDown(37) ) {  //|| mouseX < this.x) {
      this.x -= this.lift*2;
    }
    if (keyIsDown(68) || keyIsDown(39) ) {  //|| mouseX > this.x) {
      this.x += this.lift*2;
    }
  }
}

class Enemy {
  constructor(player, uniqueID) {
    // Creating varables for class
    this.player = player;
    this.x = random(width);
    this.prevX = 0;
    this.y = random(height);
    this.size = random(this.player.size-15, this.player.size+15);
    this.sizeSub = 0; // This subtracts from the enemies size if it exceeds 140
    // Keeps the enemy away from player
    if (dist(this.player.x, this.player.y, this.x, this.y) - this.size/2 <= ((this.player.size - this.sizeSub)/2)*5) {
      while(dist(this.player.x, this.player.y, this.x, this.y) - this.size/2 <= ((this.player.size  - this.sizeSub)/2)*5) {
        // Reassign variables
        this.size = random((this.player.size - this.player.sizeSub)-15, (this.player.size - this.player.sizeSub)+15);
        this.sizeSub = 0;
        this.x = random(width);
        this.y = random(height);
      }
    }
    this.color = [random(this.size - this.sizeSub, 256), random(this.size - this.sizeSub, 256), random(this.size - this.sizeSub, 256)];
    // Real size of the enemy without sizeSub
    this.actualSize = this.size;
    // Gravity
    this.vel = 0;
    this.grav = 1;
    this.lift = 2;
    this.res = 0.95;
    // The enemies name
    this.enemyName = this.nameGenerator();
    // The level of the enemy (size / 100 + 1)
    this.level = this.sizeSub/100 + 1;
    // Variable assigned to differentiate enemies
    this.uniqueID = uniqueID;
  }
  update() {
    // Changes the width and height based off of size
    if(this.vel < 0) {
      this.w = -this.vel*4;
      this.h =  (this.size - this.sizeSub) - (-this.vel*6);
    }
    else {
      this.w = this.vel*5;
      this.h = (this.size - this.sizeSub)/2 - this.vel*5;
    }
    if (this.w <= 20) {
      this.w = 20;
    }
    if (this.h <= 20) {
      this.h = 20;
    }
    if (this.w >= 80) {
      this.w = 80;
    }
    if (this.h >= 60) {
      this.h = 60;
    }
    // Update size
    if (this.size - this.sizeSub >= 140) {
      this.sizeSub += 100;
    }
    // Update gravity
    this.vel += this.grav;
    this.vel *= this.res;
    this.y += this.vel;
    // Bring back the enemy if out of bounds
    this.getBackHere();
    this.collision();
    this.show();
  }
  show() {
    // The difference between the prevous X, and the current X
    let deltaX = this.prevX - this.x;
    // Determines the angle of the enemy using atlan2
    this.angle = atan2((this.vel+this.y) - this.y, (-deltaX+this.x) - this.x);
    this.level = round(this.sizeSub/100) + 1;
    fill(this.color[0], this.color[1], this.color[2]);
    // Display the text above the enemy
    textAlign(CENTER);
    textSize((this.size - this.sizeSub)/3);
    text("\n" + this.enemyName, this.x, this.y - this.w*2);
    // Push current state before translating/rotating
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    // Create body with graident
    for (let counter = round(this.size - this.sizeSub); counter != 0; counter --) {
      fill((this.color[0] - counter), (this.color[1] - counter), (this.color[2] - counter));
      ellipse(this.x - this.x, this.y - this.y, this.w+counter/2, this.h+counter/2);
    }
    // Create eyes
    fill(0);
    if (this.vel < 0) {
      circle(this.x - this.x + this.vel, this.y + (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
      circle(this.x - this.x + this.vel, this.y - (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
    }
    else {
      circle(this.x - this.x - this.vel, this.y + (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
      circle(this.x - this.x - this.vel, this.y - (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
    }
    pop();
    // Return state of before pushing/rotating
  }
  collision() {
    // Collision between player and enemy
    if (this.x - this.h/2 <= this.player.x + this.player.h/2 && this.x + this.h/2 >= this.player.x - this.player.h/2 && this.y - this.w/2 <= this.player.y + this.player.w/2 && this.y+this.w/2 >= this.player.y - this.player.w/2) {
      if (this.player.size < this.size) {
        // Player loses
        return "true";
      }
      else if (this.player.size > this.size) {
        // this.player.size += (this.size - this.sizeSub)/100;
        // Player gains size
        return "dead";
      }
    }
    else {
      // No collision takes place
      return "false";
    }
  }
  collisionEnemy(x, y, w, h, size, sizeSub) {
    // Collision between enemy and enemy
    if (this.x - this.h/2 <= x + h/2 && this.x + this.h/2 >= x - h/2 && this.y - this.w/2 <= y + w/2 && this.y+this.w/2 >= y - w/2) {
      if (size > this.size) {
        // Enemy loses
        return "true";
      }
      else if (size < this.size) {
        // Other enemy loses
        return "dead";
      }
    }
    else {
      // No collision takes place
      return "false";
    }
  }
  getBackHere() {
    // Bring back the enemy if out of bounds
    if (this.x >= width + this.h) {
      this.x = (this.h * -1);
    }
    else if (this.x <= this.h * -1) {
      this.x = (this.h + width);
    }
    if (this.y >= height + this.w) {
      this.y = (this.w * -1);
    }
    else if (this.y <=  this.w * -1) {
      this.y = (this.w + height);
    }
  }
  jump(personalityType, x, y, bool) {
    this.prevX = this.x;
    // Determines where the enemy goes using x and y
    // 0:  Dev Mode
    if (personalityType == 0) {
      if (this.y > mouseY) {
          this.vel -= this.lift;
        }
        if (this.x > mouseX) {
          this.x -= this.lift*2;
        }
        if (this.x < mouseX) {
          this.x += this.lift*2;
        }
    }
    // 1:  Easy Mode
    if (personalityType == 1) {
      if (dist(this.player.x, this.player.y, this.x, this.y) >= dist(x, y, this.x, this.y)) {
        if (this.player.size < this.size) {
          if (this.y < this.player.y) {
            this.vel -= this.lift;
          }
          if (this.x < this.player.x) {
            this.x -= this.lift*2;
          }
          if (this.x > this.player.x) {
            this.x += this.lift*2;
          }
        }
        else if (this.player.size > this.size) {
          if (this.y > this.player.y) {
            this.vel -= this.lift;
          }
          if (this.x > this.player.x) {
            this.x -= this.lift*2;
          }
          if (this.x < this.player.x) {
            this.x += this.lift*2;
          }
        }
      }
      else if (bool == false) {
        if (this.y < y) {
          this.vel -= this.lift;
        }
        if (this.x < x) {
          this.x -= this.lift*2;
        }
        if (this.x > x) {
          this.x += this.lift*2;
        }
      }
      else if (bool == true) {
        if (this.y > y) {
          this.vel -= this.lift;
        }
        if (this.x > x) {
          this.x -= this.lift*2;
        }
        if (this.x < x) {
          this.x += this.lift*2;
        }
      }
    }
    // 2:  Normal Mode
    else if (personalityType == 2) {
      if (bool == false) {
        if (this.y < y) {
          this.vel -= this.lift;
        }
        if (this.x < x) {
          this.x -= this.lift*2;
        }
        if (this.x > x) {
          this.x += this.lift*2;
        }
      }
      else if (bool == true) {
        if (this.y > y) {
          this.vel -= this.lift;
        }
        if (this.x > x) {
          this.x -= this.lift*2;
        }
        if (this.x < x) {
          this.x += this.lift*2;
        }
      }
    }
    // 3:  Hard Mode
    if (personalityType == 3) {
      if (this.player.size < this.size) {
        if (this.y > this.player.y) {
          this.vel -= this.lift;
        }
        if (this.x > this.player.x) {
          this.x -= this.lift*2;
        }
        if (this.x < this.player.x) {
          this.x += this.lift*2;
        }
      }
      else if (bool == false) {
        if (this.y < y) {
          this.vel -= this.lift;
        }
        if (this.x < x) {
          this.x -= this.lift*2;
        }
        if (this.x > x) {
          this.x += this.lift*2;
        }
      }
      else if (bool == true) {
        if (this.y > y) {
          this.vel -= this.lift;
        }
        if (this.x > x) {
          this.x -= this.lift*2;
        }
        if (this.x < x) {
          this.x += this.lift*2;
        }
      }
    }
  }
  nameGenerator() {
    // Generates a random name for the enemy
    let vowels = ["A", "E", "I", "O", "U", "Y"];
    let letters = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"];
    let nameLength = round(random(2, 3));  //round(random(2, 3));
    let alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let name = "";
    let randomNum = round(random(1));
    for (let i = 0; i < nameLength; i++) {
      if (i == 0) {
          name += alpha[round(random(19))];
        }
      else {
        if (randomNum == 1) {
          if (round(random(5)) == 1) {
            let temp = round(random(5));
            name += vowels[temp];
            name += vowels[temp];
          }
          else {
            name += vowels[round(random(5))];
            name += letters[round(random(19))];
            }
          }
          if (randomNum == 0) {
            if (round(random(5)) == 1) {
            let temp = round(random(19));
            name += letters[temp];
            name += letters[temp];
          }
          else {
            name += vowels[round(random(5))];
            name += letters[round(random(19))];
            }
          }
        }
      }
    name += round(random(999));
    return name;
  }
}