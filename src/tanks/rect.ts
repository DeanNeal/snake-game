import { Vec } from './vec';

export class Rect {
    public pos: Vec;
    public size: Vec;
    constructor(w: number, h: number) {
        this.pos = new Vec(0, 0);
        this.size = new Vec(w, h);
    }

    get left() {
        return this.pos.x;// - this.size.x / 2;
    }

    get right() {
        return this.pos.x + this.size.x;// / 2;
    }

    get top() {
        return this.pos.y;// - this.size.y / 2;
    }

    get bottom() {
        return this.pos.y + this.size.y;// / 2;
    }

    overlap(subject1: Rect, suject2: Rect) {
        return subject1.bottom > suject2.top
            && subject1.top < suject2.bottom
            && subject1.right > suject2.left
            && subject1.left < suject2.right;
    }
}