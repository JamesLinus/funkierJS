(function() {
  "use strict";

  /*
   * A collection of internal utilities. Not exported to consumers.
   *
   * These utilities are deliberately split out from those in utils.js. Some functions here
   * depend on getRealArity from curry.js, and we want curry.js to be able to use the functions
   * in utils.
   *
   */


  var makeModule = function(require, exports) {
    var curryModule = require('./curry');
    var getRealArity = curryModule.getRealArity;


    /*
     * checkFunction: Takes a value. Throws a TypeError if the value is not a function, and possibly return the
     *                function otherwise, after any optional checks.
     *
     *                This function takes an optional options object. The following properties have meaning:
     *                 - message: the message the TypeError should contain if it proves necessary to throw
     *                 - arity: in isolation, will restrict to accepting functions of this arity
     *                 - minimum: when true, changes the meaning of arity to be the minimum accepted
     *
     */

    var checkFunction = function(f, options) {
      var options = options || {};
      var message = options.message || 'Value is not a function';
      var arity = 'arity' in options ? options.arity : null;
      var minimum = options.minimum || false;

      if (typeof(f) !== 'function')
        throw new TypeError(message);

      if (arity !== null) {
        var fArity = getRealArity(f);

        if ((minimum && fArity < arity) || (!minimum && fArity !== arity))
          throw new TypeError(message);

      }

      return f;
    };


    var exported = {
      checkFunction: checkFunction
    };


    module.exports = exported;
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
