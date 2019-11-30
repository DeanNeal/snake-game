import './pong.less';

const isMobile = ("ontouchstart" in document.documentElement);

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
    private name: string;
    private _scores: number = 0;
    constructor(width, height, name) {
        super(width, height);
        this.name = name;
    }
    get title() {
        return `${this.name} - ${this._scores}`
    }
    get scores() {
        return this._scores;
    }

    setScores(scores: number) {
        this._scores = scores;
    }

    incScore() {
        this._scores++;
    }
}

class Pong {
    private canvas;
    private context;
    private ball;
    private players: Player[] = [];
    public scoreBoard: HTMLElement;
    public timerBlock: HTMLElement;
    public timerInterval: number;
    readonly startSpeed: number = isMobile ? 200 : 700;
    readonly offset: number = isMobile ? 30 : 50;
    public gameOn = false;
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.players = [
            new Player(isMobile ? 8 : 20, isMobile ? 150 : 200, 'You'),
            new Player(isMobile ? 8 : 20, isMobile ? 150 : 200, 'AI')
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

        // this.reset();
        this.timer();
        this.updateScores();
    }

    resize() {
        this.players[0].pos.x = this.offset;
        this.players[0].pos.y = this.canvas.height / 2 - this.players[0].size.y / 2;
        this.players[1].pos.x = this.canvas.width - this.offset - this.players[1].size.x;
        this.players[1].pos.y = this.canvas.height / 2 - this.players[1].size.y / 2;
    }

    timer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        let start = 0;
        this.timerBlock = document.createElement('div');
        this.timerBlock.classList.add('timer-block');
        document.body.appendChild(this.timerBlock);
        this.timerBlock.innerHTML = '3';
        this.timerInterval = window.setInterval(() => {
            start++;
            if (start < 3) {
                this.timerBlock.innerHTML = '' + (3 - start);
            } else {
                clearInterval(this.timerInterval);
                this.timerBlock.remove();

                this.gameOn = true;

                this.ball = new Ball(isMobile ? 15 : 60, isMobile ? 15 : 60);

                this.ball.pos.x = this.canvas.width / 2 - this.ball.size.x / 2;
                this.ball.pos.y = this.canvas.height / 2 - this.ball.size.y / 2;

                this.ball.vel.x = this.startSpeed * (Math.random() > .5 ? -1 : 1);
                this.ball.vel.y = this.startSpeed * (Math.random() > .5 ? -1 : 1);
            }
        }, 1000);
    }

    updateScores() {
        this.scoreBoard.innerHTML = `
            <div class="score-board__player"> ${this.players[0].title}</div>
            <div class="score-board__player"> ${this.players[1].title}</div>
        `;
    }

    collide(player, ball) {
        if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top) {
            let len = ball.vel.len;
            ball.vel.len = len * (isMobile ? 1.01 : 1.03);

            ball.vel.x = -ball.vel.x;
            ball.vel.y = (Math.random() > .5 ? -1 : 1) * this.startSpeed * Pong.random(0.3, 1.2);


            if (player.name === 'You') {
                var audio = new Audio('audio/' + 'pong-1.mp3');
                audio.volume = 0.2;
                audio.play();
            } else {
                var audio = new Audio('audio/' + 'pong-2.mp3');
                audio.volume = 0.2;
                audio.play();
            }
        }
    }

    static random(min, max): number {
        return (Math.random() * (max - min) + min);
    }

    draw() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.ball) {
            this.drawRect(this.ball);
        }
        this.players.forEach(player => this.drawRect(player));
    }

    drawRect(rect) {
        this.context.fillStyle = '#fff';
        this.context.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
    }

    resetUsers() {
        this.players.forEach(player => player.setScores(0));
    }

    update(dt) {
        if (this.ball && this.gameOn) {
            this.ball.pos.x += this.ball.vel.x * dt;
            this.ball.pos.y += this.ball.vel.y * dt;


            if (this.ball.left < 0 || this.ball.right > this.canvas.width) {
                const playerId = this.ball.vel.x < 0 ? 1 : 0;
                this.gameOn = false;
                this.players[playerId].incScore();
                this.updateScores();

                this.ball.vel.x = 0;
                this.ball.vel.y = 0;

                if (this.players[0].scores >= 2 || this.players[1].scores >= 2) {
                    let msg = this.players[0].scores > this.players[1].scores ? 'Вы победили' : 'Вы проиграли';
                    this.resetUsers();
                    this.updateScores();
                    this.timerBlock.innerHTML = msg;
                    document.body.appendChild(this.timerBlock);
                } else {
                    this.timer();
                }
            }

            if (this.ball.top < 0 || this.ball.bottom > this.canvas.height) {
                this.ball.vel.y = -this.ball.vel.y;
            }


            this.players[1].pos.y = this.ball.pos.y - this.players[1].size.y / 2 + this.ball.size.y / 2;// > .5 ? -1 : 1) ;

            this.players.forEach(player => this.collide(player, this.ball));
        }

        this.draw();
    }
}

const canvas = <HTMLCanvasElement>document.getElementById('pong');


const array = ['audio/' + 'pong-1.mp3', 'audio/' + 'pong-2.mp3'];
let index = 0;
array.forEach(r => {
    var audio = new Audio(r);

    audio.onloadedmetadata = () => {
        index++;
        if (index === array.length) {
            const pong = new Pong(canvas);
        }
    }
});
