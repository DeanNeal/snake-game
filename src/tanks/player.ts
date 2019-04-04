import { WINDOW_SIZE, TILE_SIZE } from './global';
import { Tank } from './tank';
import { Game } from './game';

export class Player extends Tank {
    public direction: string = 'up';
    public movementVel: number = WINDOW_SIZE / 6.2;
    private pressedKeys: { [s: string]: boolean } = {};
    public markForDeletion: boolean = false;
    private duration: number = 200;
    private start: number = new Date().getTime();
    public lifes: number = 3;
    readonly type: string = 'player';
    protected state: string = 'normal';
    private images: HTMLImageElement[] = [];
    public armor: boolean = true;
    private armorFrames = 0;
    private armorWidth = 1;
    private armorWidthInc = true;

    constructor(images: HTMLImageElement[]) {
        super(images[0], TILE_SIZE - TILE_SIZE * 0.15, TILE_SIZE - TILE_SIZE * 0.15);
        this.images = images;
        this.pos.x = WINDOW_SIZE / 2 - TILE_SIZE * 2 - this.size.x / 2;
        this.pos.y = WINDOW_SIZE - this.size.y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        if (this.armor) {
            this.armorFrames++;

            let width = 1;
            if (this.armorFrames >= 800) {
                this.armor = false;
            }

            if (this.armorFrames % 9 === 0) {
                this.armorWidthInc ? this.armorWidth++ : this.armorWidth--;
            }

            if (this.armorWidth > 2) {
                this.armorWidthInc = false;
            }

            if (this.armorWidth < 1) {
                this.armorWidthInc = true;
            }

            width = this.armorWidth;

            this.drawArmorLine(width, ctx, this.pos.x, this.pos.y, this.pos.x + this.size.x, this.pos.y);
            this.drawArmorLine(width, ctx, this.pos.x + this.size.x, this.pos.y, this.pos.x + this.size.y, this.pos.y + this.size.y);
            this.drawArmorLine(width, ctx, this.pos.x + this.size.x, this.pos.y + this.size.y, this.pos.x, this.pos.y + this.size.y);
            this.drawArmorLine(width, ctx, this.pos.x, this.pos.y + this.size.y, this.pos.x, this.pos.y);
        }
    }

    drawArmorLine(width, ctx, startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = width;
        ctx.strokeStyle = "#fff";
        // ctx.fillStyle = grd;
        ctx.stroke();
    }

    updateState() {
        switch (this.state) {
            case 'normal':
                this.bulletSpeedFactor = 1;
                this.img = this.images[0];
                break;
            case 'improved':
                this.bulletSpeedFactor = 1.3;
                this.img = this.images[1];
                break;
            case 'superb':
                this.bulletSpeedFactor = 1.8;
                this.img = this.images[2];
                break;
            case 'god':
                this.bulletSpeedFactor = 2.2;
                this.img = this.images[3];
                break;
        }

        this.updateCanvases();
    }

    positionReset() {
        this.isMoving = false;
        this.vel.x = 0;
        this.vel.y = 0;
        this.pos.x = WINDOW_SIZE / 2 - TILE_SIZE * 2 - this.size.x / 2;
        this.pos.y = WINDOW_SIZE - this.size.y;
        this.direction = 'up';
    }

    reset() {
        this.positionReset();

        this.state = 'normal';
        this.armor = false;
        this.armorFrames = 0;
        this.updateState();
    }

    update(dt: number, game: Game) {
        if (dt) {
            this.keyboard();
            this.move(dt, game);

            if (this.isShoting) {
                let bulletCount = game.bullets.filter(r => r.source === 'player').length;
                if (this.state === 'normal' && bulletCount <= 0) {
                    this.fireCheck(game);
                } else if (this.state === 'improved' && bulletCount <= 0) {
                    this.fireCheck(game);
                } else if (this.state === 'superb' && bulletCount <= 1) {
                    this.fireCheck(game);
                } else if (this.state === 'god' && bulletCount <= 2) {
                    this.fireCheck(game);
                }
            }

            if (this.markForDeletion) {
                this.markForDeletion = false;
                this.lifes--;
                this.reset();
            }
        }
    }

    fireCheck(game: Game) {
        let elapsed = new Date().getTime() - this.start;
        if (elapsed > this.duration) {
            this.fire(game);
            this.start = new Date().getTime();
        }
    }

    keyboard() {
        let currentKeyCode = Object.keys(this.pressedKeys)
            .filter(r => r === 'k37' || r === 'k38' || r === 'k39' || r === 'k40')
            .pop();

        switch (String(currentKeyCode)) {
            case 'k37':
                this.vel.x = -this.movementVel;
                this.vel.y = 0;
                this.direction = 'left';
                this.isMoving = true;
                // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
                break;

            case 'k38':
                this.vel.x = 0;
                this.vel.y = -this.movementVel;
                this.direction = 'up';
                this.isMoving = true;
                // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
                break;

            case 'k39':
                this.vel.x = this.movementVel;
                this.vel.y = 0;
                this.direction = 'right';
                this.isMoving = true;
                // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
                break;

            case 'k40':
                this.vel.x = 0;
                this.vel.y = this.movementVel;
                this.direction = 'down';
                this.isMoving = true;
                // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
                break;
        }

        if (this.pressedKeys['k32']) {
            if (!this.isShoting) {
                this.isShoting = true;
            }
        }
    }

    addEventListeners() {
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            (e.keyCode === 37) && delete this.pressedKeys['k37'];
            (e.keyCode === 38) && delete this.pressedKeys['k38'];
            (e.keyCode === 39) && delete this.pressedKeys['k39'];
            (e.keyCode === 40) && delete this.pressedKeys['k40'];
            (e.keyCode === 32) && delete this.pressedKeys['k32'];

            if (Object.keys(this.pressedKeys).indexOf('k37') === -1 &&
                Object.keys(this.pressedKeys).indexOf('k38') === -1 &&
                Object.keys(this.pressedKeys).indexOf('k39') === -1 &&
                Object.keys(this.pressedKeys).indexOf('k40') === -1) {
                this.isMoving = false;
            }

            if (Object.keys(this.pressedKeys).indexOf('k32') === -1) {
                this.isShoting = false;
            }
        }, true);

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            this.pressedKeys['k' + e.keyCode] = e.type == 'keydown';
        }, false);
    }
}
