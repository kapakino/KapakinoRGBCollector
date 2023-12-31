"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var Jimp = require('jimp');
var _checkRGBFormat = /*#__PURE__*/new WeakSet();
var _transferdata = /*#__PURE__*/new WeakSet();
var _convertWidthHeight = /*#__PURE__*/new WeakSet();
var _rgbStringToJimpForm = /*#__PURE__*/new WeakSet();
var _randomArrange = /*#__PURE__*/new WeakSet();
var ImgControl = /*#__PURE__*/function () {
  function ImgControl(_data) {
    _classCallCheck(this, ImgControl);
    _classPrivateMethodInitSpec(this, _randomArrange);
    _classPrivateMethodInitSpec(this, _rgbStringToJimpForm);
    _classPrivateMethodInitSpec(this, _convertWidthHeight);
    _classPrivateMethodInitSpec(this, _transferdata);
    //this function may be isolate to global that reduce the code line
    _classPrivateMethodInitSpec(this, _checkRGBFormat);
    this.totalSpot = 0;
    this.width = undefined;
    this.height = undefined;
    this.colorArray = [];
    this.data = _classPrivateMethodGet(this, _transferdata, _transferdata2).call(this, _data);
  }
  _createClass(ImgControl, [{
    key: "generateImg",
    value: function generateImg() {
      var _this = this;
      return new Promise(function (res, rej) {
        try {
          var Image = new Jimp(_this.width, _this.height, function (err, image) {
            if (err) console.error("".concat(err));
            for (var i = 0; i < _this.width; ++i) {
              for (var j = 0; j < _this.height; ++j) {
                var tmp = undefined;
                if (i * _this.height + j < _this.colorArray.length) {
                  var color = _this.colorArray[i * _this.height + j];
                  // console.log('Color Array:', color);
                  tmp = Jimp.rgbaToInt.apply(Jimp, _toConsumableArray(color));
                } else tmp = Jimp.rgbaToInt(0, 0, 0, 255);
                image.setPixelColor(tmp, i, j);
              }
            }
            image.write('.\\image\\output.jpg', function (err) {
              if (err) console.error("".concat(err));
              console.log('Image created and saved as output.jpg');
            });
          });
          res('yeah!');
        } catch (err) {
          rej('Didn\'t fullfilled to generate the image');
        }
      });
    }
  }]);
  return ImgControl;
}();
function _checkRGBFormat2(rgb) {
  var commaCount = 0,
    left = 0,
    right = 0;
  var _iterator = _createForOfIteratorHelper(rgb),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var ch = _step.value;
      if (!(ch.charCodeAt(0) >= 48 && ch.charCodeAt(0) < 58)) {
        switch (ch) {
          case ',':
            ++commaCount;
            if (commaCount > 2) return false;
            break;
          case '(':
            ++left;
            if (left > 1) return false;
            break;
          case ')':
            ++right;
            if (right > 1) return false;
            break;
          case ' ':
            break;
          default:
            return false;
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return commaCount === 2 && left === 1 && right === 1;
}
function _transferdata2(data) {
  var tempArray = data.split('!');
  // var ArrayLength = tempArray.length;
  var _iterator2 = _createForOfIteratorHelper(tempArray),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var it = _step2.value;
      var _it$split = it.split('='),
        _it$split2 = _slicedToArray(_it$split, 2),
        key = _it$split2[0],
        val = _it$split2[1];
      if (!_classPrivateMethodGet(this, _checkRGBFormat, _checkRGBFormat2).call(this, key)) continue;
      var num = Number(val);
      if (!isNaN(num)) {
        this.totalSpot += num;
        var tmp = _classPrivateMethodGet(this, _rgbStringToJimpForm, _rgbStringToJimpForm2).call(this, key);
        if (tmp !== undefined) {
          for (var i = 0; i < num; ++i) {
            this.colorArray.push(_toConsumableArray(tmp));
          }
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  _classPrivateMethodGet(this, _randomArrange, _randomArrange2).call(this);
  _classPrivateMethodGet(this, _convertWidthHeight, _convertWidthHeight2).call(this);
}
function _convertWidthHeight2() {
  var largest = Math.floor(Math.sqrt(this.totalSpot));
  this.height = this.width = largest;
}
function _rgbStringToJimpForm2(rgbString) {
  var _ref = rgbString.match(/\((\d+), (\d+), (\d+)\)/) || [],
    _ref2 = _slicedToArray(_ref, 4),
    r = _ref2[1],
    g = _ref2[2],
    b = _ref2[3];
  if (isNaN(Number(r)) || isNaN(Number(g)) || isNaN(Number(b))) return undefined;
  //rgba list
  return [Number(r), Number(g), Number(b), Number(255)];
}
function _randomArrange2() {
  for (var idx = this.colorArray.length - 1; idx > 0; --idx) {
    var change_idx = Math.floor(Math.random() * idx);
    var _ref3 = [this.colorArray[change_idx], this.colorArray[idx]];
    this.colorArray[idx] = _ref3[0];
    this.colorArray[change_idx] = _ref3[1];
  }
}
;
module.exports = ImgControl;