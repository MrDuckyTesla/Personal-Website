class Background2 {
	constructor(canvas) {
	  // Create a list to store all balls
      this.balls = [];
      canvas.mouseClicked(() => this.toggleForce());
		for (let i = 0; i < 100; i ++) {
		  this.balls.push(new Ball(random(width), random(height/2), random(-10, 10), 0, random(50, 100), [random(256), random(256), random(256)]));
		}
	}

	update() {
		// Go through list and update balls
		for (let i = 0; i < this.balls.length; i ++) {
		  this.balls[i].update();
          // If ball fully shrank
          if (this.balls[i].d <= 0) {
            // Replace the ball
            this.balls[i] = this.createBall();
          }
		}
	}

    createBall() {
	  return new Ball(random(width), 0, random(-10, 10), 0, random(50, 100), [random(256), random(256), random(256)]);
	}

  toggleForce() {
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].toggleForce();
    }
  }
}

// Maybe use delta mouseX for x, and calculate potential energy using height

class Ball {
  constructor(coordinateX, coordinateY, velocityX, velocityY, diameter, colorRGB) {
    this.x = coordinateX;
    this.y = coordinateY;
    this.vx = velocityX;
    this.vy = velocityY;
    this.ay = 0.5;

    this.d = diameter;
    this.c = colorRGB;

    this.randX = random(999999);
    this.randY = random(999999);
    this.force = false;
  }

  update() {
    // Apply gravity to velocity
    this.vy += this.ay;

    if (this.force) {
      let dx = this.x - mouseX;
      let dy = this.y - mouseY;
      let d = dx * dx + dy * dy;
  
      if (d <= 1000) {d = 1000;}
      
      let forceX = 4, forceY = 4;
      if (abs(dx) <= 10) {forceX = 0;}
      if (abs(dy) <= 10) {forceY = 0;}
  
      this.vx -= constrain(dx*300/d*(1+noise(frameCount+this.randX)*forceX), -2, 2);
      this.vy -= constrain(dy*300/d*(1+noise(frameCount+this.randY)*forceY), -2, 2);
  
      this.vx *= 0.95;
      this.vy *= 0.95;
      
    }

    // Apply velocity to position
    this.x += this.vx;
    this.y += this.vy;
    
    // Fix ball if touching left wall
    if (this.x < this.d/2) {
      // Fix position and velocity
      this.x = this.d/2;
      this.vx *= -1;
    }
    // Fix ball if touching right wall
    else if (this.x + this.d/2 >= width) {
      // Fix position and velocity
      this.x = width - this.d/2;
      this.vx *= -1;
    }
    // Fix ball if touching floor
	let touchingFloor = this.y + this.d/2 >= height;
    if (touchingFloor) {
      // Fix position
      this.y = height - this.d/2;
      // Apply friction
      this.vy *= -0.95;
      this.vx *= 0.98;
    }
    // If the ball isnt moving, shrink it
    if (abs(this.vx) <= 0.01 && abs(this.vy) <= 1) {
      this.d--; if (touchingFloor) {this.y += 2;}
    }

    fill(this.c);
    circle(this.x, this.y, this.d);
  }

  toggleForce() {
    this.force = !this.force;
  }
  
}
