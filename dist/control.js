"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Control;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Control() {
  console.log("Control Entered!");
  var option = document.getElementById('option');
  var start = document.getElementById('start');

  //handle the option input
  var default_option = {
    'data': 10
  };
  option.addEventListener('submit', function (e) {
    e.preventDefault();
    var arr = option.getElementsByTagName('input');
    var _iterator = _createForOfIteratorHelper(arr),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var it = _step.value;
        if (it.type === 'submit') continue;
        default_option[it.name] = it.value;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  var web = document.getElementById('website');
  var web_option = 'pinterest';
  web.addEventListener('change', function () {
    var selectWeb = web.options[web.selectedIndex];
    web_option = selectWeb.value;
  });
  //handle the start been pressed
  start.addEventListener('submit', function (e) {
    e.preventDefault();
    default_option['website'] = web_option;
    var arr = start.children;
    var queue = _toConsumableArray(arr);
    while (queue.length !== 0) {
      var cur = queue.shift();
      if (cur.hasAttribute('name') && cur.nodeType === 1) default_option[cur.name] = cur.value;
      var nxt = cur.children;
      queue.push.apply(queue, _toConsumableArray(nxt));
    }
    console.log(default_option);
    var json = JSON.stringify(default_option);
    localStorage.setItem('setting', json);
    // console.log(localStorage.getItem('setting'))
  });

  //control the screen
  var display = document.getElementById('container');
  display.addEventListener('mouseenter', function (e) {
    // console.log('enter')
    document.documentElement.style.overflowY = 'hidden';
  });
  display.addEventListener('mouseleave', function (e) {
    document.documentElement.style.overflowY = 'scroll';
  });
}