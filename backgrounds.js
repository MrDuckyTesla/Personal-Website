class SnowFall {
	constructor() {
		// Create a list to store all snowflakes
		this.snowList = []; 
		this.avg = (windowWidth + windowHeight) / 4;
		// Add snowflakes to the list with a random size
		for (let i = 0; i < this.avg; i++) {
		  // Radius gets a random number from 10 to 40 
		  this.snowList.push(new Snowflake(random(this.avg/10)+10));
		}
	}
	
	update() {
		background(60);
		// Go through list and update snowflakes
		for (let i = 0; i < this.snowList.length; i++) {
		  this.snowList[i].update(this.avg);
		}

		// if (frameRate() < 45) {
		//   this.snowList.pop();
		// }
	}
}

class Snowflake {
  
  // Create a snowflake
  constructor(r=20) {
    // Assign the snowflake a radius
    this.r = r;
    this.c = [random(256), random(256), random(256)];
    
    // Give the snowflake a random x position
    this.x = random(width + this.r);
    this.y = random(height + this.r)

    this.vx = 0;
    this.vy = 0;
    
    // Tell the snowflake how much to move it by
    this.fallX = random(3)+1;  // can move from 1 to 4
    this.fallY = random(3)+1; // can movefrom 1 to 4
  }
  
  // Move and draw snowflakde
  update(avg=300) {
	
    let dx = this.x - mouseX;
    let dy = this.y - mouseY;
	
    let d = max(dx * dx + dy * dy + this.r, 0.01);

    this.vx = this.fallX;
    this.vy = this.fallY;
	
	this.vx += dx*avg/d;
	this.vy += dy*avg/d;

	this.vx = constrain(this.vx, -this.fallX * 3, this.fallX * 3);
	this.vy = constrain(this.vy, -this.fallY * 3, this.fallY * 3);
    
    this.x += this.vx;
    this.y += this.vy;

    // Keep snowflake in bounds
    // IF snowflake is outside sketch, move to other side
    if (this.x > width + this.r) {this.x = -this.r;}
    if (this.y > height + this.r) {this.y = -this.r;}
    
    // Draw the snowflake
    fill(this.c[0], this.c[1], this.c[2]);
    circle(this.x, this.y, this.r);
  }
  
}

class BallBounce {
	constructor(canvas) {
	  // Create a list to store all balls
      this.balls = [];
      canvas.mouseClicked(() => this.toggleForce());
		for (let i = 0; i < 100; i ++) {
		  this.balls.push(new Ball(random(width), random(height/2), random(-10, 10), 0, random(50, 100), [random(256), random(256), random(256)]));
		}
	}

