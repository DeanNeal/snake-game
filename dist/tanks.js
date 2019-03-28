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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tanks/tanks.ts");
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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar AudioController = (function () {\r\n    function AudioController() {\r\n    }\r\n    AudioController.prototype.play = function (url, volume, loop) {\r\n        if (volume === void 0) { volume = 0.2; }\r\n        if (loop === void 0) { loop = false; }\r\n        var audio = new Audio('audio/' + url);\r\n        audio.loop = loop;\r\n        audio.volume = volume;\r\n        audio.play();\r\n    };\r\n    return AudioController;\r\n}());\r\nexports.default = new AudioController();\r\n\n\n//# sourceURL=webpack:///./src/tanks/audio.ts?");

/***/ }),

/***/ "./src/tanks/bullet.ts":
/*!*****************************!*\
  !*** ./src/tanks/bullet.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar vec_1 = __webpack_require__(/*! ./vec */ \"./src/tanks/vec.ts\");\r\nvar rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nvar audio_1 = __webpack_require__(/*! ./audio */ \"./src/tanks/audio.ts\");\r\nvar tile_1 = __webpack_require__(/*! ./tile */ \"./src/tanks/tile.ts\");\r\nvar Bullet = (function (_super) {\r\n    __extends(Bullet, _super);\r\n    function Bullet(width, height) {\r\n        var _this = _super.call(this, width, height) || this;\r\n        _this.markForDeletion = false;\r\n        _this.vel = new vec_1.Vec;\r\n        return _this;\r\n    }\r\n    Bullet.prototype.draw = function (ctx) {\r\n        ctx.fillStyle = '#ccc';\r\n        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n    };\r\n    Bullet.prototype.collision = function (player, game) {\r\n        var _this = this;\r\n        game.tiles.forEach(function (tile) {\r\n            if (tile.collisionDetection) {\r\n                if ((tile.top <= _this.bottom &&\r\n                    tile.left <= _this.right &&\r\n                    tile.right >= _this.left &&\r\n                    tile.bottom >= _this.top)) {\r\n                    _this.markForDeletion = true;\r\n                    if (tile instanceof tile_1.Brick) {\r\n                        tile.hits++;\r\n                        if (tile.hits >= tile.hitsToDestroy) {\r\n                            tile.markForDeletion = true;\r\n                        }\r\n                        audio_1.default.play('tanks/brick.wav', 0.4);\r\n                    }\r\n                    else if (tile instanceof tile_1.Сoncrete) {\r\n                        audio_1.default.play('tanks/concrete.wav', 0.4);\r\n                    }\r\n                }\r\n            }\r\n        });\r\n        if (this.pos.x <= 0 || this.pos.x >= game.canvas.width || this.pos.y <= 0 || this.pos.y >= game.canvas.height) {\r\n            this.markForDeletion = true;\r\n        }\r\n        if ((game.eagle.top <= this.bottom &&\r\n            game.eagle.left <= this.right &&\r\n            game.eagle.right >= this.left &&\r\n            game.eagle.bottom >= this.top)) {\r\n            game.eagle.markForDeletion = true;\r\n            this.markForDeletion = true;\r\n            audio_1.default.play('tanks/eagle.wav', 0.4);\r\n        }\r\n    };\r\n    return Bullet;\r\n}(rect_1.Rect));\r\nexports.Bullet = Bullet;\r\n\n\n//# sourceURL=webpack:///./src/tanks/bullet.ts?");

/***/ }),

/***/ "./src/tanks/eagle.ts":
/*!****************************!*\
  !*** ./src/tanks/eagle.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nvar Eagle = (function (_super) {\r\n    __extends(Eagle, _super);\r\n    function Eagle(img, w, h, x, y) {\r\n        var _this = _super.call(this, w, h) || this;\r\n        _this.markForDeletion = false;\r\n        _this.img = img;\r\n        _this.pos.x = x;\r\n        _this.pos.y = y;\r\n        return _this;\r\n    }\r\n    Eagle.prototype.collision = function () {\r\n    };\r\n    Eagle.prototype.draw = function (ctx) {\r\n        if (this.markForDeletion === false) {\r\n            ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n        }\r\n        else {\r\n            ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n        }\r\n    };\r\n    return Eagle;\r\n}(rect_1.Rect));\r\nexports.Eagle = Eagle;\r\n\n\n//# sourceURL=webpack:///./src/tanks/eagle.ts?");

/***/ }),

