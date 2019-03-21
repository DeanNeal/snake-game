var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Cell = /** @class */ (function () {
    function Cell(x, y) {
        this.root = document.createElement('div');
        this.root.classList = 'cell';
        this.x = x;
        this.y = y;
    }
    Cell.prototype.removeBody = function () {
        this.root.classList.remove('snake-body');
    };
    Cell.prototype.addBody = function () {
        this.root.classList.add('snake-body');
    };
    Cell.prototype.addHead = function () {
        this.root.classList.add('snake-head');
    };
    Cell.prototype.removeHead = function () {
        this.root.classList.remove('snake-head');
    };
    Cell.prototype.removeFood = function () {
        this.root.classList.remove('food');
    };
    Cell.prototype.setSize = function (gridSize, size) {
        var cellSize = gridSize / size + 'px';
        this.root.style.width = cellSize;
        this.root.style.height = cellSize;
    };
    return Cell;
}());
var Levels = /** @class */ (function () {
    function Levels() {
        this.levels = [
            {
                id: 1,
                scores: 0,
                maxScores: 4,
                speed: 600,
                size: 8
            },
            {
                id: 2,
                scores: 0,
                maxScores: 6,
                speed: 500,
                size: 9
            },
            {
                id: 3,
                scores: 0,
                maxScores: 8,
                speed: 400,
                size: 10
            },
            {
                id: 4,
                scores: 0,
                maxScores: 10,
                speed: 250,
                size: 11
            },
            {
                id: 5,
                scores: 0,
                maxScores: 15,
                speed: 200,
                size: 12
            },
            {
                id: 6,
                scores: 0,
                maxScores: 20,
                speed: 150,
                size: 13
            }
        ];
    }
    return Levels;
}());
var Game = /** @class */ (function () {
    function Game(props) {
        this.cells = [];
        this.snakeCollection = [];
        this.direction = 'right';
        this.steps = false;
        this.level = 1;
        this.gridSize = 500;
        this.root = props.el;
        this.state = __assign({}, new Levels());
        this.container = document.createElement('div');
        this.scoreBoard = document.createElement('div');
        this.grid = document.createElement('div');
        this.container.classList = 'container';
        this.root.appendChild(this.container);
        this.startCoords = this.generateSnakePosition();
        this.init();
    }
    Game.prototype.init = function () {
        var _this = this;
        this.drawScoreBoard();
        this.drawGrid();
        this.generateSnake();
        this.generateFood();
        window.addEventListener('keydown', function (e) {
            if (_this.steps === true) {
                if (e.keyCode === 37 && _this.direction !== 'right') {
                    _this.direction = 'left';
                    _this.steps = false;
                }
                else if (e.keyCode === 38 && _this.direction !== 'down') {
                    _this.direction = 'up';
                    _this.steps = false;
                }
                else if (e.keyCode === 39 && _this.direction !== 'left') {
                    _this.direction = 'right';
                    _this.steps = false;
                }
                else if (e.keyCode === 40 && _this.direction !== 'up') {
                    _this.direction = 'down';
                    _this.steps = false;
                }
            }
        }, false);
        this.interval = setInterval(function () {
            _this.move();
        }, this.getCurrentLevel.speed);
    };
    Object.defineProperty(Game.prototype, "getCurrentLevel", {
        get: function () {
            return this.state.levels[this.level - 1];
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.drawScoreBoard = function () {
        this.scoreBoard.classList = 'top-panel';
        this.container.appendChild(this.scoreBoard);
        this.updateScores();
    };
    Game.prototype.updateScores = function () {
        this.scoreBoard.innerHTML = "\n        <div class=\"top-panel__level\">Level: " + this.getCurrentLevel.id + " of " + this.state.levels.length + "</div>\n        <div class=\"top-panel__scores\">\n            Mice: " + this.getCurrentLevel.scores + " of " + this.getCurrentLevel.maxScores + "\n        </div>\n        <div class=\"top-panel__speed\"> speed: " + this.getCurrentLevel.speed + "ms</div>\n        ";
    };
    Game.prototype.drawGrid = function () {
        this.grid.classList = 'grid';
        this.grid.style.width = this.gridSize + 'px';
        this.grid.style.height = this.gridSize + 'px';
        var y = 1;
        var x = 1;
        for (var i = 1; i < this.getCurrentLevel.size * this.getCurrentLevel.size + 1; i++) {
            var cell = new Cell(x, y);
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
    };
    Game.prototype.getCellByCoords = function (coords) {
        return this.cells.filter(function (r) { return r.x === coords[0] && r.y === coords[1]; })[0];
    };
    Game.prototype.generateSnake = function () {
        this.generateSnakeHead();
        this.generateSnakeBody();
    };
    Game.prototype.generateSnakeHead = function () {
        var snakeHead = this.getCellByCoords(this.startCoords);
        snakeHead.root.classList.add('snake-head');
        this.snakeCollection.push(snakeHead);
    };
    Game.prototype.generateSnakeBody = function () {
        var el1;
        var el2;
        if (this.direction === 'right') {
            el1 = this.getCellByCoords([this.startCoords[0] - 1, this.startCoords[1]]) || this.getCellByCoords([this.getCurrentLevel.size, this.startCoords[1]]);
            var startIndex = el1.x;
            el2 = this.getCellByCoords([startIndex - 1, this.startCoords[1]]) || this.getCellByCoords([this.getCurrentLevel.size, this.startCoords[1]]);
        }
        if (this.direction === 'left') {
            el1 = this.getCellByCoords([this.startCoords[0] + 1, this.startCoords[1]]) || this.getCellByCoords([1, this.startCoords[1]]);
            var startIndex = el1.x;
            el2 = this.getCellByCoords([startIndex + 1, this.startCoords[1]]) || this.getCellByCoords([1, this.startCoords[1]]);
        }
        if (this.direction === 'up') {
            el1 = this.getCellByCoords([this.startCoords[0], this.startCoords[1] + 1]) || this.getCellByCoords([this.startCoords[0], 1]);
            var startIndex = el1.y;
            el2 = this.getCellByCoords([this.startCoords[0], startIndex + 1]) || this.getCellByCoords([this.startCoords[0], 1]);
        }
        if (this.direction === 'down') {
            el1 = this.getCellByCoords([this.startCoords[0], this.startCoords[1] - 1]) || this.getCellByCoords([this.startCoords[0], this.getCurrentLevel.size]);
            var startIndex = el1.y;
            el2 = this.getCellByCoords([this.startCoords[0], startIndex - 1]) || this.getCellByCoords([this.startCoords[0], this.getCurrentLevel.size]);
        }
        el1.root.classList.add('snake-body');
        el2.root.classList.add('snake-body');
        this.snakeCollection.push(el1);
        this.snakeCollection.push(el2);
    };
    Game.prototype.generateSnakePosition = function () {
        return [this.random(3, this.getCurrentLevel.size), this.random(3, this.getCurrentLevel.size)];
    };
    Game.prototype.generateFoodPosition = function () {
        return [this.random(1, this.getCurrentLevel.size), this.random(1, this.getCurrentLevel.size)];
    };
    Game.prototype.random = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };
    Game.prototype.generateFood = function () {
        var coords = this.generateFoodPosition();
        var food = this.getCellByCoords(coords);
        //exclude case when food appears over the snake
        while (food.root.classList.contains('snake-head') || food.root.classList.contains('snake-body')) { // || food.root.classList.contains('snake-body')) {
            coords = this.generateFoodPosition();
            food = this.getCellByCoords(coords);
        }
        this.foodCoords = coords;
        food.root.classList.add('food');
    };
    Game.prototype.eatFood = function () {
        if (this.startCoords[0] === this.foodCoords[0] && this.startCoords[1] === this.foodCoords[1]) {
            var food = this.getCellByCoords(this.foodCoords);
            food.removeFood();
            var lastElem = this.snakeCollection[this.snakeCollection.length - 1];
            this.snakeCollection.push(this.getCellByCoords([lastElem.x, lastElem.y]));
            this.getCurrentLevel.scores++;
            this.updateScores();
            this.generateFood();
            if (this.getCurrentLevel.scores >= this.getCurrentLevel.maxScores) {
                if (this.state.levels.length === this.level) {
                    var conf = confirm("Вы прошли игру=))) Начать сначала?");
                    if (conf) {
                        this.restart();
                    }
                    else {
                        clearInterval(this.interval);
                    }
                }
                else {
                    this.nextLevel();
                }
            }
        }
    };
    Game.prototype.eatSelf = function () {
        if (this.snakeCollection[0].root.classList.contains('snake-body')) {
            var conf = confirm("Съели себя :( Начать сначала?");
            if (conf) {
                this.restart();
            }
            else {
                clearInterval(this.interval);
            }
        }
    };
    Game.prototype.move = function () {
        this.snakeCollection[0].removeHead();
        this.snakeCollection[this.snakeCollection.length - 1].removeBody();
        this.snakeCollection.pop();
        if (this.direction === 'right') {
            if (this.startCoords[0] < this.getCurrentLevel.size) {
                this.startCoords = [this.startCoords[0] + 1, this.startCoords[1]];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
            else {
                this.startCoords = [1, this.startCoords[1]];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
        }
        else if (this.direction === 'left') {
            if (this.startCoords[0] > 1) {
                this.startCoords = [this.startCoords[0] - 1, this.startCoords[1]];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
            else {
                this.startCoords = [this.getCurrentLevel.size, this.startCoords[1]];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
        }
        else if (this.direction === 'up') {
            if (this.startCoords[1] > 1) {
                this.startCoords = [this.startCoords[0], this.startCoords[1] - 1];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
            else {
                this.startCoords = [this.startCoords[0], this.getCurrentLevel.size];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
        }
        else if (this.direction === 'down') {
            if (this.startCoords[1] < this.getCurrentLevel.size) {
                this.startCoords = [this.startCoords[0], this.startCoords[1] + 1];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
            else {
                this.startCoords = [this.startCoords[0], 1];
                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));
            }
        }
        this.snakeCollection[0].addHead();
        for (var i = 1; i < this.snakeCollection.length; i++) {
            this.snakeCollection[i].addBody();
        }
        this.eatFood();
        this.eatSelf();
        this.steps = true;
    };
    Game.prototype.nextLevel = function () {
        this.grid.innerHTML = '';
        this.cells = [];
        this.snakeCollection = [];
        this.foodCoords = undefined;
        // this.direction = 'right';
        this.level++;
        clearInterval(this.interval);
        this.init();
    };
    Game.prototype.restart = function () {
        this.grid.innerHTML = '';
        this.cells = [];
        this.snakeCollection = [];
        this.startCoords = this.generateSnakePosition();
        this.foodCoords = undefined;
        this.direction = 'right';
        this.level = 1;
        this.state = __assign({}, new Levels());
        clearInterval(this.interval);
        this.init();
    };
    return Game;
}());
var game = new Game({
    el: document.body
});
