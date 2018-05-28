class Player {
    constructor() {
        this.pos = createVector(width/2, height-20);
        this.r = 16;
        this.velocity = createVector(0, 0);
        this.bullets = [];
        this.shotTimer = 0;
        this.lastShot = 10;
        this.animationTimer = 0;
        this.lastAnimation = 5;
        this.movementSpeed = 5;
        this.alive = true;
        this.power = 0;
        this.score = 0;
        this.sprite = {
            "file": sprites["player"],
            "w": 32,
            "h": 48,
            "maxFrames": 8,
            "frame": 1,
            "posx": 0
        };
        this.frame = 1;
    }
    drawPlayer() {
        if(this.animationTimer > this.lastAnimation) {
            this.sprite.frame++;
            if(this.sprite.frame == this.sprite.maxFrames) {
                this.sprite.frame = 1;
            }
            this.animationTimer = 0;
        } else {
            this.animationTimer++;
        }
        this.sprite.posx = this.sprite.w * this.sprite.frame;
        image(this.sprite.file, this.pos.x - this.r, this.pos.y - this.r * 2, this.sprite.w,
              this.sprite.h, this.sprite.posx, 0, this.sprite.w, this.sprite.h);
        // ellipse(this.pos.x, this.pos.y, this.r);
    }
    updateBullets() {
        for (var i = 0; i < this.bullets.length; i++) {
            if(this.bullets[i].outOfBounds()) {
                this.bullets.splice(i, 1);
                continue;
            }

            this.bullets[i].update();
            //MESSY
            for(var j = 0; j < game.enemies.length; j++) {
                if(this.bullets[i] && this.bullets[i].checkCollision(game.enemies[j])) {
                    if(game.enemies[j].hp > 0) {
                        const bulletPower = this.bullets[i].bulletType == "primary" ? 2 : 1;
                        game.enemies[j].hp -= bulletPower;
                    } else {
                        this.pushPowerUp(j);
                        game.enemies.splice(j, 1);
                    }
                    this.bullets.splice(i, 1);
                }
            }
        }
    }
    pushPowerUp(j) {
        const randNum = random(1, 10);
        if(randNum >= 5) {
            const randNum2 = Math.floor(random(1, 10));
            if(randNum2 % 2 == 0) {
                game.powerups.push(new PowerUp("power",game.enemies[j].pos.x,game.enemies[j].pos.y, 0, -1, 3));
            } else {
                game.powerups.push(new PowerUp("score",game.enemies[j].pos.x,game.enemies[j].pos.y, 0, -1, 2));
            }
        }
    }
    update() {
        if(!this.alive) {
            this.pos.x = -500;
            return;
        }
        this.shotTimer++;
        this.drawPlayer();
        this.updateBullets();
        if(keyIsDown(87) || keyIsDown(83) || keyIsDown(68) || keyIsDown(65)) {
            const next = createVector(this.pos.x, this.pos.y);
            next.add(this.velocity);
            if(next.x > 0 && next.x < width && next.y > 0 && next.y < height)
                this.pos.add(this.velocity);
        } else {
            this.velocity.mult(0);
        }
        if (keyIsDown(32)) {
            this.fire();
        } 
    }
    loadShot() {
        // if(this.power < 1) {
        //     this.bullets.push(new Bullet(this.pos.x, this.pos.y, 0, -5, 3));
        // }
        if(this.power >= 0) {
            this.bullets.push(new Bullet(this.pos.x - 10, this.pos.y, 0, -5, 3));
            this.bullets.push(new Bullet(this.pos.x + 10, this.pos.y, 0, -5, 3));
        }
        if(this.power >= 0) {
            this.bullets.push(new Bullet(this.pos.x - 10, this.pos.y, -2, -5, 3, "secondary"));
            this.bullets.push(new Bullet(this.pos.x + 10, this.pos.y, 2, -5, 3, "secondary"));
        }
    }
    fire() {
        if (this.lastShot <= this.shotTimer) {
            this.loadShot();
            this.shotTimer = 0;
        }
    }
    move(e) {
        switch (e) {
            case 87: //W
                this.velocity.y = -this.movementSpeed
                break;
            case 83: //S
                this.velocity.y = this.movementSpeed;
                break;
            case 68: //A
                this.velocity.x = this.movementSpeed;
                break;
            case 65: //D
                this.velocity.x = -this.movementSpeed;
                break
            default:
                break;
        }
    } 
}
