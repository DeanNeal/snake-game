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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/snake.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cell.ts":
/*!*********************!*\
  !*** ./src/cell.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Cell = (function () {\r\n    function Cell(x, y) {\r\n        this.root = document.createElement('div');\r\n        this.root.classList = 'cell';\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    Cell.prototype.removeBody = function () {\r\n        this.root.classList.remove('snake-body');\r\n    };\r\n    Cell.prototype.addBody = function () {\r\n        this.root.classList.add('snake-body');\r\n    };\r\n    Cell.prototype.addHead = function () {\r\n        this.root.classList.add('snake-head');\r\n    };\r\n    Cell.prototype.removeHead = function () {\r\n        this.root.classList.remove('snake-head');\r\n    };\r\n    Cell.prototype.removeFood = function () {\r\n        this.root.classList.remove('food');\r\n    };\r\n    Cell.prototype.setSize = function (gridSize, size) {\r\n        var cellSize = gridSize / size + 'px';\r\n        this.root.style.width = cellSize;\r\n        this.root.style.height = cellSize;\r\n    };\r\n    return Cell;\r\n}());\r\nexports.Cell = Cell;\r\n\n\n//# sourceURL=webpack:///./src/cell.ts?");

/***/ }),

/***/ "./src/levels.ts":
/*!***********************!*\
  !*** ./src/levels.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Levels = (function () {\r\n    function Levels() {\r\n        this.levels = [\r\n            {\r\n                id: 1,\r\n                scores: 0,\r\n                maxScores: 4,\r\n                speed: 600,\r\n                size: 8,\r\n                barrier: 2,\r\n            },\r\n            {\r\n                id: 2,\r\n                scores: 0,\r\n                maxScores: 6,\r\n                speed: 500,\r\n                size: 9,\r\n                barrier: 3\r\n            },\r\n            {\r\n                id: 3,\r\n                scores: 0,\r\n                maxScores: 8,\r\n                speed: 400,\r\n                size: 10,\r\n                barrier: 4\r\n            },\r\n            {\r\n                id: 4,\r\n                scores: 0,\r\n                maxScores: 10,\r\n                speed: 250,\r\n                size: 11,\r\n                barrier: 5\r\n            },\r\n            {\r\n                id: 5,\r\n                scores: 0,\r\n                maxScores: 15,\r\n                speed: 200,\r\n                size: 12,\r\n                barrier: 6\r\n            },\r\n            {\r\n                id: 6,\r\n                scores: 0,\r\n                maxScores: 20,\r\n                speed: 150,\r\n                size: 13,\r\n                barrier: 7\r\n            }\r\n        ];\r\n    }\r\n    return Levels;\r\n}());\r\nexports.Levels = Levels;\r\n\n\n//# sourceURL=webpack:///./src/levels.ts?");

/***/ }),

