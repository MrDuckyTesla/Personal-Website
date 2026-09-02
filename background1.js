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
  update() {
	
    let dx = this.x - mouseX;
    let dy = this.y - mouseY;
    let d = dx * dx + dy * dy + this.r;

    this.vx = this.fallX;
    this.vy = this.fallY;

	avg = (windowWidth + windowHeight) / 4;
	
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