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
}

class Levels {
    public levels;
    constructor() {
        this.levels = [
            {
                id: 1,
                scores: 0,
                maxScores: 4,
                speed: 600
            },
            {
                id: 2,
                scores: 0,
                maxScores: 6,
                speed: 500
            },
            {
                id: 3,
                scores: 0,
                maxScores: 8,
                speed: 400
            },
            {
                id: 4,
                scores: 0,
                maxScores: 10,
                speed: 300
            },
            {
                id: 5,
                scores: 0,
                maxScores: 15,
                speed: 200
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
    public foodCoords: [number, number];
    public direction: string = 'right';
    public interval: number;
    public steps: boolean = false;
    public level: number = 1;

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
        this.startCoords = this.generateSnakePosition();

        this.init();
    }

    init() {
        this.drawScoreBoard();
        this.drawGrid();

        this.generateSnake();
        this.generateFood();


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


        this.interval = setInterval(() => {
            this.move();
        }, this.getCurrentLevel.speed)
    }

    get getCurrentLevel() {
        return this.state.levels[this.level - 1];
    }

    drawScoreBoard() {
        this.scoreBoard.classList = 'top-panel';
        this.container.appendChild(this.scoreBoard);
        this.updateScores();
    }

    updateScores() {
        this.scoreBoard.innerHTML = `
        <div class="top-panel__level">Level: ${this.getCurrentLevel.id}</div>
        <div class="top-panel__scores">
            ${this.getCurrentLevel.scores} of ${this.getCurrentLevel.maxScores}
        </div>
        <div class="top-panel__speed"> speed: ${this.getCurrentLevel.speed}</div>
        `;
    }

    drawGrid() {
        this.grid.classList = 'grid';
        let y = 1;
        let x = 1;
        for (let i = 1; i < 101; i++) {
            let cell = new Cell(x, y);
            this.grid.appendChild(cell.root);
            this.cells.push(cell);
            x++;

            //start again after every 10 iteration
            if (i % 10 === 0) {
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
            el1 = this.getCellByCoords([this.startCoords[0] - 1, this.startCoords[1]]) || this.getCellByCoords([10, this.startCoords[1]]);
            let startIndex = el1.x;
            el2 = this.getCellByCoords([startIndex - 1, this.startCoords[1]]) || this.getCellByCoords([10, this.startCoords[1]])
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
            el1 = this.getCellByCoords([this.startCoords[0], this.startCoords[1] - 1]) || this.getCellByCoords([this.startCoords[0], 10]);
            let startIndex = el1.y;
            el2 = this.getCellByCoords([this.startCoords[0], startIndex - 1]) || this.getCellByCoords([this.startCoords[0], 10]);
        }

        el1.root.classList.add('snake-body');
        el2.root.classList.add('snake-body');

        this.snakeCollection.push(el1);
        this.snakeCollection.push(el2);
    }
    generateSnakePosition(): [number, number] {
        return [this.random(3, 10), this.random(3, 10)];
    }
    generateFoodPosition(): [number, number] {
        return [this.random(1, 10), this.random(1, 10)];
    }

    random(min, max): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    generateFood() {
        let coords = this.generateFoodPosition();
        let food = this.getCellByCoords(coords);

        //exclude case when food appears over the snake
        while (food.root.classList.contains('snake-head') || food.root.classList.contains('snake-body')){// || food.root.classList.contains('snake-body')) {
            coords = this.generateFoodPosition();
            food = this.getCellByCoords(coords);
        }
        this.foodCoords = coords;
        food.root.classList.add('food');
    }

    eatFood() {
        if (this.startCoords[0] === this.foodCoords[0] && this.startCoords[1] === this.foodCoords[1]) {
            let food = this.getCellByCoords(this.foodCoords);
            food.removeFood();
            let lastElem = this.snakeCollection[this.snakeCollection.length - 1];
            this.snakeCollection.push(this.getCellByCoords([lastElem.x, lastElem.y]));

            this.getCurrentLevel.scores++;

            this.updateScores();
            this.generateFood();
            if (this.getCurrentLevel.scores >= this.getCurrentLevel.maxScores) {
                if (this.state.levels.length === this.level) {
                    let conf = confirm("Вы прошли игру=))) Начать сначала?");
                    if (conf) {
                        this.restart();
                    } else {
                        clearInterval(this.interval);
                    }
                } else {
                    this.nextLevel();
                }
            }
        }
    }

    eatSelf() {
        if (this.snakeCollection[0].root.classList.contains('snake-body')) {
            let conf = confirm("Съели себя :( Начать сначала?");
            if (conf) {
                this.restart();
            } else {
                clearInterval(this.interval);
            }
        }
    }

    move() {
        this.snakeCollection[0].removeHead();

        this.snakeCollection[this.snakeCollection.length - 1].removeBody();

        this.snakeCollection.pop();

        if (this.direction === 'right') {
            if (this.startCoords[0] < 10) {
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
                this.startCoords = [10, this.startCoords[1]];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
        }

        else if (this.direction === 'up') {
            if (this.startCoords[1] > 1) {
                this.startCoords = [this.startCoords[0], this.startCoords[1] - 1];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            } else {
                this.startCoords = [this.startCoords[0], 10];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
        }

        else if (this.direction === 'down') {
            if (this.startCoords[1] < 10) {
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

        this.steps = true;
    }

    nextLevel() {
        this.grid.innerHTML = '';
        this.cells = [];
        this.snakeCollection = [];
        this.foodCoords = undefined;
        // this.direction = 'right';
        this.level++;
        clearInterval(this.interval);
        this.init();
    }

    restart() {
        this.grid.innerHTML = '';
        this.cells = [];
        this.snakeCollection = [];
        this.startCoords = this.generateSnakePosition();
        this.foodCoords = undefined;
        this.direction = 'right';
        this.level = 1;

        this.state = {
            ...new Levels()
        };

        clearInterval(this.interval);
        this.init();
    }
}


const game = new Game({
    el: document.body
});