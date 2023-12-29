"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _control = _interopRequireDefault(require("./control.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ResultBlock = exports["default"] = /*#__PURE__*/function () {
  function ResultBlock() {
    _classCallCheck(this, ResultBlock);
    this.insertPoint = document.getElementById('dynamic');
    this.tempHtml = this.insertPoint.innerHTML;
    this.change();
  }
  _createClass(ResultBlock, [{
    key: "change",
    value: function change() {
      var _this = this;
      this.insertPoint.innerHTML = "\n        <!-- ./reminder/convertedHtml -->\n        <div id=\"result\">\n            <button type=\"button\" id=\"goBack\">Go Back</button>\n        </div>\n        <div id=\"visual\">\n            <p>This feature still didn't be implied</p>\n        </div>\n        ";
      document.getElementById('goBack').addEventListener('click', function () {
        _this.GoBackHandler();
      });
    }
  }, {
    key: "GoBackHandler",
    value: function GoBackHandler() {
      this.cleanUp();
      this.insertPoint.innerHTML = this.tempHtml;
      (0, _control["default"])();
    }
  }, {
    key: "cleanUp",
    value: function cleanUp() {
      document.getElementById('goBack').removeEventListener('click', this.GoBackHandler);
    }
  }]);
  return ResultBlock;
}();
;