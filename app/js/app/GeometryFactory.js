/**
 * Abstracts over Geometry creation so that both Threejs geometry and Cannonjs bodies are created.
 */
define(['three', 'cannon'], function(Three, Cannon) {

  Three.Mesh.prototype.updateRender = function() {
    this.position.copy(this.body.position);
    this.quaternion.copy(this.body.quaternion);
  };

  var geometryFactory = function(scene, physics) {
    return {
      plane: function(options) {
        var shape = new Cannon.Plane();
        var body = new Cannon.Body(options.physics);
        body.addShape(shape);
        body.quaternion.setFromAxisAngle(new Cannon.Vec3(1, 0, 0), -Math.PI / 2);
        physics.add(body);

        var size = options.size;
        var geometry = new Three.PlaneGeometry(size.width, size.depth, 1, 1);
        var plane = new Three.Mesh(geometry, new Three.MeshBasicMaterial(options.material));
        scene.add(plane);
        plane.body = body;
        return plane;
      },

      cube: function(options) {
        var size = options.size;
        var shape = new Cannon.Box(new Cannon.Vec3(size.width / 2, size.height / 2, size.depth / 2));
        var body = new Cannon.Body(options.physics);
        body.addShape(shape);
        physics.add(body);

        var geometry = new Three.BoxGeometry(size.width, size.height, size.depth);
        var mesh = new Three.Mesh(geometry, new Three.MeshBasicMaterial(options.material));
        scene.add(mesh);
        mesh.body = body;
        return mesh;
      }
    };
  };

  return geometryFactory;
});
