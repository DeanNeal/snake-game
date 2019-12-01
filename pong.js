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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pong/pong.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pong/pong.less":
/*!****************************!*\
  !*** ./src/pong/pong.less ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/pong/pong.less?");

/***/ }),

/***/ "./src/pong/pong.ts":
/*!**************************!*\
  !*** ./src/pong/pong.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(/*! ./pong.less */ \"./src/pong/pong.less\");\r\nconst isMobile = (\"ontouchstart\" in document.documentElement);\r\nclass Vec {\r\n    constructor(x = 0, y = 0) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    get len() {\r\n        return Math.sqrt(this.x * this.x + this.y * this.y);\r\n    }\r\n    set len(value) {\r\n        const fact = value / this.len;\r\n        this.x *= fact;\r\n        this.y *= fact;\r\n    }\r\n}\r\nclass Rect {\r\n    constructor(w, h) {\r\n        this.pos = new Vec;\r\n        this.size = new Vec(w, h);\r\n    }\r\n    get left() {\r\n        return this.pos.x;\r\n    }\r\n    get right() {\r\n        return this.pos.x + this.size.x;\r\n    }\r\n    get top() {\r\n        return this.pos.y;\r\n    }\r\n    get bottom() {\r\n        return this.pos.y + this.size.y;\r\n    }\r\n}\r\nclass Ball extends Rect {\r\n    constructor(width, height) {\r\n        super(width, height);\r\n        this.vel = new Vec;\r\n    }\r\n}\r\nclass Player extends Rect {\r\n    constructor(width, height, name) {\r\n        super(width, height);\r\n        this._scores = 0;\r\n        this.name = name;\r\n    }\r\n    get title() {\r\n        return `${this.name} - ${this._scores}`;\r\n    }\r\n    get scores() {\r\n        return this._scores;\r\n    }\r\n    setScores(scores) {\r\n        this._scores = scores;\r\n    }\r\n    incScore() {\r\n        this._scores++;\r\n    }\r\n}\r\nclass Pong {\r\n    constructor(canvas) {\r\n        this.players = [];\r\n        this.startSpeed = isMobile ? 200 : 700;\r\n        this.offset = isMobile ? 30 : 50;\r\n        this.gameOn = false;\r\n        this.canvas = canvas;\r\n        this.context = canvas.getContext('2d');\r\n        canvas.width = window.innerWidth;\r\n        canvas.height = window.innerHeight;\r\n        this.players = [\r\n            new Player(isMobile ? 8 : 20, isMobile ? 150 : 200, 'You'),\r\n            new Player(isMobile ? 8 : 20, isMobile ? 150 : 200, 'AI')\r\n        ];\r\n        this.resize();\r\n        let lastTime;\r\n        const callback = (ms) => {\r\n            if (lastTime) {\r\n                this.update((ms - lastTime) / 1000);\r\n            }\r\n            lastTime = ms;\r\n            requestAnimationFrame(callback);\r\n        };\r\n        callback();\r\n        window.addEventListener('resize', () => {\r\n            canvas.width = window.innerWidth;\r\n            canvas.height = window.innerHeight;\r\n            this.resize();\r\n        });\r\n        this.canvas.addEventListener('mousemove', (e) => {\r\n            if (e.offsetY <= this.canvas.height - this.players[0].size.y) {\r\n                this.players[0].pos.y = e.offsetY;\r\n            }\r\n            else {\r\n                this.players[0].pos.y = canvas.height - this.players[0].size.y;\r\n            }\r\n        }, false);\r\n        this.canvas.addEventListener('touchmove', (e) => {\r\n            if (e.touches[0].pageY <= this.canvas.height - this.players[0].size.y) {\r\n                this.players[0].pos.y = e.touches[0].pageY;\r\n            }\r\n            else {\r\n                this.players[0].pos.y = canvas.height - this.players[0].size.y;\r\n            }\r\n        }, false);\r\n        this.scoreBoard = document.createElement('div');\r\n        this.scoreBoard.classList.add('score-board');\r\n        document.body.appendChild(this.scoreBoard);\r\n        this.timer();\r\n        this.updateScores();\r\n    }\r\n    resize() {\r\n        this.players[0].pos.x = this.offset;\r\n        this.players[0].pos.y = this.canvas.height / 2 - this.players[0].size.y / 2;\r\n        this.players[1].pos.x = this.canvas.width - this.offset - this.players[1].size.x;\r\n        this.players[1].pos.y = this.canvas.height / 2 - this.players[1].size.y / 2;\r\n    }\r\n    timer() {\r\n        if (this.timerInterval)\r\n            clearInterval(this.timerInterval);\r\n        let start = 0;\r\n        this.timerBlock = document.createElement('div');\r\n        this.timerBlock.classList.add('timer-block');\r\n        document.body.appendChild(this.timerBlock);\r\n        this.timerBlock.innerHTML = '3';\r\n        this.timerInterval = window.setInterval(() => {\r\n            start++;\r\n            if (start < 3) {\r\n                this.timerBlock.innerHTML = '' + (3 - start);\r\n            }\r\n            else {\r\n                clearInterval(this.timerInterval);\r\n                this.timerBlock.remove();\r\n                this.gameOn = true;\r\n                this.ball = new Ball(isMobile ? 15 : 60, isMobile ? 15 : 60);\r\n                this.ball.pos.x = this.canvas.width / 2 - this.ball.size.x / 2;\r\n                this.ball.pos.y = this.canvas.height / 2 - this.ball.size.y / 2;\r\n                this.ball.vel.x = this.startSpeed * (Math.random() > .5 ? -1 : 1);\r\n                this.ball.vel.y = this.startSpeed * (Math.random() > .5 ? -1 : 1);\r\n            }\r\n        }, 1000);\r\n    }\r\n    updateScores() {\r\n        this.scoreBoard.innerHTML = `\r\n            <div class=\"score-board__player\"> ${this.players[0].title}</div>\r\n            <div class=\"score-board__player\"> ${this.players[1].title}</div>\r\n        `;\r\n    }\r\n    collide(player, ball) {\r\n        if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top) {\r\n            let len = ball.vel.len;\r\n            ball.vel.len = len * (isMobile ? 1.01 : 1.03);\r\n            ball.vel.x = -ball.vel.x;\r\n            ball.vel.y = (Math.random() > .5 ? -1 : 1) * this.startSpeed * Pong.random(0.3, 1.2);\r\n            if (player.name === 'You') {\r\n                var audio = new Audio('audio/' + 'pong-1.mp3');\r\n                audio.volume = 0.2;\r\n                audio.play();\r\n            }\r\n            else {\r\n                var audio = new Audio('audio/' + 'pong-2.mp3');\r\n                audio.volume = 0.2;\r\n                audio.play();\r\n            }\r\n        }\r\n    }\r\n    static random(min, max) {\r\n        return (Math.random() * (max - min) + min);\r\n    }\r\n    draw() {\r\n        this.context.fillStyle = '#000';\r\n        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n        if (this.ball) {\r\n            this.drawRect(this.ball);\r\n        }\r\n        this.players.forEach(player => this.drawRect(player));\r\n    }\r\n    drawRect(rect) {\r\n        this.context.fillStyle = '#fff';\r\n        this.context.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);\r\n    }\r\n    resetUsers() {\r\n        this.players.forEach(player => player.setScores(0));\r\n    }\r\n    update(dt) {\r\n        if (this.ball && this.gameOn) {\r\n            this.ball.pos.x += this.ball.vel.x * dt;\r\n            this.ball.pos.y += this.ball.vel.y * dt;\r\n            if (this.ball.left < 0 || this.ball.right > this.canvas.width) {\r\n                const playerId = this.ball.vel.x < 0 ? 1 : 0;\r\n                this.gameOn = false;\r\n                this.players[playerId].incScore();\r\n                this.updateScores();\r\n                this.ball.vel.x = 0;\r\n                this.ball.vel.y = 0;\r\n                if (this.players[0].scores >= 2 || this.players[1].scores >= 2) {\r\n                    let msg = this.players[0].scores > this.players[1].scores ? 'Вы победили' : 'Вы проиграли';\r\n                    this.resetUsers();\r\n                    this.updateScores();\r\n                    this.timerBlock.innerHTML = msg;\r\n                    document.body.appendChild(this.timerBlock);\r\n                }\r\n                else {\r\n                    this.timer();\r\n                }\r\n            }\r\n            if (this.ball.top < 0 || this.ball.bottom > this.canvas.height) {\r\n                this.ball.vel.y = -this.ball.vel.y;\r\n            }\r\n            this.players[1].pos.y = this.ball.pos.y - this.players[1].size.y / 2 + this.ball.size.y / 2;\r\n            this.players.forEach(player => this.collide(player, this.ball));\r\n        }\r\n        this.draw();\r\n    }\r\n}\r\nconst canvas = document.getElementById('pong');\r\nconst array = ['audio/' + 'pong-1.mp3', 'audio/' + 'pong-2.mp3'];\r\nlet index = 0;\r\narray.forEach(r => {\r\n    var audio = new Audio(r);\r\n    audio.onloadedmetadata = () => {\r\n        index++;\r\n        if (index === array.length) {\r\n            const pong = new Pong(canvas);\r\n        }\r\n    };\r\n});\r\n\n\n//# sourceURL=webpack:///./src/pong/pong.ts?");

/***/ })

/******/ });