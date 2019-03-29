import { Rect } from "./rect";
import { WINDOW_SIZE, TILE_SIZE } from "./global";

export class Eagle extends Rect {
    public img: HTMLImageElement;
    public markForDeletion: boolean = false;
    constructor(img) {
        super(TILE_SIZE, TILE_SIZE);
        this.img = img;
        this.pos.x = WINDOW_SIZE / 2 - TILE_SIZE / 2, 
        this.pos.y = WINDOW_SIZE - TILE_SIZE;
    }
    
    draw(ctx) {
        if(this.markForDeletion === false) {
            ctx.drawImage(
                this.img,
                this.pos.x,
                this.pos.y,
                this.size.x,
                this.size.y,
            );
        } else {
            ctx.drawImage(
                this.img,
                this.pos.x,
                this.pos.y,
                this.size.x,
                this.size.y,
            );
        }
    }
}