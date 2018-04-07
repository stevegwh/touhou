class Enemy {
    constructor() {
        this.pos = createVector(20, 20);
        this.velocity = createVector(0, 0);
        this.acc = createVector(0,0);
        this.movementSpeed = 0.1;
        this.patterns = [];
        this.directions = [
            {"dir" : createVector(20, 20), "pause" : 140, "fired" : false}, 
            {"dir" : createVector(200, 400), "pause" : 140, "fired" : false}, 
            {"dir" : createVector(width - 20, 100), "pause" : 140, "fired" : false}
        ];
        this.dirCount = 0;
        this.pauseCount = 0;
    }
    drawEnemy() {
        push();
        fill(255, 100, 255);
        ellipse(this.pos.x, this.pos.y, 20, 20);
        pop();
    }
    drawPattern() {
        for (var i = 0; i < this.patterns.length; i++) {
            this.patterns[i].update();
        }
    }
    move(x, y, mag) {
        let location = createVector(x, y);
        location.sub(this.pos);
        location.setMag(mag);
        this.acc = location;
    }
    getDistance(d1, d2) {
        return int(dist(d1.x, d1.y, d2.x, d2.y));
    }
    changeDirection() {
        if(this.dirCount + 1 !== this.directions.length) {
            this.dirCount++;
        } else {
            this.dirCount = 0;
        }
    }
    pause() {
        this.fire();
        this.acc.mult(0);
        this.velocity.mult(0);
        if(this.pauseCount < this.directions[this.dirCount]["pause"]) {
            this.pauseCount++;
        } else {
            this.pauseCount = 0;
            this.directions[this.dirCount]["fired"] = false;
            this.changeDirection();
        }
    }
    fire() {
        if(!this.directions[this.dirCount]["fired"]) {
            this.patterns.push(new Spiral(this.pos.x, this.pos.y, 2, 50, 720, 12, 3));
            this.directions[this.dirCount]["fired"] = true;
        }
    }
    update() {
        this.drawEnemy();
        this.drawPattern();
        
        this.pos.add(this.velocity);
        this.velocity.add(this.acc);

        let currentDirection = this.directions[this.dirCount]["dir"];
        
        if(this.getDistance(this.pos, currentDirection) < 50) {
            this.pause()
        }

        this.move(currentDirection.x, currentDirection.y, 0.1);
        
    }
}