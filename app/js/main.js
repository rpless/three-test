var config = {
  baseUrl: 'js/app',
  shim: {
    'three': { exports: 'THREE' }
  },
  // Third party code lives in js/vendor
  paths: {
    three: '../vendor/three',
    cannon: '../vendor/cannon',
    lodash: '../vendor/lodash'
  }
};

require(config, ['world'], function(world) {
  world.initialize();
  world.start();
});
