import { Vec } from './vec';
import { Rect } from './rect';
import AudioController from './audio';

export class Bullet extends Rect {
    public vel: Vec;
    public markForDeletion: boolean = false;
    constructor(width, height) {
        super(width, height);
        this.vel = new Vec;
    }

    draw(ctx) {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }


    collision(player, game) {

        //with bricks
        game.bricks.forEach(brick=> {
            if(
                (brick.top <= this.bottom &&
                brick.left <= this.right &&
                brick.right >= this.left &&
                brick.bottom >= this.top)
            ) {
              this.markForDeletion = true;
              brick.markForDeletion = true;
              AudioController.play('tanks/Battle City SFX (5).wav');
            }
        })

        //width borders
        if(this.pos.x <= 0 || this.pos.x >= game.canvas.width || this.pos.y <= 0 || this.pos.y >= game.canvas.height) {
            this.markForDeletion = true;
        }
    }
}