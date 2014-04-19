(function() {
  "use strict";


  var makeModule = function(require, exports) {
    var base = require('./base');
    var logical = require('./logical');
    var maths = require('./maths');
    var object = require('./object');
    var string = require('./string');
    var fn = require('./fn');
    var date = require('./date');

    var imports = [base, logical, maths, object, string, fn, date];
    var exportedFns = {};

    // Export our imports
    imports.forEach(function(importedModule) {
      Object.keys(importedModule).forEach(function(k) {
        exportedFns[k] = importedModule[k];
      });
    });


    module.exports = exportedFns;
  };


  // AMD/CommonJS foo
  if (typeof(define) === "function") {
    define(function(require, exports, module) {
      makeModule(require, exports, module);
    });
  } else {
    makeModule(require, exports, module);
  }
})();
