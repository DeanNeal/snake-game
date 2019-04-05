import { Rect } from './rect';

export class Tile extends Rect {
    protected img: HTMLImageElement;
    public hits: number = 0;
    public markForDeletion: boolean = false;
    readonly hitsToDestroy: number = 1;
    readonly collideWithBullet: boolean = true;
    readonly canBeDestroyed: boolean = true;

    constructor(img: HTMLImageElement, w: number, h: number, x: number, y: number) {
        super(w, h);
        this.img = img;
        this.pos.x = x;
        this.pos.y = y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.img,
            this.pos.x,
            this.pos.y,
            this.size.x,
            this.size.y,
        );
    }
}

export class BrickTile extends Tile {
    draw(ctx) {
        ctx.drawImage(this.img, 0, 0, this.size.x * 2.45, this.size.y * 2.45, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}

export class GrassTile extends Tile {
    readonly collideWithBullet: boolean = false;
    readonly canBeDestroyed: boolean = false;
}

export class СoncreteTile extends Tile {
    readonly canBeDestroyed: boolean = false;
}

export class IceTile extends Tile {
    readonly collideWithBullet: boolean = false;
    readonly canBeDestroyed: boolean = false;
}

export class WaterTile extends Tile {
    readonly collideWithBullet: boolean = false;
    readonly canBeDestroyed: boolean = false;
}

export class EagleTile extends Tile {

}