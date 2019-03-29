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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tanks/game.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/tanks/audio.ts":
/*!****************************!*\
  !*** ./src/tanks/audio.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass AudioController {\r\n    play(url, volume = 0.2, loop = false) {\r\n        var audio = new Audio('audio/' + url);\r\n        audio.loop = loop;\r\n        audio.volume = 0.1;\r\n        audio.play();\r\n    }\r\n}\r\nexports.default = new AudioController();\r\n\n\n//# sourceURL=webpack:///./src/tanks/audio.ts?");

/***/ }),

/***/ "./src/tanks/bonus.ts":
/*!****************************!*\
  !*** ./src/tanks/bonus.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nconst global_1 = __webpack_require__(/*! ./global */ \"./src/tanks/global.ts\");\r\nclass Bonus extends rect_1.Rect {\r\n    constructor(img, bonus, x, y) {\r\n        super(global_1.TILE_SIZE - global_1.TILE_SIZE * 0.15, global_1.TILE_SIZE - global_1.TILE_SIZE * 0.15);\r\n        this.img = img;\r\n        this.pos.x = x;\r\n        this.pos.y = y;\r\n    }\r\n    update() {\r\n    }\r\n    draw(ctx) {\r\n        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n    }\r\n}\r\nexports.Bonus = Bonus;\r\n\n\n//# sourceURL=webpack:///./src/tanks/bonus.ts?");

/***/ }),

/***/ "./src/tanks/bot.ts":
/*!**************************!*\
  !*** ./src/tanks/bot.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst global_1 = __webpack_require__(/*! ./global */ \"./src/tanks/global.ts\");\r\nconst tank_1 = __webpack_require__(/*! ./tank */ \"./src/tanks/tank.ts\");\r\nfunction random(min, max) {\r\n    return (Math.random() * (max - min) + min);\r\n}\r\nfunction booleanRandom() {\r\n    return Math.random() > .5 ? 0 : 1;\r\n}\r\nconst derectionArray = ['left', 'up', 'right', 'down'];\r\nconst modArray = ['simple', 'fast', 'armored'];\r\nconst bonusArray = ['helm', 'star', 'life', 'granate', 'clock'];\r\nclass Bot extends tank_1.Tank {\r\n    constructor(img) {\r\n        super(img, global_1.TILE_SIZE - global_1.TILE_SIZE * 0.15, global_1.TILE_SIZE - global_1.TILE_SIZE * 0.15);\r\n        this.movementVel = global_1.WINDOW_SIZE / 10;\r\n        this.start = new Date().getTime();\r\n        this.fireDelay = 1000;\r\n        this.type = 'bot';\r\n        this.mod = 'simple';\r\n        this.bonus = null;\r\n        this.state = 'normal';\r\n        this.init();\r\n    }\r\n    init() {\r\n        let randomVal = booleanRandom();\r\n        this.pos.x = randomVal ? 5 : global_1.WINDOW_SIZE - this.size.x - 5;\r\n        this.pos.y = 5;\r\n        if (randomVal) {\r\n            if (booleanRandom()) {\r\n                this.moveRight();\r\n            }\r\n            else {\r\n                this.moveDown();\r\n            }\r\n        }\r\n        else {\r\n            if (booleanRandom()) {\r\n                this.moveLeft();\r\n            }\r\n            else {\r\n                this.moveDown();\r\n            }\r\n        }\r\n        this.generateBonus();\r\n        this.generateMod();\r\n    }\r\n    generateBonus() {\r\n        let chance = Math.round(random(0, 1));\r\n        if (chance === 1) {\r\n            let randomIndex = Math.round(random(0, bonusArray.length - 1));\r\n            this.bonus = bonusArray[randomIndex];\r\n        }\r\n    }\r\n    generateMod() {\r\n        let randomIndex = Math.round(random(0, 2));\r\n        this.mod = modArray[randomIndex];\r\n    }\r\n    get bulletSpeed() {\r\n        let factor = 1;\r\n        switch (this.state) {\r\n            case 'normal':\r\n                factor = 1;\r\n                break;\r\n            case 'improved':\r\n                factor = 1.5;\r\n                break;\r\n            case 'superb':\r\n                factor = 2;\r\n                break;\r\n        }\r\n        return global_1.BULLET_SPEED * factor;\r\n    }\r\n    getRandomDirection() {\r\n        let randomDirection = Math.round(random(0, derectionArray.length - 1));\r\n        return derectionArray[randomDirection];\r\n    }\r\n    moveLeft() {\r\n        this.direction = 'left';\r\n        this.isMoving = true;\r\n        this.vel.x = -this.movementVel;\r\n        this.vel.y = 0;\r\n    }\r\n    moveRight() {\r\n        this.direction = 'right';\r\n        this.isMoving = true;\r\n        this.vel.x = this.movementVel;\r\n        this.vel.y = 0;\r\n    }\r\n    moveUp() {\r\n        this.direction = 'up';\r\n        this.isMoving = true;\r\n        this.vel.x = 0;\r\n        this.vel.y = -this.movementVel;\r\n    }\r\n    moveDown() {\r\n        this.direction = 'down';\r\n        this.isMoving = true;\r\n        this.vel.x = 0;\r\n        this.vel.y = this.movementVel;\r\n    }\r\n    setRandomDirection() {\r\n        const direction = this.getRandomDirection();\r\n        if (direction === 'right') {\r\n            this.moveLeft();\r\n        }\r\n        else if (direction === 'left') {\r\n            this.moveRight();\r\n        }\r\n        else if (direction === 'up') {\r\n            this.moveDown();\r\n        }\r\n        else if (direction === 'down') {\r\n            this.moveUp();\r\n        }\r\n    }\r\n    update(dt, tiles, game) {\r\n        this.move(dt, tiles, game);\r\n        let elapsed = new Date().getTime() - this.start;\r\n        if (elapsed > this.fireDelay) {\r\n            this.fire(game);\r\n            this.start = new Date().getTime();\r\n            this.fireDelay = random(1000, 4000);\r\n        }\r\n    }\r\n    onCollision() {\r\n        if (this.moveTimeout)\r\n            clearTimeout(this.moveTimeout);\r\n        this.isMoving = false;\r\n        this.moveTimeout = setTimeout(() => {\r\n            this.setRandomDirection();\r\n        }, 300);\r\n    }\r\n}\r\nexports.Bot = Bot;\r\n\n\n//# sourceURL=webpack:///./src/tanks/bot.ts?");

