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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var units = ['days', 'hours', 'minutes', 'seconds'];

var countdown = document.getElementById('countdown');

setTimer();
setInterval(setTimer, 1000);

/**
 * Dirty function
 */

function setTimer() {
    // const pathString = window.location.hash.split('#')[1];
    var pathString = window.location.pathname.split('/')[1];

    var times = void 0;
    try {
        times = getTimeObject(pathString);
    } catch (error) {
        console.error(error);
        var message = 'Couldn\'t parse time string :(';
        var errElem = createElem('p', message, 'error__message');

        countdown.innerHTML = '';
        countdown.appendChild(errElem);
        return;
    }
    var elems = units.map(function (unit) {
        return createTimeElem(times[unit], unit);
    });

    countdown.innerHTML = '';
    elems.forEach(function (elem) {
        countdown.appendChild(elem);
    });
}

/**
 * Semi-pure functions
 */

function getTimeObject(pathString) {
    var now = moment();
    var target = moment(pathString);
    if (!target.isValid()) {
        throw new Error('Error parsing path string');
    }
    var diff = target.diff(now);
    var timeLeft = moment.duration(diff);

    var days = Math.floor(timeLeft.asDays());
    var hours = timeLeft.hours();
    var minutes = timeLeft.minutes();
    var seconds = timeLeft.seconds();
    return { days: days, hours: hours, minutes: minutes, seconds: seconds };
}

function createElem(tag, innerHTML, className) {
    var elem = document.createElement(tag);
    elem.innerHTML = innerHTML !== undefined ? innerHTML : '';
    elem.setAttribute('class', className || '');
    return elem;
}

function createTimeElem(num, unit) {
    var container = createElem('div', '', 'countdown__item');
    var numChild = createElem('p', num, 'countdown__number');
    var unitChild = createElem('p', unit, 'countdown__unit');

    container.appendChild(numChild);
    container.appendChild(unitChild);

    return container;
}

/***/ })
/******/ ]);