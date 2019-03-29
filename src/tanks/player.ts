import { WINDOW_SIZE, TILE_SIZE } from './global';
import { Tank } from './tank';

enum TEST {

}

export class Player extends Tank {
    public movementVel: number = WINDOW_SIZE / 7;
    private pressedKeys = {};
    public markForDeletion;
    private duration: number = 200;
    private start = new Date().getTime();
    public lives = 2;
    readonly type = 'player';

    constructor(img, w, h) {
        super(img, w, h);

        this.pos.x = WINDOW_SIZE / 2 - TILE_SIZE * 2 - this.size.x / 2;
        this.pos.y = WINDOW_SIZE - this.size.y;

        // this.setStateNormal();
        // this.setStateImproved();
        // this.setStateSuperb();
    }

    update(dt, tiles, game) {
        this.keyboard();
        this.move(dt, tiles, game);

        if (this.isShoting && game.bullets.filter(r => r.source === 'player').length <= 0) {
            let elapsed = new Date().getTime() - this.start;
            if (elapsed > this.duration) {
                this.fire(game);
                this.start = new Date().getTime();
            }
        }

        if (this.markForDeletion) {
            this.markForDeletion = false;
            this.isMoving = false;
            this.vel.x = 0;
            this.vel.y = 0;
            this.pos.x = WINDOW_SIZE / 2 - TILE_SIZE * 2 - this.size.x / 2;
            this.pos.y = WINDOW_SIZE - this.size.y;
        }
    }

    keyboard() {
        let currentKeyCode = Object.keys(this.pressedKeys)
            .filter(r => r === 'k37' || r === 'k38' || r === 'k39' || r === 'k40')
            .pop();

        if (String(currentKeyCode) === 'k37') {
            this.vel.x = -this.movementVel;
            this.vel.y = 0;
            this.direction = 'left';
            this.isMoving = true;
            // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        }
        if (String(currentKeyCode) === 'k38') {
            this.vel.x = 0;
            this.vel.y = -this.movementVel;
            this.direction = 'up';
            this.isMoving = true;
            // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        }
        if (String(currentKeyCode) === 'k39') {
            this.vel.x = this.movementVel;
            this.vel.y = 0;
            this.direction = 'right';
            this.isMoving = true;
            // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        }
        if (String(currentKeyCode) === 'k40') {
            this.vel.x = 0;
            this.vel.y = this.movementVel;
            this.direction = 'down';
            this.isMoving = true;
            // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        }

        if (this.pressedKeys['k32']) {
            if (!this.isShoting) {
                // this.start = new Date().getTime() - this.fireDelay;
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