/***/ }),

/***/ "./src/tanks/bullet.ts":
/*!*****************************!*\
  !*** ./src/tanks/bullet.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vec_1 = __webpack_require__(/*! ./vec */ \"./src/tanks/vec.ts\");\r\nconst rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nconst audio_1 = __webpack_require__(/*! ./audio */ \"./src/tanks/audio.ts\");\r\nconst tile_1 = __webpack_require__(/*! ./tile */ \"./src/tanks/tile.ts\");\r\nclass Bullet extends rect_1.Rect {\r\n    constructor(source, width, height) {\r\n        super(width, height);\r\n        this.markForDeletion = false;\r\n        this.vel = new vec_1.Vec;\r\n        this.source = source;\r\n    }\r\n    draw(ctx) {\r\n        ctx.fillStyle = '#ccc';\r\n        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n    }\r\n    overlap(object) {\r\n        return object.top <= this.bottom &&\r\n            object.left <= this.right &&\r\n            object.right >= this.left &&\r\n            object.bottom >= this.top;\r\n    }\r\n    collision(player, game) {\r\n        game.tiles.forEach(tile => {\r\n            if (tile.collideWithBullet) {\r\n                if (this.overlap(tile)) {\r\n                    this.markForDeletion = true;\r\n                    if (tile instanceof tile_1.BrickTile) {\r\n                        tile.hits++;\r\n                        if (tile.hits >= tile.hitsToDestroy) {\r\n                            tile.markForDeletion = true;\r\n                        }\r\n                        audio_1.default.play('tanks/brick.wav', 0.4);\r\n                    }\r\n                    else if (tile instanceof tile_1.СoncreteTile) {\r\n                        audio_1.default.play('tanks/concrete.wav', 0.4);\r\n                    }\r\n                }\r\n            }\r\n        });\r\n        if (this.pos.x <= 0 || this.pos.x >= game.canvas.width || this.pos.y <= 0 || this.pos.y >= game.canvas.height) {\r\n            this.markForDeletion = true;\r\n        }\r\n        if (this.overlap(game.eagle)) {\r\n            game.eagle.markForDeletion = true;\r\n            this.markForDeletion = true;\r\n            audio_1.default.play('tanks/eagle.wav', 0.4);\r\n            game.markForGameOver = true;\r\n        }\r\n        if (this.source === 'bot') {\r\n            if (this.overlap(player)) {\r\n                this.markForDeletion = true;\r\n                player.lives--;\r\n                if (player.lives > 0) {\r\n                    player.markForDeletion = true;\r\n                    audio_1.default.play('tanks/tanks/sounds/explosion.ogg', 0.4);\r\n                }\r\n                else {\r\n                    game.markForGameOver = true;\r\n                }\r\n            }\r\n        }\r\n        if (this.source === 'player') {\r\n            game.enemies.forEach(enemy => {\r\n                if (this.overlap(enemy)) {\r\n                    enemy.markForDeletion = true;\r\n                    this.markForDeletion = true;\r\n                    game.currentLevel.scores++;\r\n                    if (enemy.bonus) {\r\n                        game.addNewBonus(enemy.bonus, enemy.pos.x, enemy.pos.y);\r\n                    }\r\n                    audio_1.default.play('tanks/sounds/explosion.ogg', 0.4);\r\n                    if (game.currentLevel.scores >= game.currentLevel.maxScores) {\r\n                        game.markForNextLevel = true;\r\n                    }\r\n                    else {\r\n                        if (game.currentLevel.maxScores >= game.currentLevel.scores + game.currentLevel.startWithBots) {\r\n                            setTimeout(() => {\r\n                                game.addNewBot();\r\n                            }, 1000);\r\n                        }\r\n                    }\r\n                }\r\n            });\r\n        }\r\n    }\r\n}\r\nexports.Bullet = Bullet;\r\n\n\n//# sourceURL=webpack:///./src/tanks/bullet.ts?");