/***/ "./src/tanks/global.ts":
/*!*****************************!*\
  !*** ./src/tanks/global.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.WINDOW_SIZE = window.innerHeight - 50;\r\nexports.TILE_SIZE = exports.WINDOW_SIZE / 15;\r\nexports.BULLET_SPEED = 500;\r\n\n\n//# sourceURL=webpack:///./src/tanks/global.ts?");

/***/ }),

/***/ "./src/tanks/levels.ts":
/*!*****************************!*\
  !*** ./src/tanks/levels.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar tile_1 = __webpack_require__(/*! ./tile */ \"./src/tanks/tile.ts\");\r\nvar global_1 = __webpack_require__(/*! ./global */ \"./src/tanks/global.ts\");\r\nvar Level = (function () {\r\n    function Level() {\r\n    }\r\n    Level.prototype.build = function (levelName) {\r\n        return new Promise(function (resolve, reject) {\r\n            var tiles = [];\r\n            Level.loadImages(['img/tanks/brick.jpg', 'img/tanks/grass.jpg', 'img/tanks/concrete.png', 'img/tanks/water.jpg']).then(function (images) {\r\n                levels[levelName].forEach(function (row, rowIndex) {\r\n                    row.forEach(function (col, colIndex) {\r\n                        if (col === 1) {\r\n                            tiles.push(new tile_1.Brick(images[0], global_1.TILE_SIZE, global_1.TILE_SIZE, colIndex * global_1.TILE_SIZE, global_1.TILE_SIZE * rowIndex));\r\n                        }\r\n                        if (col === 2) {\r\n                            tiles.push(new tile_1.Grass(images[1], global_1.TILE_SIZE, global_1.TILE_SIZE, colIndex * global_1.TILE_SIZE, global_1.TILE_SIZE * rowIndex));\r\n                        }\r\n                        if (col === 3) {\r\n                            tiles.push(new tile_1.Сoncrete(images[2], global_1.TILE_SIZE, global_1.TILE_SIZE, colIndex * global_1.TILE_SIZE, global_1.TILE_SIZE * rowIndex));\r\n                        }\r\n                    });\r\n                });\r\n                resolve(tiles);\r\n            });\r\n        });\r\n    };\r\n    Level.loadImg = function (src) {\r\n        return new Promise(function (resolve, reject) {\r\n            var imageBrick = new Image();\r\n            imageBrick.onload = function () {\r\n                resolve(imageBrick);\r\n            };\r\n            imageBrick.src = src;\r\n        });\r\n    };\r\n    Level.loadImages = function (images) {\r\n        var _this = this;\r\n        var promises = [];\r\n        images.forEach(function (r) { return promises.push(_this.loadImg(r)); });\r\n        return Promise.all(promises);\r\n    };\r\n    return Level;\r\n}());\r\nexports.Level = Level;\r\nvar level1 = [\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]\r\n];\r\nvar level2 = [\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],\r\n    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]\r\n];\r\nvar levels = {\r\n    level1: level1,\r\n    level2: level2\r\n};\r\n\n\n//# sourceURL=webpack:///./src/tanks/levels.ts?");

/***/ }),

