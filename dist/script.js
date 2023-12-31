"use strict";

var _control = _interopRequireDefault(require("./control.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function updateTexture(sphereMaterial) {
  if (sphereMaterial.diffuseTexture) {
    sphereMaterial.diffuseTexture.dispose();
  }
  sphereMaterial.diffuseTexture = new BABYLON.Texture('./js/image/output.jpg', sphereMaterial.getScene());
}
try {
  document.addEventListener("DOMContentLoaded", function () {
    // console.log("script be called")
    var canvas = document.getElementById("main");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
      diameter: 2,
      segments: 128
    }, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    //handle the sphere
    var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", scene);
    sphere.material = sphereMaterial;
    // sphereMaterial.diffuseColor = new BABYLON.Color3(0,1,0);
    sphereMaterial.specularColor = new BABYLON.Color3(0.2, 0, 0);
    updateTexture(sphereMaterial);
    setInterval(function () {
      return updateTexture(sphereMaterial);
    }, 10000);
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