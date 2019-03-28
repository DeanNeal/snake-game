/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/snake/snake.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/snake/audio.ts":
/*!****************************!*\
  !*** ./src/snake/audio.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass AudioController {\r\n    play(url) {\r\n        var audio = new Audio('audio/' + url);\r\n        audio.volume = 0.2;\r\n        audio.play();\r\n    }\r\n}\r\nexports.AudioController = AudioController;\r\n\n\n//# sourceURL=webpack:///./src/snake/audio.ts?");

/***/ }),

/***/ "./src/snake/cell.ts":
/*!***************************!*\
  !*** ./src/snake/cell.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Cell {\r\n    constructor(x, y) {\r\n        this.root = document.createElement('div');\r\n        this.root.classList.add('cell');\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    removeBody() {\r\n        this.root.classList.remove('snake-body');\r\n    }\r\n    addBody() {\r\n        this.root.classList.add('snake-body');\r\n    }\r\n    addHead() {\r\n        this.root.classList.add('snake-head');\r\n    }\r\n    removeHead() {\r\n        this.root.classList.remove('snake-head');\r\n    }\r\n    removeFood() {\r\n        this.root.classList.remove('food');\r\n    }\r\n    setSize(gridSize, size) {\r\n        const cellSize = gridSize / size + 'px';\r\n        this.root.style.width = cellSize;\r\n        this.root.style.height = cellSize;\r\n    }\r\n}\r\nexports.Cell = Cell;\r\n\n\n//# sourceURL=webpack:///./src/snake/cell.ts?");

/***/ }),

/***/ "./src/snake/levels.ts":
/*!*****************************!*\
  !*** ./src/snake/levels.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Levels {\r\n    constructor() {\r\n        this.levels = [\r\n            {\r\n                id: 1,\r\n                scores: 0,\r\n                maxScores: 4,\r\n                speed: 500,\r\n                size: 8,\r\n                barrier: 5,\r\n                color: '#00ff37',\r\n                title: 'Все только начинается'\r\n            },\r\n            {\r\n                id: 2,\r\n                scores: 0,\r\n                maxScores: 6,\r\n                speed: 450,\r\n                size: 8,\r\n                barrier: 6,\r\n                color: '#a9ff00',\r\n                title: 'Немного быстрее'\r\n            },\r\n            {\r\n                id: 3,\r\n                scores: 0,\r\n                maxScores: 8,\r\n                speed: 400,\r\n                size: 9,\r\n                barrier: 7,\r\n                color: '#e4ff00',\r\n                title: 'Еще быстрее'\r\n            },\r\n            {\r\n                id: 4,\r\n                scores: 0,\r\n                maxScores: 10,\r\n                speed: 350,\r\n                size: 9,\r\n                barrier: 5,\r\n                color: '#ffc800',\r\n                title: 'Успеваете?'\r\n            },\r\n            {\r\n                id: 5,\r\n                scores: 0,\r\n                maxScores: 15,\r\n                speed: 320,\r\n                size: 10,\r\n                barrier: 7,\r\n                color: '#ff8d00',\r\n                title: 'Совсем жарко'\r\n            },\r\n            {\r\n                id: 6,\r\n                scores: 0,\r\n                maxScores: 20,\r\n                speed: 300,\r\n                size: 11,\r\n                barrier: 9,\r\n                color: '#ff0000',\r\n                title: 'Тлен'\r\n            }\r\n        ];\r\n    }\r\n}\r\nexports.Levels = Levels;\r\n\n\n//# sourceURL=webpack:///./src/snake/levels.ts?");

/***/ }),

/***/ "./src/snake/snake.less":
/*!******************************!*\
  !*** ./src/snake/snake.less ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/snake/snake.less?");

/***/ }),

