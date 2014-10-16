define(['three', 'cannon', 'GeometryFactory'],
       function(Three, Cannon, geoFactory) {
  var scene, renderer, physics, timeStep = 1/60;
  var camera, box;
  var worldHelpers = {

    init: function() {
      scene = new Three.Scene();
      camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
      camera.position.z = 5;
      scene.add(camera);

      renderer = new Three.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(renderer.domElement);

      physics = new Cannon.World();
      physics.gravity.set(0,0,0);
      physics.broadphase = new Cannon.NaiveBroadphase();
      physics.solver.iterations = 10;

      var worldBuilder = geoFactory(scene, physics);
      box = worldBuilder.cube({x: 2, y: 2, z: 2}, { color: 0xff0000, wireframe: true }, { mass: 1});
      box.body.angularVelocity.set(0,10,0);
      box.body.angularDamping = 0.5;
    },

    render: function() {
      // note: three.js includes requestAnimationFrame shim
      requestAnimationFrame(worldHelpers.render);

      physics.step(timeStep);

      // Copy coordinates from Cannon.js to Three.js
      box.position.copy(box.body.position);
      box.quaternion.copy(box.body.quaternion);

      box.rotation.x += 0.01;
      box.rotation.y += 0.02;

      renderer.render(scene, camera);
    }
  };

  return {
    initialize: worldHelpers.init,
    start: worldHelpers.render
  };
});
