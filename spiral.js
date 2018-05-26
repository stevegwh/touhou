class Spiral {
    constructor(x, y, rotationRate, amount, maxAngle, k, movementSpeed) {
        this.dt = 0; //delta time
        this.amount = amount; //amount of bullets to load
        this.count = 1; //says when to push new bullet
        this.pos = createVector(x, y); //position of pattern;
        this.rotationRate = rotationRate; //how fast the pattern executes
        this.movementSpeed = movementSpeed; //how fast each bullet moves
        this.maxAngle = maxAngle //how far to turn
        this.k = k;
        //TO DO: add starting angle
    }
    update() {
        if (floor(this.dt) >= this.rotationRate && this.count !== this.amount) {
            this.loadBullet();
            this.dt = 0;
            this.count++;
        } else {
            this.dt++;
        }
    }
    loadBullet() {
        const segment = this.maxAngle / this.amount;
        const angle = segment * this.count;
        game.bullets.push(new Bullet(this.pos.x, this.pos.y, cos(angle * this.k), sin(angle * this.k), this.movementSpeed));
    }
}