/***/ "./src/tanks/player.ts":
/*!*****************************!*\
  !*** ./src/tanks/player.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar vec_1 = __webpack_require__(/*! ./vec */ \"./src/tanks/vec.ts\");\r\nvar rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nvar global_1 = __webpack_require__(/*! ./global */ \"./src/tanks/global.ts\");\r\nvar Player = (function (_super) {\r\n    __extends(Player, _super);\r\n    function Player(img, width, height) {\r\n        var _this = _super.call(this, width, height) || this;\r\n        _this.canvases = [];\r\n        _this.direction = 'right';\r\n        _this.state = 'normal';\r\n        _this.movementVel = global_1.WINDOW_SIZE / 7;\r\n        _this.img = img;\r\n        _this.vel = new vec_1.Vec;\r\n        [\r\n            { deg: -90, translate: { x: 0, y: _this.size.y } },\r\n            { deg: 90, translate: { x: _this.size.x, y: 0 } },\r\n            { deg: 0, translate: { x: 0, y: 0 } },\r\n            { deg: 180, translate: { x: _this.size.x, y: _this.size.y } }\r\n        ].forEach(function (r) {\r\n            _this.canvases.push(_this.genCanvas(r));\r\n        });\r\n        return _this;\r\n    }\r\n    Player.prototype.genCanvas = function (r) {\r\n        var canvas = document.createElement('canvas');\r\n        var ctx = canvas.getContext('2d');\r\n        canvas.width = this.size.x;\r\n        canvas.height = this.size.y;\r\n        ctx.translate(r.translate.x, r.translate.y);\r\n        ctx.rotate(r.deg * Math.PI / 180);\r\n        ctx.drawImage(this.img, 0, 0, this.size.x, this.size.y);\r\n        return canvas;\r\n    };\r\n    Player.prototype.draw = function (ctx) {\r\n        var canvas;\r\n        switch (this.direction) {\r\n            case 'left':\r\n                canvas = this.canvases[0];\r\n                break;\r\n            case 'right':\r\n                canvas = this.canvases[1];\r\n                break;\r\n            case 'up':\r\n                canvas = this.canvases[2];\r\n                break;\r\n            case 'down':\r\n                canvas = this.canvases[3];\r\n                break;\r\n        }\r\n        ctx.drawImage(canvas, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n    };\r\n    Player.prototype.intersection = function (obstacles, subject, fn) {\r\n        obstacles.filter(function (obstacle) { return obstacle.overlap(subject, obstacle); }).forEach(fn);\r\n    };\r\n    Player.prototype.move = function (dt, obstacles) {\r\n        var _this = this;\r\n        this.pos.x += Math.round(this.vel.x * dt);\r\n        if (this.vel.x > 0) {\r\n            this.intersection(obstacles, this, function (rect) {\r\n                if (_this.right > rect.left) {\r\n                    _this.pos.x = rect.left - _this.size.x;\r\n                }\r\n            });\r\n        }\r\n        else if (this.vel.x < 0) {\r\n            this.intersection(obstacles, this, function (rect) {\r\n                if (_this.left < rect.right) {\r\n                    _this.pos.x = rect.right;\r\n                }\r\n            });\r\n        }\r\n        this.pos.y += Math.round(this.vel.y * dt);\r\n        if (this.vel.y > 0) {\r\n            this.intersection(obstacles, this, function (rect) {\r\n                if (_this.bottom > rect.top) {\r\n                    _this.pos.y = rect.top - _this.size.y;\r\n                }\r\n            });\r\n        }\r\n        else if (this.vel.y < 0) {\r\n            this.intersection(obstacles, this, function (rect) {\r\n                if (_this.top < rect.bottom) {\r\n                    _this.pos.y = rect.bottom;\r\n                }\r\n            });\r\n        }\r\n    };\r\n    return Player;\r\n}(rect_1.Rect));\r\nexports.Player = Player;\r\n\n\n//# sourceURL=webpack:///./src/tanks/player.ts?");

/***/ }),

/***/ "./src/tanks/rect.ts":
/*!***************************!*\
  !*** ./src/tanks/rect.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar vec_1 = __webpack_require__(/*! ./vec */ \"./src/tanks/vec.ts\");\r\nvar Rect = (function () {\r\n    function Rect(w, h) {\r\n        this.pos = new vec_1.Vec;\r\n        this.size = new vec_1.Vec(w, h);\r\n    }\r\n    Object.defineProperty(Rect.prototype, \"left\", {\r\n        get: function () {\r\n            return this.pos.x;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Rect.prototype, \"right\", {\r\n        get: function () {\r\n            return this.pos.x + this.size.x;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Rect.prototype, \"top\", {\r\n        get: function () {\r\n            return this.pos.y;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Rect.prototype, \"bottom\", {\r\n        get: function () {\r\n            return this.pos.y + this.size.y;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return Rect;\r\n}());\r\nexports.Rect = Rect;\r\n\n\n//# sourceURL=webpack:///./src/tanks/rect.ts?");

