class Level {
    constructor() {
    }
    generateRow(startX, startY, amount, gap, speed) {
        const arr = [];
        for(var i = 0; i < amount; i++) {
            arr.push(new RegularMob(startX + i * gap, startY, speed))
        }
        return arr;
    }
    update(timer) {
        function flatten(arr) {
            return [].concat(...arr)
        }
        this.data.forEach((wave, index) => {
            if(timer/60 > wave.time && !wave.spawned) {
                const arr = flatten(wave.enemies);
                arr.forEach((ele) => {
                    game.enemies.push(ele);
                });
                wave.spawned = true;
                return;
            }
        });
    }
}
class LevelOne extends Level {
    constructor() {
        super();
        this.data = this.getLevelData();
    }
    getLevelData() {
        return [
                {
                    "time" : 5,
                    "enemies" : [new Spinner(40, -100, 5), new Spinner(140, -100, 5)],
                    "spawned" : false
                },
                {
                    "time" : 8,
                    "enemies" : [
                        this.generateRow(30, -100, 10, 40, 3),
                        this.generateRow(30, -300, 5, 40, 10)
                    ],
                    "spawned" : false
                }
        ];
    }
}
