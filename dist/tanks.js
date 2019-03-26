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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar AudioController = (function () {\r\n    function AudioController() {\r\n    }\r\n    AudioController.prototype.play = function (url) {\r\n        var audio = new Audio('audio/' + url);\r\n        audio.volume = 0.2;\r\n        audio.play();\r\n    };\r\n    return AudioController;\r\n}());\r\nexports.default = new AudioController();\r\n\n\n//# sourceURL=webpack:///./src/tanks/audio.ts?");

/***/ }),

/***/ "./src/tanks/brick.ts":
/*!****************************!*\
  !*** ./src/tanks/brick.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nvar Brick = (function (_super) {\r\n    __extends(Brick, _super);\r\n    function Brick(img, width, height, x, y) {\r\n        var _this = _super.call(this, width, height) || this;\r\n        _this.markForDeletion = false;\r\n        _this.img = img;\r\n        _this.pos.x = x;\r\n        _this.pos.y = y;\r\n        return _this;\r\n    }\r\n    Brick.prototype.draw = function (ctx) {\r\n        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n    };\r\n    Brick.prototype.collision = function (player, game) {\r\n    };\r\n    return Brick;\r\n}(rect_1.Rect));\r\nexports.Brick = Brick;\r\n\n\n//# sourceURL=webpack:///./src/tanks/brick.ts?");

/***/ }),

/***/ "./src/tanks/bullet.ts":
/*!*****************************!*\
  !*** ./src/tanks/bullet.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar vec_1 = __webpack_require__(/*! ./vec */ \"./src/tanks/vec.ts\");\r\nvar rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nvar audio_1 = __webpack_require__(/*! ./audio */ \"./src/tanks/audio.ts\");\r\nvar Bullet = (function (_super) {\r\n    __extends(Bullet, _super);\r\n    function Bullet(width, height) {\r\n        var _this = _super.call(this, width, height) || this;\r\n        _this.markForDeletion = false;\r\n        _this.vel = new vec_1.Vec;\r\n        return _this;\r\n    }\r\n    Bullet.prototype.draw = function (ctx) {\r\n        ctx.fillStyle = '#ccc';\r\n        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n    };\r\n    Bullet.prototype.collision = function (player, game) {\r\n        var _this = this;\r\n        game.bricks.forEach(function (brick) {\r\n            if ((brick.top <= _this.bottom &&\r\n                brick.left <= _this.right &&\r\n                brick.right >= _this.left &&\r\n                brick.bottom >= _this.top)) {\r\n                _this.markForDeletion = true;\r\n                brick.markForDeletion = true;\r\n                audio_1.default.play('tanks/Battle City SFX (5).wav');\r\n            }\r\n        });\r\n        if (this.pos.x <= 0 || this.pos.x >= game.canvas.width || this.pos.y <= 0 || this.pos.y >= game.canvas.height) {\r\n            this.markForDeletion = true;\r\n        }\r\n    };\r\n    return Bullet;\r\n}(rect_1.Rect));\r\nexports.Bullet = Bullet;\r\n\n\n//# sourceURL=webpack:///./src/tanks/bullet.ts?");

/***/ }),

