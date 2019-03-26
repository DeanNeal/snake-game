import { Rect } from './rect';

export class Brick extends Rect{
    private img;
    public markForDeletion: boolean = false;
    readonly hitsToDestroy: number = 2;
    public hits: number = 0;
    constructor(img, width, height, x, y) {
        super(width, height);
         this.img = img;
         this.pos.x = x;
         this.pos.y = y;
    }

    draw(ctx) {
        ctx.drawImage(
            this.img,
            this.pos.x,
            this.pos.y,
            this.size.x,
            this.size.y,
        );
    }

    collision(player, game) {
        // if(
        //     player.top <= this.bottom &&
        //     player.left <= this.right &&
        //     player.right >= this.left &&
        //     player.bottom >= this.top
        // ) {
        //     player.vel.y = 0;
        //     if(game.isMoving){
        //         game.stacked = true;
        //     }
        // }

    }

}