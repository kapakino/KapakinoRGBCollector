"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _upper = _interopRequireDefault(require("./upper"));
require("../css/style.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
document.addEventListener('DOMContentLoaded', function () {
  var element_dynamic = document.getElementById('dynamic');
  var root_dynamic = _reactDom["default"].createRoot(element_dynamic);
  root_dynamic.render(dom(_react["default"].StrictMode, null, dom(_upper["default"], null)));
});