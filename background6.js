class Background6 {
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
	  if (dist(mouseX, mouseY, this.ax, this.ay) > 3 || pmouseX - mouseX > 0 || pmouseY - mouseY > 0) {
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