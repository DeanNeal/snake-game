import { WINDOW_SIZE } from "./global";
import { Tank } from "./tank";

function random(min, max): number {
    return (Math.random() * (max - min) + min);
}

function booleanRandom() {
    return Math.random() > .5 ? 0 : 1;
}

let derectionArray = ['left', 'up', 'right', 'down'];


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
        let randomVal = booleanRandom();
        this.pos.x = randomVal ? 5 : WINDOW_SIZE - this.size.x - 5;
        this.pos.y = 5;

        if (randomVal) {
            if (booleanRandom()) {
                this.moveRight();
            } else {
                this.moveDown();
            }
        }
        else {
            if (booleanRandom()) {
                this.moveLeft();
            } else {
                this.moveDown();
            }
        }
    }

    getRandomDirection() {
        let randomDirection = Math.round(random(0, derectionArray.length - 1));
        return derectionArray[randomDirection];
    }

    moveLeft() {
        this.direction = 'left';
        this.isMoving = true;
        this.vel.x = -this.movementVel;
        this.vel.y = 0;
    }

    moveRight() {
        this.direction = 'right';
        this.isMoving = true;
        this.vel.x = this.movementVel;
        this.vel.y = 0;
    }

    moveUp() {
        this.direction = 'up';
        this.isMoving = true;
        this.vel.x = 0;
        this.vel.y = -this.movementVel;
    }

    moveDown() {
        this.direction = 'down';
        this.isMoving = true;
        this.vel.x = 0;
        this.vel.y = this.movementVel;
    }

    setRandomDirection() {
        const direction = this.getRandomDirection();
        // console.log(direction);
        if (direction === 'right') {
            this.moveLeft();
        } else if (direction === 'left') {
            this.moveRight();
        } else if (direction === 'up') {
            this.moveDown();
        } else if (direction === 'down') {
            this.moveUp();
        }
    }

    update(dt, tiles, game) {
        this.move(dt, tiles, game);

        let elapsed = new Date().getTime() - this.start;
        if (elapsed > this.fireDelay) {
            this.fire(game);
            this.start = new Date().getTime();
            this.fireDelay = random(1000, 4000);
        }
    }

    onCollision() {
        if (this.moveTimeout) clearTimeout(this.moveTimeout);

        this.isMoving = false;
        this.moveTimeout = setTimeout(() => {
            this.setRandomDirection();
        }, 300);
    }
}