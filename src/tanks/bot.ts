import { WINDOW_SIZE } from "./global";
import { Tank } from "./tank";

function random(min, max): number {
    return (Math.random() * (max - min) + min);
}

export class Bot extends Tank {
    public movementVel: number = WINDOW_SIZE / 10;
    private start = new Date().getTime();
    private fireDelay = 1000;
    private moveTimeout;
    public markForDeletion;
    // private randomChangeTime = random(1000, 10000);

    constructor(img, w, h, game) {
        super(img, w, h);
        this.pos.x = 2;//WINDOW_SIZE - this.size.x;
        this.direction = 'right';
        this.pos.y = 2;
        this.vel.x = this.movementVel;

        this.isMoving = true;

        // setInterval(()=> {
        //     this.onCollision();
        // }, 1000);
        // this.changeDirection();
    }

    update(dt, tiles, game) {
        this.move(dt, tiles, game);

        let elapsed = new Date().getTime() - this.start;
        if (elapsed > this.fireDelay) {
            this.fire(game);
            this.start = new Date().getTime();
            this.fireDelay = random(100, 4000);
        }
    }

    onCollision() {
        if (this.moveTimeout) clearTimeout(this.moveTimeout);

        this.isMoving = false;
        let randomDirection = Math.round(random(0, 3));
        let array = ['left', 'up', 'right', 'down'];

        this.moveTimeout = setTimeout(() => {
            let direction = array[randomDirection];
            // console.log(direction);
            if (direction === 'right') {
                this.direction ='left';
                this.isMoving = true;
                this.vel.x = -this.movementVel;
                this.vel.y = 0;
            } else if (direction === 'left') {
                this.direction = 'right';
                this.isMoving = true;
                this.vel.x = this.movementVel;
                this.vel.y = 0;
            } else if (direction === 'up') {
                this.direction = 'down';
                this.isMoving = true;
                this.vel.x = 0;
                this.vel.y = this.movementVel;
            } else if (direction === 'down') {
                this.direction = 'up';
                this.isMoving = true;
                this.vel.x = 0;
                this.vel.y = -this.movementVel;
            }
        }, 500);
    }

    // changeDirection() {
    //     let array = ['left', 'up', 'right', 'down'];
    //     this.moveTimeout = setInterval(() => {
    //         let randomDirection = Math.round(random(0, 3));
    //         let direction = array[randomDirection];
    //         console.log(direction);
    //         if (direction === 'right') {
    //             this.direction ='left';
    //             this.isMoving = true;
    //             this.vel.x = -this.movementVel;
    //             this.vel.y = 0;
    //         } else if (direction === 'left') {
    //             this.direction = 'right';
    //             this.isMoving = true;
    //             this.vel.x = this.movementVel;
    //             this.vel.y = 0;
    //         } else if (direction === 'up') {
    //             this.direction = 'down';
    //             this.isMoving = true;
    //             this.vel.x = 0;
    //             this.vel.y = this.movementVel;
    //         } else if (direction === 'down') {
    //             this.direction = 'up';
    //             this.isMoving = true;
    //             this.vel.x = 0;
    //             this.vel.y = -this.movementVel;
    //         }
    //         this.randomChangeTime = random(1000, 10000);
    //     }, this.randomChangeTime);
    // }
}