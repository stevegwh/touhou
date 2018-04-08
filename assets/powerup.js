class Powerup {
    constructor() {
        this.pos = createVector(x, y);
        this.velocity = createVector(x, y);
        this.acc = createVector(x, y);
        this.type = type;
    }
    draw() {
        if(this.type == "power") {

        } else if(this.type = "score") {

        }
    }
    update() {
        
    }
    checkCollision(d2, offset = 100) {
        let d = int(dist(this.pos.x, this.pos.y, d2.pos.x, d2.pos.y));
        if(d <= this.r + (d2.r + offset)) { //make it easier to collect powerups
            return true;
        }
    }
}