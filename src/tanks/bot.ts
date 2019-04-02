import { WINDOW_SIZE, TILE_SIZE } from "./global";
import { Tank } from "./tank";
import { Game } from "./game";
import { Level } from "./levels";


function random(min, max): number {
    return (Math.random() * (max - min) + min);
}

function booleanRandom() {
    return Math.random() > .5 ? 0 : 1;
}

function tripleBooleanRandom() {
    let res, random = Math.random();
    if (random < 1 / 3) {
        res = -1;
    } else if (random >= 1 / 3 && random < 2 / 3) {
        res = 0;
    } else {
        res = 1;
    }

    return res;
}

const derectionArray = ['left', 'up', 'right', 'down'];
const modArray = ['simple', 'fast', 'heavy', 'armored'];
const bonusArray = ['armor', 'star', 'life' /*'granate', 'clock'*/];

export class Bot extends Tank {
    public movementVel: number = WINDOW_SIZE / 7;
    private start = new Date().getTime();
    private elapsedCache: number = 0;
    private fireDelay = random(1500, 4000);
    private moveTimeout: number;
    public markForDeletion: boolean = false;
    readonly type: string = 'bot';
    public hits: number = 0;
    public hitsToDestroy: number = 1;
    private mod: string = 'simple';
    public bonus: string = null;
    protected state: string = 'normal';

    constructor(img: HTMLImageElement, mod: string, bonus: string) {
        super(img, TILE_SIZE - TILE_SIZE * 0.15, TILE_SIZE - TILE_SIZE * 0.15);
        this.mod = mod;
        this.bonus = bonus;
        this.init();
    }

    init() {
        let randomVal = tripleBooleanRandom();
        if (randomVal === -1) {
            this.pos.x = 5;
            if (booleanRandom()) {
                this.moveRight();
            } else {
                this.moveDown();
            }
        }
        if (randomVal === 0) {
            this.pos.x = WINDOW_SIZE / 2 - this.size.x / 2;
            if (booleanRandom()) {
                this.moveLeft();
            } else {
                this.moveRight();
            }
        }
        if (randomVal === 1) {
            this.pos.x = WINDOW_SIZE - this.size.x - 5;
            if (booleanRandom()) {
                this.moveLeft();
            } else {
                this.moveDown();
            }
        }
        this.pos.y = 5;


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
                this.bulletSpeedFactor = 1.5;
                break;
            case 'armored':
                this.hitsToDestroy = 3;
                this.modMoveFactor = 0.8;
                this.bulletSpeedFactor = 1;
                break;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        if (this.bonus) {
            ctx.strokeStyle = '#fd68ff';
            let width = 4;
            ctx.lineWidth = width / 2;
            ctx.strokeRect(this.pos.x - width / 2, this.pos.y - width / 2, this.size.x + width, this.size.y + width);
        }
    }

    static generateBonus() {
        let chance = Math.ceil(random(0, 8));
        let randomIndex = Math.round(random(0, bonusArray.length - 1));
        return chance === 8 ? bonusArray[randomIndex] : null;
    }

    static async getBonusImage(bonus: string) {
        let images = await Level.loadImages(['clock.png', 'armor.png', 'star.png', 'life.png', 'granate.png']);
        let img;

        switch (bonus) {
            case 'clock': img = images[0]; break;
            case 'armor': img = images[1]; break;
            case 'star': img = images[2]; break;
            case 'life': img = images[3]; break;
            case 'granate': img = images[4]; break;
        }
        return img;
    }

    static async generateMod(): Promise<{ mod: string, img: HTMLImageElement }> {
        let images = await Level.loadImages(['bot-simple.png', 'bot-fast.png', 'bot-heavy.png', 'bot-armored.png']);
        let rand = random(0, 1), mod, img;

        if (rand <= 0.65) mod = modArray[0];
        else if (rand < 0.85) mod = modArray[1];
        else if (rand <= 0.97) mod = modArray[2];
        else mod = modArray[3];

        switch (mod) {
            case 'simple': img = images[0]; break;
            case 'fast': img = images[1]; break;
            case 'heavy': img = images[2]; break;
            case 'armored': img = images[3]; break;
        }

        return { mod, img };
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

        switch (direction) {
            case 'right': this.moveLeft(); break;
            case 'left': this.moveRight(); break;
            case 'up': this.moveDown(); break;
            case 'down': this.moveUp(); break;
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