/***/ }),

/***/ "./src/tanks/tanks.less":
/*!******************************!*\
  !*** ./src/tanks/tanks.less ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/tanks/tanks.less?");

/***/ }),

/***/ "./src/tanks/tanks.ts":
/*!****************************!*\
  !*** ./src/tanks/tanks.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(/*! ./tanks.less */ \"./src/tanks/tanks.less\");\r\nvar bullet_1 = __webpack_require__(/*! ./bullet */ \"./src/tanks/bullet.ts\");\r\nvar player_1 = __webpack_require__(/*! ./player */ \"./src/tanks/player.ts\");\r\nvar audio_1 = __webpack_require__(/*! ./audio */ \"./src/tanks/audio.ts\");\r\nvar levels_1 = __webpack_require__(/*! ./levels */ \"./src/tanks/levels.ts\");\r\nvar eagle_1 = __webpack_require__(/*! ./eagle */ \"./src/tanks/eagle.ts\");\r\nvar global_1 = __webpack_require__(/*! ./global */ \"./src/tanks/global.ts\");\r\nvar isMobile = (\"ontouchstart\" in document.documentElement);\r\nvar Tanks = (function () {\r\n    function Tanks(canvas) {\r\n        var _this = this;\r\n        this.steps = false;\r\n        this.isMoving = false;\r\n        this.stacked = false;\r\n        this.bullets = [];\r\n        this.tiles = [];\r\n        this.isShoting = false;\r\n        this.duration = 200;\r\n        this.start = new Date().getTime();\r\n        this.pressedKeys = {};\r\n        this.canvas = canvas;\r\n        this.context = canvas.getContext('2d');\r\n        canvas.width = global_1.WINDOW_SIZE;\r\n        canvas.height = global_1.WINDOW_SIZE;\r\n        var level = new levels_1.Level();\r\n        level.build('level1').then(function (tiles) {\r\n            _this.tiles = tiles;\r\n        });\r\n        levels_1.Level.loadImages(['img/tanks/tank.png', 'img/tanks/eagle.png']).then(function (images) {\r\n            _this.player = new player_1.Player(images[0], global_1.TILE_SIZE - 8, global_1.TILE_SIZE - 8);\r\n            _this.player.pos.x = 100;\r\n            _this.player.pos.y = canvas.height - _this.player.size.y;\r\n            _this.eagle = new eagle_1.Eagle(images[1], global_1.TILE_SIZE, global_1.TILE_SIZE, _this.canvas.width / 2 - global_1.TILE_SIZE / 2, _this.canvas.height - global_1.TILE_SIZE);\r\n            _this.startUpdate();\r\n            _this.addEventListeners();\r\n        });\r\n    }\r\n    Tanks.prototype.startUpdate = function () {\r\n        var _this = this;\r\n        var lastTime;\r\n        var callback = function (ms) {\r\n            if (lastTime) {\r\n                _this.update((ms - lastTime) / 1000);\r\n            }\r\n            lastTime = ms;\r\n            requestAnimationFrame(callback);\r\n        };\r\n        callback();\r\n    };\r\n    Tanks.prototype.addEventListeners = function () {\r\n        var _this = this;\r\n        window.addEventListener('keyup', function (e) {\r\n            (e.keyCode === 37) && delete _this.pressedKeys['k37'];\r\n            (e.keyCode === 38) && delete _this.pressedKeys['k38'];\r\n            (e.keyCode === 39) && delete _this.pressedKeys['k39'];\r\n            (e.keyCode === 40) && delete _this.pressedKeys['k40'];\r\n            (e.keyCode === 32) && delete _this.pressedKeys['k32'];\r\n            if (Object.keys(_this.pressedKeys).indexOf('k37') === -1 &&\r\n                Object.keys(_this.pressedKeys).indexOf('k38') === -1 &&\r\n                Object.keys(_this.pressedKeys).indexOf('k39') === -1 &&\r\n                Object.keys(_this.pressedKeys).indexOf('k40') === -1) {\r\n                _this.isMoving = false;\r\n            }\r\n            if (Object.keys(_this.pressedKeys).indexOf('k32') === -1) {\r\n                _this.isShoting = false;\r\n            }\r\n        }, true);\r\n        window.addEventListener('keydown', function (e) {\r\n            _this.pressedKeys['k' + e.keyCode] = e.type == 'keydown';\r\n        }, false);\r\n    };\r\n    Tanks.prototype.movePlayer = function () {\r\n        var currentKeyCode = Object.keys(this.pressedKeys)\r\n            .filter(function (r) { return r === 'k37' || r === 'k38' || r === 'k39' || r === 'k40'; })\r\n            .pop();\r\n        if (String(currentKeyCode) === 'k37') {\r\n            this.player.vel.x = -this.player.movementVel;\r\n            this.player.vel.y = 0;\r\n            this.player.direction = 'left';\r\n            this.isMoving = true;\r\n        }\r\n        if (String(currentKeyCode) === 'k38') {\r\n            this.player.vel.x = 0;\r\n            this.player.vel.y = -this.player.movementVel;\r\n            this.player.direction = 'up';\r\n            this.isMoving = true;\r\n        }\r\n        if (String(currentKeyCode) === 'k39') {\r\n            this.player.vel.x = this.player.movementVel;\r\n            this.player.vel.y = 0;\r\n            this.player.direction = 'right';\r\n            this.isMoving = true;\r\n        }\r\n        if (String(currentKeyCode) === 'k40') {\r\n            this.player.vel.x = 0;\r\n            this.player.vel.y = this.player.movementVel;\r\n            this.player.direction = 'down';\r\n            this.isMoving = true;\r\n        }\r\n        if (this.pressedKeys['k32']) {\r\n            if (!this.isShoting) {\r\n                this.start = new Date().getTime() - this.duration;\r\n                this.isShoting = true;\r\n            }\r\n        }\r\n    };\r\n    Tanks.prototype.fire = function () {\r\n        var bullet = new bullet_1.Bullet(4, 4);\r\n        if (this.player.direction === 'left') {\r\n            bullet.pos.x = this.player.pos.x;\r\n            bullet.pos.y = this.player.pos.y + this.player.size.y / 2 - 2;\r\n            bullet.vel.y = 0;\r\n            bullet.vel.x = -global_1.BULLET_SPEED;\r\n        }\r\n        else if (this.player.direction === 'right') {\r\n            bullet.pos.x = this.player.right;\r\n            bullet.pos.y = this.player.pos.y + this.player.size.y / 2 - 2;\r\n            bullet.vel.y = 0;\r\n            bullet.vel.x = global_1.BULLET_SPEED;\r\n        }\r\n        else if (this.player.direction === 'down') {\r\n            bullet.pos.x = this.player.pos.x + this.player.size.x / 2 - 2;\r\n            bullet.pos.y = this.player.pos.y + this.player.size.y;\r\n            bullet.vel.y = global_1.BULLET_SPEED;\r\n        }\r\n        else if (this.player.direction === 'up') {\r\n            bullet.pos.x = this.player.pos.x + this.player.size.x / 2 - 2;\r\n            bullet.pos.y = this.player.pos.y;\r\n            bullet.vel.y = -global_1.BULLET_SPEED;\r\n        }\r\n        audio_1.default.play('tanks/sounds/fire.ogg');\r\n        this.bullets.push(bullet);\r\n    };\r\n    Tanks.prototype.draw = function () {\r\n        var _this = this;\r\n        this.context.fillStyle = '#000';\r\n        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n        this.player.draw(this.context);\r\n        this.bullets = this.bullets.filter(function (r) { return !r.markForDeletion; });\r\n        this.bullets.forEach(function (bullet) { return bullet.draw(_this.context); });\r\n        this.tiles = this.tiles.filter(function (r) { return !r.markForDeletion; });\r\n        this.tiles.forEach(function (brick) { return brick.draw(_this.context); });\r\n        this.eagle.draw(this.context);\r\n    };\r\n    Tanks.prototype.collider = function () {\r\n        var _this = this;\r\n        this.bullets.forEach(function (bullet) { return bullet.collision(_this.player, _this); });\r\n    };\r\n    Tanks.prototype.update = function (dt) {\r\n        this.movePlayer();\r\n        if (this.isMoving) {\r\n            this.player.move(dt, this.tiles);\r\n        }\r\n        if (this.isShoting && this.bullets.length <= 0) {\r\n            var elapsed = new Date().getTime() - this.start;\r\n            if (elapsed > this.duration) {\r\n                this.fire();\r\n                this.start = new Date().getTime();\r\n            }\r\n        }\r\n        this.bullets.forEach(function (bullet) {\r\n            bullet.pos.x += bullet.vel.x * dt;\r\n            bullet.pos.y += bullet.vel.y * dt;\r\n        });\r\n        if (this.player.top <= 0) {\r\n            this.player.vel.y = 0;\r\n            this.player.pos.y = 0;\r\n        }\r\n        if (this.player.bottom > this.canvas.height) {\r\n            this.player.vel.y = 0;\r\n            this.player.pos.y = this.canvas.height - this.player.size.y;\r\n        }\r\n        if (this.player.left <= 0) {\r\n            this.player.vel.x = 0;\r\n            this.player.pos.x = 0;\r\n        }\r\n        else if (this.player.right >= this.canvas.width) {\r\n            this.player.vel.x = 0;\r\n            this.player.pos.x = this.canvas.width - this.player.size.x;\r\n        }\r\n        this.collider();\r\n        this.draw();\r\n    };\r\n    return Tanks;\r\n}());\r\nvar canvas = document.getElementById('tanks');\r\nnew Tanks(canvas);\r\n\n\n//# sourceURL=webpack:///./src/tanks/tanks.ts?");

