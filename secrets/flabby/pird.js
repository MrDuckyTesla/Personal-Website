class Pird {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.s = size;
    this.v = 0;
    this.g = 1;
    this.l = 13;
    this.r = 0.9;
    this.c = [random(256), random(256), random(256)];
  }
  show() {
    fill(this.c[0], this.c[1], this.c[2]);
    circle(this.x, this.y, this.s);
  }
  update(drunk1, drunk2, score) {
    this.v += this.g;
    this.v *= this.r;
    this.y += this.v;
    this.v += (noise(drunk2, drunk1) - 0.5) * score;
    this.getBackHere();
    this.show();
  }
  getBackHere() {
    if (this.y >= height + this.s) {
      this.y = (this.s * -1);
    }
    else if (this.y <=  this.s * -1) {
      this.y = (this.s + height);
    }
}
  fly() {
    this.v -= this.l;
  }
}