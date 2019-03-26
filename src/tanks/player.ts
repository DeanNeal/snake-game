import { Vec } from './vec';
import { Rect } from './rect';

export class Player extends Rect {
    private name: string;
    public vel: Vec;
    public img;
    public canvases = [];
    public ctx;
    public direction: string = 'right';
    public state: string = 'normal';
    public movementVel: number = 100;

    constructor(img, width, height, name) {
        super(width, height);
        this.name = name;
        this.img = img;
        this.vel = new Vec;

        this.canvases = [
            this.leftCanvas(),
            this.rightCanvas(),
            this.upCanvas(),
            this.downCanvas()
        ];
    }

    genCanvas() {
        let canvas = document.createElement('canvas');
        canvas.width = this.size.x;
        canvas.height = this.size.y;
        return canvas;
    }

    drawCanvas(ctx) {
        ctx.drawImage(
            this.img,
            0,
            0,
            this.size.x,
            this.size.y
        );
    }

    leftCanvas() {
        let canvas = this.genCanvas();
        let ctx = canvas.getContext('2d');
        ctx.translate(0, this.size.y);
        ctx.rotate(-90 * Math.PI / 180);
        this.drawCanvas(ctx);
        return canvas;
    }

    rightCanvas() {
        let canvas = this.genCanvas();
        let ctx = canvas.getContext('2d');
        ctx.translate(this.size.x, 0);
        ctx.rotate(90 * Math.PI / 180);
        this.drawCanvas(ctx);
        return canvas;
    }

    upCanvas() {
        let canvas = this.genCanvas();
        let ctx = canvas.getContext('2d');
        ctx.translate(0, 0);
        ctx.rotate(0 * Math.PI / 180);
        this.drawCanvas(ctx);
        return canvas;
    }

    downCanvas() {
        let canvas = this.genCanvas();
        let ctx = canvas.getContext('2d');
        ctx.translate(this.size.x, this.size.y);
        ctx.rotate(180 * Math.PI / 180);
        this.drawCanvas(ctx);
        return canvas;
    }

    draw(ctx) {
        let canvas;

        if (this.direction === 'left') {
            canvas = this.canvases[0];
        }
        if (this.direction === 'right') {
            canvas = this.canvases[1];
        }
        if (this.direction === 'up') {
            canvas = this.canvases[2];
        }
        if (this.direction === 'down') {
            canvas = this.canvases[3];
        }

        ctx.drawImage(
            canvas,
            this.pos.x,
            this.pos.y,
            this.size.x,
            this.size.y
        );
    }
}
