import { Rect } from "./rect";

export class Eagle extends Rect {
    public img: HTMLImageElement;
    public markForDeletion: boolean = false;
    constructor(img, w, h, x, y) {
        super(w, h);
        this.img = img;
        this.pos.x = x;
        this.pos.y = y;
    }

    collision() {
        
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