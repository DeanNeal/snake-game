import './tanks.less';
import { Tile } from './tile';
import { Bullet } from './bullet';
import { Player } from './player';
import AudioController from './audio';
import { Level } from './levels';
import { Eagle } from './eagle';
import { WINDOW_SIZE, TILE_SIZE, BULLET_SPEED } from './global';

const isMobile = ("ontouchstart" in document.documentElement);


class Tanks {
    private canvas;
    private context;
    private player: Player;
    private steps: boolean = false;
    private isMoving: boolean = false;
    private stacked: boolean = false;
    private bullets: Bullet[] = [];
    private tiles: Tile[] = [];
    private eagle: Eagle;

    private isShoting = false;
    private duration = 200;
    private start = new Date().getTime();


    private pressedKeys = {};

    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.width = WINDOW_SIZE;
        canvas.height = WINDOW_SIZE;

        let level = new Level();

        level.build('level1').then((tiles: Tile[]) => {
            this.tiles = tiles;
        });

        Level.loadImages(['img/tanks/tank.png', 'img/tanks/eagle.png']).then(images => {
            this.player = new Player(images[0], TILE_SIZE- 8, TILE_SIZE-8);
            this.player.pos.x = 100;
            this.player.pos.y = canvas.height - this.player.size.y;

            this.eagle = new Eagle(images[1], TILE_SIZE, TILE_SIZE, this.canvas.width / 2 - TILE_SIZE / 2, this.canvas.height - TILE_SIZE);

            this.startUpdate();

            this.addEventListeners();
        })
    }

    startUpdate() {
        let lastTime;
        const callback = (ms?: number) => {
            if (lastTime) {
                this.update((ms - lastTime) / 1000);
            }
            lastTime = ms;
            requestAnimationFrame(callback);
        }
        callback();
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

    movePlayer() {
        let currentKeyCode = Object.keys(this.pressedKeys)
            .filter(r => r === 'k37' || r === 'k38' || r === 'k39' || r === 'k40')
            .pop();

        if (String(currentKeyCode) === 'k37') {
            // if(this.player.canMove.left){
                this.player.vel.x = -this.player.movementVel;
                this.player.vel.y = 0;
                this.player.direction = 'left';
                this.isMoving = true;
                // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        }
        if (String(currentKeyCode) === 'k38') {

            // if(this.player.canMove.up) {
                this.player.vel.x = 0;
                this.player.vel.y = -this.player.movementVel;
                this.player.direction = 'up';
                this.isMoving = true;
                // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        } 
        if (String(currentKeyCode) === 'k39') {
            // if(this.player.canMove.right) {
                this.player.vel.x = this.player.movementVel;
                this.player.vel.y = 0;
                this.player.direction = 'right';
                this.isMoving = true;
                // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        } 
        if (String(currentKeyCode) === 'k40') {
            // if(this.player.canMove.down) {
                this.player.vel.x = 0;
                this.player.vel.y = this.player.movementVel;
                this.player.direction = 'down';
                this.isMoving = true;
                // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        }

        if (this.pressedKeys['k32']) {
            if (!this.isShoting) {
                this.start = new Date().getTime() - this.duration;
                this.isShoting = true;
            }
        }
    }

    fire() {
        let bullet = new Bullet(4, 4);
        if (this.player.direction === 'left') {
            bullet.pos.x = this.player.pos.x;
            bullet.pos.y = this.player.pos.y + this.player.size.y / 2 - 2;

            bullet.vel.y = 0;
            bullet.vel.x = -BULLET_SPEED;
        } else if (this.player.direction === 'right') {
            bullet.pos.x = this.player.right;
            bullet.pos.y = this.player.pos.y + this.player.size.y / 2 - 2;

            bullet.vel.y = 0;
            bullet.vel.x = BULLET_SPEED;
        } else if (this.player.direction === 'down') {
            bullet.pos.x = this.player.pos.x + this.player.size.x / 2 - 2;
            bullet.pos.y = this.player.pos.y + this.player.size.y;

            bullet.vel.y = BULLET_SPEED;
        } else if (this.player.direction === 'up') {
            bullet.pos.x = this.player.pos.x + this.player.size.x / 2 - 2;
            bullet.pos.y = this.player.pos.y;

            bullet.vel.y = -BULLET_SPEED;
        }

        AudioController.play('tanks/sounds/fire.ogg');
        // AudioController.play('tanks/Battle City SFX (6).wav');
        this.bullets.push(bullet);
    }

    draw() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.draw(this.context);

        this.bullets = this.bullets.filter(r => !r.markForDeletion);
        this.bullets.forEach(bullet => bullet.draw(this.context));

        this.tiles = this.tiles.filter(r => !r.markForDeletion);
        this.tiles.forEach(brick => brick.draw(this.context));

        this.eagle.draw(this.context);
    }

    collider() {
        this.bullets.forEach(bullet => bullet.collision(this.player, this));
    }

    update(dt) {
        this.movePlayer();

        if (this.isMoving) {
            this.player.move(dt, this.tiles);
        }

        if (this.isShoting && this.bullets.length <= 0) {
            let elapsed = new Date().getTime() - this.start;
            if (elapsed > this.duration) {
                this.fire();
                this.start = new Date().getTime();
            }
        }

        this.bullets.forEach(bullet => {
            bullet.pos.x += bullet.vel.x * dt;
            bullet.pos.y += bullet.vel.y * dt;
        });

        if (this.player.top <= 0) {
            this.player.vel.y = 0;
            this.player.pos.y = 0;
        } if (this.player.bottom > this.canvas.height) {
            this.player.vel.y = 0;
            this.player.pos.y = this.canvas.height - this.player.size.y;
        }
        if (this.player.left <= 0) {
            this.player.vel.x = 0;
            this.player.pos.x = 0;
        } else if (this.player.right >= this.canvas.width) {
            this.player.vel.x = 0;
            this.player.pos.x = this.canvas.width - this.player.size.x;
        }

        this.collider();



        this.draw();
    }


}
const canvas = <HTMLCanvasElement>document.getElementById('tanks');
new Tanks(canvas);

//TODO
//PLAYER COLLISIONS WITH TILES
//MOVE SOUND
//enemies AI
//BONUSES
//SCORES
//