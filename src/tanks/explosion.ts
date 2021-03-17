import { Game } from "./game";
import { TILE_SIZE } from "./global";
import { Rect } from './rect';

export class Explosion extends Rect {
    private frames = 0;
    private frame = 0;
    private img;
    constructor(img, x, y) {
        super(TILE_SIZE, TILE_SIZE);
        this.img = img;
        this.pos.x = x;
        this.pos.y = y;
    }

    draw(ctx: CanvasRenderingContext2D, game: Game) {
        this.frames += 1;

        if (this.frames >= 5) {
            this.frames = 0;
            this.frame += 1;
        }
        if (this.frame >= 12) {
            game.explosions.pop();
        }

        ctx.drawImage(this.img, -20 + (100 * this.frame), 0, this.size.x * 1.5, this.size.y * 1.5, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}