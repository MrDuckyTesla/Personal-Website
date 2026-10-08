  class Player {
  constructor(menu) {
    // Creating varables for class
    // this.playerName = "PLAYER";
    this.playerName = "Player"
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
    text("LV: " + this.level + ", " + "S:  " + round(this.size - this.sizeSub, 1) + ",\n" + this.playerName, this.x, this.y - (this.w*1.5 + (this.size - this.sizeSub)/1.5));
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
    // Create body with graident, unless is the playerName is "tesla", then make Tesla
    if (player.playerName.toLowerCase() == "tesla") {
      // Create Tesla
      player.color = [111, 111, 255];
      // fill(111, 111, 255);
      fill(0, 0, 89);
      ellipse(0, 0, this.w+this.size/2, this.h+this.size/2);
      fill(70, 70, 255);
      ellipse(0, 0, this.w+this.size/(3/2), this.h+this.size/(3/2));
      fill(111, 111, 255);
      ellipse(0, 0,this.w+this.size/4, this.h+this.size/4);
      fill(145, 145, 255);
      ellipse(0, 0, this.w+this.size/8, this.h+this.size/8);
    }
    else {
      // Create body with graident
      for (let counter = round(this.size - this.sizeSub); counter != 0; counter --) {
        fill((this.color[0] - counter), (this.color[1] - counter), (this.color[2] - counter));
        ellipse(this.x - this.x, this.y - this.y, this.w+counter/2, this.h+counter/2);
      }
    }
    // Create eyes
    if (player.playerName.toLowerCase() == "tesla") {
      strokeWeight(5);
      stroke(0, 0, 89);
      fill (255, 129, 135);
      if (this.vel < 0) {
        rect(-this.vel/3, -this.h - deltaX -(this.h*2.3-this.h*2)/2, this.w/3, this.h*2.3);
        // line(this.vel/1.5, -this.h -(this.h*2.3-this.h*2)/2.3, 0, 0);
      }
      else {
        rect(this.vel/3, -this.h + deltaX -(this.h*2.3-this.h*2)/2, this.w/3, this.h*2.3);
      }
      noStroke();
    }
    else {
      fill(0);
      if (this.vel < 0) {
        circle(this.vel, this.y + (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
        circle(this.vel, this.y - (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
      }
      else {
        circle(-this.vel, this.y + (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
        circle(-this.vel, this.y - (this.w+this.h)/6 - this.y + deltaX, (this.w+this.h)/6);
      }
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