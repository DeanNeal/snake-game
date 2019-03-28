import { Vec } from './vec';
import { Rect } from './rect';
import { WINDOW_SIZE } from './global';

interface ICanvasProps {
    deg: number;
    translate: {
        x: number;
        y: number;
    }
}
export class Player extends Rect {
    public vel: Vec;
    public img: HTMLImageElement;
    public canvases: HTMLCanvasElement[] = [];
    public ctx: HTMLCanvasElement;
    public direction: string = 'right';
    // public canMove = {
    //     left: true,
    //     right: true,
    //     up: true,
    //     down: true
    // };
    // public stacked;
    public state: string = 'normal';
    public movementVel: number = WINDOW_SIZE / 7;

    constructor(img, width, height) {
        super(width, height);
        this.img = img;
        this.vel = new Vec;
        [
            { deg: -90, translate: { x: 0, y: this.size.y } },
            { deg: 90, translate: { x: this.size.x, y: 0 } },
            { deg: 0, translate: { x: 0, y: 0 } },
            { deg: 180, translate: { x: this.size.x, y: this.size.y } }
        ].forEach((r: ICanvasProps) => {
            this.canvases.push(this.genCanvas(r));
        })
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
        obstacles.filter(obstacle => obstacle.overlap(subject, obstacle)).forEach(fn);
    }

    move(dt, obstacles) {
        this.pos.x += Math.round(this.vel.x * dt);

        if (this.vel.x > 0) {
            this.intersection(obstacles, this, rect => {
                if (this.right > rect.left) {
                    this.pos.x = rect.left - this.size.x;
                }
            });
        } else if (this.vel.x < 0) {
            this.intersection(obstacles, this, rect => {
                if (this.left < rect.right) {
                    this.pos.x = rect.right;
                }
            });
        }

        this.pos.y += Math.round(this.vel.y * dt);

        if (this.vel.y > 0) {
            this.intersection(obstacles, this, rect => {
                if (this.bottom > rect.top) {
                    this.pos.y = rect.top - this.size.y;
                }
            });
        } else if (this.vel.y < 0) {
            this.intersection(obstacles, this, rect => {
                if (this.top < rect.bottom) {
                    this.pos.y = rect.bottom;
                }
            });
        }
    }
}
