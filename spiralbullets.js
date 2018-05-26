var spiral, spiral2, rose, enemy, player, bg1, bg2, mySound;


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
    level = new Level(0);
    player = new Player();

    level.leveldata = [
        {
            "waves" : [
                {
                    "time" : 5,
                    "enemies" : [new Spinner(40, -100, 15, 5), new Spinner(140, -100, 15, 5)]
                },
                {
                    "time" : 10,
                    "enemies" : [new RegularMob(40, -100, 15, 5), new RegularMob(80, -100, 15, 5),
                                 new RegularMob(120, -100, 15, 5), new RegularMob(160, -100, 15, 5)]
                }
            ]
        }
    ]
  //enemies.push(new Spinner(40, -100, 15, 5))
  //enemies.push(new Spinner(60, -300, 15, 5))

  //spiral = new Spiral(width / 2 + 50, height / 2, 1, 60, 720, null, 4);
  //rose = new Spiral(width / 2, height / 2, 2, 50, 720, 12, 4);
  //cool patterns
  //rose = new Pattern(width/2 - 50, height/2, 2, 50, 720, 12, 3);
  //starfish = new Pattern(width/2 - 50, height/2, 1, 20, 720, 32, 6);
}

function draw() {
    level.update();
}



function keyPressed() {
    player.move(keyCode);
}
