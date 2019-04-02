import { BrickTile, GrassTile, СoncreteTile, IceTile, WaterTile, EagleTile } from "./tile";
import { TILE_SIZE } from './global';


export class Matrix {
    public grid = [];
    constructor() {
        this.grid = [];
    }

    set(i, x, y) {
        this.grid[i] = [x, y];
    }

    searchByRange(x1, y1, x2, y2) {
        return this.grid.filter(r => {
            x1 = Math.round(x1 / TILE_SIZE) * TILE_SIZE;
            x2 = Math.round(x2 / TILE_SIZE) * TILE_SIZE;
            y1 = Math.round(y1 / TILE_SIZE) * TILE_SIZE;
            y2 = Math.round(y2 / TILE_SIZE) * TILE_SIZE;
            return x1 <= r[0] && y1 <= r[1] && (r[0]) <= x2 && (r[1]) <= y2
        })[0];
    }
}


export class Level {
    constructor() { }
    public matrix = new Matrix();
    async build(level: number) {
        const tiles = [];
        const images = await Level.loadImages([
            'brick.jpg', 'concrete.png', 'grass.png', 'ice.jpg', 'water.jpg', 'eagle.png'
        ]);
        if (levels[level]) {
            let index = 0;
            levels[level].forEach((row, rowIndex) => {
                row.forEach((col, colIndex) => {

                    let x = colIndex * TILE_SIZE;
                    let y = TILE_SIZE * rowIndex;

                    this.matrix.set(index, x, y);
                    index++;

                    switch (col) {
                        case 1:
                            tiles.push(new BrickTile(images[0], TILE_SIZE, TILE_SIZE, x, y));
                            break;
                        case 2:
                            tiles.push(new СoncreteTile(images[1], TILE_SIZE, TILE_SIZE, x, y));
                            break;
                        case 3:
                            tiles.push(new GrassTile(images[2], TILE_SIZE, TILE_SIZE, x, y));
                            break;
                        case 4:
                            tiles.push(new IceTile(images[3], TILE_SIZE, TILE_SIZE, x, y));
                            break;
                        case 5:
                            tiles.push(new WaterTile(images[4], TILE_SIZE, TILE_SIZE, x, y));
                            break;
                        case 6:
                            tiles.push(new EagleTile(images[5], TILE_SIZE, TILE_SIZE, x, y));
                            break;
                    }
                });
            });


            return tiles;
        } else {
            return null;
        }
    }

    static loadImg(src) {
        return new Promise((resolve, reject) => {
            let imageBrick = new Image();
            imageBrick.onload = () => {
                resolve(imageBrick);
            };
            imageBrick.src = 'img/tanks/' + src;
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
    [0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 2],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 6, 1, 0, 0, 0, 0, 0, 0]
];

const level2 = [
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 2, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 2, 1, 2],
    [3, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
    [3, 3, 3, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2, 0, 0],
    [0, 0, 1, 1, 1, 3, 3, , 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 2, 3, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [2, 2, 1, 0, 2, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 2, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 6, 1, 0, 0, 1, 1, 1, 0]
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
    [0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 6, 1, 0, 0, 0, 0, 0, 0]
];

const levels = [level1, level2, level3];