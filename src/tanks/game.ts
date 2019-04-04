import './tanks.less';
import { Tile, GrassTile } from './tile';
import { Bullet } from './bullet';
import { Player } from './player';
import AudioController from './audio';
import { Level } from './levels';
// import { Eagle } from './eagle';
import { Bot } from './bot';

import { WINDOW_SIZE, TILE_SIZE } from './global';
import { Bonus } from './bonus';
import { Explosion } from './explosion';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// const isMobile = ("ontouchstart" in document.documentElement);

interface ILevel {
    // id: number;
    scores: number;
    maxScores: number;
    startWithBots: number;
}
interface IState {
    pause: boolean;
    markForNextLevel: boolean;
    markForGameOver: boolean;
    activeLevel: number;
    levels: ILevel[]
}

class State {
    public pause: boolean = false;
    public markForNextLevel: boolean = false;
    public markForGameOver: boolean = false;
    public activeLevel: number = 0;
    public levels = [{
        scores: 0,
        maxScores: 10,
        startWithBots: 4
    }, {
        scores: 0,
        maxScores: 12,
        startWithBots: 4
    }, {
        scores: 0,
        maxScores: 15,
        startWithBots: 4
    }];
}
export class Game {
    public canvas: HTMLCanvasElement;
    private context;
    private sidebar: HTMLCanvasElement = document.createElement('canvas');
    private sidebarContext;
    private sidebarImages = [];
    private level: Level;
    public player: Player;

    public enemies: Bot[] = [];
    public bullets: Bullet[] = [];
    public tiles: Tile[] = [];
    public bonuses: Bonus[] = [];
    public explosions: Explosion[] = [];

    public state: IState = new State();

    private gameCallback: () => void;
    public gameFrames = 0;

    get currentLevel() {
        return this.state.levels[this.state.activeLevel];
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.width = WINDOW_SIZE;
        canvas.height = WINDOW_SIZE;

        // AudioController.play('tanks/sounds/gameover.ogg');
        Level.loadImages(['tank.png', 'bot-simple.png', 'flag.png']).then(images => {
            this.sidebarImages = images;
        });


        $$('.nav-level li').forEach(el => {
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
            if (e.keyCode === 80 && this.state.markForGameOver === false) {
                this.pause();
            }
        });

        this.sidebarContext = this.sidebar.getContext('2d');
        this.sidebar.width = 150;
        this.sidebar.height = WINDOW_SIZE;
        $('.container').appendChild(this.sidebar);

        this.init();

    }

    async init() {
        await this.loadLevel();
        await this.addPlayer();
        this.startUpdate();
    }

    async addPlayer() {
        let images = await Level.loadImages(['tank.png', 'tank_improved.png', 'tank_superb.png', 'tank_god.png']);

        this.player = new Player(images);
        this.player.addEventListeners();
    }

    async loadLevel() {
        this.level = new Level();

        this.tiles = await this.level.build(this.state.activeLevel);

        if (!this.tiles) {
            // AudioController.play('tanks/sounds/gamestart.ogg');
            this.context.fillStyle = "blue  ";
            this.context.font = `bold ${WINDOW_SIZE / 20}px Arial`;
            this.context.fillText('YOU WIN', (this.canvas.width / 2) - 100, (this.canvas.height / 2));
        }
    }

    async drawExplosion(x, y) {
        let img = await Level.loadImg('explosion.png');
        this.explosions.push(new Explosion(img, x, y));
    }

    pause() {
        this.state.pause = !this.state.pause;
        if (this.state.pause === false) {
            this.startUpdate();
        } else {
            this.update(null);
            this.context.fillStyle = "#000";
            this.context.fillStyle = "rgba(0, 0, 0, 0.8)";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.context.fillStyle = "white";
            this.context.font = `bold ${WINDOW_SIZE / 20}px Arial`;
            this.context.fillText('PAUSE', this.canvas.width / 2 - TILE_SIZE * 1.2, this.canvas.height / 2);
        }
    }