	update() {
		background(60);
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

class SnakeMove {
	constructor() {
		this.perlin = [];
		this.x = width/2, this.y = height/2, this.ax = 0, this.ay = 0;
		for (let i = 0; i < 6; i++) {
		  this.perlin.push(random(0, 9999999));
		}
		background(60);
	}
	
	update() {
	  let dx, dy, r = noise(this.perlin[0])*(width+height)/16;
	  if (dist(mouseX, mouseY, this.ax, this.ay) > 3 || abs(pmouseX - mouseX) > 0 || abs(pmouseY - mouseY) > 0) {
	    dx = mouseX - this.x; dy = mouseY - this.y;
	    this.ax = this.x; this.ay = this.y;
	  } else {
	    
		let nx = width * 1.5 * noise(this.perlin[4]) - width * 0.25;
		let ny = height * 1.5 * noise(this.perlin[5]) - height * 0.25;
	    
	    // circle(nx, ny, 10);
	    
	    dx = nx - this.x;
	    dy = ny - this.y;
	  }
	  
	  let d = sqrt(dx * dx + dy * dy);
	  if (d == 0) {d = 0.001;} 

	  let s = min(10, d)
	  
	  this.x += (dx / d)*s;
	  this.y += (dy / d)*s;
	  
	  fill(noise(this.perlin[1])*256, noise(this.perlin[2])*256, noise(this.perlin[3])*256);
	  circle(this.x, this.y, r);
	  for (let i = 0; i < this.perlin.length; i++) {
	    this.perlin[i] += 0.01;
	  }
	}
}

class ParticalRadial {
	constructor() {
		this.particles = [];
		this.avg = (windowWidth + windowHeight) / 4;
		for (let i = 0; i < this.avg; i++) {
		  // Radius gets a random number from 10 to 40 
		  this.particles.push(new Particle(random(this.avg/10)+10));
		}
	}
	
	update() {
		background(60);

		// Go through list and update snowflakes
		for (let i = 0; i < this.particles.length; i++) {
		  this.particles[i].update();
		}
	}
}

class Particle  {
	constructor(r=20) {
		this.r = r;
		this.c = [random(256), random(256), random(256)];
		  
		// Give the snowflake a random x position
		this.x = random(width + this.r);
		this.y = random(height + this.r)

	  	this.vx = 0;
		this.vy = 0;
		  
		// Tell the snowflake how much to move it by
		this.fallX = random(3)+1;  // can move from 1 to 4
		this.fallY = random(3)+1; // can movefrom 1 to 4

		this.radial = random(4000000);
		this.perlin = random(100000);
		
		this.radX = random(7000);
		this.radY = random(7000);


		this.left = false;
	}
	
	update() {

	  let dx = this.x - mouseX;
	  let dy = this.y - mouseY;
	  let d = dx * dx + dy * dy + this.r;

	  let radius = noise(this.perlin)*this.radial;
	  let force = (d - radius) * 0.005;

	  let nx = dx/d, ny = dy/d;
	  
	  this.vx -= nx * force * 0.07;
	  this.vy -= ny * force * 0.07;

	  this.vx += ny*this.radX*noise(this.perlin) * (this.left? 1 : -1);
	  this.vy += nx*this.radY*noise(this.perlin) * (this.left? -1 : 1);

	  this.vx = constrain(this.vx, -this.fallX * 3, this.fallX * 3);
	  this.vy = constrain(this.vy, -this.fallY * 3, this.fallY * 3);
	  
	  this.x += this.vx;
	  this.y += this.vy;

	  this.vx *= 0.75;
	  this.vy *= 0.75;

	  this.perlin += 0.001;
	  
	  // Draw the snowflake
	  fill(this.c[0], this.c[1], this.c[2]);
	  circle(this.x, this.y, this.r);
	}
}

class SnakeRadial {
	constructor(canvas, makeMore) {
		this.perlin = []; this.radials = [];
		this.x = width/2, this.y = height/2, this.ax = width/2, this.ay = height/2;
		for (let i = 0; i < 6; i++) {
		  this.perlin.push(random(9999999));
		}
		if (makeMore) {
			canvas.mouseClicked(() => this.changePerlin());
			canvas.style('background-color', 'rgb(60, 60, 60)');
			for (let i = 0; i < 20; i++) {
				this.radials.push(new SnakeRadial(canvas, false));
			}
		}
		this.makeMore = makeMore;
		// background(60);
	}
	
	update() {
		if (this.makeMore) {
			//background(60, 60, 60, 10);
			drawingContext.globalCompositeOperation = 'destination-out';
			fill(60, 60, 60, 5);
			rect(0, 0, width, height);
			drawingContext.globalCompositeOperation = 'source-over';
		}
		if (this.radials.length > 0) {
			for (let i = 0; i < this.radials.length; i++) {
				this.radials[i].update();
			}
		}
	  let dx, dy, r = noise(this.perlin[0])*(width+height)/16;
	 
	    
	  let nx = width * cos(this.perlin[4])*noise(this.perlin[4])+width/2;
	  let ny = height * sin(this.perlin[5])*noise(this.perlin[5])+height/2;
	    
	    // circle(nx, ny, 10);
	    
	  dx = nx - this.x;
	  dy = ny - this.y;
	  
	  
	  let d = sqrt(dx * dx + dy * dy);
	  if (d == 0) {d = 0.001;} 

	  let s = min(10, d)
	  
	  this.x += (dx / d)*s;
	  this.y += (dy / d)*s;
	  
	  fill(noise(this.perlin[1])*256, noise(this.perlin[2])*256, noise(this.perlin[3])*256);
	  circle(this.x, this.y, r);
	  for (let i = 0; i < this.perlin.length; i++) {
	    this.perlin[i] += 0.01;
	  }
	}
	
	changePerlin() {
		if (this.makeMore) {
			for (let i = 0; i < this.radials.length; i++) {
				this.radials[i].changePerlin();
			}
		}
		this.perlin[4] = random(9999999);
		this.perlin[5] = random(9999999);
	}
}
