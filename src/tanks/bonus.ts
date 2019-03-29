import { Rect } from "./rect";
import { TILE_SIZE, WINDOW_SIZE } from "./global";

export class Bonus extends Rect {
    public markForDeletion;
    public img;
    constructor(img, bonus, x, y) {
        super(TILE_SIZE - TILE_SIZE * 0.15, TILE_SIZE - TILE_SIZE * 0.15);
        this.img = img;
        this.pos.x = x;
        this.pos.y = y;
    }

    update() {

    }

    draw(ctx) {
        // ctx.fillStyle = '#fff';
        // ctx.fillRect(this.pos.x, this.pos.y, TILE_SIZE, TILE_SIZE);

        ctx.drawImage(
            this.img,
            this.pos.x,
            this.pos.y,
            this.size.x,
            this.size.y
        );
    }
}