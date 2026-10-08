class Mario {
  constructor() {
    this.s = random(100, 200);
    this.cY = random(this.s, height - this.s);
    this.tL = this.cY - this.s/2;
    this.bL = height - this.cY - this.s/2;
    this.x = width;
    this.w = 50;
    this.sonic = 5;
    this.p = false;
    this.c = [random(256), random(256), random(256)]
  }
  show() {
    fill(this.c[0], this.c[1], this.c[2]);
    rect(this.x, 0, this.w, this.tL);
    rect(this.x, this.cY + this.s/2, this.w, this.bL);
  }
  update() {
    this.x -= this.sonic;
    this.show();
  }
  pirdCollision(pird) {
    if (pird.x + pird.s/2 > this.x && pird.x - pird.s/2 < this.x + this.w) {
      if (pird.y - pird.s/2 < this.cY - this.s/2) {
        return true;
      }
      if (pird.y + pird.s/2 > this.cY + this.s/2) {
        return true;
      }
      return false;
    }
    return false;
  }
  offScreen() {
    if(this.x + this.w < 0) {
      return true;
    }
    else {
      return false;
    }
  }
  pass(pird) {
    if(pird.x - pird.s / 2 > this.x + this.w && !this.p) {
      this.p = true;
      return true;
    }
    return false;
  }
}