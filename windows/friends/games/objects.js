class Barrier {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  
  show() {
    fill("rgb(200,30,30)")
    rect(this.x, this.y, this.width, this.height)
  }
  
  update() {
    this.show()
  }
  
  playerCollision(player) {
    if (player.dh != true) { // Check for Immunity
    if (player.x + player.size / 2 >= this.x && player.x - player.size / 2 < this.x + this.width) {
      if (player.y + player.size / 2 > this.y && player.y - player.size / 2 < this.y + this.height) {
        return true
        // Player is colliding
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }
  }
}

class Objective{
  constructor(x, y, width=15, height=15, color="rgb(35,214,35)") {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }
  
  show() {
    fill(this.color)
    rect(this.x, this.y, this.width, this.height)
  }
  
  update() {
    this.show()
  }
  
  playerCollision(player) {
    if (player.x + player.size / 2 >= this.x && player.x - player.size / 2 < this.x + this.width) {
      if (player.y + player.size / 2 > this.y && player.y - player.size / 2 < this.y + this.height) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }
}

class MovingBarrier {
  constructor(x, y, width, height, distance, speed=2, direction=1) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.distance = distance
    this.speed = speed
    this.direction = direction
    this.startX = x
    this.startY = y
    this.counter = 0
  }
  
  show() {
    fill("rgb(209,135,0)")
    rect(this.x, this.y, this.width, this.height)
  }
  
  move() {
    if (this.direction == 1) {
      this.x += this.speed
      if (this.x >= this.startX + this.distance || this.x < this.startX) {
        this.speed *= -1
        this.x += this.speed
      }
    }
    else if (this.direction == 2) {
      this.y += this.speed
      if (this.y > this.startY + this.distance || this.y < this.startY) {
        this.speed *= -1
      }
    }
    else if (this.direction == 3) {
      this.x += this.speed
      let a = 80
      let b = 2 * PI / 80;
      let k = 100;
      this.y = a * sin(b * this.x) + k;
      this.counter++;
      if(this.counter % this.distance == 0) {
        this.speed *= -1;
      }
    }
  }
  
  playerCollision(player) {
    if (player.dh != true) {
    if (player.x + player.size / 2 >= this.x && player.x - player.size / 2 < this.x + this.width) {
      if (player.y + player.size / 2 > this.y && player.y - player.size / 2 < this.y + this.height) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
    }
  }
  
  update() {
    this.show()
    this.move()
  }
}

class Block {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.height = height
    this.width = width
  }
  
  show() {
  fill("rgb(150,150,150)")
  rect(this.x, this.y, this.width, this.height)
  }
}

class Teleport {
  constructor(x, y, color="rgb(206,17,206)"){
    this.x = x
    this.y = y
    this.width = 25
    this.height = 25
    this.color = color
  }
  
  draw() {
    fill(this.color)
    rect(this.x, this.y, this.width, this.height)
  }
  
  teleportPlayer(player) {
    if (player.x + player.size / 2 >= this.x && player.x - player.size / 2 < this.x + this.width) {
      if (player.y + player.size / 2 > this.y && player.y - player.size / 2 < this.y + this.height) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }
}
      
     
     










