import { WINDOW_SIZE, TILE_SIZE, BULLET_SPEED } from "./global";
import { Tank } from "./tank";

function random(min, max): number {
    return (Math.random() * (max - min) + min);
}

function booleanRandom() {
    return Math.random() > .5 ? 0 : 1;
}

const derectionArray = ['left', 'up', 'right', 'down'];
const modArray = ['simple', 'fast', 'armored'];
const bonusArray = ['helm', 'star', 'life', 'granate', 'clock'];

export class Bot extends Tank {
    public movementVel: number = WINDOW_SIZE / 10;
    private start = new Date().getTime();
    private fireDelay = 1000;
    private moveTimeout;
    public markForDeletion;
    readonly type = 'bot';
    public hits: number = 0;
    private hitsToDestroy: number = 1;
    private mod = 'simple';
    private bonus = null;
    private state: string = 'normal';

    constructor(img, mod, bonus) {
        super(img, TILE_SIZE - TILE_SIZE * 0.15, TILE_SIZE - TILE_SIZE * 0.15);
        this.mod = mod;
        this.bonus = bonus;
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

        if (this.mod === 'simple') {
            this.hitsToDestroy = 1;
            this.modMoveFactor = 1;
        }
        if (this.mod === 'fast') {
            this.hitsToDestroy = 1;
            this.modMoveFactor = 1.6;
        }
        if (this.mod === 'armored') {
            this.hitsToDestroy = 3;
            this.modMoveFactor = 0.8;
        }

    }

    static generateBonus() {
        let chance = Math.round(random(0, 0));
        let randomIndex = Math.round(random(0, bonusArray.length - 1));
        return chance === 0 ? bonusArray[randomIndex] : null;
    }

    static generateMod() {
        let randomIndex = Math.round(random(0, 2));
        let mod = modArray[randomIndex];
        return mod;
    }

    get bulletSpeed() {
        let factor = 1;
        // switch (this.state) {
        //     case 'normal':
        //         factor = 1; break;
        //     case 'improved':
        //         factor = 1.5; break;
        //     case 'superb':
        //         factor = 2; break;
        // }

        return BULLET_SPEED * factor;
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