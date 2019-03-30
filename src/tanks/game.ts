import './tanks.less';
import { Tile, GrassTile } from './tile';
import { Bullet } from './bullet';
import { Player } from './player';
import AudioController from './audio';
import { Level } from './levels';
import { Eagle } from './eagle';
import { Bot } from './bot';

import { WINDOW_SIZE, TILE_SIZE, BULLET_SPEED } from './global';
import { Bonus } from './bonus';

const isMobile = ("ontouchstart" in document.documentElement);

interface ILevel {
    // id: number;
    scores: number;
    maxScores: number;
    startWithBots: number;
}
interface IState {
    activeLevel: number;
    levels: ILevel[]
}

class State {
    public activeLevel = 0;
    public levels = [{
        scores: 0,
        maxScores: 10,
        startWithBots: 2
    }, {
        scores: 0,
        maxScores: 12,
        startWithBots: 3
    }, {
        scores: 0,
        maxScores: 15,
        startWithBots: 3
    }];
}

export class Game {
    private canvas: HTMLCanvasElement;
    private context;
    private level: Level;
    private player: Player;
    private enemies: Bot[] = [];

    private bullets: Bullet[] = [];
    private tiles: Tile[] = [];
    private bonuses: Bonus[] = [];
    private eagle: Eagle;

    public markForNextLevel: boolean = false;
    public markForGameOver: boolean = false;

    public state: IState = new State();
    private paused: boolean = false;

