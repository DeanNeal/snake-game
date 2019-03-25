import './pong.less';

class Vec {
    public x;
    public y;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    get len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set len(value) {
        const fact = value / this.len;
        this.x *= fact;
        this.y *= fact;
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
}

class Player extends Rect {
    private name;
    private scores: number = 0;
    constructor(width, height, name) {
        super(width, height);
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
    readonly startSpeed: number = this.isMobile ? 300 : 700;
    readonly offset: number = this.isMobile ? 30 : 50;
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ball = new Ball(this.isMobile ? 20 : 60, this.isMobile ? 20 : 60);

        this.players = [
            new Player(this.isMobile ? 8 : 20, this.isMobile ? 150 : 200, 'You'),
            new Player(this.isMobile ? 8 : 20, this.isMobile ? 150 : 200, 'AI')
        ];

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

        this.canvas.addEventListener('touchmove', (e) => {
            if (e.touches[0].pageY <= this.canvas.height - this.players[0].size.y) {
                this.players[0].pos.y = e.touches[0].pageY;
            } else {
                this.players[0].pos.y = canvas.height - this.players[0].size.y;
            }
        }, false);

        this.scoreBoard = document.createElement('div');
        this.scoreBoard.classList.add('score-board');
        document.body.appendChild(this.scoreBoard);

        this.reset();
    }

    get isMobile() {
        return ("ontouchstart" in document.documentElement);
    }

    resize() {
        this.players[0].pos.x = this.offset;
        this.players[0].pos.y = this.canvas.height / 2 - this.players[0].size.y / 2;
        this.players[1].pos.x = this.canvas.width - this.offset;
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
            let len = ball.vel.len;
            ball.vel.x = -ball.vel.x;
            // if (ball.vel.y > 0 && Math.abs(player.top - ball.bottom) < player.size.y / 2) {
            //     ball.vel.y = -ball.vel.y * ;//this.startSpeed * (Math.random() - .5);
            // } else if (ball.vel.y < 0 && Math.abs(player.top - ball.bottom) > player.size.y / 2) {
            //     ball.vel.y = -ball.vel.y;//-this.startSpeed * (Math.random() - .5);
            // }
            ball.vel.y = (Math.random() > .5 ? -1 : 1) * this.startSpeed * Pong.random(0.3, 1.2);
            console.log(ball.vel.y, Pong.random(0.3, 1.2));
            ball.vel.len = len * (this.isMobile ? 1.01 : 1.03);
        }
    }

    static random(min, max): number {
        // return Math.round(Math.random() * (max - min) + min);
        return (Math.random() * (max - min) + min);
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

    reset() {
        this.ball.vel.x = 0;
        this.ball.vel.y = 0;
        this.ball.pos.x = canvas.width / 2 - this.ball.size.x / 2;
        this.ball.pos.y = canvas.height / 2 - this.ball.size.y / 2;

        setTimeout(() => {
            this.ball.vel.x = this.startSpeed * (Math.random() > .5 ? -1 : 1);
            this.ball.vel.y = this.startSpeed * (Math.random() > .5 ? -1 : 1);
        }, 1000);

        this.updateScores();
    }

    update(dt) {
        // console.log(this.ball.vel);
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;

        this.players.forEach(player => this.collide(player, this.ball));

        if (this.ball.left < 0 || this.ball.right > this.canvas.width) {
            const playerId = this.ball.vel.x < 0 ? 1 : 0;
            this.players[playerId].incScore();debugger
            this.reset();
        }

        if (this.ball.top < 0 || this.ball.bottom > this.canvas.height) {
            this.ball.vel.y = -this.ball.vel.y;
        }
        // console.log(dt)
        this.players[1].pos.y = this.ball.pos.y;// > .5 ? -1 : 1) ;



        this.draw();
    }
}

const canvas = <HTMLCanvasElement>document.getElementById('pong');
const pong = new Pong(canvas);







// callback();
