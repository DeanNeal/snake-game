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
    constructor(width, height) {
        super(width, height);
        this.vel = new Vec;
    }

    start() {
        this.vel.x = 700;
        this.vel.y = 700;
    }

    reset(width, height) {
        this.vel.x = 0;
        this.vel.y = 0;
        this.pos.x = width / 2 - this.size.x / 2;
        this.pos.y = height / 2 - this.size.y / 2;

        setTimeout(() => {
            this.start();
        }, 1000);
    }
}

class Player extends Rect {
    private name;
    private scores: number = 0;
    constructor(name) {
        super(20, 200);
        this.name = name;
    }
    get getScores() {
        return `${this.name} - ${this.scores}`
    }
    incScore() {
        this.scores++;
    }
}

class Pong {
    private canvas;
    private context;
    private ball;
    private players: Player[] = [];
    public scoreBoard: HTMLElement;
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ball = new Ball(100, 100);
        this.ball.reset(this.canvas.width, this.canvas.height);

        this.players = [new Player('You'), new Player('Bot')];

        this.resize();

        let lastTime;
        const callback = (ms?: number) => {
            if (lastTime) {
                this.update((ms - lastTime) / 1000);
            }
            lastTime = ms;
            requestAnimationFrame(callback);
        }
        callback();
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.resize();
        });
        this.canvas.addEventListener('mousemove', (e) => {
            if (e.offsetY <= this.canvas.height - this.players[0].size.y) {
                this.players[0].pos.y = e.offsetY;
            } else {
                this.players[0].pos.y = canvas.height - this.players[0].size.y;
            }
        }, false);

        this.scoreBoard = document.createElement('div');
        this.scoreBoard.classList.add('score-board');
        document.body.appendChild(this.scoreBoard);
        this.updateScores();
    }

    resize() {
        this.players[0].pos.x = 40;
        this.players[0].pos.y = this.canvas.height / 2 - this.players[0].size.y / 2;
        this.players[1].pos.x = this.canvas.width - 40;
        this.players[1].pos.y = this.canvas.height / 2 - this.players[1].size.y / 2;
    }

    updateScores() {
        this.scoreBoard.innerHTML = `
            <div class="score-board__player"> ${this.players[0].getScores}</div>
            <div class="score-board__player"> ${this.players[1].getScores}</div>
        `;
    }

    collide(player, ball) {
        if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top) {
            ball.vel.x = -ball.vel.x;
        }
    }

    draw() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawRect(this.ball);
        this.players.forEach(player => this.drawRect(player));
    }

    drawRect(rect) {
        this.context.fillStyle = '#fff';
        this.context.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
    }

    update(dt) {
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;

        if (this.ball.left < 0 || this.ball.right > this.canvas.width) {
            const playerId = this.ball.vel.x < 0 ? 1 : 0;
            this.players[playerId].incScore();
            this.ball.reset(this.canvas.width, this.canvas.height);
            this.updateScores();
        }

        if (this.ball.top < 0 || this.ball.bottom > this.canvas.height) {
            this.ball.vel.y = -this.ball.vel.y;
        }

        this.players[1].pos.y = this.ball.pos.y;

        this.players.forEach(player => this.collide(player, this.ball));

        this.draw();
    }
}

const canvas = <HTMLCanvasElement>document.getElementById('pong');
const pong = new Pong(canvas);







// callback();