/***/ }),

/***/ "./src/tanks/eagle.ts":
/*!****************************!*\
  !*** ./src/tanks/eagle.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nconst global_1 = __webpack_require__(/*! ./global */ \"./src/tanks/global.ts\");\r\nclass Eagle extends rect_1.Rect {\r\n    constructor(img) {\r\n        super(global_1.TILE_SIZE, global_1.TILE_SIZE);\r\n        this.markForDeletion = false;\r\n        this.img = img;\r\n        this.pos.x = global_1.WINDOW_SIZE / 2 - global_1.TILE_SIZE / 2,\r\n            this.pos.y = global_1.WINDOW_SIZE - global_1.TILE_SIZE;\r\n    }\r\n    draw(ctx) {\r\n        if (this.markForDeletion === false) {\r\n            ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n        }\r\n        else {\r\n            ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n        }\r\n    }\r\n}\r\nexports.Eagle = Eagle;\r\n\n\n//# sourceURL=webpack:///./src/tanks/eagle.ts?");

/***/ }),

/***/ "./src/tanks/game.ts":
/*!***************************!*\
  !*** ./src/tanks/game.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(/*! ./tanks.less */ \"./src/tanks/tanks.less\");\r\nconst tile_1 = __webpack_require__(/*! ./tile */ \"./src/tanks/tile.ts\");\r\nconst player_1 = __webpack_require__(/*! ./player */ \"./src/tanks/player.ts\");\r\nconst levels_1 = __webpack_require__(/*! ./levels */ \"./src/tanks/levels.ts\");\r\nconst eagle_1 = __webpack_require__(/*! ./eagle */ \"./src/tanks/eagle.ts\");\r\nconst bot_1 = __webpack_require__(/*! ./bot */ \"./src/tanks/bot.ts\");\r\nconst global_1 = __webpack_require__(/*! ./global */ \"./src/tanks/global.ts\");\r\nconst bonus_1 = __webpack_require__(/*! ./bonus */ \"./src/tanks/bonus.ts\");\r\nconst isMobile = (\"ontouchstart\" in document.documentElement);\r\nclass State {\r\n    constructor() {\r\n        this.activeLevel = 0;\r\n        this.levels = [{\r\n                scores: 0,\r\n                maxScores: 5,\r\n                startWithBots: 2\r\n            }, {\r\n                scores: 0,\r\n                maxScores: 7,\r\n                startWithBots: 3\r\n            }, {\r\n                scores: 0,\r\n                maxScores: 10,\r\n                startWithBots: 3\r\n            }];\r\n    }\r\n}\r\nclass Game {\r\n    constructor(canvas) {\r\n        this.enemies = [];\r\n        this.bullets = [];\r\n        this.tiles = [];\r\n        this.bonuses = [];\r\n        this.markForNextLevel = false;\r\n        this.markForGameOver = false;\r\n        this.state = new State();\r\n        this.gameTimeouts = [];\r\n        this.canvas = canvas;\r\n        this.context = canvas.getContext('2d');\r\n        canvas.width = global_1.WINDOW_SIZE;\r\n        canvas.height = global_1.WINDOW_SIZE;\r\n        this.loadLevel();\r\n        document.body.querySelectorAll('.nav-level li').forEach(el => {\r\n            el.addEventListener('click', (e) => {\r\n                let level = e.currentTarget.getAttribute('data-id');\r\n                level = parseInt(level);\r\n                this.cleanScene();\r\n                this.state = new State();\r\n                this.state.activeLevel = level;\r\n                this.loadLevel();\r\n            });\r\n        });\r\n    }\r\n    get currentLevel() {\r\n        return this.state.levels[this.state.activeLevel];\r\n    }\r\n    loadLevel() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const level = new levels_1.Level();\r\n            this.tiles = yield level.build(this.state.activeLevel);\r\n            if (this.tiles) {\r\n                let images = yield levels_1.Level.loadImages(['img/tanks/tank.png', 'img/tanks/eagle.png']);\r\n                this.player = new player_1.Player(images[0]);\r\n                this.eagle = new eagle_1.Eagle(images[1]);\r\n                for (let i = 1; i <= this.currentLevel.startWithBots; i++) {\r\n                    let timeout = setTimeout(() => {\r\n                        this.addNewBot();\r\n                    }, i * 2000);\r\n                    this.gameTimeouts.push(timeout);\r\n                }\r\n                this.player.addEventListeners();\r\n                this.startUpdate();\r\n            }\r\n            else {\r\n                this.context.fillStyle = \"blue  \";\r\n                this.context.font = `bold ${global_1.WINDOW_SIZE / 20}px Arial`;\r\n                this.context.fillText('YOU WIN', (this.canvas.width / 2) - 100, (this.canvas.height / 2));\r\n            }\r\n        });\r\n    }\r\n    cleanScene() {\r\n        this.gameCallback = () => { };\r\n        this.gameTimeouts.forEach(timeout => clearTimeout(timeout));\r\n        this.bullets = [];\r\n        this.enemies = [];\r\n        this.tiles = [];\r\n        this.bonuses = [];\r\n        this.markForNextLevel = false;\r\n        this.markForGameOver = false;\r\n        this.context.fillStyle = '#000';\r\n        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n    }\r\n    nextLevel() {\r\n        this.cleanScene();\r\n        this.state.activeLevel++;\r\n        this.loadLevel();\r\n    }\r\n    restart() {\r\n        this.cleanScene();\r\n        this.state = new State();\r\n        this.context.fillStyle = \"red\";\r\n        this.context.font = `bold ${global_1.WINDOW_SIZE / 20}px Arial`;\r\n        this.context.fillText('GAME OVER', (this.canvas.width / 2) - 140, (this.canvas.height / 2));\r\n    }\r\n    addNewBot() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            let img = yield levels_1.Level.loadImg('img/tanks/bot.png');\r\n            this.enemies.push(new bot_1.Bot(img));\r\n        });\r\n    }\r\n    addNewBonus(bonus, x, y) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            let images = yield levels_1.Level.loadImages(['img/tanks/clock.png', 'img/tanks/helm.png', 'img/tanks/star.png', 'img/tanks/life.png', 'img/tanks/granate.png']);\r\n            let img;\r\n            if (bonus === 'clock') {\r\n                img = images[0];\r\n            }\r\n            if (bonus === 'helm') {\r\n                img = images[1];\r\n            }\r\n            if (bonus === 'star') {\r\n                img = images[2];\r\n            }\r\n            if (bonus === 'life') {\r\n                img = images[3];\r\n            }\r\n            if (bonus === 'granate') {\r\n                img = images[4];\r\n            }\r\n            this.bonuses.push(new bonus_1.Bonus(img, bonus, x, y));\r\n        });\r\n    }\r\n    startUpdate() {\r\n        let lastTime;\r\n        this.gameCallback = (ms) => {\r\n            if (lastTime) {\r\n                this.update((ms - lastTime) / 1000);\r\n            }\r\n            lastTime = ms;\r\n            requestAnimationFrame(this.gameCallback);\r\n        };\r\n        this.gameCallback();\r\n    }\r\n    draw() {\r\n        this.context.fillStyle = '#000';\r\n        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n        this.tiles = this.tiles.filter(r => !r.markForDeletion);\r\n        this.tiles.filter(r => r instanceof tile_1.GrassTile === false).forEach(brick => brick.draw(this.context));\r\n        this.bullets = this.bullets.filter(r => !r.markForDeletion);\r\n        this.bullets.forEach(bullet => bullet.draw(this.context));\r\n        this.enemies = this.enemies.filter(r => !r.markForDeletion);\r\n        this.enemies.forEach(enemy => enemy.draw(this.context));\r\n        this.bonuses = this.bonuses.filter(r => !r.markForDeletion);\r\n        this.bonuses.forEach(bonus => bonus.draw(this.context));\r\n        this.player.draw(this.context);\r\n        this.tiles.filter(r => r instanceof tile_1.GrassTile === true).forEach(brick => brick.draw(this.context));\r\n        this.eagle.draw(this.context);\r\n    }\r\n    drawScores() {\r\n        this.context.fillStyle = \"blue\";\r\n        this.context.font = `bold ${global_1.WINDOW_SIZE / 42}px Arial`;\r\n        this.context.fillText('Destroyed - ' + this.currentLevel.scores, (this.canvas.width) - global_1.WINDOW_SIZE / 6, (this.canvas.height) - global_1.WINDOW_SIZE / 50);\r\n        this.context.fillStyle = \"blue\";\r\n        this.context.font = `bold ${global_1.WINDOW_SIZE / 42}px Arial`;\r\n        this.context.fillText('Level - ' + (this.state.activeLevel + 1), (this.canvas.width) - global_1.WINDOW_SIZE / 6, (this.canvas.height) - global_1.WINDOW_SIZE / 20);\r\n        this.context.fillStyle = \"blue\";\r\n        this.context.font = `bold ${global_1.WINDOW_SIZE / 42}px Arial`;\r\n        this.context.fillText('Lifes - ' + this.player.lives, (this.canvas.width) - global_1.WINDOW_SIZE / 6, (this.canvas.height) - global_1.WINDOW_SIZE / 12.5);\r\n    }\r\n    collider() {\r\n        this.bullets.forEach(bullet => bullet.collision(this.player, this));\r\n    }\r\n    update(dt) {\r\n        this.player.update(dt, this.tiles, this);\r\n        this.enemies.forEach(enemy => enemy.update(dt, this.tiles, this));\r\n        this.bonuses.forEach(bonus => bonus.update());\r\n        this.bullets.forEach(bullet => {\r\n            bullet.pos.x += bullet.vel.x * dt;\r\n            bullet.pos.y += bullet.vel.y * dt;\r\n        });\r\n        this.collider();\r\n        this.draw();\r\n        this.drawScores();\r\n        if (this.markForNextLevel) {\r\n            this.nextLevel();\r\n        }\r\n        if (this.markForGameOver) {\r\n            this.restart();\r\n        }\r\n    }\r\n}\r\nconst canvas = document.getElementById('tanks');\r\nnew Game(canvas);\r\n\n\n//# sourceURL=webpack:///./src/tanks/game.ts?");

