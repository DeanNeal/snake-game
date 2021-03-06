import { Rect } from "./rect";
import { Vec } from "./vec";
import { BULLET_SPEED } from "./global";
import AudioController from './audio';
import { Bullet } from "./bullet";
import { GrassTile, IceTile, WaterTile, Tile, BrickTile } from "./tile";
import { Player } from "./player";
import { Game } from "./game";

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
    public canvases: HTMLCanvasElement[] = [];
    public isMoving: boolean = false;
    public isShoting: boolean = false;
    public moveParams: ICanvasProps[] = [];
    protected type: string = 'bot';
    private surfaceMoveFactor: number = 1;
    protected modMoveFactor: number = 1;
    protected bulletSpeedFactor: number = 1;
    protected state: string = 'normal';


    constructor(img: HTMLImageElement, w: number, h: number) {
        super(w, h);
        this.img = img;
        this.vel = new Vec;
        this.moveParams = [
            { deg: -90, translate: { x: 0, y: this.size.y } },
            { deg: 90, translate: { x: this.size.x, y: 0 } },
            { deg: 0, translate: { x: 0, y: 0 } },
            { deg: 180, translate: { x: this.size.x, y: this.size.y } }
        ];
        this.updateCanvases();
    }

    updateCanvases() {
        this.canvases = [];
        this.moveParams.forEach((r: ICanvasProps) => {
            this.canvases.push(this.genCanvas(r));
        })
    }

    updateState() {

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

    draw(ctx: CanvasRenderingContext2D) {
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

    intersection(obstacles, subject, fn: (tile: Tile) => void) {
        this.surfaceMoveFactor = 1;
        obstacles
            .filter(obstacle => obstacle.overlap(subject, obstacle)).forEach((tile) => {
                if (tile instanceof IceTile) {
                    this.surfaceMoveFactor = 1.4;
                } else if (tile instanceof GrassTile) {
                    this.surfaceMoveFactor = 0.6;
                } else {
                    fn(tile);
                }
            });
    }

    calculateObstacles(game) {
        let enemies = game.enemies.filter(r => Object.is(r, this) === false);
        return [...game.tiles, ...enemies];
    }

    move(dt: number, game: Game) {
        if (this.isMoving) {
            this.pos.x += Math.round(this.vel.x * dt) * this.surfaceMoveFactor * this.modMoveFactor;
            // var t0 = performance.now();
            let obstacles = this.calculateObstacles(game);
            // var t1 = performance.now();
            // console.log(obstacles);
            // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
            if (Object.is(game.player, this) === false) {
                (obstacles as any).push(game.player);
            }
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

            this.pos.y += Math.round(this.vel.y * dt) * this.surfaceMoveFactor * this.modMoveFactor;

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
            this.bonusCollider(game);
        }
    }

    bonusCollider(game: Game) {
        if (this instanceof Player) {
            game.bonuses.forEach(bonus => {
                if (bonus.bottom > this.top
                    && bonus.top < this.bottom
                    && bonus.right > this.left
                    && bonus.left < this.right) {

                    bonus.markForDeletion = true;
                    AudioController.play('tanks/sounds/bonus.ogg');

                    if (bonus.type === 'star') {
                        if (this.state === 'god' || this.state === 'superb') {
                            this.state = 'god';
                        } else if (this.state === 'improved') {
                            this.state = 'superb';
                        } else {
                            this.state = 'improved';
                        }
                        this.updateState();
                    }

                    if (bonus.type === 'armor') {
                        game.player.activateArmor();
                    }

                    if (bonus.type === 'time') {
                        game.enemies.forEach(r => {
                            r.freezed = true;
                            r.freezeFrames = 0;
                        });
                    }

                    // if (bonus.type === 'granate') {
                    //     game.enemies.forEach(r => r.markForDeletion = true);
                    //     //generate new enemies
                    //     game.generateAvailableBots();
                    // }


                    if (bonus.type === 'life') {
                        game.player.lifes++;
                    }

                }
            })
        }
    }

    wallCollider(game: Game) {
        let offset = Object.is(this, game.player) ? 0 : 1;

        if (this.top <= 0) {
            this.vel.y = 0;
            this.pos.y = offset;
            this.onCollision();
        } if (this.bottom > game.canvas.height) {
            this.vel.y = 0;
            this.pos.y = game.canvas.height - this.size.y - offset;
            this.onCollision();
        }
        if (this.left <= 0) {
            this.vel.x = 0;
            this.pos.x = offset;
            this.onCollision();
        } else if (this.right >= game.canvas.width) {
            this.vel.x = 0;
            this.pos.x = game.canvas.width - this.size.x - offset;
            this.onCollision();
        }
    }

    onCollision() {

    }

    fire(game: Game) {
        let bullet = new Bullet(this.type, 6, 6);

        switch (this.direction) {
            case 'left':
                bullet.pos.x = this.left;
                bullet.pos.y = this.pos.y + this.size.y / 2 - bullet.size.x / 2;

                bullet.vel.y = 0;
                bullet.vel.x = -(BULLET_SPEED * this.bulletSpeedFactor);
                break;

            case 'right':
                bullet.pos.x = this.right;
                bullet.pos.y = this.pos.y + this.size.y / 2 - bullet.size.x / 2;

                bullet.vel.y = 0;
                bullet.vel.x = (BULLET_SPEED * this.bulletSpeedFactor);
                break;

            case 'down':
                bullet.pos.x = this.pos.x + this.size.x / 2 - bullet.size.y / 2;
                bullet.pos.y = this.pos.y + this.size.y;

                bullet.vel.y = (BULLET_SPEED * this.bulletSpeedFactor);
                break;

            case 'up':
                bullet.pos.x = this.pos.x + this.size.x / 2 - bullet.size.y / 2;
                bullet.pos.y = this.pos.y;

                bullet.vel.y = -(BULLET_SPEED * this.bulletSpeedFactor);
                break;
        }

        AudioController.play('tanks/sounds/fire.ogg');
        game.bullets.push(bullet);
    }
}