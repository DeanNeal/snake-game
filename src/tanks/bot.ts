import { WINDOW_SIZE, TILE_SIZE } from "./global";
import { Tank } from "./tank";
import { Game } from "./game";
import { Tile } from "./tile";

function random(min, max): number {
    return (Math.random() * (max - min) + min);
}

function booleanRandom() {
    return Math.random() > .5 ? 0 : 1;
}

const derectionArray = ['left', 'up', 'right', 'down'];
const modArray = ['simple', 'fast', 'heavy', 'armored'];
const bonusArray = ['armor', 'star', 'life', 'granate', 'clock'];

export class Bot extends Tank {
    public movementVel: number = WINDOW_SIZE / 7;
    private start = new Date().getTime();
    private elapsedCache: number = 0;
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

        switch (this.mod) {
            case 'simple':
                this.hitsToDestroy = 1;
                this.modMoveFactor = 1;
                this.bulletSpeedFactor = 1;
                break;
            case 'fast':
                this.hitsToDestroy = 1;
                this.modMoveFactor = 1.8;
                this.bulletSpeedFactor = 1;
                break
            case 'heavy':
                this.hitsToDestroy = 2;
                this.modMoveFactor = 1.2;
                this.bulletSpeedFactor = 1.8;
                break;
            case 'armored':
                this.hitsToDestroy = 3;
                this.modMoveFactor = 0.8;
                this.bulletSpeedFactor = 1;
                break;
        }
    }

    static generateBonus() {
        let chance = Math.round(random(0, 0));
        let randomIndex = Math.round(random(0, bonusArray.length - 1));
        return chance === 0 ? bonusArray[randomIndex] : null;
    }

    static generateMod() {
        let randomIndex = Math.round(random(0, modArray.length - 1));
        let mod = modArray[randomIndex];
        return mod;
    }

    static getRandomDirection(): string {
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
        const direction = Bot.getRandomDirection();

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

    update(dt: number, game: Game) {
        if (dt) {
            this.move(dt, game);
            
            let time = new Date().getTime()
            if (this.elapsedCache) {
                this.start = time - this.elapsedCache;
                this.elapsedCache = 0;
            }
            let elapsed = (time - this.start);

            if (elapsed > this.fireDelay) {
                this.fire(game);
                this.start = time;
                this.fireDelay = random(1500, 4000);
            }
        } else {
            this.elapsedCache = new Date().getTime() - this.start;
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