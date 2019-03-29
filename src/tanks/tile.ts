import { Rect } from './rect';

export class Tile extends Rect {
    private img;
    public hits: number = 0;
    public markForDeletion: boolean = false;
    readonly hitsToDestroy: number = 2;
    readonly collideWithBullet: boolean = true;
    readonly canBeDestroyed: boolean = true;

    public collideWithUser:boolean = false;
    constructor(img, w, h, x, y) {
        super(w, h);
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

    overlap(subject, rect) {
        return subject.bottom > rect.top
            && subject.top < rect.bottom
            && subject.right > rect.left
            && subject.left < rect.right;
    }
}

export class BrickTile extends Tile {

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