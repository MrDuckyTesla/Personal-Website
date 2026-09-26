class Player{
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.velocity = 0
    this.gravity = 1
    this.jump = 20
    this.speed = 1.5
    this.resist = 0.85
    this.dh = false
  }
  
  show() {
    fill("rgb(33,173,236)")
    circle(this.x, this.y, this.size)
  }
  
  update() {
    // Add gravity to the player
    if (this.canMove(blocks) || (this.velocity + this.gravity) * this.resist < 0) {
      this.velocity += this.gravity
      this.velocity *= this.resist
      this.y += this.velocity
    }
    
    // See if player has moved left or right
    this.movement()
    
    // Draw the player
    this.show()
  }
  
  // Allow the player to stay up
  boost() {
    if (this.y + this.size / 2 + (this.velocity - this.jump) > 0) {
    this.velocity -= this.jump
    }
  }
  
  // Move the player left or right when they hit A or D
  movement() {
    this.speed = 1.5
    if (keyIsDown(65) && this.x - this.size / 2 > 0) {
      if (this.x - this.size / 2 - this.speed) {
      if (keyIsDown(LEFT_ARROW)) {
        this.speed *= 2
      }
        this.x -= this.speed
      }
    }
    if (keyIsDown(68) && this.x + this.size / 2 < width) {
      if (this.x + this.size / 2 + this.speed)
      if (keyIsDown(RIGHT_ARROW)) {
        this.speed *= 2
      }
      this.x += this.speed
    }
    if (keyIsDown(UP_ARROW)) {
      this.dh = true
    }
    else {
      this.dh = false
    }
  }
  
  canMove(blocks) {
    for(let i = 0; i < blocks.length; i++) {
      // The point (xClamp, yClamp) is the perpendicular point to the player's center
      let xClamp = max(blocks[i].x, min(this.x, blocks[i].x + blocks[i].width));
      let yClamp = max(blocks[i].y, min(this.y, blocks[i].y + blocks[i].height));
      let distance = dist(xClamp, yClamp, this.x, this.y);
      if(distance <= this.size / 2) {
        return false;
      }
    }
    return true;
  }
  
}