/***/ }),

/***/ "./src/tanks/global.ts":
/*!*****************************!*\
  !*** ./src/tanks/global.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.WINDOW_SIZE = (window.innerHeight < window.innerWidth) ? (window.innerHeight - 50) : (window.innerWidth - 50);\r\nexports.TILE_SIZE = exports.WINDOW_SIZE / 15;\r\nexports.BULLET_SPEED = exports.WINDOW_SIZE / 2;\r\n\n\n//# sourceURL=webpack:///./src/tanks/global.ts?");

/***/ }),

/***/ "./src/tanks/levels.ts":
/*!*****************************!*\
  !*** ./src/tanks/levels.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tile_1 = __webpack_require__(/*! ./tile */ \"./src/tanks/tile.ts\");\r\nconst global_1 = __webpack_require__(/*! ./global */ \"./src/tanks/global.ts\");\r\nclass Level {\r\n    constructor() { }\r\n    build(level) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const tiles = [];\r\n            const images = yield Level.loadImages(['img/tanks/brick.jpg', 'img/tanks/grass.png', 'img/tanks/concrete.png', 'img/tanks/ice.jpg', 'img/tanks/water.jpg']);\r\n            if (levels[level]) {\r\n                levels[level].forEach((row, rowIndex) => {\r\n                    row.forEach((col, colIndex) => {\r\n                        if (col === 1) {\r\n                            tiles.push(new tile_1.BrickTile(images[0], global_1.TILE_SIZE, global_1.TILE_SIZE, colIndex * global_1.TILE_SIZE, global_1.TILE_SIZE * rowIndex));\r\n                        }\r\n                        if (col === 2) {\r\n                            tiles.push(new tile_1.СoncreteTile(images[2], global_1.TILE_SIZE, global_1.TILE_SIZE, colIndex * global_1.TILE_SIZE, global_1.TILE_SIZE * rowIndex));\r\n                        }\r\n                        if (col === 3) {\r\n                            tiles.push(new tile_1.GrassTile(images[1], global_1.TILE_SIZE, global_1.TILE_SIZE, colIndex * global_1.TILE_SIZE, global_1.TILE_SIZE * rowIndex));\r\n                        }\r\n                        if (col === 4) {\r\n                            tiles.push(new tile_1.IceTile(images[3], global_1.TILE_SIZE, global_1.TILE_SIZE, colIndex * global_1.TILE_SIZE, global_1.TILE_SIZE * rowIndex));\r\n                        }\r\n                        if (col === 5) {\r\n                            tiles.push(new tile_1.WaterTile(images[4], global_1.TILE_SIZE, global_1.TILE_SIZE, colIndex * global_1.TILE_SIZE, global_1.TILE_SIZE * rowIndex));\r\n                        }\r\n                    });\r\n                });\r\n                return tiles;\r\n            }\r\n            else {\r\n                return null;\r\n            }\r\n        });\r\n    }\r\n    static loadImg(src) {\r\n        return new Promise((resolve, reject) => {\r\n            let imageBrick = new Image();\r\n            imageBrick.onload = () => {\r\n                resolve(imageBrick);\r\n            };\r\n            imageBrick.src = src;\r\n        });\r\n    }\r\n    static loadImages(images) {\r\n        let promises = [];\r\n        images.forEach(r => promises.push(this.loadImg(r)));\r\n        return Promise.all(promises);\r\n    }\r\n}\r\nexports.Level = Level;\r\nconst level1 = [\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],\r\n    [0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0],\r\n    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],\r\n    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],\r\n    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],\r\n    [2, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 2],\r\n    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],\r\n    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],\r\n    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],\r\n    [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],\r\n    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],\r\n    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]\r\n];\r\nconst level2 = [\r\n    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],\r\n    [0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],\r\n    [0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],\r\n    [0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 2, 1, 0],\r\n    [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 2, 0, 0, 0],\r\n    [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 2, 1, 2],\r\n    [3, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],\r\n    [3, 3, 3, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2, 0, 0],\r\n    [0, 0, 1, 1, 1, 3, 3, , 2, 0, 0, 0, 0, 1, 0],\r\n    [0, 0, 0, 0, 2, 3, 1, 0, 1, 0, 0, 1, 0, 1, 0],\r\n    [2, 2, 1, 0, 2, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],\r\n    [0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 2, 1, 0],\r\n    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0],\r\n    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0]\r\n];\r\nconst level3 = [\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]\r\n];\r\nconst levels = [level1, level2, level3];\r\n\n\n//# sourceURL=webpack:///./src/tanks/levels.ts?");

