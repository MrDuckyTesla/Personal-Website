class Menu {
  constructor(player) {
    // Creating varables for class
    // The difficulty of the game (1 is easy, 2 is normal, and 3 is hard)
    this.difficulty = 2;
    this.player = player;
    // Booleans that keep track of which screen is being shown
    this.menu = true;
    this.play = false;
    this.settings = false;
    this.howToPlay = false;
    this.titleSize = 60;
    this.titleAngle = 15;
    this.titleRotate = 360;
    // Booleans that keep track of rotating parts
    this.bool = false;
    this.bool2 = false;
    this.bool3 = false;
    // List/array to keep track of rotating circles
    this.backgroundL = [];
    // Varaible to determine how long until you can clikc the button
    this.waitTime = 0;
    // Varaibles to determine the y value of the sliders located in settings
    this.yCoordr = height*0.5625 + height/9.5 + 15/2 + 2;
    this.yCoordg = height*0.5625 + height/9.5 + 15/2 + 2;
    this.yCoordb = height*0.5625 + height/9.5 + 15/2 + 2;
  }
  show() {
    // Change the cursor and background back to normal
    cursor(ARROW);
    background(28);
    // Change radians to degrees
    angleMode(DEGREES);
    // Add the circles to the list
    for (let i = this.backgroundL.length; i < 50; i++) {
      this.backgroundL.push([random(-width/1.5, width/1.5), random(-height/1.5, height/1.5), random(20, 40), random(0, 255), random(0, 255), random(0, 255)]);
    }
    // Push current state before translating/rotating
    push();
    // Show the background circles and rotate them
    translate(width/2, height/2);
    rotate(this.titleRotate);
    for (let i = 0; i < this.backgroundL.length; i++) {
      fill(this.backgroundL[i][3], this.backgroundL[i][4], this.backgroundL[i][5])
      circle(this.backgroundL[i][0], this.backgroundL[i][1], this.backgroundL[i][2]);
    }
    pop();
    // Return state of before pushing/rotating
    // Angle to rotate the circles
    this.titleRotate += 0.5;
    this.titleRotate %= 360;
    // Get rid of waitTime
    if (this.waitTime != 0) {
      this.waitTime -= 2;
    }
    // If in the menu
    if (this.menu) {
      // Smooth/fast framerate
      frameRate(60);
      textAlign(CENTER);
      // Push current state before translating/rotating
      push();
      rectMode(CENTER);
      translate(width/2, height/4);
      rotate(this.titleAngle);
      textSize(this.titleSize);
      fill(111, 111, 255);
      stroke(28);
      strokeWeight(2);
      text("Mitochondr.IO", 0, 0);
      pop();
      // Return state of before pushing/rotating
      textSize(32);
      // Fill dark grey
      fill(50);
      // Draw the play, settings, and how to play buttons
      rect(width/4, height*0.375, width/2, height/7);
      rect(width/4, height*0.5625, width/2, height/7);
      rect(width/4, height*0.75, width/2, height/7);
      strokeWeight(4);
      // If mouse collides with button
      if (mouseX >= width/4 && mouseX <= width/4 + width/2 && mouseY >= height*0.375 && mouseY <= height*0.375+height/7) {
        if (mouseIsPressed === true && this.waitTime == 0) {
          this.waitTime += 50;
          this.play = true;
          this.menu = false;
        }
        // Fill light grey
        fill(100);
        stroke(50);
        rect(width/4, height*0.375, width/2, height/7);
        noStroke();
        // Change fill color to a brighter blue
        fill(111, 111, 255);
        text("Play", width/2, height*0.375+height/10.5);
      }
      else {
        // Change fill color to a darker blue
        fill(61, 61, 205);
        text("Play", width/2, height*0.375+height/10.5);
      }
      // If mouse collides with button
      if (mouseX >= width/4 && mouseX <= width/4 + width/2 && mouseY >= height*0.5625 && mouseY <= height*0.5625+height/7) {
        if (mouseIsPressed === true && this.waitTime == 0) {
          this.waitTime += 50;
          this.settings = true;
          this.menu = false;
        }
        // Fill light grey
        fill(100);
        stroke(50);
        rect(width/4, height*0.5625, width/2, height/7);
        noStroke();
        // Change fill color to a brighter blue
        fill(111, 111, 255);
        text("Settings", width/2, height*0.5625+height/10.5);
      }
      else {
        // Change fill color to a darker blue
        fill(61, 61, 205);
        text("Settings", width/2, height*0.5625+height/10.5);
      }
      // If mouse collides with button
      if (mouseX >= width/4 && mouseX <= width/4 + width/2 && mouseY >= height*0.75 && mouseY <= height*0.75+height/7) {
        if (mouseIsPressed === true && this.waitTime == 0) {
          this.waitTime += 50;
          this.howToPlay = true;
          this.menu = false;
        }
        // Fill light grey
        fill(100);
        stroke(50);
        // Draw the button
        rect(width/4, height*0.75, width/2, height/7);
        noStroke();
        // Change fill color to a brighter blue
        fill(111, 111, 255);
        text("How to play", width/2, height*0.75+height/10.5);
      }
      else {
        // Change fill color to a darker blue
        fill(61, 61, 205);
        text("How to play", width/2, height*0.75+height/10.5);
      }
      noStroke();
      // Add or subtract to rotation variables
      if (this.titleAngle <= 15 && this.bool2 == true) {
        this.titleAngle += 0.25;
        if (this.titleAngle == 15) {
          this.bool2 = false;
        }
      }
      else if (this.titleAngle >= -15 && this.bool2 == false) {
        this.titleAngle -= 0.25;
        if (this.titleAngle == -15) {
          this.bool2 = true;
        }
      }
      if (this.titleSize <= 60 && this.bool == true) {
        this.titleSize += 0.5;
        if (this.titleSize == 60) {
          this.bool = false;
        }
      }
      else if (this.titleSize >= 30 && this.bool == false) {
        this.titleSize -= 0.5;
        if (this.titleSize == 30) {
          this.bool = true;
        }
      }
    }
    // If in the settings
    else if (this.settings) {
      fill(player.color);
      stroke(28);
      strokeWeight(2);
      // Recreate the player
      ellipse(width/2, height/4, 50, 100);
      text(player.playerName, width/2, height/7.5);
      noStroke();
      // Fill black
      fill(0);
      circle(width/2 - width/30, height/5, 16);
      circle(width/2 + width/30, height/5, 16);
      textSize(32);
      // Fill dark grey
      fill(50);
      // Create the buttons
      rect(width/4, height*0.375, width/2, height/7);
      rect(width/4, height*0.5625, width/2, height/7);
      rect(width/4, height*0.75, width/2, height/7);
      // Fill light grey
      fill(100);
      stroke(50);
      strokeWeight(4);
      // If the mouse collides
      if (mouseX >= width/4 && mouseX <= width/4 + width/2 && mouseY >= height*0.375 && mouseY <= height*0.375+height/7) {
        if (mouseIsPressed === true && this.waitTime == 0) {
          player.playerName = prompt("New Name:  ");
          this.waitTime += 150;
          mouseIsPressed = false;
        }
        // Fill light grey
        fill(100);
        stroke(50);
        // Draw the button
        rect(width/4, height*0.375, width/2, height/7);
        noStroke();
        // Change fill color to a brighter blue
        fill(111, 111, 255);
        text("Change Name?", width/2, height*0.375+height/10.5);
      }
      else {
        // Change fill color to a darker blue
        fill(61, 61, 205);
        text("Change Name?", width/2, height*0.375+height/10.5);
        noStroke();
      }
      // If the mouse collides
      if (mouseX >= width/4 && mouseX <= width/4 + width/2 && mouseY >= height*0.5625 && mouseY <= height*0.5625+height/7) {
        // Fill light grey
        fill(100);
        stroke(50);
        // Draw the button
        rect(width/4, height*0.5625, width/2, height/7);
        stroke(111, 111, 255);
        strokeWeight(3);
        // Draw the sliders
        line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
        line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
        line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
        noStroke();
        // Change fill color to a brighter blue
        fill(111, 111, 255);
        if (mouseIsPressed === true) {
          // If mouse collides with slider
          if (mouseX > width/2 - 15/2 && mouseX < width/2 + 15/2) {
            // Change cursor
            cursor(MOVE);
            // If mouse if moves past limit
            if (mouseY < height*0.5625 + 15/2 + 2) {
              // Draw the slider and fill with current y coord
              fill((this.yCoordr - 290)*5, 0, 0);
              stroke((this.yCoordr - 290)*5, 0, 0);
              strokeWeight(4);
              line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
              noStroke();
              circle(width/2, height*0.5625 + 15/2 + 2, 15);
              this.yCoordr = height*0.5625 + 15/2 + 2;
            }
            // If mouse if moves past limit
            else if (mouseY > height*0.5625 + height/9.5 + 15/2 + 2) {
              // Draw the slider and fill with current y coord
              fill((this.yCoordr - 290)*5, 0, 0);
              stroke((this.yCoordr - 290)*5, 0, 0);
              strokeWeight(4);
              line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
              noStroke();
              circle(width/2, height*0.5625 + height/9.5 + 15/2 + 2, 15);
              this.yCoordr = height*0.5625 + height/9.5 + 15/2 + 2;
            }
            else {
              // Draw the slider and fill with current y coord
              fill((this.yCoordr - 290)*5, 0, 0);
              stroke((this.yCoordr - 290)*5, 0, 0);
              strokeWeight(4);
              line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
              noStroke();
              circle(width/2, mouseY, 15);
              this.yCoordr = mouseY;
            }
          }
          // If mouse collides with slider
          else if (mouseX > width/1.75 - 15/2 && mouseX < width/1.75 + 15/2) {
            // Change cursor
            cursor(MOVE);
            // If mouse if moves past limit
            if (mouseY < height*0.5625 + 15/2 + 2) {
              // Draw the slider and fill with current y coord
              fill(0, (this.yCoordg - 290)*5, 0);
              stroke(0, (this.yCoordg - 290)*5, 0);
              strokeWeight(4);
              line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
              noStroke();
              circle(width/1.75, height*0.5625 + 15/2 + 2, 15);
              this.yCoordg = height*0.5625 + 15/2 + 2;
            }
            // If mouse if moves past limit
            else if (mouseY > height*0.5625 + height/9.5 + 15/2 + 2) {
              // Draw the slider and fill with current y coord
              fill(0, (this.yCoordg - 290)*5, 0);
              stroke(0, (this.yCoordg - 290)*5, 0);
              strokeWeight(4);
              line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
              noStroke();
              circle(width/1.75, height*0.5625 + height/9.5 + 15/2 + 2, 15);
              this.yCoordg = height*0.5625 + height/9.5 + 15/2 + 2;
            }
            else {
              // Draw the slider and fill with current y coord
              fill(0, (this.yCoordg - 290)*5, 0);
              stroke(0, (this.yCoordg - 290)*5, 0);
              strokeWeight(4);
              line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
              noStroke();
              circle(width/1.75, mouseY, 15);
              this.yCoordg = mouseY;
            }
          }
          // If mouse collides with slider
          else if (mouseX > width/1.56 - 15/2 && mouseX < width/1.56 + 15/2) {
            // Change cursor
            cursor(MOVE);
            // If mouse if moves past limit
            if (mouseY < height*0.5625 + 15/2 + 2) {
              // Draw the slider and fill with current y coord
              fill(0, 0, (this.yCoordb - 290)*5);
              stroke(0, 0, (this.yCoordb - 290)*5);
              strokeWeight(4);
              line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
              noStroke();
              circle(width/1.56, height*0.5625 + 15/2 + 2, 15);
              this.yCoordb = height*0.5625 + 15/2 + 2;
            }
            // If mouse if moves past limit
            else if (mouseY > height*0.5625 + height/9.5 + 15/2 + 2) {
              // Draw the slider and fill with current y coord
              fill(0, 0, (this.yCoordb - 290)*5);
              stroke(0, 0, (this.yCoordb - 290)*5);
              strokeWeight(4);
              line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
              noStroke();
              circle(width/1.56, height*0.5625 + height/9.5 + 15/2 + 2, 15);
              this.yCoordb = height*0.5625 + height/9.5 + 15/2 + 2;
            }
            else {
              // Draw the slider and fill with current y coord
              fill(0, 0, (this.yCoordb - 290)*5);
              stroke(0, 0, (this.yCoordb - 290)*5);
              strokeWeight(4);
              line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
              line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
              noStroke();
              circle(width/1.56, mouseY, 15);
              this.yCoordb = mouseY;
            }
          }
        }
        else {
          // Change the cursor back
          cursor(ARROW);
        }
        // Draw the slider
        circle(width/2, this.yCoordr, 15);
        circle(width/1.75, this.yCoordg, 15);
        circle(width/1.56, this.yCoordb, 15);
        noStroke();
        text("Color:                  ", width/2, height*0.5625+height/10.5);
        // Change the players color
        player.color[0] = (this.yCoordr - 290)*5;
        player.color[1] = (this.yCoordg - 290)*5;
        player.color[2] = (this.yCoordb - 290)*5;
      }
      else {
        // Draw the slider and change the fill color to a darker blue
        fill(61, 61, 205);
        circle(width/2, this.yCoordr, 15);
        circle(width/1.75, this.yCoordg, 15);
        circle(width/1.56, this.yCoordb, 15);
        text("Color:                  ", width/2, height*0.5625+height/10.5);
        strokeWeight(3);
        stroke(61, 61, 205);
        line(width/2, height*0.5625 + 15/2 + 2, width/2, height*0.5625 + height/9.5 + 15/2 + 2);
        line(width/1.75, height*0.5625 + 15/2 + 2, width/1.75, height*0.5625 + height/9.5 + 15/2 + 2);
        line(width/1.56, height*0.5625 + 15/2 + 2, width/1.56, height*0.5625 + height/9.5 + 15/2 + 2);
        noStroke();
      }
      // If mouse collides with button
      if (mouseX >= width/4 && mouseX <= width/4 + width/2 && mouseY >= height*0.75 && mouseY <= height*0.75+height/7) {
        if (mouseIsPressed === true && this.waitTime == 0) {
          // Increase or reset difficulty
          this.waitTime += 50;
          this.difficulty ++;
          if (this.difficulty >= 4) {
            this.difficulty = 1;
          }
        }
        // Draw the button and fill light grey
        fill(100);
        stroke(50);
        rect(width/4, height*0.75, width/2, height/7);
        noStroke();
        // Change fill color to a brighter blue
        fill(111, 111, 255);
        // Get difficulty
        let difficulty = "";
        if (this.difficulty == 1) {
          difficulty = " easy"
        }
        else if (this.difficulty == 2) {
          difficulty = "Normal"
        }
        else if (this.difficulty == 3) {
          difficulty = " HARD"
        }
        text("Difficulty: " + difficulty, width/2, height*0.75+height/10.5);
      }
      else {
        // Change fill color to a darker blue
        fill(61, 61, 205);
        // Get difficulty
        let difficulty = "";
        if (this.difficulty == 1) {
          difficulty = " easy"
        }
        else if (this.difficulty == 2) {
          difficulty = "Normal"
        }
        else if (this.difficulty == 3) {
          difficulty = " HARD"
        }
        text("Difficulty: " + difficulty, width/2, height*0.75+height/10.5);
      }
      // Draw the button
      noStroke();
      // Fill dark grey
      fill(50);
      strokeWeight(4);
      rect(width/15, height*0.9, width/6, height/14);
      // If mouse collides with button
      if (mouseX >= width/15 && mouseX <= width/15 + width/6 && mouseY >= height*0.9 && mouseY <= height*0.9+height/14) {
        if (mouseIsPressed === true && this.waitTime == 0) {
          this.waitTime += 50;
          this.settings = false;
          this.menu = true;
        }
        // Draw the button and fill light grey
        fill(100);
        stroke(50);
        rect(width/15, height*0.9, width/6, height/14);
        noStroke();
        // Change fill color to a brighter blue
        fill(111, 111, 255);
        text("Exit", width/6.8, height*0.9 + height/17);
      }
      else {
        // Change fill color to a darker blue
        fill(61, 61, 205);
        text("Exit", width/6.8, height*0.9 + height/17);
      }
      noStroke();
    }
    // If in the "How to Play" screen
    else if (this.howToPlay) {
      // Change fill color to a darker blue
      fill(61, 61, 205);
      stroke(28);
      strokeWeight(2);
      textSize(20);
      text("This game is about \"Survival of the Fittest\", where\n the point is to become the biggest cell like creature.\nYou are supposed to look and run into smaller\ncreatures, while also running away from larger\ncreatures.  You are physics based and forced\nto jump using space/up/W/mouse. While hitting\nthe ground will not kill you, an enemy will be more\nlikely to consume you. Your movement controls are\nA, D, left, and right.  Smaller enemies are afraid of you,\nand larger enemies are attracted to you. You can\nidentify if an enemy is larger by looking at the text\nabove their cells.  You level up every time you get\n100x larger than your starter size.  This does not\ndecrease your size, but it does decrease your\nappearence. Enemies also have this, so pay\nattention to their level.  You can change your\nname and color only in the settings before a game.\nThank you for playing!!", width/2, 25);
      textSize(32);
      noStroke();
      // Fill dark grey
      fill(50);
      strokeWeight(4);
      // Draw the button
      rect(width/15, height*0.9, width/6, height/14);
      // If mouse collides with button
      if (mouseX >= width/15 && mouseX <= width/15 + width/6 && mouseY >= height*0.9 && mouseY <= height*0.9+height/14) {
        if (mouseIsPressed === true && this.waitTime == 0) {
          this.waitTime += 50;
          this.howToPlay = false;
          this.menu = true;
        }
        // Fill light grey
        fill(100);
        stroke(50);
        // Draw the button
        rect(width/15, height*0.9, width/6, height/14);
        noStroke();
        // Change fill color to a brighter blue
        fill(111, 111, 255);
        text("Exit", width/6.8, height*0.9 + height/17);
      }
      else {
        // Change fill color to a darker blue
        fill(61, 61, 205);
        text("Exit", width/6.8, height*0.9 + height/17);
      }
      noStroke();
    }
  }
}