/***/ "./src/snake/snake.ts":
/*!****************************!*\
  !*** ./src/snake/snake.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(/*! ./snake.less */ \"./src/snake/snake.less\");\r\nconst levels_1 = __webpack_require__(/*! ./levels */ \"./src/snake/levels.ts\");\r\nconst cell_1 = __webpack_require__(/*! ./cell */ \"./src/snake/cell.ts\");\r\nconst audio_1 = __webpack_require__(/*! ./audio */ \"./src/snake/audio.ts\");\r\nclass Game {\r\n    constructor(props) {\r\n        this.cells = [];\r\n        this.snakeCollection = [];\r\n        this.direction = 'right';\r\n        this.steps = false;\r\n        this.gridSize = (\"ontouchstart\" in document.documentElement) ? window.innerWidth : 600;\r\n        this.audioController = new audio_1.AudioController();\r\n        this.pause = true;\r\n        this.root = props.el;\r\n        this.state = Object.assign({ level: 1 }, new levels_1.Levels());\r\n        this.container = document.createElement('div');\r\n        this.topPanel = document.createElement('div');\r\n        this.scorePanel = document.createElement('div');\r\n        this.grid = document.createElement('div');\r\n        this.infoWindow = document.createElement('div');\r\n        this.drawScoreBoard();\r\n        this.container.classList.add('container');\r\n        this.root.appendChild(this.container);\r\n        this.container.appendChild(this.scorePanel);\r\n        this.showTooltip('Готовы?', 'Начать', () => {\r\n            this.startGame();\r\n        });\r\n        this.startCoords = this.generateRandomPosition();\r\n        this.init();\r\n        this.addEventListeners();\r\n    }\r\n    get getCurrentLevel() {\r\n        return this.state.levels[this.state.level - 1];\r\n    }\r\n    addEventListeners() {\r\n        window.addEventListener('keydown', (e) => {\r\n            if (this.steps === true) {\r\n                if (e.keyCode === 37 && this.direction !== 'right') {\r\n                    this.moveLeft();\r\n                }\r\n                else if (e.keyCode === 38 && this.direction !== 'down') {\r\n                    this.moveUp();\r\n                }\r\n                else if (e.keyCode === 39 && this.direction !== 'left') {\r\n                    this.moveRight();\r\n                }\r\n                else if (e.keyCode === 40 && this.direction !== 'up') {\r\n                    this.moveDown();\r\n                }\r\n            }\r\n        }, false);\r\n        window.addEventListener('touchstart', (e) => {\r\n            if (this.steps === true) {\r\n                let x = e.touches[0].clientX - this.cells[0].root.clientHeight;\r\n                let y = e.touches[0].clientY - this.cells[0].root.clientHeight;\r\n                let snakeBody = this.snakeCollection[0].root.getBoundingClientRect();\r\n                if (this.direction === 'right' || this.direction === 'left') {\r\n                    if (y < snakeBody['y']) {\r\n                        this.moveUp();\r\n                    }\r\n                    else if (y > snakeBody['y']) {\r\n                        this.moveDown();\r\n                    }\r\n                }\r\n                else if (this.direction === 'up' || this.direction === 'down') {\r\n                    if (x < snakeBody['x']) {\r\n                        this.moveLeft();\r\n                    }\r\n                    else if (x > snakeBody['x']) {\r\n                        this.moveRight();\r\n                    }\r\n                }\r\n            }\r\n        }, false);\r\n    }\r\n    moveLeft() {\r\n        this.direction = 'left';\r\n        this.steps = false;\r\n    }\r\n    moveUp() {\r\n        this.direction = 'up';\r\n        this.steps = false;\r\n    }\r\n    moveRight() {\r\n        this.direction = 'right';\r\n        this.steps = false;\r\n    }\r\n    moveDown() {\r\n        this.direction = 'down';\r\n        this.steps = false;\r\n    }\r\n    startGame() {\r\n        if (this.interval)\r\n            this.stopGame();\r\n        this.pause = false;\r\n        this.updateScores();\r\n        this.interval = setInterval(() => {\r\n            this.move();\r\n        }, this.getCurrentLevel.speed);\r\n    }\r\n    stopGame() {\r\n        clearInterval(this.interval);\r\n    }\r\n    showTooltip(msg, btnText, callback) {\r\n        this.infoMessage = msg;\r\n        this.btnText = btnText;\r\n        this.pause = true;\r\n        this.updateScores();\r\n        this.infoWindow.querySelector('button').addEventListener('click', (e) => {\r\n            callback();\r\n        }, false);\r\n    }\r\n    init() {\r\n        this.drawGrid();\r\n        this.generateSnake();\r\n        this.generateFood();\r\n        this.generateBarrier();\r\n    }\r\n    drawScoreBoard() {\r\n        this.topPanel.classList.add('top-panel');\r\n        this.root.appendChild(this.topPanel);\r\n    }\r\n    updateScores() {\r\n        this.container.setAttribute('level', this.getCurrentLevel.id.toString());\r\n        this.topPanel.innerHTML = `\r\n        \r\n        <div class=\"top-panel__progress\"> \r\n            <div class=\"top-panel__progress--bar\" style=\"width: ${(this.getCurrentLevel.scores) / this.getCurrentLevel.maxScores * 100 + '%'};\"></div>\r\n            <div class=\"top-panel__progress--value\">${this.getCurrentLevel.scores} of ${this.getCurrentLevel.maxScores}</div>\r\n        </div>\r\n     \r\n        <div class=\"top-panel__title\">\r\n            Level: ${this.getCurrentLevel.id}: ${this.getCurrentLevel.title}\r\n        </div>\r\n        `;\r\n        this.infoWindow.innerHTML = `\r\n        <div class=\"info-window ${this.pause === true ? 'pause' : ''}\"> \r\n            <div>${this.infoMessage}</div>\r\n            <button>${this.btnText}</button>\r\n        </div>\r\n        `;\r\n    }\r\n    drawGrid() {\r\n        this.grid.appendChild(this.infoWindow);\r\n        this.grid.classList.add('grid');\r\n        this.grid.style.width = this.gridSize + 'px';\r\n        this.grid.style.height = this.gridSize + 'px';\r\n        let y = 1;\r\n        let x = 1;\r\n        for (let i = 1; i < this.getCurrentLevel.size * this.getCurrentLevel.size + 1; i++) {\r\n            let cell = new cell_1.Cell(x, y);\r\n            cell.setSize(this.gridSize, this.getCurrentLevel.size);\r\n            this.grid.appendChild(cell.root);\r\n            this.cells.push(cell);\r\n            x++;\r\n            if (i % this.getCurrentLevel.size === 0) {\r\n                x = 1;\r\n                y++;\r\n            }\r\n        }\r\n        this.container.appendChild(this.grid);\r\n    }\r\n    getCellByCoords(coords) {\r\n        return this.cells.filter(r => r.x === coords[0] && r.y === coords[1])[0];\r\n    }\r\n    generateSnake() {\r\n        this.generateSnakeHead();\r\n        this.generateSnakeBody();\r\n    }\r\n    generateSnakeHead() {\r\n        let snakeHead = this.getCellByCoords(this.startCoords);\r\n        snakeHead.root.classList.add('snake-head');\r\n        this.snakeCollection.push(snakeHead);\r\n    }\r\n    generateSnakeBody() {\r\n        let el1;\r\n        let el2;\r\n        if (this.direction === 'right') {\r\n            el1 = this.getCellByCoords([this.startCoords[0] - 1, this.startCoords[1]]) || this.getCellByCoords([this.getCurrentLevel.size, this.startCoords[1]]);\r\n            let startIndex = el1.x;\r\n            el2 = this.getCellByCoords([startIndex - 1, this.startCoords[1]]) || this.getCellByCoords([this.getCurrentLevel.size, this.startCoords[1]]);\r\n        }\r\n        if (this.direction === 'left') {\r\n            el1 = this.getCellByCoords([this.startCoords[0] + 1, this.startCoords[1]]) || this.getCellByCoords([1, this.startCoords[1]]);\r\n            let startIndex = el1.x;\r\n            el2 = this.getCellByCoords([startIndex + 1, this.startCoords[1]]) || this.getCellByCoords([1, this.startCoords[1]]);\r\n        }\r\n        if (this.direction === 'up') {\r\n            el1 = this.getCellByCoords([this.startCoords[0], this.startCoords[1] + 1]) || this.getCellByCoords([this.startCoords[0], 1]);\r\n            let startIndex = el1.y;\r\n            el2 = this.getCellByCoords([this.startCoords[0], startIndex + 1]) || this.getCellByCoords([this.startCoords[0], 1]);\r\n        }\r\n        if (this.direction === 'down') {\r\n            el1 = this.getCellByCoords([this.startCoords[0], this.startCoords[1] - 1]) || this.getCellByCoords([this.startCoords[0], this.getCurrentLevel.size]);\r\n            let startIndex = el1.y;\r\n            el2 = this.getCellByCoords([this.startCoords[0], startIndex - 1]) || this.getCellByCoords([this.startCoords[0], this.getCurrentLevel.size]);\r\n        }\r\n        el1.root.classList.add('snake-body');\r\n        el2.root.classList.add('snake-body');\r\n        this.snakeCollection.push(el1);\r\n        this.snakeCollection.push(el2);\r\n    }\r\n    generateRandomPosition() {\r\n        return [Game.random(1, this.getCurrentLevel.size), Game.random(1, this.getCurrentLevel.size)];\r\n    }\r\n    static random(min, max) {\r\n        return Math.round(Math.random() * (max - min) + min);\r\n    }\r\n    generateBarrier() {\r\n        for (let i = 0; i <= this.getCurrentLevel.barrier; i++) {\r\n            let coords = this.generateRandomPosition();\r\n            let barrier = this.getCellByCoords(coords);\r\n            while (barrier.root.classList.contains('snake-head') || barrier.root.classList.contains('snake-body') || barrier.root.classList.contains('food')) {\r\n                coords = this.generateRandomPosition();\r\n                barrier = this.getCellByCoords(coords);\r\n            }\r\n            barrier.root.classList.add('barrier');\r\n        }\r\n    }\r\n    generateFood() {\r\n        let coords = this.generateRandomPosition();\r\n        let food = this.getCellByCoords(coords);\r\n        while (food.root.classList.contains('snake-head') || food.root.classList.contains('snake-body') || food.root.classList.contains('barrier')) {\r\n            coords = this.generateRandomPosition();\r\n            food = this.getCellByCoords(coords);\r\n        }\r\n        food.root.classList.add('food');\r\n    }\r\n    eatFood() {\r\n        if (this.snakeCollection[0].root.classList.contains('food')) {\r\n            this.audioController.play('attack.mp3');\r\n            let food = this.snakeCollection[0];\r\n            food.removeFood();\r\n            let lastElem = this.snakeCollection[this.snakeCollection.length - 1];\r\n            this.snakeCollection.push(this.getCellByCoords([lastElem.x, lastElem.y]));\r\n            this.getCurrentLevel.scores++;\r\n            this.updateScores();\r\n            this.generateFood();\r\n            if (this.getCurrentLevel.scores >= this.getCurrentLevel.maxScores) {\r\n                if (this.state.levels.length === this.state.level) {\r\n                    this.stopGame();\r\n                    this.showTooltip('Вы прошли игру=)))', 'Начать сначала?', () => {\r\n                        this.restart();\r\n                    });\r\n                }\r\n                else {\r\n                    this.nextLevel();\r\n                }\r\n            }\r\n        }\r\n    }\r\n    eatSelf() {\r\n        if (this.snakeCollection[0].root.classList.contains('snake-body')) {\r\n            this.stopGame();\r\n            this.audioController.play('zvuk-udar.mp3');\r\n            this.showTooltip('Съели себя :(', 'Начать сначала?', () => {\r\n                this.restart();\r\n            });\r\n        }\r\n    }\r\n    collision() {\r\n        if (this.snakeCollection[0].root.classList.contains('barrier')) {\r\n            this.stopGame();\r\n            this.audioController.play('zvuk-udar.mp3');\r\n            this.showTooltip('Змея попала в неприятности :(', 'Начать сначала?', () => {\r\n                this.restart();\r\n            });\r\n        }\r\n    }\r\n    move() {\r\n        this.snakeCollection[0].removeHead();\r\n        this.snakeCollection[this.snakeCollection.length - 1].removeBody();\r\n        this.snakeCollection.pop();\r\n        if (this.direction === 'right') {\r\n            if (this.startCoords[0] < this.getCurrentLevel.size) {\r\n                this.startCoords = [this.startCoords[0] + 1, this.startCoords[1]];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n            else {\r\n                this.startCoords = [1, this.startCoords[1]];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n        }\r\n        else if (this.direction === 'left') {\r\n            if (this.startCoords[0] > 1) {\r\n                this.startCoords = [this.startCoords[0] - 1, this.startCoords[1]];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n            else {\r\n                this.startCoords = [this.getCurrentLevel.size, this.startCoords[1]];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n        }\r\n        else if (this.direction === 'up') {\r\n            if (this.startCoords[1] > 1) {\r\n                this.startCoords = [this.startCoords[0], this.startCoords[1] - 1];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n            else {\r\n                this.startCoords = [this.startCoords[0], this.getCurrentLevel.size];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n        }\r\n        else if (this.direction === 'down') {\r\n            if (this.startCoords[1] < this.getCurrentLevel.size) {\r\n                this.startCoords = [this.startCoords[0], this.startCoords[1] + 1];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n            else {\r\n                this.startCoords = [this.startCoords[0], 1];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n        }\r\n        this.snakeCollection[0].addHead();\r\n        for (let i = 1; i < this.snakeCollection.length; i++) {\r\n            this.snakeCollection[i].addBody();\r\n        }\r\n        this.eatFood();\r\n        this.eatSelf();\r\n        this.collision();\r\n        this.steps = true;\r\n    }\r\n    nextLevel() {\r\n        this.grid.innerHTML = '';\r\n        this.cells = [];\r\n        this.snakeCollection = [];\r\n        this.state.level++;\r\n        this.pause = true;\r\n        this.stopGame();\r\n        this.init();\r\n        this.startGame();\r\n    }\r\n    restart() {\r\n        this.grid.innerHTML = '';\r\n        this.cells = [];\r\n        this.snakeCollection = [];\r\n        this.direction = 'right';\r\n        this.state = Object.assign({ level: 1 }, new levels_1.Levels());\r\n        this.startCoords = this.generateRandomPosition();\r\n        this.init();\r\n        this.startGame();\r\n    }\r\n}\r\nconst game = new Game({\r\n    el: document.body\r\n});\r\n\n\n//# sourceURL=webpack:///./src/snake/snake.ts?");

/***/ })

/******/ });