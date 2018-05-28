class Player {
    constructor() {
        this.pos = createVector(width/2, height-20);
        this.r = 16;
        this.velocity = createVector(0, 0);
        this.bullets = [];
        this.shotTimer = 0;
        this.slow = false;
        this.lastShot = 10;
        this.movementSpeed = 5;
        this.alive = true;
        this.power = 0;
        this.score = 0;
        this.sprite = new Sprite(sprites["player"], 32, 48, 8);
    }
    drawPlayer() {
        if(this.velocity.x == 0) {
            this.sprite.posY = 0;
        } else if (this.velocity.x < 0) {
            this.sprite.posY = 48;
        } else if(this.velocity.x > 0) {
            this.sprite.posY = 96;
        }
        this.sprite.animate(this.pos.x, this.pos.y, this.r);
        // ellipse(this.pos.x, this.pos.y, this.r);
    }
    updateBullets() {
        this.bullets.forEach((b, i, a1) => {
            if(b.outOfBounds()) {
                a1.splice(i, 1);
                return;
            }

            b.update();

            game.enemies.forEach((e, j, a2) => {
                if(b && b.checkCollision(e)) {
                    if(e.hp > 0) {
                        // Probably shouldn't define the power here
                        const power = b.bulletType == "primary" ? 1: 0.4;
                        e.hp -= power;
                    } else {
                        this.pushPowerUp(j);
                        a2.splice(j, 1);
                    }
                    a1.splice(i, 1);
                }
            });
        });
    }
    pushPowerUp(j) {
        const n1 = random(1, 10);
        if(n1 >= 5) {
            const n2 = Math.floor(random(1, 10));
            const t = n2 % 2 == 0 ? "power" : "score";
            game.powerups.push(new PowerUp(t,game.enemies[j].pos.x,game.enemies[j].pos.y, 0, -1, 3));
        }
    }
    update() {
        if(!this.alive) {
            this.pos.x = -500;
            return;
        }
        this.drawPlayer();
        this.updateBullets();

        //MESSY
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
        const a = this.bullets;
        // if(this.power < 1) {
        //     a.push(new Bullet(this.pos.x, this.pos.y, 0, -5, 3));
        // }
        if(this.power >= 0) {
            a.push(new Bullet(this.pos.x - 10, this.pos.y, 0, -5, 3));
            a.push(new Bullet(this.pos.x + 10, this.pos.y, 0, -5, 3));
        }
        if(this.power >= 0) {
            a.push(new Bullet(this.pos.x - 10, this.pos.y, -2, -5, 3, "secondary"));
            a.push(new Bullet(this.pos.x + 10, this.pos.y, 2, -5, 3, "secondary"));
        }
    }
    fire() {
        this.shotTimer++;
        if (this.lastShot <= this.shotTimer) {
            this.loadShot();
            this.shotTimer = 0;
        }
    }
    move(e) {
        // switch (e) {
        //     case 87: //W
        //         this.velocity.y = -this.movementSpeed
        //         break;
        //     case 83: //S
        //         this.velocity.y = this.movementSpeed;
        //         break;
        //     case 68: //A
        //         this.velocity.x = this.movementSpeed;
        //         break;
        //     case 65: //D
        //         this.velocity.x = -this.movementSpeed;
        //         break
        //     default:
        //         break;
        // }
        if(e == 87 && !keyIsDown(83)) {
            this.velocity.y = -this.movementSpeed
        }
        if(e == 83 && !keyIsDown(87)) {
            this.velocity.y = this.movementSpeed
        }
        if(e == 68 && !keyIsDown(65)) {
            this.velocity.x = this.movementSpeed
        }
        if(e == 65 && !keyIsDown(68)) {
            this.velocity.x = -this.movementSpeed
        }
    }
    release(e) {
        if(e == 87 || e == 83) {
            this.velocity.y = 0;
        }
        if(e == 68 || e == 65) {
            this.velocity.x = 0;
        }
    }
}
