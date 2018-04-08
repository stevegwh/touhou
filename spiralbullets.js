var spiral, spiral2, rose, enemy, player, bg1, bg2, mySound;
let bullets = [];
let enemies = [];
let powerups = [];

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/stage1.ogg');
}

function setup() {
  createCanvas(600, 800);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(4);
  background(0);

  bg1 = loadImage("assets/bg.png");
  bg2 = loadImage("assets/bg.png");

  mySound.setVolume(0.8);
  mySound.play();

  player = new Player();

  enemies.push(new Spinner(40, -100, 15, 5))
  enemies.push(new Spinner(60, -300, 15, 5))
  
  for(var i = 0; i < 10; i++) {
    enemies.push(new regularMob(60 * i, 40 * -i, 15, 5));
  }

  //spiral = new Spiral(width / 2 + 50, height / 2, 1, 60, 720, null, 4);
  //rose = new Spiral(width / 2, height / 2, 2, 50, 720, 12, 4);
  //cool patterns
  //rose = new Pattern(width/2 - 50, height/2, 2, 50, 720, 12, 3);
  //starfish = new Pattern(width/2 - 50, height/2, 1, 20, 720, 32, 6);
}
let bg1y = 0;
let bg2y = -820;
function draw() {
  image(bg1, 0, bg1y);
  image(bg2, 0, bg2y);

  updateBG();
  player.update();
  updateBullets();
  updateEnemies();
  updatePowerUps();
}

function updateBG() {
  bg1y += 1;
  bg2y += 1;

  if(bg1y > height) {
    bg1y = -800;
  } else if(bg2y > height) {
    bg2y = -800;
  }
}

function updateEnemies() {
  for(var i = 0; i < enemies.length; i++) {
    enemies[i].update();
    if(enemies[i].outOfBounds()) {
      enemies.splice(i, 1);
    }
  }
}

function updateBullets() {
  for (var i = 1; i < bullets.length; i++) {
      if(bullets[i].outOfBounds()) {
          bullets.splice(i, 1);
          continue;
      }
      bullets[i].update();
      if(bullets[i].checkCollision(player, 20)) {
          player.alive = false;
          bullets.splice(i, 1);
      }
  }
}

function updatePowerUps() {
  for (var i = 1; i < powerups.length; i++) {
      if(powerups[i].outOfBounds()) {
          powerups.splice(i, 1);
          continue;
      }
      powerups[i].update();

      if(powerups[i].checkCollision(player, -20)) {
        if(powerups[i].type === "power") {
          player.power++;
          console.log("power: " + player.power);
        } else if (powerups[i].type === "score") {
          player.score++;
          console.log("score: " + player.score);
        }
        powerups.splice(i, 1);
      }
  }
}

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
