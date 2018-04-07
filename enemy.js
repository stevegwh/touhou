class Enemy {
    constructor(x, y, r, movementSpeed, directions, availablePatterns) {
        this.pos = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acc = createVector(0,0);
        this.movementSpeed = movementSpeed;
        this.r = r;
        this.availablePatterns = availablePatterns;
        this.patterns = [];
        this.directions = directions;
        this.dirCount = 0;
        this.pauseCount = 0;
    }
    drawEnemy() {
        push();
        fill(255, 100, 255);
        ellipse(this.pos.x, this.pos.y, this.r);
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
            const p = this.availablePatterns[0];
            this.patterns.push(this.patternGenerator(p.name, p.rotationRate, p.amount, p.maxAngle, p.k, p.movementSpeed));
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
    patternGenerator(name, rotationRate, amount, maxAngle, k = 8, movementSpeed = 2) {
        const patterns = {
            "Spiral" : new Spiral(this.pos.x, this.pos.y, rotationRate, amount, maxAngle, k, movementSpeed)
        }
        return patterns[name];
    }
}

class Boss extends Enemy {
    constructor(x, y, r, movementSpeed) {
        const directions = [
            {"dir" : createVector(150, 150), "pause" : 140, "fired" : false}, 
            {"dir" : createVector(400, 600), "pause" : 200, "fired" : false}, 
            {"dir" : createVector(width - 20, 800), "pause" : 140, "fired" : false}
        ];
        const patterns = [
            {name: "Spiral", rotationRate: 2, amount: 50, maxAngle: 720, k: 12, movementSpeed: 3}
        ]
        super(x, y, r, movementSpeed, directions, patterns);
    }
}

class Boss2 extends Enemy {
    constructor(x, y, r, movementSpeed) {
        const directions = [
            {"dir" : createVector(20, 20), "pause" : 140, "fired" : false}, 
            {"dir" : createVector(400, 600), "pause" : 200, "fired" : false}, 
            {"dir" : createVector(width - 20, 800), "pause" : 140, "fired" : false}
        ];
        super(x, y, r, movementSpeed, directions);
    }
}