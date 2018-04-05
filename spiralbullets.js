let bullets = [];
var spiral, spiral2, rose;

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(4);
  spiral = new Pattern(width / 2 + 50, height / 2, 1, 60, 720, null, 4);
  spiral2 = new Pattern(width / 2 - 50, height / 2, 0.5, 1, 10, 180);
  rose = new Pattern(width/2, height/2, 2, 50, 720, 12, 4);
  //cool patterns
  //rose = new Pattern(width/2 - 50, height/2, 2, 50, 720, 12, 3);
  //starfish = new Pattern(width/2 - 50, height/2, 1, 20, 720, 32, 6);
}


class Bullet {
  constructor(x, y, v1, v2, speed) {
    this.pos = createVector(x, y);
    this.velocityRate = 2;
    this.velocity = createVector(v1 * speed, v2 * speed);
    this.acc = createVector(0, 0);
  }
  draw() {
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }
  update() {
    this.pos.add(this.velocity);
    this.velocity.add(this.acc);
    this.acc.mult(0);
  }
}

class Pattern {
  constructor(x, y, rotationRate, amount, maxAngle, k = 8, movementSpeed = 2) {
    this.bullets = [];
    this.dt = 0; //delta time
    this.amount = amount; //amount of bullets to load
    this.count = 1; //says when to push new bullet
    this.pos = createVector(x, y); //position of pattern;
    this.rotationRate = rotationRate; //how fast the pattern executes
    this.movementSpeed = movementSpeed; //how fast each bullet moves
    this.maxAngle = maxAngle //how far to turn
    this.k = k;
    //TO DO: add starting angle
  }
  draw() {
    for (var i = 1; i < this.bullets.length; i++) {
      this.bullets[i].update();
      this.bullets[i].draw();
    }
  }
  update() {
    if (floor(this.dt) >= this.rotationRate && this.count !== this.amount) {
      this.loadBullet();
      this.dt = 0;
      this.count++;
    } else {
      this.dt++;
    }
  }
  loadBullet() {
    const segment = this.maxAngle / this.amount;
    const angle = segment * this.count;
    this.bullets.push(new Bullet(this.pos.x, this.pos.y, cos(angle * this.k), sin(angle * this.k), this.movementSpeed));
  }
}
function draw() {
  background(0);
  // spiral.draw();
  // spiral.update();
  // spiral2.draw();
  // spiral2.update();
  ellipse(width/2, height/2, 50)
  rose.draw();
  rose.update();
}