/***/ }),

/***/ "./src/tanks/tile.ts":
/*!***************************!*\
  !*** ./src/tanks/tile.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nvar Tile = (function (_super) {\r\n    __extends(Tile, _super);\r\n    function Tile(img, w, h, x, y) {\r\n        var _this = _super.call(this, w, h) || this;\r\n        _this.hits = 0;\r\n        _this.markForDeletion = false;\r\n        _this.hitsToDestroy = 2;\r\n        _this.collisionDetection = true;\r\n        _this.canBeDestroyed = true;\r\n        _this.collideWithUser = false;\r\n        _this.img = img;\r\n        _this.pos.x = x;\r\n        _this.pos.y = y;\r\n        return _this;\r\n    }\r\n    Tile.prototype.draw = function (ctx) {\r\n        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n    };\r\n    Tile.prototype.collision = function (player) {\r\n    };\r\n    Tile.prototype.overlap = function (subject, rect) {\r\n        return subject.bottom > rect.top\r\n            && subject.top < rect.bottom\r\n            && subject.right > rect.left\r\n            && subject.left < rect.right;\r\n    };\r\n    Tile.prototype.checkX = function (player) {\r\n    };\r\n    Tile.prototype.checkY = function (player) {\r\n    };\r\n    return Tile;\r\n}(rect_1.Rect));\r\nexports.Tile = Tile;\r\nvar Brick = (function (_super) {\r\n    __extends(Brick, _super);\r\n    function Brick() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    return Brick;\r\n}(Tile));\r\nexports.Brick = Brick;\r\nvar Grass = (function (_super) {\r\n    __extends(Grass, _super);\r\n    function Grass() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.collisionDetection = false;\r\n        _this.canBeDestroyed = false;\r\n        return _this;\r\n    }\r\n    return Grass;\r\n}(Tile));\r\nexports.Grass = Grass;\r\nvar Сoncrete = (function (_super) {\r\n    __extends(Сoncrete, _super);\r\n    function Сoncrete() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.canBeDestroyed = false;\r\n        return _this;\r\n    }\r\n    return Сoncrete;\r\n}(Tile));\r\nexports.Сoncrete = Сoncrete;\r\n\n\n//# sourceURL=webpack:///./src/tanks/tile.ts?");

/***/ }),

/***/ "./src/tanks/vec.ts":
/*!**************************!*\
  !*** ./src/tanks/vec.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Vec = (function () {\r\n    function Vec(x, y) {\r\n        if (x === void 0) { x = 0; }\r\n        if (y === void 0) { y = 0; }\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return Vec;\r\n}());\r\nexports.Vec = Vec;\r\n\n\n//# sourceURL=webpack:///./src/tanks/vec.ts?");

/***/ })

/******/ });