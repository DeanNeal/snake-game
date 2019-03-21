import { levels } from './levels';

class AudioController {
    play(url: string) {
        var audio = new Audio('audio/' + url);
        audio.volume = 0.2;
        audio.play();
    }
}

class Cell {
    public root;
    public y;
    public x;
    constructor(x, y) {
        this.root = document.createElement('div');
        this.root.classList = 'cell';
        this.x = x;
        this.y = y;
    }

    removeBody() {
        this.root.classList.remove('snake-body');
    }

    addBody() {
        this.root.classList.add('snake-body');
    }

    addHead() {
        this.root.classList.add('snake-head');
    }

    removeHead() {
        this.root.classList.remove('snake-head')
    }

    removeFood() {
        this.root.classList.remove('food');
    }

    setSize(gridSize, size) {
        const cellSize = gridSize / size + 'px';
        this.root.style.width = cellSize;
        this.root.style.height = cellSize;
    }
}

class Levels {
    public levels;
    constructor() {
        this.levels = [
            {
                id: 1,
                scores: 0,
                maxScores: 4,
                speed: 600,
                size: 8,
                barrier: 2,
            },
            {
                id: 2,
                scores: 0,
                maxScores: 6,
                speed: 500,
                size: 9,
                barrier: 3
            },
            {
                id: 3,
                scores: 0,
                maxScores: 8,
                speed: 400,
                size: 10,
                barrier: 4
            },
            {
                id: 4,
                scores: 0,
                maxScores: 10,
                speed: 250,
                size: 11,
                barrier: 5
            },
            {
                id: 5,
                scores: 0,
                maxScores: 15,
                speed: 200,
                size: 12,
                barrier: 6
            },
            {
                id: 6,
                scores: 0,
                maxScores: 20,
                speed: 150,
                size: 13,
                barrier: 7
            }
        ]
    }
}

class Game {
    public root;
    public state;
    public container;
    public scoreBoard;
    public grid;
    public cells: Cell[] = [];
    public snakeCollection: Cell[] = [];
    public startCoords: [number, number];
    // public foodCoords: [number, number];
    public direction: string = 'right';
    public interval: any;
    public steps: boolean = false;
    public level: number = 1;
    readonly gridSize: number = 500;
    public audioController = new AudioController();
    public pause: boolean = true;
    public infoMessage: string;
    public btnText: string;

    constructor(props) {
        this.root = props.el;
        this.state = {
            ...new Levels()
        };
        this.container = document.createElement('div');
        this.scoreBoard = document.createElement('div');
        this.grid = document.createElement('div');

        this.container.classList = 'container';
        this.root.appendChild(this.container);
        this.startCoords = this.generateRandomPosition();


        this.showTooltip('Готовы?', 'Начать', () => {
            this.startGame();
        });

        this.init();
    }

    startGame() {
        if (this.interval) this.stopGame();

        this.pause = false;
        this.updateScores();
        this.interval = setInterval(() => {
            this.move();
        }, this.getCurrentLevel.speed)
    }

    stopGame() {
        clearInterval(this.interval);
    }

    showTooltip(msg, btnText, callback) {
        this.infoMessage = msg;
        this.btnText = btnText;
        this.pause = true;
        this.updateScores();

        this.scoreBoard.querySelector('button').addEventListener('click', (e) => {
            callback();
        }, false);
    }

    init() {
        this.drawScoreBoard();
        this.drawGrid();

        this.generateSnake();
        this.generateFood();
        this.generateBarrier();


        window.addEventListener('keydown', (e) => {
            if (this.steps === true) {
                if (e.keyCode === 37 && this.direction !== 'right') {
                    this.direction = 'left';
                    this.steps = false;
                }
                else if (e.keyCode === 38 && this.direction !== 'down') {
                    this.direction = 'up';
                    this.steps = false;
                }
                else if (e.keyCode === 39 && this.direction !== 'left') {
                    this.direction = 'right';
                    this.steps = false;
                }
                else if (e.keyCode === 40 && this.direction !== 'up') {
                    this.direction = 'down';
                    this.steps = false;
                }
            }
        }, false);

    }

    get getCurrentLevel() {
        return this.state.levels[this.level - 1];
    }

    drawScoreBoard() {
        this.scoreBoard.classList = 'top-panel';
        this.container.appendChild(this.scoreBoard);
    }

