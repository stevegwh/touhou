class Level {
    constructor(level) {
        this.bullets = [];
        this.enemies = [];
        this.powerups = [];
        this.bg1 = this.loadBG()
        this.bg2 = this.loadBG();
        this.bg1y = 0;
        this.bg2y = -820;
        this.level = level;
        this.loadSound(level);
        this.timer = 0;
        this.prevTime = 1;
    }
    updateBG() {
        image(this.bg1, 0, this.bg1y);
        image(this.bg2, 0, this.bg2y);
        this.bg1y += 1;
        this.bg2y += 1;
        if (this.bg1y > height) {
            this.bg1y = -800;
        } else if (this.bg2y > height) {
            this.bg2y = -800;
        }

    }
    loadBG(level) {
        return loadImage("assets/bg.png");
    }
    loadSound(level) {
        mySound.setVolume(0.8);
        mySound.play();
    }
    getEnemies() {
        let arr = [];
        for(let i = 0; i < 10; i++) {
            arr.push(new regularMob(60 * i, 40 * -i, 15, 5));
        }
        // levels[this.level]["waves"].forEach((wave) => {
        //     if(wave.time === this.timer) {
        //         wave.enemies.forEach((enemy) => {
        //             arr.push(enemy);
        //         });
        //     }
        // });
        return arr;
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
        // if(Math.floor(this.timer/60) > 5 && Math.floor(this.timer/60 < 11)) {
        //     this.enemies = this.getEnemies();
        // }
        this.updateBG();
        player.update();
        this.updateBullets();
        this.updateEnemies();
        this.updatePowerUps();
        this.levelGenerator();
    }
    levelGenerator() {
        const currentWave = this.leveldata[this.level]["waves"];
        currentWave.forEach((wave) => {
            if(this.timer/60 > wave.time) {
                this.enemies = wave.enemies;
            }
        });
    }
}
