class Background1 {
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