/***/ "./src/snake.ts":
/*!**********************!*\
  !*** ./src/snake.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar levels_1 = __webpack_require__(/*! ./levels */ \"./src/levels.ts\");\r\nvar cell_1 = __webpack_require__(/*! ./cell */ \"./src/cell.ts\");\r\nvar AudioController = (function () {\r\n    function AudioController() {\r\n    }\r\n    AudioController.prototype.play = function (url) {\r\n        var audio = new Audio('audio/' + url);\r\n        audio.volume = 0.2;\r\n        audio.play();\r\n    };\r\n    return AudioController;\r\n}());\r\nvar Game = (function () {\r\n    function Game(props) {\r\n        var _this = this;\r\n        this.cells = [];\r\n        this.snakeCollection = [];\r\n        this.direction = 'right';\r\n        this.steps = false;\r\n        this.level = 1;\r\n        this.gridSize = 600;\r\n        this.audioController = new AudioController();\r\n        this.pause = true;\r\n        this.root = props.el;\r\n        this.state = __assign({}, new levels_1.Levels());\r\n        this.container = document.createElement('div');\r\n        this.scoreBoard = document.createElement('div');\r\n        this.grid = document.createElement('div');\r\n        this.container.classList.add('container');\r\n        this.root.appendChild(this.container);\r\n        this.startCoords = this.generateRandomPosition();\r\n        this.showTooltip('Готовы?', 'Начать', function () {\r\n            _this.startGame();\r\n        });\r\n        this.drawScoreBoard();\r\n        this.init();\r\n    }\r\n    Game.prototype.startGame = function () {\r\n        var _this = this;\r\n        if (this.interval)\r\n            this.stopGame();\r\n        this.pause = false;\r\n        this.updateScores();\r\n        this.interval = setInterval(function () {\r\n            _this.move();\r\n        }, this.getCurrentLevel.speed);\r\n    };\r\n    Game.prototype.stopGame = function () {\r\n        clearInterval(this.interval);\r\n    };\r\n    Game.prototype.showTooltip = function (msg, btnText, callback) {\r\n        this.infoMessage = msg;\r\n        this.btnText = btnText;\r\n        this.pause = true;\r\n        this.updateScores();\r\n        this.scoreBoard.querySelector('button').addEventListener('click', function (e) {\r\n            callback();\r\n        }, false);\r\n    };\r\n    Game.prototype.init = function () {\r\n        var _this = this;\r\n        this.drawGrid();\r\n        this.generateSnake();\r\n        this.generateFood();\r\n        this.generateBarrier();\r\n        window.addEventListener('keydown', function (e) {\r\n            if (_this.steps === true) {\r\n                if (e.keyCode === 37 && _this.direction !== 'right') {\r\n                    _this.direction = 'left';\r\n                    _this.steps = false;\r\n                }\r\n                else if (e.keyCode === 38 && _this.direction !== 'down') {\r\n                    _this.direction = 'up';\r\n                    _this.steps = false;\r\n                }\r\n                else if (e.keyCode === 39 && _this.direction !== 'left') {\r\n                    _this.direction = 'right';\r\n                    _this.steps = false;\r\n                }\r\n                else if (e.keyCode === 40 && _this.direction !== 'up') {\r\n                    _this.direction = 'down';\r\n                    _this.steps = false;\r\n                }\r\n            }\r\n        }, false);\r\n    };\r\n    Object.defineProperty(Game.prototype, \"getCurrentLevel\", {\r\n        get: function () {\r\n            return this.state.levels[this.level - 1];\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Game.prototype.drawScoreBoard = function () {\r\n        this.scoreBoard.classList.add('top-panel');\r\n        this.container.appendChild(this.scoreBoard);\r\n    };\r\n    Game.prototype.updateScores = function () {\r\n        this.scoreBoard.innerHTML = \"\\n        <div class=\\\"top-panel__level\\\">Level: \" + this.getCurrentLevel.id + \" of \" + this.state.levels.length + \"</div>\\n        <div class=\\\"top-panel__scores\\\">\\n            Mice: \" + this.getCurrentLevel.scores + \" of \" + this.getCurrentLevel.maxScores + \"\\n        </div>\\n        <div class=\\\"top-panel__speed\\\"> speed: \" + this.getCurrentLevel.speed + \"ms</div>\\n        <div class=\\\"top-panel__start \" + (this.pause === true ? 'pause' : '') + \"\\\"> \\n            <div>\" + this.infoMessage + \"</div>\\n            <button>\" + this.btnText + \"</button>\\n        </div>\\n        \";\r\n    };\r\n    Game.prototype.drawGrid = function () {\r\n        this.grid.classList = 'grid';\r\n        this.grid.style.width = this.gridSize + 'px';\r\n        this.grid.style.height = this.gridSize + 'px';\r\n        var y = 1;\r\n        var x = 1;\r\n        for (var i = 1; i < this.getCurrentLevel.size * this.getCurrentLevel.size + 1; i++) {\r\n            var cell = new cell_1.Cell(x, y);\r\n            cell.setSize(this.gridSize, this.getCurrentLevel.size);\r\n            this.grid.appendChild(cell.root);\r\n            this.cells.push(cell);\r\n            x++;\r\n            if (i % this.getCurrentLevel.size === 0) {\r\n                x = 1;\r\n                y++;\r\n            }\r\n        }\r\n        this.container.appendChild(this.grid);\r\n    };\r\n    Game.prototype.getCellByCoords = function (coords) {\r\n        return this.cells.filter(function (r) { return r.x === coords[0] && r.y === coords[1]; })[0];\r\n    };\r\n    Game.prototype.generateSnake = function () {\r\n        this.generateSnakeHead();\r\n        this.generateSnakeBody();\r\n    };\r\n    Game.prototype.generateSnakeHead = function () {\r\n        var snakeHead = this.getCellByCoords(this.startCoords);\r\n        snakeHead.root.classList.add('snake-head');\r\n        this.snakeCollection.push(snakeHead);\r\n    };\r\n    Game.prototype.generateSnakeBody = function () {\r\n        var el1;\r\n        var el2;\r\n        if (this.direction === 'right') {\r\n            el1 = this.getCellByCoords([this.startCoords[0] - 1, this.startCoords[1]]) || this.getCellByCoords([this.getCurrentLevel.size, this.startCoords[1]]);\r\n            var startIndex = el1.x;\r\n            el2 = this.getCellByCoords([startIndex - 1, this.startCoords[1]]) || this.getCellByCoords([this.getCurrentLevel.size, this.startCoords[1]]);\r\n        }\r\n        if (this.direction === 'left') {\r\n            el1 = this.getCellByCoords([this.startCoords[0] + 1, this.startCoords[1]]) || this.getCellByCoords([1, this.startCoords[1]]);\r\n            var startIndex = el1.x;\r\n            el2 = this.getCellByCoords([startIndex + 1, this.startCoords[1]]) || this.getCellByCoords([1, this.startCoords[1]]);\r\n        }\r\n        if (this.direction === 'up') {\r\n            el1 = this.getCellByCoords([this.startCoords[0], this.startCoords[1] + 1]) || this.getCellByCoords([this.startCoords[0], 1]);\r\n            var startIndex = el1.y;\r\n            el2 = this.getCellByCoords([this.startCoords[0], startIndex + 1]) || this.getCellByCoords([this.startCoords[0], 1]);\r\n        }\r\n        if (this.direction === 'down') {\r\n            el1 = this.getCellByCoords([this.startCoords[0], this.startCoords[1] - 1]) || this.getCellByCoords([this.startCoords[0], this.getCurrentLevel.size]);\r\n            var startIndex = el1.y;\r\n            el2 = this.getCellByCoords([this.startCoords[0], startIndex - 1]) || this.getCellByCoords([this.startCoords[0], this.getCurrentLevel.size]);\r\n        }\r\n        el1.root.classList.add('snake-body');\r\n        el2.root.classList.add('snake-body');\r\n        this.snakeCollection.push(el1);\r\n        this.snakeCollection.push(el2);\r\n    };\r\n    Game.prototype.generateRandomPosition = function () {\r\n        return [Game.random(1, this.getCurrentLevel.size), Game.random(1, this.getCurrentLevel.size)];\r\n    };\r\n    Game.random = function (min, max) {\r\n        return Math.round(Math.random() * (max - min) + min);\r\n    };\r\n    Game.prototype.generateBarrier = function () {\r\n        for (var i = 0; i <= this.getCurrentLevel.barrier; i++) {\r\n            var coords = this.generateRandomPosition();\r\n            var barrier = this.getCellByCoords(coords);\r\n            while (barrier.root.classList.contains('snake-head') || barrier.root.classList.contains('snake-body') || barrier.root.classList.contains('food')) {\r\n                coords = this.generateRandomPosition();\r\n                barrier = this.getCellByCoords(coords);\r\n            }\r\n            barrier.root.classList.add('barrier');\r\n        }\r\n    };\r\n    Game.prototype.generateFood = function () {\r\n        var coords = this.generateRandomPosition();\r\n        var food = this.getCellByCoords(coords);\r\n        while (food.root.classList.contains('snake-head') || food.root.classList.contains('snake-body') || food.root.classList.contains('barrier')) {\r\n            coords = this.generateRandomPosition();\r\n            food = this.getCellByCoords(coords);\r\n        }\r\n        food.root.classList.add('food');\r\n    };\r\n    Game.prototype.eatFood = function () {\r\n        var _this = this;\r\n        if (this.snakeCollection[0].root.classList.contains('food')) {\r\n            this.audioController.play('attack.mp3');\r\n            var food = this.snakeCollection[0];\r\n            food.removeFood();\r\n            var lastElem = this.snakeCollection[this.snakeCollection.length - 1];\r\n            this.snakeCollection.push(this.getCellByCoords([lastElem.x, lastElem.y]));\r\n            this.getCurrentLevel.scores++;\r\n            this.updateScores();\r\n            this.generateFood();\r\n            if (this.getCurrentLevel.scores >= this.getCurrentLevel.maxScores) {\r\n                if (this.state.levels.length === this.level) {\r\n                    this.stopGame();\r\n                    this.showTooltip('Вы прошли игру=)))', 'Начать сначала?', function () {\r\n                        _this.restart();\r\n                    });\r\n                }\r\n                else {\r\n                    this.nextLevel();\r\n                }\r\n            }\r\n        }\r\n    };\r\n    Game.prototype.eatSelf = function () {\r\n        var _this = this;\r\n        if (this.snakeCollection[0].root.classList.contains('snake-body')) {\r\n            this.stopGame();\r\n            this.audioController.play('zvuk-udar.mp3');\r\n            this.showTooltip('Съели себя :(', 'Начать сначала?', function () {\r\n                _this.restart();\r\n            });\r\n        }\r\n    };\r\n    Game.prototype.collision = function () {\r\n        var _this = this;\r\n        if (this.snakeCollection[0].root.classList.contains('barrier')) {\r\n            this.stopGame();\r\n            this.audioController.play('zvuk-udar.mp3');\r\n            this.showTooltip('Змея сломала голову :(', 'Начать сначала?', function () {\r\n                _this.restart();\r\n            });\r\n        }\r\n    };\r\n    Game.prototype.move = function () {\r\n        this.snakeCollection[0].removeHead();\r\n        this.snakeCollection[this.snakeCollection.length - 1].removeBody();\r\n        this.snakeCollection.pop();\r\n        if (this.direction === 'right') {\r\n            if (this.startCoords[0] < this.getCurrentLevel.size) {\r\n                this.startCoords = [this.startCoords[0] + 1, this.startCoords[1]];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n            else {\r\n                this.startCoords = [1, this.startCoords[1]];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n        }\r\n        else if (this.direction === 'left') {\r\n            if (this.startCoords[0] > 1) {\r\n                this.startCoords = [this.startCoords[0] - 1, this.startCoords[1]];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n            else {\r\n                this.startCoords = [this.getCurrentLevel.size, this.startCoords[1]];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n        }\r\n        else if (this.direction === 'up') {\r\n            if (this.startCoords[1] > 1) {\r\n                this.startCoords = [this.startCoords[0], this.startCoords[1] - 1];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n            else {\r\n                this.startCoords = [this.startCoords[0], this.getCurrentLevel.size];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n        }\r\n        else if (this.direction === 'down') {\r\n            if (this.startCoords[1] < this.getCurrentLevel.size) {\r\n                this.startCoords = [this.startCoords[0], this.startCoords[1] + 1];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n            else {\r\n                this.startCoords = [this.startCoords[0], 1];\r\n                this.snakeCollection.unshift(this.getCellByCoords(this.startCoords));\r\n            }\r\n        }\r\n        this.snakeCollection[0].addHead();\r\n        for (var i = 1; i < this.snakeCollection.length; i++) {\r\n            this.snakeCollection[i].addBody();\r\n        }\r\n        this.eatFood();\r\n        this.eatSelf();\r\n        this.collision();\r\n        this.steps = true;\r\n    };\r\n    Game.prototype.nextLevel = function () {\r\n        this.grid.innerHTML = '';\r\n        this.cells = [];\r\n        this.snakeCollection = [];\r\n        this.level++;\r\n        this.pause = true;\r\n        clearInterval(this.interval);\r\n        this.init();\r\n        this.startGame();\r\n    };\r\n    Game.prototype.restart = function () {\r\n        this.grid.innerHTML = '';\r\n        this.cells = [];\r\n        this.snakeCollection = [];\r\n        this.startCoords = this.generateRandomPosition();\r\n        this.direction = 'right';\r\n        this.level = 1;\r\n        this.state = __assign({}, new levels_1.Levels());\r\n        clearInterval(this.interval);\r\n        this.init();\r\n        this.startGame();\r\n    };\r\n    return Game;\r\n}());\r\nvar game = new Game({\r\n    el: document.body\r\n});\r\n\n\n//# sourceURL=webpack:///./src/snake.ts?");

/***/ })

/******/ });