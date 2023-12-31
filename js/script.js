"use strict";
import Control from './control.js';
try{
    document.addEventListener("DOMContentLoaded",function(){
        // console.log("script be called")
        var canvas = document.getElementById("main");
        var engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);
        
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 1, 0), scene);
        camera.attachControl(canvas, true);
        
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        
        // const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
        // Our built-in 'sphere' shape.
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
        
        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;
        
        //handle the sphere
        const sphereMaterial = new BABYLON.StandardMaterial();
        sphere.material = sphereMaterial;
        sphereMaterial.diffuseColor = new BABYLON.Color3(0,1,0)

        //add additional event listener
        Control();

        engine.runRenderLoop(function () {
            scene.render();
        });
        
        // Handle window resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    })
}catch(e){
    window.alert(`something went wrong! error:${e.message}`)
}