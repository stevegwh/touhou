class Player {
    constructor() {
        this.pos = createVector(width/2, height-20);
        this.r = 20;
        this.velocity = createVector(0, 0);
        this.bullets = [];
        this.shotTimer = 0;
        this.lastShot = 10;
        this.movementSpeed = 5;
        this.alive = true;
    }
    drawPlayer() {
        push();
        fill(100, 100, 255);
        ellipse(this.pos.x, this.pos.y, this.r);
        pop();
    }
    drawBullets() {
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
            for(var j = 0; j < enemies.length; j++) {
                if(this.bullets[i].checkCollision(enemies[j])) {
                    this.bullets.splice(i, 1);
                    enemies.splice(j, 1);
                }
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
        this.drawBullets();
        if(keyIsDown(87) || keyIsDown(83) || keyIsDown(68) || keyIsDown(65)) {
            this.pos.add(this.velocity);
        } else {
            this.velocity.mult(0);
        }
        if (keyIsDown(32)) {
            this.fire();
        } 
    }
    fire() {
        if (this.lastShot <= this.shotTimer) {
            this.bullets.push(new Bullet(this.pos.x, this.pos.y, 0, -5, 1));
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