    cleanScene(): void {
        this.gameFrames = 0;
        this.bullets = [];
        this.enemies = [];
        this.tiles = [];
        this.bonuses = [];
        this.explosions = [];

        this.state.markForNextLevel = false;

        this.player.positionReset();
        this.player.enable();
    }

    nextLevel(): void {
        this.cleanScene();
        this.state.activeLevel++;
        this.loadLevel();
    }

    restart(): void {
        this.player.disable();

        this.context.fillStyle = "rgba(0, 0, 0, 0.8)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "red";
        this.context.font = `bold ${WINDOW_SIZE / 20}px Arial`;
        this.context.fillText('GAME OVER', (this.canvas.width / 2) - 140, (this.canvas.height / 2));
    }

    async addNewBot() {
        const { mod, img } = await Bot.generateMod();
        const bonus = Bot.generateBonus();
        this.enemies.push(new Bot(img, mod, bonus));
    }

    async addNewBonus(bonus, x1, y1, x2, y2) {
        const img = await Bot.getBonusImage(bonus);
        let item = this.level.matrix.searchByRange(x1, y1, x2, y2);
        this.bonuses.push(new Bonus(img, bonus, item[0], item[1]));
    }

    startUpdate(): void {
        let lastTime;
        this.gameCallback = (ms?: number) => {
            if (this.state.pause === false) {
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

        this.explosions.forEach(exp => exp.draw(this.context, this));
    }

    drawScores() {
        if (this.sidebarImages.length) {
            this.sidebarContext.clearRect(0, 0, 150, WINDOW_SIZE);
            this.sidebarContext.fillStyle = "black";
            this.sidebarContext.font = `normal ${WINDOW_SIZE / 42}px Arial`;
            this.sidebarContext.fillText((this.currentLevel.maxScores - this.currentLevel.scores), 60, 30);

            this.sidebarContext.fillStyle = "black";
            this.sidebarContext.font = `normal ${WINDOW_SIZE / 42}px Arial`;
            this.sidebarContext.fillText(this.player.lifes, 60, WINDOW_SIZE / 2 + 80);

            this.sidebarContext.fillStyle = "black";
            this.sidebarContext.font = `normal ${WINDOW_SIZE / 42}px Arial`;
            this.sidebarContext.fillText('Lvl ' + (this.state.activeLevel + 1), 50, WINDOW_SIZE - 20);

            this.sidebarContext.drawImage(
                this.sidebarImages[1],
                10,
                0,
                40,
                40,
            );


            this.sidebarContext.drawImage(
                this.sidebarImages[0],
                10,
                WINDOW_SIZE / 2 + 50,
                40,
                40,
            );


            this.sidebarContext.drawImage(
                this.sidebarImages[2],
                10,
                WINDOW_SIZE - 50,
                40,
                40,
            );
        }
    }

    collider(): void {
        this.bullets.forEach(bullet => bullet.collision(this.player, this));
    }

    update(dt): void {
        this.gameFrames++;

        if (this.gameFrames % 100 === 0 && this.enemies.length < this.currentLevel.startWithBots) {
            if (this.currentLevel.maxScores >= this.currentLevel.scores + this.currentLevel.startWithBots) {
                this.addNewBot();
            }
        }

        this.player.update(dt, this);
        this.enemies.forEach(enemy => enemy.update(dt, this));
        this.bonuses.forEach(bonus => bonus.update(dt));


        this.context.globalAlpha = 1;

        //TODO ADD DRAW method
        this.bullets.forEach(bullet => {
            bullet.pos.x += bullet.vel.x * dt;
            bullet.pos.y += bullet.vel.y * dt;
        });

        this.collider();

        this.draw();
        this.drawScores();


        if (this.state.markForNextLevel) {
            this.nextLevel();
        }

        if (this.state.markForGameOver) {
            this.restart();
        }

    }

}
const canvas = <HTMLCanvasElement>document.getElementById('tanks');
new Game(canvas);