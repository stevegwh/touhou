class Enemy {
    constructor() {
        this.pos = createVector(20, 20);
        this.velocity = createVector(0, 0);
        this.acc = createVector(0,0);
        this.movementSpeed = 0.1;
        this.patterns = [];
        this.directions = [createVector(20, 20), createVector(200, 400), createVector(width - 20, 100)];
        this.dirCount = 0;
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
    update() {
        this.drawEnemy();
        this.drawPattern();
        this.pos.add(this.velocity);
        this.velocity.add(this.acc);
        let currentDirection = this.directions[this.dirCount];
        
        if(this.getDistance(this.pos, currentDirection) < 50) {
            console.log("Arrived");
            this.patterns.push(new Spiral(this.pos.x, this.pos.y, 2, 50, 720, 12, 3));
            this.acc.mult(0);
            this.velocity.mult(0);
            if(this.dirCount + 1 !== this.directions.length) {
                this.dirCount++;
            } else {
                this.dirCount = 0;
            }
        }

        this.move(currentDirection.x, currentDirection.y, 0.1);
        
    }
}