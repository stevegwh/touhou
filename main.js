var player, mySound, sprites;


function preload() {
    soundFormats('mp3', 'ogg');
    mySound = loadSound('assets/stage1.ogg');
    sprites = {
        player : loadImage('assets/reimu.png'),
        enemy : loadImage('assets/enemy.png'),
        power : loadImage('assets/power_item.png'),
        score : loadImage('assets/score_item.png'),
    };
}

function setup() {
    createCanvas(512, 800);
    angleMode(DEGREES);
    stroke(255);
    strokeWeight(4);
    background(0);
    game = new Game(0);
    player = new Player();

  //enemies.push(new Spinner(40, -100, 15, 5))
  //enemies.push(new Spinner(60, -300, 15, 5))

  //spiral = new Spiral(width / 2 + 50, height / 2, 1, 60, 720, null, 4);
  //rose = new Spiral(width / 2, height / 2, 2, 50, 720, 12, 4);
  //cool patterns
  //rose = new Pattern(width/2 - 50, height/2, 2, 50, 720, 12, 3);
  //starfish = new Pattern(width/2 - 50, height/2, 1, 20, 720, 32, 6);
}

function draw() {
    game.update();
}



function keyPressed() {
    player.move(keyCode);
}

function keyReleased() {
    player.release(keyCode);
}