/***/ "./src/tanks/player.ts":
/*!*****************************!*\
  !*** ./src/tanks/player.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar vec_1 = __webpack_require__(/*! ./vec */ \"./src/tanks/vec.ts\");\r\nvar rect_1 = __webpack_require__(/*! ./rect */ \"./src/tanks/rect.ts\");\r\nvar Player = (function (_super) {\r\n    __extends(Player, _super);\r\n    function Player(img, width, height, name) {\r\n        var _this = _super.call(this, width, height) || this;\r\n        _this.canvases = [];\r\n        _this.direction = 'right';\r\n        _this.name = name;\r\n        _this.img = img;\r\n        _this.vel = new vec_1.Vec;\r\n        _this.canvases = [\r\n            _this.leftCanvas(),\r\n            _this.rightCanvas(),\r\n            _this.upCanvas(),\r\n            _this.downCanvas()\r\n        ];\r\n        return _this;\r\n    }\r\n    Player.prototype.genCanvas = function () {\r\n        var canvas = document.createElement('canvas');\r\n        canvas.width = 50;\r\n        canvas.height = 50;\r\n        return canvas;\r\n    };\r\n    Player.prototype.drawCanvas = function (ctx) {\r\n        ctx.drawImage(this.img, 0, 0, this.size.x, this.size.y);\r\n    };\r\n    Player.prototype.leftCanvas = function () {\r\n        var canvas = this.genCanvas();\r\n        var ctx = canvas.getContext('2d');\r\n        ctx.translate(0, 50);\r\n        ctx.rotate(-90 * Math.PI / 180);\r\n        this.drawCanvas(ctx);\r\n        return canvas;\r\n    };\r\n    Player.prototype.rightCanvas = function () {\r\n        var canvas = this.genCanvas();\r\n        var ctx = canvas.getContext('2d');\r\n        ctx.translate(50, 0);\r\n        ctx.rotate(90 * Math.PI / 180);\r\n        this.drawCanvas(ctx);\r\n        return canvas;\r\n    };\r\n    Player.prototype.upCanvas = function () {\r\n        var canvas = this.genCanvas();\r\n        var ctx = canvas.getContext('2d');\r\n        ctx.translate(0, 0);\r\n        ctx.rotate(0 * Math.PI / 180);\r\n        this.drawCanvas(ctx);\r\n        return canvas;\r\n    };\r\n    Player.prototype.downCanvas = function () {\r\n        var canvas = this.genCanvas();\r\n        var ctx = canvas.getContext('2d');\r\n        ctx.translate(50, 50);\r\n        ctx.rotate(180 * Math.PI / 180);\r\n        this.drawCanvas(ctx);\r\n        return canvas;\r\n    };\r\n    Player.prototype.draw = function (ctx) {\r\n        var canvas;\r\n        if (this.direction === 'left') {\r\n            canvas = this.canvases[0];\r\n        }\r\n        if (this.direction === 'right') {\r\n            canvas = this.canvases[1];\r\n        }\r\n        if (this.direction === 'up') {\r\n            canvas = this.canvases[2];\r\n        }\r\n        if (this.direction === 'down') {\r\n            canvas = this.canvases[3];\r\n        }\r\n        ctx.drawImage(canvas, this.pos.x, this.pos.y, this.size.x, this.size.y);\r\n    };\r\n    return Player;\r\n}(rect_1.Rect));\r\nexports.Player = Player;\r\n\n\n//# sourceURL=webpack:///./src/tanks/player.ts?");

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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(/*! ./tanks.less */ \"./src/tanks/tanks.less\");\r\nvar brick_1 = __webpack_require__(/*! ./brick */ \"./src/tanks/brick.ts\");\r\nvar bullet_1 = __webpack_require__(/*! ./bullet */ \"./src/tanks/bullet.ts\");\r\nvar player_1 = __webpack_require__(/*! ./player */ \"./src/tanks/player.ts\");\r\nvar audio_1 = __webpack_require__(/*! ./audio */ \"./src/tanks/audio.ts\");\r\nvar isMobile = (\"ontouchstart\" in document.documentElement);\r\nvar Tanks = (function () {\r\n    function Tanks(canvas) {\r\n        var _this = this;\r\n        this.steps = false;\r\n        this.direction = 'right';\r\n        this.isMoving = false;\r\n        this.stacked = false;\r\n        this.bullets = [];\r\n        this.bricks = [];\r\n        this.canvas = canvas;\r\n        this.context = canvas.getContext('2d');\r\n        canvas.width = 800;\r\n        canvas.height = 800;\r\n        var imageBrick = new Image(50, 50);\r\n        imageBrick.onload = function (res) {\r\n            for (var i = 0; i < (10); i++) {\r\n                _this.bricks.push(new brick_1.Brick(imageBrick, 50, 50, i * 50, 20 + i * 25));\r\n            }\r\n        };\r\n        imageBrick.src = 'img/tanks/brick.jpg';\r\n        var image = new Image();\r\n        image.src = 'img/tanks/tank.png';\r\n        image.onload = function (res) {\r\n            _this.player = new player_1.Player(res.target, 50, 50, 'You');\r\n            _this.player.pos.x = 50;\r\n            _this.player.pos.y = canvas.height - _this.player.size.y;\r\n            _this.startUpdate();\r\n        };\r\n        window.addEventListener('resize', function () {\r\n        });\r\n        this.addEventListeners();\r\n    }\r\n    Tanks.prototype.startUpdate = function () {\r\n        var _this = this;\r\n        var lastTime;\r\n        var callback = function (ms) {\r\n            if (lastTime) {\r\n                _this.update((ms - lastTime) / 1000);\r\n            }\r\n            lastTime = ms;\r\n            requestAnimationFrame(callback);\r\n        };\r\n        callback();\r\n    };\r\n    Tanks.prototype.addEventListeners = function () {\r\n        var _this = this;\r\n        var vel = 150;\r\n        window.addEventListener('keydown', function (e) {\r\n            if (_this.stacked === false || _this.isMoving === false) {\r\n                if (e.keyCode === 37) {\r\n                    _this.player.vel.x = -vel;\r\n                    _this.player.vel.y = 0;\r\n                    _this.player.direction = 'left';\r\n                    _this.isMoving = true;\r\n                }\r\n                else if (e.keyCode === 38) {\r\n                    _this.player.vel.x = 0;\r\n                    _this.player.vel.y = -vel;\r\n                    _this.player.direction = 'up';\r\n                    _this.isMoving = true;\r\n                }\r\n                else if (e.keyCode === 39) {\r\n                    _this.player.vel.x = vel;\r\n                    _this.player.vel.y = 0;\r\n                    _this.player.direction = 'right';\r\n                    _this.isMoving = true;\r\n                }\r\n                else if (e.keyCode === 40) {\r\n                    _this.player.vel.x = 0;\r\n                    _this.player.vel.y = vel;\r\n                    _this.player.direction = 'down';\r\n                    _this.isMoving = true;\r\n                }\r\n                if (e.keyCode === 32) {\r\n                    _this.fire();\r\n                }\r\n            }\r\n        }, false);\r\n        window.addEventListener('keyup', function (e) {\r\n            _this.isMoving = false;\r\n            _this.stacked = false;\r\n        }, false);\r\n    };\r\n    Tanks.prototype.fire = function () {\r\n        var bullet = new bullet_1.Bullet(4, 4);\r\n        if (this.player.direction === 'left') {\r\n            bullet.pos.x = this.player.pos.x;\r\n            bullet.pos.y = this.player.pos.y + this.player.size.y / 2 - 2;\r\n            bullet.vel.y = 0;\r\n            bullet.vel.x = -500;\r\n        }\r\n        else if (this.player.direction === 'right') {\r\n            bullet.pos.x = this.player.right;\r\n            bullet.pos.y = this.player.pos.y + this.player.size.y / 2 - 2;\r\n            bullet.vel.y = 0;\r\n            bullet.vel.x = 500;\r\n        }\r\n        else if (this.player.direction === 'down') {\r\n            bullet.pos.x = this.player.pos.x + this.player.size.x / 2 - 2;\r\n            bullet.pos.y = this.player.pos.y + this.player.size.y;\r\n            bullet.vel.y = 500;\r\n        }\r\n        else if (this.player.direction === 'up') {\r\n            bullet.pos.x = this.player.pos.x + this.player.size.x / 2 - 2;\r\n            bullet.pos.y = this.player.pos.y;\r\n            bullet.vel.y = -500;\r\n        }\r\n        audio_1.default.play('tanks/Battle City SFX (6).wav');\r\n        this.bullets.push(bullet);\r\n    };\r\n    Tanks.prototype.draw = function () {\r\n        var _this = this;\r\n        this.context.fillStyle = '#000';\r\n        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n        this.player.draw(this.context);\r\n        this.bullets = this.bullets.filter(function (r) { return !r.markForDeletion; });\r\n        this.bullets.forEach(function (bullet) { return bullet.draw(_this.context); });\r\n        this.bricks = this.bricks.filter(function (r) { return !r.markForDeletion; });\r\n        this.bricks.forEach(function (brick) { return brick.draw(_this.context); });\r\n    };\r\n    Tanks.prototype.collider = function () {\r\n        var _this = this;\r\n        this.bullets.forEach(function (bullet) { return bullet.collision(_this.player, _this); });\r\n    };\r\n    Tanks.prototype.update = function (dt) {\r\n        if (this.isMoving && this.stacked === false) {\r\n            this.player.pos.x += Math.round(this.player.vel.x * dt);\r\n            this.player.pos.y += Math.round(this.player.vel.y * dt);\r\n        }\r\n        this.bullets.forEach(function (bullet) {\r\n            bullet.pos.x += bullet.vel.x * dt;\r\n            bullet.pos.y += bullet.vel.y * dt;\r\n        });\r\n        if (this.player.top <= 0) {\r\n            this.player.vel.y = 0;\r\n            this.player.pos.y = 0;\r\n        }\r\n        if (this.player.bottom > this.canvas.height) {\r\n            this.player.vel.y = 0;\r\n            this.player.pos.y = this.canvas.height - this.player.size.y;\r\n        }\r\n        if (this.player.left <= 0) {\r\n            this.player.vel.x = 0;\r\n            this.player.pos.x = 0;\r\n        }\r\n        else if (this.player.right >= this.canvas.width) {\r\n            this.player.vel.x = 0;\r\n            this.player.pos.x = this.canvas.width - this.player.size.x;\r\n        }\r\n        this.collider();\r\n        this.draw();\r\n    };\r\n    return Tanks;\r\n}());\r\nvar canvas = document.getElementById('tanks');\r\nnew Tanks(canvas);\r\n\n\n//# sourceURL=webpack:///./src/tanks/tanks.ts?");

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