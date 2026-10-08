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
    text("LV: " + this.level + ", " + "S:  " + round(this.actualSize, 1) + ",\n" + this.enemyName, this.x, this.y - this.w*2);
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
        this.player.size += (this.size - this.sizeSub)/100;
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