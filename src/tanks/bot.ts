import { WINDOW_SIZE } from "./global";
import { Tank } from "./tank";

function random(min, max): number {
    return (Math.random() * (max - min) + min);
}

function booleanRandom() {
    return Math.random() > .5 ? 0 : 1;
}

let derection = ['left', 'up', 'right', 'down'];


export class Bot extends Tank {
    public movementVel: number = WINDOW_SIZE / 10;
    private start = new Date().getTime();
    private fireDelay = 1000;
    private moveTimeout;
    public markForDeletion;
    readonly type = 'bot';
    // private randomChangeTime = random(1000, 10000);

    constructor(img, w, h) {
        super(img, w, h);
        
        this.init();
    }

    init() {
        this.pos.x = 5;
        this.pos.y = 5;
        this.setRandomDirection();
    }

    getRandomDirection() {
        let randomDirection = Math.round(random(0, 3));
        return derection[randomDirection];
    }

    setRandomDirection() {
        let direction = this.getRandomDirection();
        if (direction === 'right') {
            this.direction ='left';
            this.isMoving = true;
            this.vel.x = -this.movementVel;
            this.vel.y = 0;
        } else if (direction === 'left') {
            this.direction = 'right';
            this.isMoving = true;
            this.vel.x = this.movementVel;
            this.vel.y = 0;
        } else if (direction === 'up') {
            this.direction = 'down';
            this.isMoving = true;
            this.vel.x = 0;
            this.vel.y = this.movementVel;
        } else if (direction === 'down') {
            this.direction = 'up';
            this.isMoving = true;
            this.vel.x = 0;
            this.vel.y = -this.movementVel;
        }
        // console.log(direction);
    }

    update(dt, tiles, game) {
        this.move(dt, tiles, game);

        let elapsed = new Date().getTime() - this.start;
        if (elapsed > this.fireDelay) {
            this.fire(game);
            this.start = new Date().getTime();
            this.fireDelay = random(100, 4000);
        }
    }

    onCollision() {
        if (this.moveTimeout) clearTimeout(this.moveTimeout);

        this.isMoving = false;
        this.moveTimeout = setTimeout(() => {
            this.setRandomDirection();
        }, 500);
    }
}