import { Rect } from "./rect";
import { Vec } from "./vec";
import { BULLET_SPEED } from "./global";
import AudioController from './audio';
import { Bullet } from "./bullet";
import { Grass } from "./tile";

interface ICanvasProps {
    deg: number;
    translate: {
        x: number;
        y: number;
    }
}

export abstract class Tank extends Rect {
    public vel: Vec;
    public direction: string = 'right';
    public img: HTMLImageElement;
    private state: string = 'normal';
    public canvases: HTMLCanvasElement[] = [];
    public isMoving = false;
    public isShoting = false;
    public moveParams = [];
    protected type = 'bot';

    constructor(img, w, h) {
        super(w, h);
        this.img = img;
        this.vel = new Vec;
        this.moveParams = [
            { deg: -90, translate: { x: 0, y: this.size.y } },
            { deg: 90, translate: { x: this.size.x, y: 0 } },
            { deg: 0, translate: { x: 0, y: 0 } },
            { deg: 180, translate: { x: this.size.x, y: this.size.y } }
        ];
        this.moveParams.forEach((r: ICanvasProps) => {
            this.canvases.push(this.genCanvas(r));
        })
    }

    setStateNormal() {
        this.state = 'normal';
    }

    setStateImproved() {
        this.state = 'improved';
    }

    setStateSuperb() {
        this.state = 'superb';
    }

    get bulletSpeed() {
        let factor = 1;
        switch (this.state) {
            case 'normal':
                factor = 1; break;
            case 'improved':
                factor = 1.5; break;
            case 'superb':
                factor = 2; break;
        }

        return BULLET_SPEED * factor;
    }

    genCanvas(r: ICanvasProps): HTMLCanvasElement {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = this.size.x;
        canvas.height = this.size.y;
        ctx.translate(r.translate.x, r.translate.y);
        ctx.rotate(r.deg * Math.PI / 180);
        ctx.drawImage(
            this.img,
            0,
            0,
            this.size.x,
            this.size.y
        );
        return canvas;
    }

    draw(ctx) {
        let canvas;
        switch (this.direction) {
            case 'left': canvas = this.canvases[0]; break;
            case 'right': canvas = this.canvases[1]; break;
            case 'up': canvas = this.canvases[2]; break;
            case 'down': canvas = this.canvases[3]; break;
        }
        ctx.drawImage(
            canvas,
            this.pos.x,
            this.pos.y,
            this.size.x,
            this.size.y
        );
    }

    intersection(obstacles, subject, fn) {
        obstacles
            .filter(obstacle => {
                return obstacle instanceof Grass === false; // exclude grass from detection
            })
            .filter(obstacle => obstacle.overlap(subject, obstacle)).forEach(fn);
    }

    move(dt, obstacles, game) {
        if (this.isMoving) {
            this.pos.x += Math.round(this.vel.x * dt);

            if (this.vel.x > 0) {
                this.intersection(obstacles, this, rect => {
                    if (this.right > rect.left) {
                        this.pos.x = rect.left - this.size.x;
                        this.onCollision();
                    }
                });
            } else if (this.vel.x < 0) {
                this.intersection(obstacles, this, rect => {
                    if (this.left < rect.right) {
                        this.pos.x = rect.right;
                        this.onCollision();
                    }
                });
            }

            this.pos.y += Math.round(this.vel.y * dt);

            if (this.vel.y > 0) {
                this.intersection(obstacles, this, rect => {
                    if (this.bottom > rect.top) {
                        this.pos.y = rect.top - this.size.y;
                        this.onCollision();
                    }
                });
            } else if (this.vel.y < 0) {
                this.intersection(obstacles, this, rect => {
                    if (this.top < rect.bottom) {
                        this.pos.y = rect.bottom;
                        this.onCollision();
                    }
                });
            }

            this.wallCollider(game);
        }
    }

    wallCollider(game) {
        if (this.top <= 0) {
            this.vel.y = 0;
            this.pos.y = 0;
            this.onCollision();
        } if (this.bottom > game.canvas.height) {
            this.vel.y = 0;
            this.pos.y = game.canvas.height - this.size.y;
            this.onCollision();
        }
        if (this.left <= 0) {
            this.vel.x = 0;
            this.pos.x = 0;
            this.onCollision();
        } else if (this.right >= game.canvas.width) {
            this.vel.x = 0;
            this.pos.x = game.canvas.width - this.size.x;
            this.onCollision();
        }
    }

    onCollision() {

    }

    fire(game) {
        let bullet = new Bullet(this.type, 4, 4);
        if (this.direction === 'left') {
            bullet.pos.x = this.pos.x;
            bullet.pos.y = this.pos.y + this.size.y / 2 - 2;

            bullet.vel.y = 0;
            bullet.vel.x = -this.bulletSpeed;
        } else if (this.direction === 'right') {
            bullet.pos.x = this.right;
            bullet.pos.y = this.pos.y + this.size.y / 2 - 2;

            bullet.vel.y = 0;
            bullet.vel.x = this.bulletSpeed;
        } else if (this.direction === 'down') {
            bullet.pos.x = this.pos.x + this.size.x / 2 - 2;
            bullet.pos.y = this.pos.y + this.size.y;

            bullet.vel.y = this.bulletSpeed;
        } else if (this.direction === 'up') {
            bullet.pos.x = this.pos.x + this.size.x / 2 - 2;
            bullet.pos.y = this.pos.y;

            bullet.vel.y = -this.bulletSpeed;
        }

        AudioController.play('tanks/sounds/fire.ogg');
        game.bullets.push(bullet);
    }
}