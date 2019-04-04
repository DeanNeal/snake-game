import { Rect } from "./rect";
import { TILE_SIZE, WINDOW_SIZE } from "./global";

const offset = TILE_SIZE * 0.4;
export class Bonus extends Rect {
    public markForDeletion: boolean = false;
    public img: HTMLImageElement;
    public type: string;
    private bonusFrames = 0;
    constructor(img: HTMLImageElement, bonus: string, x: number, y: number) {
        super(TILE_SIZE - offset, TILE_SIZE - offset);
        this.img = img;
        this.pos.x = x + offset / 2;
        this.pos.y = y + offset / 2;
        this.type = bonus;
    }

    update(dt: number) {
        if (dt) {

        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.bonusFrames++;
        if (this.bonusFrames > 400) {
            this.markForDeletion = true;
        }
        ctx.drawImage(
            this.img,
            this.pos.x,
            this.pos.y,
            this.size.x,
            this.size.y
        );
    }
}