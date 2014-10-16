/**
 * Abstracts over Geometry creation so that both Threejs geometry and Cannonjs bodies are created.
 */
define(['three', 'cannon'], function(Three, Cannon) {

  var geometryFactory = function(scene, physics) {
    return {
      cube: function(size, materialOptions, bodyOptions) {
        var shape = new Cannon.Box(new Cannon.Vec3(size.x / 2, size.y / 2, size.z / 2));
        var body = new Cannon.Body(bodyOptions);
        body.addShape(shape);
        physics.add(body);

        var geometry = new Three.BoxGeometry(size.x, size.y, size.z);
        var material = new Three.MeshBasicMaterial(materialOptions);
        var mesh = new Three.Mesh(geometry, material);
        scene.add(mesh);
        mesh.body = body;
        return mesh;
      }
    };
  };

  return geometryFactory;
});
