import './tanks.less';
import { Vec } from './vec';
import { Rect } from './rect';
import { Brick } from './brick';
import { Bullet } from './bullet';
import { Player } from './player';
import AudioController from './audio';

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
    private bricks = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.width = 800;
        canvas.height = 800;
 
        var imageBrick = new Image(50, 50);
        imageBrick.onload = (res)=> {
            
            for (var i = 0; i < (10); i++) {
               this.bricks.push(new Brick(imageBrick, 50, 50, i * 50, 20 + i* 25));
            }
            
        };

        imageBrick.src = 'img/tanks/brick.jpg';


        let image =  new Image();
        image.src = 'img/tanks/tank.png';
        image.onload = (res)=> {
          this.player = new Player(res.target, 50, 50, 'You');
          this.player.pos.x = 50;
          this.player.pos.y = canvas.height - this.player.size.y;
       

          this.startUpdate();
        };

        window.addEventListener('resize', () => {
              // canvas.width = window.innerHeight;
              // canvas.height = window.innerHeight - 100;
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
        let vel = 150;
        window.addEventListener('keydown', (e: KeyboardEvent) => {

            if (this.stacked === false || this.isMoving === false) {
                if (e.keyCode === 37) { // && this.direction !== 'right') {
                    this.player.vel.x = -vel;
                    this.player.vel.y = 0;
                    this.player.direction = 'left';
                    this.isMoving = true;
                }
                else if (e.keyCode === 38) { // && this.direction !== 'down') {
                    this.player.vel.x = 0;
                    this.player.vel.y = -vel;
                    this.player.direction = 'up';
                    this.isMoving = true;
                }
                else if (e.keyCode === 39) { // && this.direction !== 'left') {
                    this.player.vel.x = vel;
                    this.player.vel.y = 0;
                    this.player.direction = 'right';
                    this.isMoving = true;
                }
                else if (e.keyCode === 40) {// && this.direction !== 'up') {
                    this.player.vel.x = 0;
                    this.player.vel.y = vel;
                    this.player.direction = 'down';
                    this.isMoving = true;
                }

                if (e.keyCode === 32) {
                    this.fire();
                }
            }
        }, false);

        // window.addEventListener('keypress', (e: KeyboardEvent) => {
        //     this.isMoving = true;
        // });

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            this.isMoving = false;
            this.stacked = false;
        }, false);
    }

    fire() {
        let bullet = new Bullet(4, 4);
        if(this.player.direction === 'left') {
            bullet.pos.x = this.player.pos.x;
            bullet.pos.y = this.player.pos.y + this.player.size.y/2 - 2;

            bullet.vel.y = 0;
            bullet.vel.x = -500;
        }  else if(this.player.direction === 'right') { 
            bullet.pos.x = this.player.right;
            bullet.pos.y = this.player.pos.y + this.player.size.y/2 - 2;

            bullet.vel.y = 0;
            bullet.vel.x = 500;
        } else if (this.player.direction === 'down'){
            bullet.pos.x = this.player.pos.x + this.player.size.x/2 - 2;
            bullet.pos.y = this.player.pos.y + this.player.size.y;

            bullet.vel.y = 500;
        } else if (this.player.direction === 'up'){
            bullet.pos.x = this.player.pos.x + this.player.size.x/2 - 2;
            bullet.pos.y = this.player.pos.y;

            bullet.vel.y = -500;
        }
        AudioController.play('tanks/Battle City SFX (6).wav');
        this.bullets.push(bullet);
    }

    draw() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.draw(this.context);

        this.bullets = this.bullets.filter(r=> !r.markForDeletion);
        this.bullets.forEach(bullet => bullet.draw(this.context));

        this.bricks = this.bricks.filter(r=> !r.markForDeletion);
        this.bricks.forEach(brick=> brick.draw(this.context));
    }

    collider() {
        // this.bricks.forEach(brick=> brick.collision(this.player, this));
        this.bullets.forEach(bullet=> bullet.collision(this.player, this));
    }

    update(dt) {
        if (this.isMoving && this.stacked === false) {
            this.player.pos.x += Math.round(this.player.vel.x * dt);
            this.player.pos.y += Math.round(this.player.vel.y * dt);
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