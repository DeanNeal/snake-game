import { Brick } from "./brick";

class Level {
    constructor() { }
    build(name: string) {
        return new Promise((resolve, reject) => {

            let bricks = [];
            let imageBrick = new Image();

            imageBrick.onload = () => {
                level1.forEach((row, rowIndex) => {
                    row.forEach((col, colIndex) => {
                        //brick
                        if (col === 1) {
                            bricks.push(new Brick(imageBrick, 40, 40, colIndex * 40, 40 * rowIndex));
                        }
                    });
                });
                resolve(bricks);
            };
            imageBrick.src = 'img/tanks/brick.jpg';
        });
    }
}

const level1 = [
    [0,  0, 0, 0, 0,  0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0],
    [0,  0, 0, 0, 0,  0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0],
    [0,  1, 1, 0, 0,  0, 1, 1, 1, 0,0, 1, 1, 1, 0,0, 0, 1, 0, 0, 0],
    [0,  1, 0, 1, 0,  0, 1, 0, 1, 0,0, 0, 1, 0, 0,0, 1, 1, 1, 0, 0],
    [0,  1, 0, 1, 0,  0, 1, 0, 1, 0,0, 0, 1, 0, 0,0, 1, 0, 1, 0, 0],
    [0,  1, 0, 1, 0,  0, 1, 0, 1, 0,0, 0, 1, 0, 0,0, 1, 1, 1, 0, 0],
    [0,  1, 0, 1, 0,  0, 1, 0, 1, 0,0, 0, 1, 0, 0,0, 1, 0, 1, 0, 0],
    [0,  1, 1, 0, 0,  0, 1, 1, 1, 0,0, 0, 1, 0, 0,0, 1, 0, 1, 0, 0]
];

export default new Level();