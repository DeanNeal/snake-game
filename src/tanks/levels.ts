import { Brick, Grass, Сoncrete } from "./tile";
import { TILE_SIZE } from './global';

export class Level {
    constructor() { }
    build(level: number) {
        return new Promise((resolve, reject) => {
            let tiles = [];

            Level.loadImages(['img/tanks/brick.jpg', 'img/tanks/grass.jpg', 'img/tanks/concrete.png', 'img/tanks/water.jpg']).then(images => {
                if(levels[level]) {
                    levels[level].forEach((row, rowIndex) => {
                        row.forEach((col, colIndex) => {
                            //brick
                            if (col === 1) {
                                tiles.push(new Brick(images[0], TILE_SIZE, TILE_SIZE, colIndex * TILE_SIZE, TILE_SIZE * rowIndex));
                            }
                            if (col === 2) {
                                tiles.push(new Grass(images[1], TILE_SIZE, TILE_SIZE, colIndex * TILE_SIZE, TILE_SIZE * rowIndex));
                            }
                            if(col === 3) {
                                tiles.push(new Сoncrete(images[2], TILE_SIZE, TILE_SIZE, colIndex * TILE_SIZE, TILE_SIZE * rowIndex));
                            }
                        });
                    });
                    resolve(tiles);
                } else {
                    // alert('YOU WIN');
                    resolve(null);
                }
            });
        });
    }

    static loadImg(src) {
        return new Promise((resolve, reject) => {
            let imageBrick = new Image();
            imageBrick.onload = () => {
                resolve(imageBrick);
            };
            imageBrick.src = src;
        });
    }

    static loadImages(images) {
        let promises = [];
        images.forEach(r => promises.push(this.loadImg(r)));
        return Promise.all(promises);
    }
}

const level1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 3, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 3],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]
];

const level2 = [
    [0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 3, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 2, 1, 3],
    [2, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 0, 0],
    [2, 2, 2, 0, 0, 0, 1, 0, 0, 3, 0, 0, 2, 0, 0],
    [0, 0, 1, 1, 1, 2, 2, 2, 3, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 3, 2, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [3, 3, 1, 0, 3, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 3, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0]
];

const level3 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]
];

const levels = [level1, level2, level3];