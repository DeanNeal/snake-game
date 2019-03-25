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
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(/*! ./pong.less */ \"./src/pong/pong.less\");\r\nvar Vec = (function () {\r\n    function Vec(x, y) {\r\n        if (x === void 0) { x = 0; }\r\n        if (y === void 0) { y = 0; }\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return Vec;\r\n}());\r\nvar Rect = (function () {\r\n    function Rect(w, h) {\r\n        this.pos = new Vec;\r\n        this.size = new Vec(w, h);\r\n    }\r\n    Object.defineProperty(Rect.prototype, \"left\", {\r\n        get: function () {\r\n            return this.pos.x;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Rect.prototype, \"right\", {\r\n        get: function () {\r\n            return this.pos.x + this.size.x;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Rect.prototype, \"top\", {\r\n        get: function () {\r\n            return this.pos.y;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Rect.prototype, \"bottom\", {\r\n        get: function () {\r\n            return this.pos.y + this.size.y;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return Rect;\r\n}());\r\nvar Ball = (function (_super) {\r\n    __extends(Ball, _super);\r\n    function Ball() {\r\n        var _this = _super.call(this, 10, 10) || this;\r\n        _this.vel = new Vec;\r\n        return _this;\r\n    }\r\n    return Ball;\r\n}(Rect));\r\nvar Pong = (function () {\r\n    function Pong(canvas) {\r\n        var _this = this;\r\n        this.canvas = canvas;\r\n        this.context = canvas.getContext('2d');\r\n        canvas.width = window.innerWidth;\r\n        canvas.height = window.innerHeight;\r\n        this.ball = new Ball();\r\n        this.ball.size.x = 100;\r\n        this.ball.size.y = 100;\r\n        this.ball.pos.x = 100;\r\n        this.ball.pos.y = 100;\r\n        this.ball.vel.x = 400;\r\n        this.ball.vel.y = 400;\r\n        var lastTime;\r\n        var callback = function (ms) {\r\n            if (lastTime) {\r\n                _this.update((ms - lastTime) / 1000);\r\n            }\r\n            lastTime = ms;\r\n            requestAnimationFrame(callback);\r\n        };\r\n        callback();\r\n        window.addEventListener('resize', function () {\r\n            canvas.width = window.innerWidth;\r\n            canvas.height = window.innerHeight;\r\n        });\r\n    }\r\n    Pong.prototype.update = function (dt) {\r\n        this.ball.pos.x += this.ball.vel.x * dt;\r\n        this.ball.pos.y += this.ball.vel.y * dt;\r\n        if (this.ball.left < 0 || this.ball.right > this.canvas.width) {\r\n            this.ball.vel.x = -this.ball.vel.x;\r\n        }\r\n        if (this.ball.top < 0 || this.ball.bottom > this.canvas.height) {\r\n            this.ball.vel.y = -this.ball.vel.y;\r\n        }\r\n        this.context.fillStyle = '#000';\r\n        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n        this.context.fillStyle = '#fff';\r\n        this.context.fillRect(this.ball.pos.x, this.ball.pos.y, this.ball.size.x, this.ball.size.y);\r\n    };\r\n    return Pong;\r\n}());\r\nvar canvas = document.getElementById('pong');\r\nvar pong = new Pong(canvas);\r\n\n\n//# sourceURL=webpack:///./src/pong/pong.ts?");

/***/ })

/******/ });