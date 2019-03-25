import './pong.less';

class Vec {
    public x;
    public y;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}


class Rect {
    public pos;
    public size;
    constructor(w, h) {
        this.pos = new Vec;
        this.size = new Vec(w, h);
    }

    get left() {
        return this.pos.x;// - this.size.x / 2;
    }

    get right() {
        return this.pos.x + this.size.x;// / 2;
    }

    get top() {
        return this.pos.y;// - this.size.y / 2;
    }

    get bottom() {
        return this.pos.y + this.size.y;// / 2;
    }
}

class Ball extends Rect {
    public vel;
    constructor() {
        super(10, 10);
        this.vel = new Vec;
    }
}

class Pong {
    private canvas;
    private context;
    private ball;
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        this.ball = new Ball();
        this.ball.size.x = 100;
        this.ball.size.y = 100;
        this.ball.pos.x = 100;
        this.ball.pos.y = 100;
        this.ball.vel.x = 400;
        this.ball.vel.y = 400;


        let lastTime;
        const callback = (ms?: number) => {
            if (lastTime) {
                this.update((ms - lastTime) / 1000);
            }
            lastTime = ms;
            requestAnimationFrame(callback);
        }
        callback();
        window.addEventListener('resize', ()=> {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    update(dt) {
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;

        if (this.ball.left < 0 || this.ball.right > this.canvas.width) {
            this.ball.vel.x = -this.ball.vel.x;
        }

        if (this.ball.top < 0 || this.ball.bottom > this.canvas.height) {
            this.ball.vel.y = -this.ball.vel.y;
        }

        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


        this.context.fillStyle = '#fff';
        this.context.fillRect(this.ball.pos.x, this.ball.pos.y, this.ball.size.x, this.ball.size.y);
    }
}

const canvas = <HTMLCanvasElement>document.getElementById('pong');
const pong = new Pong(canvas);







// callback();
