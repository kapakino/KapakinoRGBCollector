"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOnline = void 0;
function checkInternetConnection() {
  return navigator.onLine;
}
var isOnline = exports.isOnline = checkInternetConnection();
// console.log("babylonEngine Entered")
var babylon = document.createElement('script');
if (isOnline) {
  babylon.src = 'https://cdn.babylonjs.com/babylon.js';
} else {
  //there might be some bug in here...
  alert('Without connect to internet there might be some wrong in this program...');
  babylon.src = "./js/external/babylon.js";
}
document.head.appendChild(babylon);
//try append babylon script
var babylon_scr_1 = document.createElement('script');
// babylon_scr_1.type = 'text/javascript';
babylon_scr_1.type = 'module';
if (supportsES6) {
  babylon_scr_1.src = "./js/script.js";
} else {
  babylon_scr_1.src = "./dist/script.js";
}
document.head.appendChild(babylon_scr_1);