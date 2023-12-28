"use strict";

var _control = _interopRequireDefault(require("./control.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
try {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("script be called");
    var canvas = document.getElementById("main");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
      diameter: 2,
      segments: 32
    }, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    //add additional event listener
    (0, _control["default"])();
    engine.runRenderLoop(function () {
      scene.render();
    });

    // Handle window resize
    window.addEventListener("resize", function () {
      engine.resize();
    });
  });
} catch (e) {
  window.alert("something went wrong! error:".concat(e.message));
}