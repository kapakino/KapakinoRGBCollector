document.addEventListener("DOMContentLoaded",function(){
    var canvas = document.getElementById("main");
    var engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    
    const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;
    
    
    engine.runRenderLoop(function () {
        scene.render();
    });
    
    // Handle window resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
})