/***/ }),

/***/ "./src/tanks/player.ts":
/*!*****************************!*\
  !*** ./src/tanks/player.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst global_1 = __webpack_require__(/*! ./global */ \"./src/tanks/global.ts\");\r\nconst tank_1 = __webpack_require__(/*! ./tank */ \"./src/tanks/tank.ts\");\r\nvar TEST;\r\n(function (TEST) {\r\n})(TEST || (TEST = {}));\r\nclass Player extends tank_1.Tank {\r\n    constructor(img) {\r\n        super(img, global_1.TILE_SIZE - global_1.TILE_SIZE * 0.15, global_1.TILE_SIZE - global_1.TILE_SIZE * 0.15);\r\n        this.movementVel = global_1.WINDOW_SIZE / 7;\r\n        this.pressedKeys = {};\r\n        this.duration = 200;\r\n        this.start = new Date().getTime();\r\n        this.lives = 2;\r\n        this.type = 'player';\r\n        this.state = 'normal';\r\n        this.pos.x = global_1.WINDOW_SIZE / 2 - global_1.TILE_SIZE * 2 - this.size.x / 2;\r\n        this.pos.y = global_1.WINDOW_SIZE - this.size.y;\r\n    }\r\n    get bulletSpeed() {\r\n        let factor = 1;\r\n        switch (this.state) {\r\n            case 'normal':\r\n                factor = 1;\r\n                break;\r\n            case 'improved':\r\n                factor = 1.5;\r\n                break;\r\n            case 'superb':\r\n                factor = 2;\r\n                break;\r\n        }\r\n        return global_1.BULLET_SPEED * factor;\r\n    }\r\n    setStateNormal() {\r\n        this.state = 'normal';\r\n    }\r\n    setStateImproved() {\r\n        this.state = 'improved';\r\n    }\r\n    setStateSuperb() {\r\n        this.state = 'superb';\r\n    }\r\n    update(dt, tiles, game) {\r\n        this.keyboard();\r\n        this.move(dt, tiles, game);\r\n        if (this.isShoting && game.bullets.filter(r => r.source === 'player').length <= 0) {\r\n            let elapsed = new Date().getTime() - this.start;\r\n            if (elapsed > this.duration) {\r\n                this.fire(game);\r\n                this.start = new Date().getTime();\r\n            }\r\n        }\r\n        if (this.markForDeletion) {\r\n            this.markForDeletion = false;\r\n            this.isMoving = false;\r\n            this.vel.x = 0;\r\n            this.vel.y = 0;\r\n            this.pos.x = global_1.WINDOW_SIZE / 2 - global_1.TILE_SIZE * 2 - this.size.x / 2;\r\n            this.pos.y = global_1.WINDOW_SIZE - this.size.y;\r\n        }\r\n    }\r\n    keyboard() {\r\n        let currentKeyCode = Object.keys(this.pressedKeys)\r\n            .filter(r => r === 'k37' || r === 'k38' || r === 'k39' || r === 'k40')\r\n            .pop();\r\n        if (String(currentKeyCode) === 'k37') {\r\n            this.vel.x = -this.movementVel;\r\n            this.vel.y = 0;\r\n            this.direction = 'left';\r\n            this.isMoving = true;\r\n        }\r\n        if (String(currentKeyCode) === 'k38') {\r\n            this.vel.x = 0;\r\n            this.vel.y = -this.movementVel;\r\n            this.direction = 'up';\r\n            this.isMoving = true;\r\n        }\r\n        if (String(currentKeyCode) === 'k39') {\r\n            this.vel.x = this.movementVel;\r\n            this.vel.y = 0;\r\n            this.direction = 'right';\r\n            this.isMoving = true;\r\n        }\r\n        if (String(currentKeyCode) === 'k40') {\r\n            this.vel.x = 0;\r\n            this.vel.y = this.movementVel;\r\n            this.direction = 'down';\r\n            this.isMoving = true;\r\n        }\r\n        if (this.pressedKeys['k32']) {\r\n            if (!this.isShoting) {\r\n                this.isShoting = true;\r\n            }\r\n        }\r\n    }\r\n    addEventListeners() {\r\n        window.addEventListener('keyup', (e) => {\r\n            (e.keyCode === 37) && delete this.pressedKeys['k37'];\r\n            (e.keyCode === 38) && delete this.pressedKeys['k38'];\r\n            (e.keyCode === 39) && delete this.pressedKeys['k39'];\r\n            (e.keyCode === 40) && delete this.pressedKeys['k40'];\r\n            (e.keyCode === 32) && delete this.pressedKeys['k32'];\r\n            if (Object.keys(this.pressedKeys).indexOf('k37') === -1 &&\r\n                Object.keys(this.pressedKeys).indexOf('k38') === -1 &&\r\n                Object.keys(this.pressedKeys).indexOf('k39') === -1 &&\r\n                Object.keys(this.pressedKeys).indexOf('k40') === -1) {\r\n                this.isMoving = false;\r\n            }\r\n            if (Object.keys(this.pressedKeys).indexOf('k32') === -1) {\r\n                this.isShoting = false;\r\n            }\r\n        }, true);\r\n        window.addEventListener('keydown', (e) => {\r\n            this.pressedKeys['k' + e.keyCode] = e.type == 'keydown';\r\n        }, false);\r\n    }\r\n}\r\nexports.Player = Player;\r\n\n\n//# sourceURL=webpack:///./src/tanks/player.ts?");

