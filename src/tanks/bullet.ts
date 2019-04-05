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

    collision(player: Player, game: Game) {
        //with bullets
        game.bullets.forEach(bullet => {
            if (Object.is(bullet, this) === false && this.overlap(bullet, this)) {
                this.markForDeletion = true;
                bullet.markForDeletion = true;
            }
        });

        //with bricks
        game.tiles.forEach(tile => {
            if (tile.collideWithBullet) {
                if (this.overlap(tile, this)) { //} && game.tiles.filter(r => r.markForDeletion).length === 0) {
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
                        tile.markForDeletion = true;
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

        //with player
        if (this.source === 'bot') {
            if (player.isDisabled === false && this.overlap(player, this)) {
                if (player['armor'] === false) {
                    this.markForDeletion = true;
                    game.drawExplosion(player.pos.x, player.pos.y);
                    AudioController.play('tanks/sounds/explosion.ogg', 0.4);
                    if (player.lifes > 1) {
                        player.markForDeletion = true;
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
                if (this.overlap(enemy, this)) {
                    this.markForDeletion = true;
                    enemy.hits++;

                    if (enemy.hitsToDestroy > enemy.hits) {
                        AudioController.play('tanks/steel.wav', 0.4);
                    } else {
                        enemy.markForDeletion = true;
                        game.currentLevel.scores++;

                        game.drawExplosion(enemy.pos.x, enemy.pos.y);
                        game.gameFrames = 0;
                        if (enemy.bonus) {
                            game.addNewBonus(enemy.bonus, enemy.left, enemy.top, enemy.right, enemy.bottom);
                        }

                        AudioController.play('tanks/sounds/explosion.ogg', 0.4);
                        if (game.currentLevel.scores >= game.currentLevel.maxScores) {
                            game.state.markForNextLevel = true;
                        }
                    }
                }
            });
        }


    }
}