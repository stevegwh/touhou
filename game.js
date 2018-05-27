class Game {
    constructor() {
        this.bullets = [];
        this.enemies = [];
        this.powerups = [];
        this.bg1 = this.loadBG()
        this.bg2 = this.loadBG();
        this.bg1y = 0;
        this.bg2y = -820;
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
        this.bg1y += 1;
        this.bg2y += 1;
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
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
            if (this.enemies[i].outOfBounds()) {
                this.enemies.splice(i, 1);
            }
        }
    }

    updateBullets() {
        for (let i = 1; i < this.bullets.length; i++) {
            if (this.bullets[i].outOfBounds()) {
                this.bullets.splice(i, 1);
                continue;
            }
            this.bullets[i].update();
            if (this.bullets[i].checkCollision(player, 20)) {
                player.alive = false;
                this.bullets.splice(i, 1);
            }
        }
    }

    updatePowerUps() {
        for (let i = 1; i < this.powerups.length; i++) {
            if (this.powerups[i].outOfBounds()) {
                this.powerups.splice(i, 1);
                continue;
            }
            this.powerups[i].update();

            if (this.powerups[i].checkCollision(player, -20)) {
                if (this.powerups[i].type === "power") {
                    player.power++;
                    console.log("power: " + player.power);
                } else if (this.powerups[i].type === "score") {
                    player.score++;
                    console.log("score: " + player.score);
                }
                this.powerups.splice(i, 1);
            }
        }
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