    private gameCallback;
    private gameTimeouts: number[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.width = WINDOW_SIZE;
        canvas.height = WINDOW_SIZE;

        this.loadLevel();

        document.body.querySelectorAll('.nav-level li').forEach(el => {
            el.addEventListener('click', (e: any) => {
                let level = e.currentTarget.getAttribute('data-id');
                level = parseInt(level);
                this.cleanScene();
                this.state = new State();
                this.state.activeLevel = level;
                this.loadLevel();
            });
        })

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 80) {
                this.pause();
            }
        });
    }

    pause() {
        this.paused = !this.paused;
        if (this.paused === false) {
            this.startUpdate();
        } else {
            this.update(null);
            this.context.fillStyle = "#000";
            this.context.fillStyle = "rgba(0, 0, 0, 0.8)";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.context.fillStyle = "blue";
            this.context.font = `bold ${WINDOW_SIZE / 20}px Arial`;
            this.context.fillText('Pause', this.canvas.width / 2 - TILE_SIZE, this.canvas.height / 2);
        }
    }

    get currentLevel() {
        return this.state.levels[this.state.activeLevel];
    }

    async loadLevel() {
        this.level = new Level();

        this.tiles = await this.level.build(this.state.activeLevel);

        if (this.tiles) {
            let images = await Level.loadImages(['img/tanks/tank.png', 'img/tanks/eagle.png']);

            this.player = new Player(images[0]);
            this.eagle = new Eagle(images[1]);

            for (let i = 1; i <= this.currentLevel.startWithBots; i++) {
                let timeout = setTimeout(() => {
                    this.addNewBot();
                }, i * 2000);
                this.gameTimeouts.push(timeout);
            }

            this.player.addEventListeners();

            this.startUpdate();
        } else {
            this.context.fillStyle = "blue  ";
            this.context.font = `bold ${WINDOW_SIZE / 20}px Arial`;
            this.context.fillText('YOU WIN', (this.canvas.width / 2) - 100, (this.canvas.height / 2));
        }

    }

    cleanScene(): void {
        this.gameCallback = () => { };
        this.gameTimeouts.forEach(timeout => clearTimeout(timeout));

        this.bullets = [];
        this.enemies = [];
        this.tiles = [];
        this.bonuses = [];

        this.markForNextLevel = false;
        this.markForGameOver = false;
        this.context.fillStyle = '#000';

        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    nextLevel(): void {
        this.cleanScene();
        this.state.activeLevel++;
        this.loadLevel();
    }

    restart(): void {
        this.cleanScene();
        this.state = new State();

        this.context.fillStyle = "red";
        this.context.font = `bold ${WINDOW_SIZE / 20}px Arial`;
        this.context.fillText('GAME OVER', (this.canvas.width / 2) - 140, (this.canvas.height / 2));
        // this.gameTimeouts.push(setTimeout(() => {
        //     this.loadLevel();
        // }, 2000));
    }

    async addNewBot() {
        let images = await Level.loadImages(['img/tanks/bot-simple.png', 'img/tanks/bot-fast.png', 'img/tanks/bot-heavy.png', 'img/tanks/bot-armored.png']);
        const mod = Bot.generateMod();
        const bonus = Bot.generateBonus();
        let img;
        if (mod === 'simple') {
            img = images[0];
        }
        if (mod === 'fast') {
            img = images[1];
        }
        if (mod === 'heavy') {
            img = images[2];
        }
        if (mod === 'armored') {
            img = images[3];
        }
        this.enemies.push(new Bot(img, mod, bonus));
    }

    async addNewBonus(bonus, x1, y1, x2, y2) {
        let images = await Level.loadImages(['img/tanks/clock.png', 'img/tanks/armor.png', 'img/tanks/star.png', 'img/tanks/life.png', 'img/tanks/granate.png']);
        let img;
        if (bonus === 'clock') {
            img = images[0];
        }
        if (bonus === 'armor') {
            img = images[1];
        }
        if (bonus === 'star') {
            img = images[2];
        }
        if (bonus === 'life') {
            img = images[3];
        }
        if (bonus === 'granate') {
            img = images[4];
        }

        let item = this.level.matrix.searchByRange(x1, y1, x2, y2);
        // debugger
        console.log(item);
        this.bonuses.push(new Bonus(img, bonus, item[0], item[1]));
    }

    startUpdate(): void {
        let lastTime;
        this.gameCallback = (ms?: number) => {
            if (this.paused === false) {
                if (lastTime) {
                    this.update((ms - lastTime) / 1000);
                }
                lastTime = ms;
                requestAnimationFrame(this.gameCallback);
            }

        }
        this.gameCallback();
    }

    draw(): void {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


        this.tiles = this.tiles.filter(r => !r.markForDeletion);
        this.tiles.filter(r => r instanceof GrassTile === false).forEach(brick => brick.draw(this.context));

        this.bullets = this.bullets.filter(r => !r.markForDeletion);
        this.bullets.forEach(bullet => bullet.draw(this.context));

        this.enemies = this.enemies.filter(r => !r.markForDeletion);
        this.enemies.forEach(enemy => enemy.draw(this.context));

        this.bonuses = this.bonuses.filter(r => !r.markForDeletion);
        this.bonuses.forEach(bonus => bonus.draw(this.context));

        this.player.draw(this.context);

        this.tiles.filter(r => r instanceof GrassTile === true).forEach(brick => brick.draw(this.context));

        this.eagle.draw(this.context);
    }

    drawScores() {
        this.context.fillStyle = "blue";
        this.context.font = `bold ${WINDOW_SIZE / 42}px Arial`;
        this.context.fillText('Destroyed - ' + this.currentLevel.scores, (this.canvas.width) - WINDOW_SIZE / 6, (this.canvas.height) - WINDOW_SIZE / 50);

        this.context.fillStyle = "blue";
        this.context.font = `bold ${WINDOW_SIZE / 42}px Arial`;
        this.context.fillText('Level - ' + (this.state.activeLevel + 1), (this.canvas.width) - WINDOW_SIZE / 6, (this.canvas.height) - WINDOW_SIZE / 20);

        this.context.fillStyle = "blue";
        this.context.font = `bold ${WINDOW_SIZE / 42}px Arial`;
        this.context.fillText('Lifes - ' + this.player.lives, (this.canvas.width) - WINDOW_SIZE / 6, (this.canvas.height) - WINDOW_SIZE / 12.5);
    }

    collider(): void {
        this.bullets.forEach(bullet => bullet.collision(this.player, this));
    }

    update(dt): void {
        this.player.update(dt, this.tiles, this);
        this.enemies.forEach(enemy => enemy.update(dt, this.tiles, this));
        this.bonuses.forEach(bonus => bonus.update(dt));


        this.context.globalAlpha = 1;
        if (dt) {
            this.bullets.forEach(bullet => {
                bullet.pos.x += bullet.vel.x * dt;
                bullet.pos.y += bullet.vel.y * dt;
            });

            this.collider();

            this.draw();
            this.drawScores();

            if (this.markForNextLevel) {
                this.nextLevel();
            }

            if (this.markForGameOver) {
                this.restart();
            }
        }

    }

}
const canvas = <HTMLCanvasElement>document.getElementById('tanks');
new Game(canvas);

//TODO
//MOVE SOUND
//BONUSES
