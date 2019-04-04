import { Vec } from './vec';
import { Rect } from './rect';
import AudioController from './audio';
import { BrickTile, СoncreteTile, EagleTile } from './tile';
import { Player } from './player';
import { Game } from './game';

export class Bullet extends Rect {
    public vel: Vec;
    public markForDeletion: boolean = false;
    public source: string;
    constructor(source, width, height) {
        super(width, height);
        this.vel = new Vec;
        this.source = source;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    overlap(object) {
        return object.top <= this.bottom &&
            object.left <= this.right &&
            object.right >= this.left &&
            object.bottom >= this.top
    }

    collision(player: Player, game: Game) {
        //with bullets
        game.bullets.forEach(bullet => {
            if (Object.is(bullet, this) === false && this.overlap(bullet)) {
                this.markForDeletion = true;
                bullet.markForDeletion = true;
            }
        });

        //with bricks
        game.tiles.forEach(tile => {
            if (tile.collideWithBullet) {
                if (this.overlap(tile) && game.tiles.filter(r => r.markForDeletion).length === 0) {
                    this.markForDeletion = true;

                    if (tile instanceof BrickTile) {
                        tile.hits++;
                        if (tile.hits >= tile.hitsToDestroy) {
                            tile.markForDeletion = true;
                        }
                        AudioController.play('tanks/brick.wav', 0.4);
                    } else if (tile instanceof СoncreteTile) {
                        AudioController.play('tanks/concrete.wav', 0.4);
                    } else if (tile instanceof EagleTile) {
                        // game.eagle.markForDeletion = true;
                        this.markForDeletion = true;
                        AudioController.play('tanks/eagle.wav', 0.4);
                        // AudioController.play('tanks/sounds/gameover.ogg');
                        game.state.markForGameOver = true;
                    }
                }
            }
        })

        //width borders
        if (this.pos.x <= 0 || this.pos.x >= game.canvas.width || this.pos.y <= 0 || this.pos.y >= game.canvas.height) {
            this.markForDeletion = true;
        }

        //with eagle
        // if (this.overlap(game.eagle)) {
        //     game.eagle.markForDeletion = true;
        //     this.markForDeletion = true;
        //     AudioController.play('tanks/eagle.wav', 0.4);
        //     // AudioController.play('tanks/sounds/gameover.ogg');
        //     game.markForGameOver = true;
        // }

        //with player
        if (this.source === 'bot') {
            if (this.overlap(player)) {
                if (player.armor === false) {
                    this.markForDeletion = true;
                    game.drawExplosion(player.pos.x, player.pos.y);
                    if (player.lifes > 1) {
                        player.markForDeletion = true;
                        AudioController.play('tanks/sounds/explosion.ogg', 0.4);
                    } else {
                        game.state.markForGameOver = true;
                    }
                } else {
                    this.markForDeletion = true;
                }
            }
        }

        //width enemies
        if (this.source === 'player') {
            game.enemies.forEach(enemy => {
                if (this.overlap(enemy)) {
                    this.markForDeletion = true;
                    enemy.hits++;

                    if (enemy.hitsToDestroy > enemy.hits) {
                        AudioController.play('tanks/steel.wav', 0.4);
                    } else {
                        enemy.markForDeletion = true;
                        game.currentLevel.scores++;

                        AudioController.play('tanks/sounds/explosion.ogg', 0.4);
                        if (game.currentLevel.scores >= game.currentLevel.maxScores) {
                            game.state.markForNextLevel = true;
                        } else {

                            game.drawExplosion(enemy.pos.x, enemy.pos.y);
                            game.gameFrames = 0;
                            if (enemy.bonus) {
                                game.addNewBonus(enemy.bonus, enemy.left, enemy.top, enemy.right, enemy.bottom);
                            }
                        }
                    }
                }
            });
        }


    }
}