    updateScores() {
        this.scoreBoard.innerHTML = `
        <div class="top-panel__level">Level: ${this.getCurrentLevel.id} of ${this.state.levels.length}</div>
        <div class="top-panel__scores">
            Mice: ${this.getCurrentLevel.scores} of ${this.getCurrentLevel.maxScores}
        </div>
        <div class="top-panel__speed"> speed: ${this.getCurrentLevel.speed}ms</div>
        <div class="top-panel__start ${this.pause === true ? 'pause' : ''}"> 
            <div>${this.infoMessage}</div>
            <button>${this.btnText}</button>
        </div>
        `;
    }

    drawGrid() {
        this.grid.classList = 'grid';
        this.grid.style.width = this.gridSize + 'px';
        this.grid.style.height = this.gridSize + 'px';

        let y = 1;
        let x = 1;
        for (let i = 1; i < this.getCurrentLevel.size * this.getCurrentLevel.size + 1; i++) {
            let cell = new Cell(x, y);
            cell.setSize(this.gridSize, this.getCurrentLevel.size);
            this.grid.appendChild(cell.root);
            this.cells.push(cell);
            x++;

            //start again after every this.getCurrentLevel.size iteration
            if (i % this.getCurrentLevel.size === 0) {
                x = 1;
                y++;
            }
        }

        this.container.appendChild(this.grid);
    }
    getCellByCoords(coords): Cell {
        return this.cells.filter(r => r.x === coords[0] && r.y === coords[1])[0];
    }
    generateSnake() {
        this.generateSnakeHead();
        this.generateSnakeBody();
    }
    generateSnakeHead() {
        let snakeHead = this.getCellByCoords(this.startCoords);
        snakeHead.root.classList.add('snake-head');
        this.snakeCollection.push(snakeHead);
    }
    generateSnakeBody() {
        let el1;
        let el2;

        if (this.direction === 'right') {
            el1 = this.getCellByCoords([this.startCoords[0] - 1, this.startCoords[1]]) || this.getCellByCoords([this.getCurrentLevel.size, this.startCoords[1]]);
            let startIndex = el1.x;
            el2 = this.getCellByCoords([startIndex - 1, this.startCoords[1]]) || this.getCellByCoords([this.getCurrentLevel.size, this.startCoords[1]])
        }

        if (this.direction === 'left') {
            el1 = this.getCellByCoords([this.startCoords[0] + 1, this.startCoords[1]]) || this.getCellByCoords([1, this.startCoords[1]]);
            let startIndex = el1.x;
            el2 = this.getCellByCoords([startIndex + 1, this.startCoords[1]]) || this.getCellByCoords([1, this.startCoords[1]]);
        }

        if (this.direction === 'up') {
            el1 = this.getCellByCoords([this.startCoords[0], this.startCoords[1] + 1]) || this.getCellByCoords([this.startCoords[0], 1]);
            let startIndex = el1.y;
            el2 = this.getCellByCoords([this.startCoords[0], startIndex + 1]) || this.getCellByCoords([this.startCoords[0], 1]);
        }

        if (this.direction === 'down') {
            el1 = this.getCellByCoords([this.startCoords[0], this.startCoords[1] - 1]) || this.getCellByCoords([this.startCoords[0], this.getCurrentLevel.size]);
            let startIndex = el1.y;
            el2 = this.getCellByCoords([this.startCoords[0], startIndex - 1]) || this.getCellByCoords([this.startCoords[0], this.getCurrentLevel.size]);
        }

        el1.root.classList.add('snake-body');
        el2.root.classList.add('snake-body');

        this.snakeCollection.push(el1);
        this.snakeCollection.push(el2);
    }
    // generateSnakePosition(): [number, number] {
    //     return [this.random(3, this.getCurrentLevel.size), this.random(3, this.getCurrentLevel.size)];
    // }
    generateRandomPosition(): [number, number] {
        return [this.random(1, this.getCurrentLevel.size), this.random(1, this.getCurrentLevel.size)];
    }

