import { Game } from "./game";
import { TILE_SIZE } from "./global";

export class Explosion {
    private x = 0;
    private y = 0;
    private frames = 0;
    private frame = 0;
    private img;
    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
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

        ctx.drawImage(this.img, -20 + (100 * this.frame), 0, TILE_SIZE * 1.5, TILE_SIZE * 1.5, this.x, this.y, TILE_SIZE, TILE_SIZE);
    }
}