/***/ }),

/***/ "./src/tanks/rect.ts":
/*!***************************!*\
  !*** ./src/tanks/rect.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vec_1 = __webpack_require__(/*! ./vec */ \"./src/tanks/vec.ts\");\r\nclass Rect {\r\n    constructor(w, h) {\r\n        this.pos = new vec_1.Vec;\r\n        this.size = new vec_1.Vec(w, h);\r\n    }\r\n    get left() {\r\n        return this.pos.x;\r\n    }\r\n    get right() {\r\n        return this.pos.x + this.size.x;\r\n    }\r\n    get top() {\r\n        return this.pos.y;\r\n    }\r\n    get bottom() {\r\n        return this.pos.y + this.size.y;\r\n    }\r\n}\r\nexports.Rect = Rect;\r\n\n\n//# sourceURL=webpack:///./src/tanks/rect.ts?");

/***/ }),

/***/ "./src/tanks/tank.ts":
/*!***************************!*\
  !*** ./src/tanks/tank.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nconst vec_1 = __webpack_require__(/*! ./vec */ \"./src/tanks/vec.ts\");\r\nconst global_1 = __webpack_require__(/*! ./global */ \"./src/tanks/global.ts\");\r\nconst audio_1 = __webpack_require__(/*! ./audio */ \"./src/tanks/audio.ts\");\r\nconst bullet_1 = __webpack_require__(/*! ./bullet */ \"./src/tanks/bullet.ts\");\r\nconst tile_1 = __webpack_require__(/*! ./tile */ \"./src/tanks/tile.ts\");\r\nclass Tank extends rect_1.Rect {\r\n    constructor(img, w, h) {\r\n        super(w, h);\r\n        this.direction = 'right';\r\n        this.canvases = [];\r\n        this.isMoving = false;\r\n        this.isShoting = false;\r\n        this.moveParams = [];\r\n        this.type = 'bot';\r\n        this.surfaceMoveFactor = 1;\r\n        this.img = img;\r\n        this.vel = new vec_1.Vec;\r\n        this.moveParams = [\r\n            { deg: -90, translate: { x: 0, y: this.size.y } },\r\n            { deg: 90, translate: { x: this.size.x, y: 0 } },\r\n            { deg: 0, translate: { x: 0, y: 0 } },\r\n            { deg: 180, translate: { x: this.size.x, y: this.size.y } }\r\n        ];\r\n        this.moveParams.forEach((r) => {\r\n            this.canvases.push(this.genCanvas(r));\r\n        });\r\n    }\r\n    get bulletSpeed() {\r\n        let factor = 1;\r\n        return global_1.BULLET_SPEED * factor;\r\n    }\r\n    genCanvas(r) {\r\n        let canvas = document.createElement('canvas');\r\n        let ctx = canvas.getContext('2d');\r\n        canvas.width = this.size.x;\r\n        canvas.height = this.size.y;\r\n        ctx.translate(r.translate.x, r.translate.y);\r\n        ctx.rotate(r.deg * Math.PI / 180);\r\n        ctx.drawImage(this.img, 0, 0, this.size.x, this.size.y);\r\n        return canvas;\r\n    }\r\n    draw(ctx) {\r\n        let canvas;\r\n        switch (this.direction) {\r\n            case 'left':\r\n                canvas = this.canvases[0];\r\n                break;\r\n            case 'right':\r\n                canvas = this.canvases[1];\r\n                break;\r\n            case 'up':\r\n                canvas = this.canvases[2];\r\n                break;\r\n            case 'down':\r\n                canvas = this.canvases[3];\r\n                break;\r\n        }\r\n        ctx.drawImage(canvas, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n    }\r\n    intersection(obstacles, subject, fn) {\r\n        this.surfaceMoveFactor = 1;\r\n        obstacles\r\n            .filter(obstacle => obstacle.overlap(subject, obstacle)).forEach((tile) => {\r\n            if (tile instanceof tile_1.IceTile) {\r\n                this.surfaceMoveFactor = 1.4;\r\n            }\r\n            else if (tile instanceof tile_1.GrassTile) {\r\n                this.surfaceMoveFactor = 0.6;\r\n            }\r\n            else {\r\n                fn(tile);\r\n            }\r\n        });\r\n    }\r\n    move(dt, obstacles, game) {\r\n        if (this.isMoving) {\r\n            this.pos.x += Math.round(this.vel.x * dt) * this.surfaceMoveFactor;\r\n            if (this.vel.x > 0) {\r\n                this.intersection(obstacles, this, rect => {\r\n                    if (this.right > rect.left) {\r\n                        this.pos.x = rect.left - this.size.x;\r\n                        this.onCollision();\r\n                    }\r\n                });\r\n            }\r\n            else if (this.vel.x < 0) {\r\n                this.intersection(obstacles, this, rect => {\r\n                    if (this.left < rect.right) {\r\n                        this.pos.x = rect.right;\r\n                        this.onCollision();\r\n                    }\r\n                });\r\n            }\r\n            this.pos.y += Math.round(this.vel.y * dt) * this.surfaceMoveFactor;\r\n            if (this.vel.y > 0) {\r\n                this.intersection(obstacles, this, rect => {\r\n                    if (this.bottom > rect.top) {\r\n                        this.pos.y = rect.top - this.size.y;\r\n                        this.onCollision();\r\n                    }\r\n                });\r\n            }\r\n            else if (this.vel.y < 0) {\r\n                this.intersection(obstacles, this, rect => {\r\n                    if (this.top < rect.bottom) {\r\n                        this.pos.y = rect.bottom;\r\n                        this.onCollision();\r\n                    }\r\n                });\r\n            }\r\n            this.wallCollider(game);\r\n        }\r\n    }\r\n    wallCollider(game) {\r\n        if (this.top <= 0) {\r\n            this.vel.y = 0;\r\n            this.pos.y = 0;\r\n            this.onCollision();\r\n        }\r\n        if (this.bottom > game.canvas.height) {\r\n            this.vel.y = 0;\r\n            this.pos.y = game.canvas.height - this.size.y;\r\n            this.onCollision();\r\n        }\r\n        if (this.left <= 0) {\r\n            this.vel.x = 0;\r\n            this.pos.x = 0;\r\n            this.onCollision();\r\n        }\r\n        else if (this.right >= game.canvas.width) {\r\n            this.vel.x = 0;\r\n            this.pos.x = game.canvas.width - this.size.x;\r\n            this.onCollision();\r\n        }\r\n    }\r\n    onCollision() {\r\n    }\r\n    fire(game) {\r\n        let bullet = new bullet_1.Bullet(this.type, 4, 4);\r\n        if (this.direction === 'left') {\r\n            bullet.pos.x = this.pos.x;\r\n            bullet.pos.y = this.pos.y + this.size.y / 2 - 2;\r\n            bullet.vel.y = 0;\r\n            bullet.vel.x = -this.bulletSpeed;\r\n        }\r\n        else if (this.direction === 'right') {\r\n            bullet.pos.x = this.right;\r\n            bullet.pos.y = this.pos.y + this.size.y / 2 - 2;\r\n            bullet.vel.y = 0;\r\n            bullet.vel.x = this.bulletSpeed;\r\n        }\r\n        else if (this.direction === 'down') {\r\n            bullet.pos.x = this.pos.x + this.size.x / 2 - 2;\r\n            bullet.pos.y = this.pos.y + this.size.y;\r\n            bullet.vel.y = this.bulletSpeed;\r\n        }\r\n        else if (this.direction === 'up') {\r\n            bullet.pos.x = this.pos.x + this.size.x / 2 - 2;\r\n            bullet.pos.y = this.pos.y;\r\n            bullet.vel.y = -this.bulletSpeed;\r\n        }\r\n        audio_1.default.play('tanks/sounds/fire.ogg');\r\n        game.bullets.push(bullet);\r\n    }\r\n}\r\nexports.Tank = Tank;\r\n\n\n//# sourceURL=webpack:///./src/tanks/tank.ts?");

