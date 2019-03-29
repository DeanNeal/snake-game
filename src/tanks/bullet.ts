import { Vec } from './vec';
import { Rect } from './rect';
import AudioController from './audio';
import { BrickTile, СoncreteTile } from './tile';

export class Bullet extends Rect {
    public vel: Vec;
    public markForDeletion: boolean = false;
    public source;
    constructor(source, width, height) {
        super(width, height);
        this.vel = new Vec;
        this.source = source;
    }

    draw(ctx) {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }


    collision(player, game) {

        //with bricks
        game.tiles.forEach(tile => {
            if (tile.collideWithBullet) {
                if (
                    (tile.top <= this.bottom &&
                        tile.left <= this.right &&
                        tile.right >= this.left &&
                        tile.bottom >= this.top)
                ) {
                    this.markForDeletion = true;

                    if (tile instanceof BrickTile) {
                        tile.hits++;
                        if (tile.hits >= tile.hitsToDestroy) {
                            tile.markForDeletion = true;
                        }
                        AudioController.play('tanks/brick.wav', 0.4);
                    } else if (tile instanceof СoncreteTile) {
                        AudioController.play('tanks/concrete.wav', 0.4);
                    }
                }
            }
        })

        //width borders
        if (this.pos.x <= 0 || this.pos.x >= game.canvas.width || this.pos.y <= 0 || this.pos.y >= game.canvas.height) {
            this.markForDeletion = true;
        }

        //with eagle
        if (
            (game.eagle.top <= this.bottom &&
                game.eagle.left <= this.right &&
                game.eagle.right >= this.left &&
                game.eagle.bottom >= this.top)
        ) {
            game.eagle.markForDeletion = true;
            this.markForDeletion = true;
            AudioController.play('tanks/eagle.wav', 0.4);
            game.markForGameOver = true;
        }

        //width enemies
        if (this.source === 'bot') {
            if ((player.top <= this.bottom &&
                player.left <= this.right &&
                player.right >= this.left &&
                player.bottom >= this.top)) {
                this.markForDeletion = true;
                player.lives--;
                if (player.lives > 0) {
                    player.markForDeletion = true;
                    AudioController.play('tanks/eagle.wav', 0.4);
                } else {
                    game.markForGameOver = true;
                }
            }
        }

        if (this.source === 'player') {
            game.enemies.forEach(enemy => {
                if (
                    (enemy.top <= this.bottom &&
                        enemy.left <= this.right &&
                        enemy.right >= this.left &&
                        enemy.bottom >= this.top)
                ) {
                    enemy.markForDeletion = true;
                    this.markForDeletion = true;
                    game.currentLevel.scores++;

                    AudioController.play('tanks/eagle.wav', 0.4);
                    if (game.currentLevel.scores >= game.currentLevel.maxScores) {
                        game.markForNextLevel = true;
                    } else {
                        if (game.currentLevel.maxScores >= game.currentLevel.scores + game.currentLevel.startWithBots) {
                            setTimeout(() => {
                                game.addNewBot();
                            }, 1000);
                        }

                    }
                }
            });
        }


    }
}