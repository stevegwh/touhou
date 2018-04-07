var spiral, spiral2, rose;
let patterns = [];
let bullets = [];

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(4);
  player = new Player();
  enemy = new Enemy();
  spiral = new Spiral(width / 2 + 50, height / 2, 1, 60, 720, null, 4);
  spiral2 = new Spiral(width / 2 - 50, height / 2, 0.5, 1, 10, 180);
  rose = new Spiral(width / 2, height / 2, 2, 50, 720, 12, 4);
  //cool patterns
  //rose = new Pattern(width/2 - 50, height/2, 2, 50, 720, 12, 3);
  //starfish = new Pattern(width/2 - 50, height/2, 1, 20, 720, 32, 6);
}

function draw() {
  background(0);
  // spiral.draw();
  // spiral.update();
  // spiral2.draw();
  // spiral2.update();
  player.update();
  enemy.update();

}

// function keyPressed() {
//   if (keyCode === UP_ARROW) {
//     patterns.push(new Spiral(mouseX, mouseY, 2, 50, 720, 12, 3));
//   } else if (keyCode === DOWN_ARROW) {
//     patterns.push(new Spiral(mouseX, mouseY, 1, 20, 720, 32, 6));
//   } else if (keyCode === LEFT_ARROW) {
//     patterns.push(new Spiral(mouseX, mouseY, 2, 70, 360, 7, 4));
//   } else if (keyCode === 32) {
//     bullets.push(new Bullet(mouseX, mouseY, 0, -5, 1));
//   }

// }
function keyPressed() {
  player.move(keyCode);
  if (keyCode === UP_ARROW) {
    patterns.push(new Spiral(mouseX, mouseY, 2, 50, 720, 12, 3));
  } else if (keyCode === DOWN_ARROW) {
    patterns.push(new Spiral(mouseX, mouseY, 1, 20, 720, 32, 6));
  } else if (keyCode === LEFT_ARROW) {
    patterns.push(new Spiral(mouseX, mouseY, 2, 70, 360, 7, 4));
  }
}