define(['three', 'cannon', 'GeometryFactory'],
       function(Three, Cannon, geoFactory) {
  var scene, renderer, physics, timeStep = 1/60;
  var camera, box, ground;
  var worldHelpers = {

    init: function() {
      scene = new Three.Scene();
      camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(10, 2, 0);
      camera.quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0), Math.PI/2);
      scene.add(camera);

      renderer = new Three.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(renderer.domElement);

      physics = new Cannon.World();
      physics.gravity.set(0, -10, 0);
      physics.broadphase = new Cannon.NaiveBroadphase();
      physics.solver.iterations = 10;
      physics.solver.tolerance = 0.001;

      var worldBuilder = geoFactory(scene, physics);

      ground = worldBuilder.plane({
        size: { width: 100, depth: 100 },
        material: { color: 0xff0000 },
        physics: { mass: 0, material: new Cannon.Material() }
      });
      ground.body.quaternion.setFromAxisAngle(new Cannon.Vec3(1, 0, 0), -Math.PI / 2);
      ground.updateRender();

      box = worldBuilder.cube({
        size: { width: 2, height: 3, depth: 2},
        material: { color: 0x00ff00, wireframe: true },
        physics: { mass: 5 }
      });
      box.body.position.set(0, 5, 0);
    },

    render: function() {
      requestAnimationFrame(worldHelpers.render);

      physics.step(timeStep);
      box.updateRender();

      renderer.render(scene, camera);
    }
  };

  return {
    initialize: worldHelpers.init,
    start: worldHelpers.render
  };
});