/***/ }),

/***/ "./src/tanks/tanks.less":
/*!******************************!*\
  !*** ./src/tanks/tanks.less ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/tanks/tanks.less?");

/***/ }),

/***/ "./src/tanks/tile.ts":
/*!***************************!*\
  !*** ./src/tanks/tile.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nclass Tile extends rect_1.Rect {\r\n    constructor(img, w, h, x, y) {\r\n        super(w, h);\r\n        this.hits = 0;\r\n        this.markForDeletion = false;\r\n        this.hitsToDestroy = 2;\r\n        this.collideWithBullet = true;\r\n        this.canBeDestroyed = true;\r\n        this.collideWithUser = false;\r\n        this.img = img;\r\n        this.pos.x = x;\r\n        this.pos.y = y;\r\n    }\r\n    draw(ctx) {\r\n        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n    }\r\n    overlap(subject, rect) {\r\n        return subject.bottom > rect.top\r\n            && subject.top < rect.bottom\r\n            && subject.right > rect.left\r\n            && subject.left < rect.right;\r\n    }\r\n}\r\nexports.Tile = Tile;\r\nclass BrickTile extends Tile {\r\n}\r\nexports.BrickTile = BrickTile;\r\nclass GrassTile extends Tile {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.collideWithBullet = false;\r\n        this.canBeDestroyed = false;\r\n    }\r\n}\r\nexports.GrassTile = GrassTile;\r\nclass СoncreteTile extends Tile {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.canBeDestroyed = false;\r\n    }\r\n}\r\nexports.СoncreteTile = СoncreteTile;\r\nclass IceTile extends Tile {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.collideWithBullet = false;\r\n        this.canBeDestroyed = false;\r\n    }\r\n}\r\nexports.IceTile = IceTile;\r\nclass WaterTile extends Tile {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.collideWithBullet = false;\r\n        this.canBeDestroyed = false;\r\n    }\r\n}\r\nexports.WaterTile = WaterTile;\r\n\n\n//# sourceURL=webpack:///./src/tanks/tile.ts?");

/***/ }),

/***/ "./src/tanks/vec.ts":
/*!**************************!*\
  !*** ./src/tanks/vec.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Vec {\r\n    constructor(x = 0, y = 0) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n}\r\nexports.Vec = Vec;\r\n\n\n//# sourceURL=webpack:///./src/tanks/vec.ts?");

/***/ })

/******/ });