    random(min, max): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    generateBarrier() {
        for (let i = 0; i <= this.getCurrentLevel.barrier; i++) {
            let coords = this.generateRandomPosition();
            let barrier = this.getCellByCoords(coords);

            //exclude case when food appears over the snake
            while (barrier.root.classList.contains('snake-head') || barrier.root.classList.contains('snake-body') || barrier.root.classList.contains('food')) {
                coords = this.generateRandomPosition();
                barrier = this.getCellByCoords(coords);
            }
            // this.foodCoords = coords;
            barrier.root.classList.add('barrier');

        }
    }

    generateFood() {
        let coords = this.generateRandomPosition();
        let food = this.getCellByCoords(coords);

        //exclude case when food appears over the snake
        while (food.root.classList.contains('snake-head') || food.root.classList.contains('snake-body') || food.root.classList.contains('barrier')) {
            coords = this.generateRandomPosition();
            food = this.getCellByCoords(coords);
        }

        food.root.classList.add('food');
    }

    eatFood() {
        if (this.snakeCollection[0].root.classList.contains('food')) {
            this.audioController.play('attack.mp3');
            let food = this.snakeCollection[0];
            food.removeFood();
            let lastElem = this.snakeCollection[this.snakeCollection.length - 1];
            this.snakeCollection.push(this.getCellByCoords([lastElem.x, lastElem.y]));

            this.getCurrentLevel.scores++;

            this.updateScores();
            this.generateFood();
            if (this.getCurrentLevel.scores >= this.getCurrentLevel.maxScores) {
                if (this.state.levels.length === this.level) {
                    this.stopGame();
                    this.showTooltip('Вы прошли игру=)))', 'Начать сначала?', () => {
                        this.restart();
                    });
                } else {
                    this.nextLevel();
                }
            }
        }
    }

    eatSelf() {
        if (this.snakeCollection[0].root.classList.contains('snake-body')) {
            this.stopGame();

            this.audioController.play('zvuk-udar.mp3');
            this.showTooltip('Съели себя :(', 'Начать сначала?', () => {
                this.restart();
            });
        }
    }

    collision() {
        if (this.snakeCollection[0].root.classList.contains('barrier')) {
            this.stopGame();
            this.audioController.play('zvuk-udar.mp3');
            this.showTooltip('Змея сломала голову :(', 'Начать сначала?', () => {
                this.restart();
            });
        }
    }

    move() {
        this.snakeCollection[0].removeHead();

        this.snakeCollection[this.snakeCollection.length - 1].removeBody();

        this.snakeCollection.pop();

        if (this.direction === 'right') {
            if (this.startCoords[0] < this.getCurrentLevel.size) {
                this.startCoords = [this.startCoords[0] + 1, this.startCoords[1]];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            } else {
                this.startCoords = [1, this.startCoords[1]];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
        }

        else if (this.direction === 'left') {
            if (this.startCoords[0] > 1) {
                this.startCoords = [this.startCoords[0] - 1, this.startCoords[1]];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            } else {
                this.startCoords = [this.getCurrentLevel.size, this.startCoords[1]];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
        }

        else if (this.direction === 'up') {
            if (this.startCoords[1] > 1) {
                this.startCoords = [this.startCoords[0], this.startCoords[1] - 1];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            } else {
                this.startCoords = [this.startCoords[0], this.getCurrentLevel.size];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
        }

        else if (this.direction === 'down') {
            if (this.startCoords[1] < this.getCurrentLevel.size) {
                this.startCoords = [this.startCoords[0], this.startCoords[1] + 1];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            } else {
                this.startCoords = [this.startCoords[0], 1];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
        }

        this.snakeCollection[0].addHead();

        for (let i = 1; i < this.snakeCollection.length; i++) {
            this.snakeCollection[i].addBody();
        }


        this.eatFood();
        this.eatSelf();
        this.collision();

        this.steps = true;
    }

    nextLevel() {
        this.grid.innerHTML = '';
        this.cells = [];
        this.snakeCollection = [];
        this.level++;
        this.pause = true;

        clearInterval(this.interval);
        this.init();
        this.startGame();
    }

    restart() {
        this.grid.innerHTML = '';
        this.cells = [];
        this.snakeCollection = [];
        this.startCoords = this.generateRandomPosition();
        this.direction = 'right';
        this.level = 1;

        this.state = {
            ...new Levels()
        };

        clearInterval(this.interval);
        this.init();
        this.startGame();
    }
}


const game = new Game({
    el: document.body
});