"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upper = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var handleScraping = function handleScraping(e) {
  e.preventDefault();
  console.log('Scraping');
};
var handleValuable = function handleValuable(e) {
  e.preventDefault();
  console.log('Value been sended');
};
var Upper = exports.Upper = function Upper() {
  (0, _react.useEffect)(function () {
    console.log('Component has been rendered');
  }, []);
  return dom(DomFrag, null, dom("form", {
    onSubmit: handleScraping
  }, dom("fieldset", {
    id: "outter_keyword"
  }, dom("legend", {
    className: "heading"
  }, "keyword input"), dom("label", {
    htmlFor: "keyword"
  }, "keyword(delimiter with comma)", dom("br", null), dom("textarea", {
    name: "keyword",
    id: "keyword",
    cols: 30,
    rows: 10
  })), dom("br", null), dom("label", {
    htmlFor: "website"
  }, "website for mining", dom("br", null), dom("input", {
    type: "text",
    name: "website"
  }), dom("br", null)), dom("input", {
    type: "submit",
    defaultValue: "submit"
  }))), dom("form", {
    onSubmit: handleValuable
  }, dom("fieldset", {
    id: "outter_variable"
  }, dom("legend", {
    className: "heading"
  }, "variable adjust"), dom("label", {
    htmlFor: "data"
  }, "Data to compare(Enter a number)", dom("br", null), dom("input", {
    name: "data",
    type: "text"
  })), dom("br", null), dom("input", {
    type: "submit",
    defaultValue: "submit"
  }))));
};