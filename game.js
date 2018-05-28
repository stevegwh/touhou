class Game {
    constructor() {
        this.bullets = [];
        this.enemies = [];
        this.powerups = [];
        this.bg1 = this.loadBG();
        this.bg2 = this.loadBG();
        this.bg1y = 0;
        this.bg2y = -1024;
        this.level = this.getLevel(1);
        this.loadSound(1);
        this.timer = 0;
        this.prevTime = 1;
    }
    getLevel(level) {
        if(level == 1) {
            return new LevelOne()
        }
    }
    updateBG() {
        image(this.bg1, 0, this.bg1y);
        image(this.bg2, 0, this.bg2y);
        this.bg1y += 2;
        this.bg2y += 2;
        if (this.bg1y > height) {
            this.bg1y = -1024;
        } else if (this.bg2y > height) {
            this.bg2y = -1024;
        }

    }
    loadBG(level) {
        return loadImage("assets/bg.png");
    }
    loadSound(level) {
        mySound.setVolume(0.8);
        mySound.play();
    }
    updateEnemies() {
        this.enemies.forEach((e, i, a) => {
            e.update();
            if(e.outOfBounds())
                a.splice(i, 1);
        });
    }

    updateBullets() {
        this.bullets.forEach((e, i, a) => {
            if(e.outOfBounds()) {
                a.splice(i, 1);
                return;
            }
            e.update();
            if(e.checkCollision(player, 20)) {
                player.alive = false;
                a.splice(i, 1);
            }

        });
    }

    updatePowerUps() {
        this.powerups.forEach((e, i, a) => {
            if(e.outOfBounds()) {
                a.splice(i, 1);
                return;
            }
            e.update();
            if(e.checkCollision(player, -20)) {
                e.type === "power" ? player.power++ : player.score++;
                console.log("power:" + player.power);
                console.log("score:" + player.score);
                a.splice(i, 1);
            }
        });
    }
    update() {
        this.timer++;
        this.updateBG();
        this.updateBullets();
        this.updateEnemies();
        this.updatePowerUps();
        this.level.update(this.timer);
        player.update();
    }

}
