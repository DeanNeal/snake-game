import './tanks.less';
import { Vec } from './vec';
import { Rect } from './rect';
import { Brick } from './brick';
import { Bullet } from './bullet';
import { Player } from './player';
import AudioController from './audio';
import Level  from './levels';

const isMobile = ("ontouchstart" in document.documentElement);


class Tanks {
    private canvas;
    private context;
    private player: Player;
    private steps: boolean = false;
    private direction: string = 'right';
    private isMoving: boolean = false;
    private stacked: boolean = false;
    private bullets: Bullet[] = [];
    private bricks: Brick[] = [];

    private isShoting = false;
    private duration = 200;
    private start = new Date().getTime();


    private pressedKeys = {};

    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.width = 800;
        canvas.height = 800;

    

        Level.build('level1').then((bricks: Brick[])=> {
            this.bricks = bricks;
        });


        let imageTank = new Image();
        imageTank.src = 'img/tanks/tank.png';
        imageTank.onload = (res) => {
            this.player = new Player(imageTank, 40, 40, 'You');
            this.player.pos.x = 100;
            this.player.pos.y = canvas.height - this.player.size.y;

            this.startUpdate();
        };

        window.addEventListener('resize', () => {

        });
        this.addEventListeners();
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
            this.player.vel.x = -this.player.movementVel;
            this.player.vel.y = 0;
            this.player.direction = 'left';
            this.isMoving = true;
            // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        }
        if (String(currentKeyCode) === 'k38') {
            this.player.vel.x = 0;
            this.player.vel.y = -this.player.movementVel;
            this.player.direction = 'up';
            this.isMoving = true;
            // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        }
        if (String(currentKeyCode) === 'k39') {
            this.player.vel.x = this.player.movementVel;
            this.player.vel.y = 0;
            this.player.direction = 'right';
            this.isMoving = true;
            // AudioController.play('tanks/sounds/background.ogg', 0.2, true)
        }
        if (String(currentKeyCode) === 'k40') {
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
            bullet.vel.x = -500;
        } else if (this.player.direction === 'right') {
            bullet.pos.x = this.player.right;
            bullet.pos.y = this.player.pos.y + this.player.size.y / 2 - 2;

            bullet.vel.y = 0;
            bullet.vel.x = 500;
        } else if (this.player.direction === 'down') {
            bullet.pos.x = this.player.pos.x + this.player.size.x / 2 - 2;
            bullet.pos.y = this.player.pos.y + this.player.size.y;

            bullet.vel.y = 500;
        } else if (this.player.direction === 'up') {
            bullet.pos.x = this.player.pos.x + this.player.size.x / 2 - 2;
            bullet.pos.y = this.player.pos.y;

            bullet.vel.y = -500;
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

        this.bricks = this.bricks.filter(r => !r.markForDeletion);
        this.bricks.forEach(brick => brick.draw(this.context));
    }

    collider() {
        // this.bricks.forEach(brick=> brick.collision(this.player, this));
        this.bullets.forEach(bullet => bullet.collision(this.player, this));
    }

    update(dt) {
        // console.log(this.isMoving);
        this.movePlayer();

        if (this.isMoving) {//&& this.stacked === false) {
            this.player.pos.x += Math.round(this.player.vel.x * dt);
            this.player.pos.y += Math.round(this.player.vel.y * dt); 
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