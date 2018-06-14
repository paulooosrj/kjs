module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _pubsub = __webpack_require__(1);\n\nvar _pubsub2 = _interopRequireDefault(_pubsub);\n\nvar _nodeBinds = __webpack_require__(2);\n\nvar _nodeBinds2 = _interopRequireDefault(_nodeBinds);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar kjs = function () {\n  function kjs() {\n    _classCallCheck(this, kjs);\n\n    // this._name = getLibName();\n    return this;\n  }\n\n  _createClass(kjs, [{\n    key: \"normalize\",\n    value: function normalize(view) {\n\n      var $ = document.querySelector.bind(document);\n      var $$ = document.querySelectorAll.bind(document);\n\n      Array.from($(view).querySelectorAll(\"*\")).map(function (node) {\n\n        console.log(node.textContent);\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"#app\";\n      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n\n      this.normalize(view);\n    }\n  }]);\n\n  return kjs;\n}();\n\nexports.default = kjs;\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGlicmFyeS5qcz84NGMwIl0sIm5hbWVzIjpbImtqcyIsInZpZXciLCIkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmluZCIsIiQkIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiZnJvbSIsIm1hcCIsIm5vZGUiLCJjb25zb2xlIiwibG9nIiwidGV4dENvbnRlbnQiLCJkYXRhIiwibm9ybWFsaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCQSxHO0FBRW5CLGlCQUFjO0FBQUE7O0FBQ1o7QUFDQSxXQUFPLElBQVA7QUFDRDs7Ozs4QkFFU0MsSSxFQUFLOztBQUVkLFVBQU1DLElBQUlDLFNBQVNDLGFBQVQsQ0FBdUJDLElBQXZCLENBQTRCRixRQUE1QixDQUFWO0FBQ0EsVUFBTUcsS0FBS0gsU0FBU0ksZ0JBQVQsQ0FBMEJGLElBQTFCLENBQStCRixRQUEvQixDQUFYOztBQUVBSyxZQUFNQyxJQUFOLENBQVdQLEVBQUVELElBQUYsRUFBUU0sZ0JBQVIsQ0FBeUIsR0FBekIsQ0FBWCxFQUEwQ0csR0FBMUMsQ0FBOEMsVUFBQ0MsSUFBRCxFQUFVOztBQUV2REMsZ0JBQVFDLEdBQVIsQ0FBWUYsS0FBS0csV0FBakI7QUFFQSxPQUpEO0FBTUE7Ozs2QkFFK0I7QUFBQSxVQUF6QmIsSUFBeUIsdUVBQWxCLE1BQWtCO0FBQUEsVUFBVmMsSUFBVSx1RUFBSCxFQUFHOzs7QUFFL0IsV0FBS0MsU0FBTCxDQUFlZixJQUFmO0FBRUE7Ozs7OztrQkF4QmtCRCxHIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHViU3ViIGZyb20gXCIuL3B1YnN1YlwiO1xyXG5pbXBvcnQgbm9kZUJpbmRzIGZyb20gXCIuL25vZGVCaW5kc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mga2pzIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyB0aGlzLl9uYW1lID0gZ2V0TGliTmFtZSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBub3JtYWxpemUodmlldyl7XHJcblxyXG4gIFx0Y29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudCk7XHJcbiAgXHRjb25zdCAkJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwuYmluZChkb2N1bWVudCk7XHJcblxyXG4gIFx0QXJyYXkuZnJvbSgkKHZpZXcpLnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpKS5tYXAoKG5vZGUpID0+IHtcclxuXHJcbiAgXHRcdGNvbnNvbGUubG9nKG5vZGUudGV4dENvbnRlbnQpO1xyXG5cclxuICBcdH0pO1xyXG5cclxuICB9XHJcblxyXG4gIHJlbmRlcih2aWV3ID0gXCIjYXBwXCIsIGRhdGEgPSB7fSl7XHJcblxyXG4gIFx0dGhpcy5ub3JtYWxpemUodmlldyk7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYnJhcnkuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar PubSub = function () {\n  function PubSub() {\n    _classCallCheck(this, PubSub);\n\n    this.topics = {};\n  }\n\n  _createClass(PubSub, [{\n    key: 'on',\n    value: function on(topic, listener) {\n\n      if (!this.topics[topic]) this.topics[topic] = { queue: [] };\n      var index = this.topics[topic].queue.push(listener) - 1;\n      return function (topic, index) {\n        var context = {\n          remove: function remove() {\n            delete this.topics[topic].queue[index];\n          }\n        };\n        return Object.assign(this, context);\n      }.bind(this)(topic, index);\n    }\n  }, {\n    key: 'publish',\n    value: function publish(topic, info) {\n      if (!this.topics[topic] || !this.topics[topic].queue.length) return;\n      var items = this.topics[topic].queue;\n      for (var i = 0, len = items.length; i < len; i++) {\n        if (typeof items[i] === 'function') items[i](info || {});\n      }\n    }\n  }]);\n\n  return PubSub;\n}();\n\n;\n\nexports.default = new PubSub();\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcHVic3ViLmpzP2QyNWUiXSwibmFtZXMiOlsiUHViU3ViIiwidG9waWNzIiwidG9waWMiLCJsaXN0ZW5lciIsInF1ZXVlIiwiaW5kZXgiLCJwdXNoIiwiY29udGV4dCIsInJlbW92ZSIsIk9iamVjdCIsImFzc2lnbiIsImJpbmQiLCJpbmZvIiwibGVuZ3RoIiwiaXRlbXMiLCJpIiwibGVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLE07QUFFTCxvQkFBYTtBQUFBOztBQUNaLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0E7Ozs7dUJBRUVDLEssRUFBT0MsUSxFQUFVOztBQUVmLFVBQUcsQ0FBQyxLQUFLRixNQUFMLENBQVlDLEtBQVosQ0FBSixFQUF3QixLQUFLRCxNQUFMLENBQVlDLEtBQVosSUFBcUIsRUFBRUUsT0FBTyxFQUFULEVBQXJCO0FBQ3hCLFVBQUlDLFFBQVEsS0FBS0osTUFBTCxDQUFZQyxLQUFaLEVBQW1CRSxLQUFuQixDQUF5QkUsSUFBekIsQ0FBOEJILFFBQTlCLElBQTBDLENBQXREO0FBQ0EsYUFBUSxVQUFTRCxLQUFULEVBQWdCRyxLQUFoQixFQUF1QjtBQUM5QixZQUFNRSxVQUFVO0FBQ2JDLGtCQUFRLGtCQUFXO0FBQ2pCLG1CQUFPLEtBQUtQLE1BQUwsQ0FBWUMsS0FBWixFQUFtQkUsS0FBbkIsQ0FBeUJDLEtBQXpCLENBQVA7QUFDRDtBQUhZLFNBQWhCO0FBS0MsZUFBT0ksT0FBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0JILE9BQXBCLENBQVA7QUFDRCxPQVBNLENBT0pJLElBUEksQ0FPQyxJQVBELEVBT09ULEtBUFAsRUFPY0csS0FQZCxDQUFQO0FBU0Q7Ozs0QkFFT0gsSyxFQUFPVSxJLEVBQU07QUFDbkIsVUFBRyxDQUFDLEtBQUtYLE1BQUwsQ0FBWUMsS0FBWixDQUFELElBQXVCLENBQUMsS0FBS0QsTUFBTCxDQUFZQyxLQUFaLEVBQW1CRSxLQUFuQixDQUF5QlMsTUFBcEQsRUFBNEQ7QUFDNUQsVUFBSUMsUUFBUSxLQUFLYixNQUFMLENBQVlDLEtBQVosRUFBbUJFLEtBQS9CO0FBQ0EsV0FBSSxJQUFJVyxJQUFJLENBQVIsRUFBV0MsTUFBTUYsTUFBTUQsTUFBM0IsRUFBbUNFLElBQUlDLEdBQXZDLEVBQTRDRCxHQUE1QyxFQUFpRDtBQUMvQyxZQUFHLE9BQU9ELE1BQU1DLENBQU4sQ0FBUCxLQUFvQixVQUF2QixFQUFtQ0QsTUFBTUMsQ0FBTixFQUFTSCxRQUFRLEVBQWpCO0FBQ3BDO0FBQ0Y7Ozs7OztBQUVKOztrQkFFYyxJQUFJWixNQUFKLEUiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFB1YlN1YiB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHR0aGlzLnRvcGljcyA9IHt9O1xyXG5cdH1cclxuXHJcblx0b24odG9waWMsIGxpc3RlbmVyKSB7XHJcblxyXG4gICAgICBpZighdGhpcy50b3BpY3NbdG9waWNdKSB0aGlzLnRvcGljc1t0b3BpY10gPSB7IHF1ZXVlOiBbXSB9O1xyXG4gICAgICB2YXIgaW5kZXggPSB0aGlzLnRvcGljc1t0b3BpY10ucXVldWUucHVzaChsaXN0ZW5lcikgLSAxO1xyXG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKHRvcGljLCBpbmRleCkge1xyXG4gICAgICBcdGNvbnN0IGNvbnRleHQgPSB7XHJcbiAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy50b3BpY3NbdG9waWNdLnF1ZXVlW2luZGV4XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMsIGNvbnRleHQpO1xyXG4gICAgICB9KS5iaW5kKHRoaXMpKHRvcGljLCBpbmRleCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1Ymxpc2godG9waWMsIGluZm8pIHtcclxuICAgICAgaWYoIXRoaXMudG9waWNzW3RvcGljXSB8fCAhdGhpcy50b3BpY3NbdG9waWNdLnF1ZXVlLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgaXRlbXMgPSB0aGlzLnRvcGljc1t0b3BpY10ucXVldWU7XHJcbiAgICAgIGZvcihsZXQgaSA9IDAsIGxlbiA9IGl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIGl0ZW1zW2ldID09PSAnZnVuY3Rpb24nKSBpdGVtc1tpXShpbmZvIHx8IHt9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBQdWJTdWIoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3B1YnN1Yi5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar nodeBinds = function nodeBinds() {\n\t_classCallCheck(this, nodeBinds);\n\n\tthis._name = \"Paulao\";\n\treturn this;\n};\n\n;\n\nexports.default = new nodeBinds();\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbm9kZUJpbmRzLmpzPzRjOTYiXSwibmFtZXMiOlsibm9kZUJpbmRzIiwiX25hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQU1BLFMsR0FFTCxxQkFBYTtBQUFBOztBQUNaLE1BQUtDLEtBQUwsR0FBYSxRQUFiO0FBQ0EsUUFBTyxJQUFQO0FBQ0EsQzs7QUFFRDs7a0JBRWMsSUFBSUQsU0FBSixFIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBub2RlQmluZHMge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy5fbmFtZSA9IFwiUGF1bGFvXCI7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vZGVCaW5kcztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL25vZGVCaW5kcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ })
/******/ ]);