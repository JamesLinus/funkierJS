//(function() {
//  "use strict";
//
//
//  var testFixture = function(require, exports) {
//    var chai = require('chai');
//    var expect = chai.expect;
//
//    var curryModule = require('../../curry');
//    var getRealArity = curryModule.getRealArity;
//
//    var object = require('../../object');
//
//    // Import utility functions
//    var testUtils = require('./testUtils');
//    var describeModule = testUtils.describeModule;
//    var describeFunction = testUtils.describeFunction;
//    var testCurriedFunction = testUtils.testCurriedFunction;
//    var checkEquality = testUtils.checkEquality;
//    var checkArrayContent = testUtils.checkArrayContent;
//
//
//    var expectedObjects = [];
//    var expectedFunctions = ['callPropWithArity', 'callProp', 'hasOwnProperty',
//                             'hasProperty', 'instanceOf', 'isPrototypeOf', 'createObject',
//                             'createObjectWithProps', 'defineProperty', 'defineProperties',
//                             'getOwnPropertyDescriptor', 'extract', 'set', 'setOrThrow',
//                             'modify', 'modifyOrThrow', 'createProp', 'createPropOrThrow',
//                             'deleteProp', 'deletePropOrThrow', 'keys', 'values', 'keyValues',
//                             'descriptors', 'extractOrDefault', 'getOwnPropertyNames', 'shallowClone',
//                             'deepClone', 'extend', 'extendOwn'];
//    describeModule('object', object, expectedObjects, expectedFunctions);
//
//
//    // XXX Should we restrict parameters that are property names? How likely is it that we are using something
//    //     that coerces to a string as the property name?
//
//
//    var cpwaSpec = {
//      name: 'callPropWithArity',
//      arity: 2
//    };
//
//
//    describeFunction(cpwaSpec, object.callPropWithArity, function(callPropWithArity) {
//      var addReturnedCurriedArityTest = function(i) {
//        it('Returned function is curried for arity ' + i, function() {
//          var fn = callPropWithArity('prop', i);
//
//          expect(fn.length).to.equal(1);
//          if (i > 0)
//            expect(getRealArity(fn)).to.not.equal(1);
//        });
//      };
//
//
//      var addReturnedArityTest = function(i) {
//        it('Returned function has correct arity for arity ' + i, function() {
//          var fn = callPropWithArity('prop', i);
//
//          expect(getRealArity(fn)).to.equal(i + 1);
//        });
//      };
//
//
//      var functionalityArgs = [1, true, null, function() {}, []];
//      var addCalledTest = function(i) {
//        it('Returned function calls property on given object for arity ' + i, function() {
//          var args = functionalityArgs.slice(0, i);
//          var obj = {called: false, calledProp: function() {this.called = true;}};
//          var caller = callPropWithArity('calledProp', i);
//          caller.apply(null, args.concat([obj]));
//
//          expect(obj.called).to.equal(true);
//        });
//      };
//
//
//      var addReturnedValueTest = function(i) {
//        it('Returned function returns correct result when called for arity ' + i, function() {
//          var expected = functionalityArgs.slice(0, i);
//          var obj = {calledProp: function() {return [].slice.call(arguments);}};
//          var obj2 = {calledProp: function() {return 42;}};
//          var caller = callPropWithArity('calledProp', i);
//          var result = caller.apply(null, expected.concat([obj]));
//          var result2 = caller.apply(null, expected.concat([obj2]));
//
//          expect(result).to.deep.equal(expected);
//          expect(result2).to.equal(42);
//        });
//      };
//
//
//      var id = function(x) {return x;};
//      var testObj;
//
//      for (var i = 0; i < 6; i++) {
//        addReturnedCurriedArityTest(i);
//        addReturnedArityTest(i);
//        addCalledTest(i);
//        addReturnedValueTest(i);
//
//        // The returned function should be curried
//        testObj = {prop: id};
//        var caller = callPropWithArity('prop', 1);
//        testCurriedFunction(caller, [2, testObj], {message: 'Returned function'});
//      }
//
//
//      // callPropWithArity should itself be curried
//      testObj = {property: function() {return 42;}};
//      var args = {firstArgs: ['property', 0], thenArgs: [testObj]};
//      testCurriedFunction(callPropWithArity, args);
//    });
//
//
//    var cpSpec = {
//      name: 'callProp',
//      arity: 1
//    };
//
//
//    describeFunction(cpSpec, object.callProp, function(callProp) {
//      it('Returned function has correct arity', function() {
//        var fn = callProp('prop');
//
//        expect(fn.length).to.equal(1);
//      });
//
//
//      it('Returned function has correct \'real\' arity', function() {
//        var fn = callProp('prop');
//
//        expect(getRealArity(fn)).to.equal(1);
//      });
//
//
//      it('Returned function calls prop on given object', function() {
//        var obj = {called: false, calledProp: function() {this.called = true;}};
//        var caller = callProp('calledProp');
//        var result = caller(obj);
//
//        expect(obj.called).to.equal(true);
//      });
//
//
//      it('Returned function returns correct result when called', function() {
//        var obj = {calledProp: function() {return [].slice.call(arguments);}};
//        var obj2 = {calledProp: function() {return 42;}};
//        var caller = callProp('calledProp');
//        var result = caller.call(null, obj);
//        var result2 = caller.call(null, obj2);
//
//        expect(result).to.deep.equal([]);
//        expect(result2).to.equal(42);
//      });
//    });
//
//
//    var hopSpec = {
//      name: 'hasOwnProperty',
//      arity: 2
//    };
//
//
//    describeFunction(hopSpec, object.hasOwnProperty, function(hasOwnProperty) {
//      it('Works correctly (1)', function() {
//        var obj = {funkier: 1};
//        var result = hasOwnProperty('funkier', obj);
//
//        expect(result).to.equal(true);
//      });
//
//
//      it('Works correctly (2)', function() {
//        var Constructor = function() {};
//        Constructor.prototype.funkier = 1;
//        var obj = new Constructor();
//        var result = hasOwnProperty('funkier', obj);
//
//        expect(result).to.equal(false);
//      });
//
//
//      it('Works correctly when object has custom hasOwnProperty function', function() {
//        var obj = {
//          'foo': 1,
//          'hasOwnProperty': function(prop) {
//            return prop !== 'foo';
//          }
//        };
//        var result = hasOwnProperty('foo', obj);
//
//        expect(result).to.equal(true);
//      });
//
//
//      testCurriedFunction(hasOwnProperty, ['funkier', {funkier: 1}]);
//    });
//
//
//    var hpSpec = {
//      name: 'hasProperty',
//      arity: 2
//    };
//
//
//    describeFunction(hpSpec, object.hasProperty, function(hasProperty) {
//      it('Works correctly (1)', function() {
//        var obj = {funkier: 1};
//        var result = hasProperty('funkier', obj);
//
//        expect(result).to.equal(true);
//      });
//
//
//      it('Works correctly (2)', function() {
//        var Constructor = function() {};
//        Constructor.prototype.funkier = 1;
//        var obj = new Constructor();
//        var result = hasProperty('funkier', obj);
//
//        expect(result).to.equal(true);
//      });
//
//
//      testCurriedFunction(hasProperty, ['funkier', {funkier: 1}]);
//    });
//
//
//    var ioSpec = {
//      name: 'instanceOf',
//      arity: 2,
//      restrictions: [['function'], []],
//      validArguments: [[Object], [{}]]
//    };
//
//
//    describeFunction(ioSpec, object.instanceOf, function(instanceOf) {
//      it('Works correctly (1)', function() {
//        expect(instanceOf(Object, {})).to.equal(true);
//      });
//
//
//      it('Works correctly (2)', function() {
//        var Constructor = function() {};
//        var obj = new Constructor();
//
//        expect(instanceOf(Constructor, obj)).to.equal(true);
//      });
//
//
//      it('Works correctly (3)', function() {
//        var Constructor = function() {};
//        var Proto = function() {};
//        Constructor.prototype = Proto.prototype;
//        var obj = new Constructor();
//
//        expect(instanceOf(Proto, obj)).to.equal(true);
//      });
//
//
//      it('Works correctly (4)', function() {
//        var Constructor = function() {};
//        var Proto = function() {};
//        var obj = new Constructor();
//
//        expect(instanceOf(Proto, obj)).to.equal(false);
//      });
//
//
//      testCurriedFunction(instanceOf, [Object, {}]);
//    });
//
//
//    var ipoSpec = {
//      name: 'isPrototypeOf',
//      arity: 2
//    };
//
//
//    describeFunction(ipoSpec, object.isPrototypeOf, function(isPrototypeOf) {
//      it('Works correctly (1)', function() {
//        expect(isPrototypeOf(Object.prototype, {})).to.equal(true);
//      });
//
//
//      it('Works correctly (2)', function() {
//        var Constructor = function() {};
//        var obj = new Constructor();
//
//        expect(isPrototypeOf(Constructor.prototype, obj)).to.equal(true);
//      });
//
//
//      it('Works correctly (3)', function() {
//        var Constructor = function() {};
//        var Proto = function() {};
//        Constructor.prototype = Proto.prototype;
//        var obj = new Constructor();
//
//        expect(isPrototypeOf(Proto.prototype, obj)).to.equal(true);
//      });
//
//
//      it('Works correctly (4)', function() {
//        var Constructor = function() {};
//        var Proto = function() {};
//        var obj = new Constructor();
//
//        expect(isPrototypeOf(Proto.prototype, obj)).to.equal(false);
//      });
//
//
//      it('Works correctly when object has custom isPrototypeOf function', function() {
//        var obj = {
//          'foo': 1,
//          'isPrototypeOf': function(prop) {
//            return true;
//          }
//        };
//        var result = isPrototypeOf(obj, Object);
//
//        expect(result).to.equal(false);
//      });
//
//
//      testCurriedFunction(isPrototypeOf, [Object.prototype, {}]);
//    });
//
//
//    var coSpec = {
//      name: 'createObject',
//      arity: 1,
//      restrictions: [['objectlikeornull']],
//      validArguments: [[{}]]
//    };
//
//
//    describeFunction(coSpec, object.createObject, function(createObject) {
//      var isPrototypeOf = object.isPrototypeOf;
//      var hasOwnProperty = object.hasOwnProperty;
//
//
//      it('Returns an object', function() {
//        var obj = {funkier: 1};
//        var result = createObject(obj);
//
//        expect(result).to.be.a('object');
//      });
//
//
//      it('Works correctly (1)', function() {
//        var obj = {funkier: 1};
//        var result = createObject(obj);
//
//        expect(isPrototypeOf(obj, result)).to.equal(true);
//      });
//
//
//      it('Works correctly (2)', function() {
//        var result = createObject(null);
//
//        expect(Object.getPrototypeOf(result)).to.equal(null);
//      });
//
//
//      it('Ignores superfluous parameters', function() {
//        var obj = {funkier: 1};
//        var result = createObject(obj,
//                      {prop1: {configurable: false, enumerable: false, writable: false, value: 42}});
//
//        expect(hasOwnProperty('prop1', result)).to.equal(false);
//      });
//    });
//
//
//    var copSpec = {
//      name: 'createObjectWithProps',
//      arity: 2
//    };
//
//
//    describeFunction(copSpec, object.createObjectWithProps, function(createObjectWithProps) {
//      var isPrototypeOf = object.isPrototypeOf;
//      var hasOwnProperty = object.hasOwnProperty;
//      var descriptor = {prop1: {configurable: false, enumerable: false, writable: false, value: 42}};
//
//
//      it('Returns an object', function() {
//        var obj = {funkier: 1};
//        var result = createObjectWithProps(obj, descriptor);
//
//        expect(result).to.be.a('object');
//      });
//
//
//      var addWorksCorrectlyTests = function(message, proto) {
//        it('Created objects have correct prototype ' + message, function() {
//          var result = createObjectWithProps(proto, descriptor);
//
//          expect(Object.getPrototypeOf(result)).to.equal(proto);
//        });
//
//
//        it('Created objects have correct properties ' + message, function() {
//          var result = createObjectWithProps(proto, descriptor);
//
//          // Need to call hasOwnProperty in this manner because of the null
//          // proto test, which of course will not inherit from Object.prototype
//          expect(Object.prototype.hasOwnProperty.call(result, 'prop1')).to.equal(true);
//        });
//
//
//        it('Created objects have correct descriptors ' + message, function() {
//          var result = createObjectWithProps(proto, descriptor);
//
//          var descriptorProps = descriptor.prop1;
//          var actualDescriptor = Object.getOwnPropertyDescriptor(result, 'prop1');
//          expect(actualDescriptor).to.deep.equal(descriptorProps);
//        });
//      };
//
//
//      addWorksCorrectlyTests('for normal case', {});
//      addWorksCorrectlyTests('when prototype is null', null);
//
//
//      testCurriedFunction(createObjectWithProps, [{}, descriptor]);
//    });
//
//
//    var dpSpec = {
//      name: 'defineProperty',
//      arity: 3,
//      restrictions: [[], ['object'], ['objectlike']],
//      validArguments: [['myprop'], [{value: 42}], [{reset: function() {return {};}}]]
//    };
//
//
//    describeFunction(dpSpec, object.defineProperty, function(defineProperty) {
//      it('Returns the object', function() {
//        var obj = {};
//        var descriptor = {configurable: true, writable: false, enumerable: true, value: 42};
//        var result = defineProperty('prop', descriptor, obj);
//
//        expect(result).to.equal(obj);
//      });
//
//
//      it('Objects have the relevant property after calling defineProperty', function() {
//        var obj = {};
//        var descriptor = {configurable: true, writable: false, enumerable: true, value: 42};
//        defineProperty('prop', descriptor, obj);
//
//        expect(obj.hasOwnProperty('prop')).to.equal(true);
//      });
//
//
//      it('Objects have the property with the correct value after calling defineProperty', function() {
//        var obj = {};
//        var descriptor = {configurable: true, writable: false, enumerable: true, value: 42};
//        defineProperty('prop', descriptor, obj);
//
//        expect(obj.prop).to.deep.equal(descriptor.value);
//      });
//
//
//      it('The new property has the correct descriptor after calling defineProperty', function() {
//        var obj = {};
//        var descriptor = {configurable: true, writable: false, enumerable: true, value: 42};
//        defineProperty('prop', descriptor, obj);
//        var actualDescriptor = Object.getOwnPropertyDescriptor(obj, 'prop');
//
//        expect(actualDescriptor).to.deep.equal(descriptor);
//      });
//
//
//      // defineProperty should be curried
//      testCurriedFunction(defineProperty, ['p', {value: 7}, {}]);
//    });
//
//
//    var dpsSpec = {
//      name: 'defineProperties',
//      arity: 2,
//      restrictions: [['objectlike'], ['objectlike']],
//      validArguments: [[{}], [{}]]
//    };
//
//
//    describeFunction(dpsSpec, object.defineProperties, function(defineProperties) {
//      // Test data
//      // Note: don't omit any optional properties, or we'll fail the equality check
//      var descriptors = {
//        prop1: {configurable: true, writable: false, enumerable: true, value: 42},
//        prop2: {configurable: false, writable: true, enumerable: false, value: 'funkier'},
//        prop3: {configurable: true, enumerable: true, get: function() {return false;}, set: undefined}
//      };
//
//
//      it('Returns the object', function() {
//        var obj = {};
//        var result = defineProperties(descriptors, obj);
//
//        expect(result).to.equal(obj);
//      });
//
//
//      it('Objects have the relevant properties after calling defineProperties', function() {
//        var obj = {};
//        defineProperties(descriptors, obj);
//        var newProps = Object.keys(descriptors);
//        var allThere = newProps.every(function(p) {
//          return obj.hasOwnProperty(p);
//        });
//
//        expect(allThere).to.equal(true);
//      });
//
//
//      it('Objects have the properties with the correct value after calling defineProperties', function() {
//        var obj = {};
//        defineProperties(descriptors, obj);
//        var newProps = Object.keys(descriptors);
//
//        newProps.forEach(function(p) {
//          expect(obj[p]).to.deep.equal('get' in descriptors[p] ? descriptors[p].get() : descriptors[p].value);
//        });
//      });
//
//
//      it('The new properties have the correct descriptors after calling defineProperties', function() {
//        var obj = {};
//        defineProperties(descriptors, obj);
//        var newProps = Object.keys(descriptors);
//
//        newProps.forEach(function(prop) {
//          expect(Object.getOwnPropertyDescriptor(obj, prop)).to.deep.equal(descriptors[prop]);
//        });
//      });
//
//
//      // defineProperties should be curried
//      testCurriedFunction(defineProperties, [descriptors, {}]);
//    });
//
//
//    var gopdSpec = {
//      name: 'getOwnPropertyDescriptor',
//      arity: 2
//    };
//
//
//    describeFunction(gopdSpec, object.getOwnPropertyDescriptor, function(getOwnPropertyDescriptor) {
//      it('Returns undefined if property not present', function() {
//        expect(getOwnPropertyDescriptor('prop', {})).to.equal(undefined);
//      });
//
//
//      it('Returns undefined if property exists only on prototype', function() {
//        var Constructor = function() {};
//        Constructor.prototype.prop = 42;
//        var obj = new Constructor();
//
//        expect(getOwnPropertyDescriptor('prop', obj)).to.equal(undefined);
//      });
//
//
//      it('Works correctly (1)', function() {
//        var obj = {prop: 42};
//        var realDescriptor = Object.getOwnPropertyDescriptor(obj, 'prop');
//        var descriptor = getOwnPropertyDescriptor('prop', obj);
//
//        expect(descriptor).to.deep.equal(realDescriptor);
//      });
//
//
//      it('Works correctly (2)', function() {
//        // Let's use object itself as a reasonably complex object
//        var keys = Object.keys(object);
//
//        keys.forEach(function(k) {
//          var realDescriptor = Object.getOwnPropertyDescriptor(object, k);
//          var descriptor = getOwnPropertyDescriptor(k, object);
//          expect(descriptor).to.deep.equal(realDescriptor);
//        });
//      });
//
//
//      testCurriedFunction(getOwnPropertyDescriptor, ['p', {p: 10}]);
//    });
//
//
//    var extractSpec = {
//      name: 'extract',
//      arity: 2
//    };
//
//
//    describeFunction(extractSpec, object.extract, function(extract) {
//      it('Returns undefined if property not present (1)', function() {
//        expect(extract('prop', {})).to.equal(undefined);
//      });
//
//
//      it('Returns undefined if property not present (2)', function() {
//        var obj = {};
//        // Define a property with no getter
//        object.defineProperty('foo', {enumerable: true, set: function(x) {}});
//
//        expect(extract('foo', obj)).to.equal(undefined);
//      });
//
//
//      it('Works correctly (1)', function() {
//        var obj = {prop: 42};
//        var result = extract('prop', obj);
//
//        expect(result).to.deep.equal(obj.prop);
//      });
//
//
//      it('Works correctly (2)', function() {
//        var obj = {funkier: function() {}};
//        var result = extract('funkier', obj);
//
//        expect(result).to.deep.equal(obj.funkier);
//      });
//
//
//      it('Works correctly (3)', function() {
//        var Constructor = function() {};
//        Constructor.prototype.prop = 42;
//        var obj = new Constructor();
//        var result = extract('prop', obj);
//
//        expect(result).to.deep.equal(obj.prop);
//      });
//
//
//      testCurriedFunction(extract, ['p', {p: 10}]);
//    });
//
//
//    var eodSpec = {
//      name: 'extractOrDefault',
//      arity: 3
//    };
//
//
//    describeFunction(eodSpec, object.extractOrDefault, function(extractOrDefault) {
//      it('Returns default if property not present (1)', function() {
//        var defaultVal = 42;
//
//        expect(extractOrDefault('prop', defaultVal, {})).to.equal(defaultVal);
//      });
//
//
//      it('Returns default if property not present (2)', function() {
//        var defaultVal = 42;
//        var obj = {};
//        // Define a property with no getter
//        object.defineProperty('foo', {enumerable: true, set: function(x) {}});
//
//        expect(extractOrDefault('foo', defaultVal, obj)).to.equal(defaultVal);
//      });
//
//
//      it('Works correctly (1)', function() {
//        var obj = {prop: 42};
//        var defaultVal = 'default';
//        var result = extractOrDefault('prop', defaultVal, obj);
//
//        expect(result).to.deep.equal(obj.prop);
//      });
//
//
//      it('Works correctly (2)', function() {
//        var obj = {funkier: function() {}};
//        var defaultVal = 'default';
//        var result = extractOrDefault('funkier', defaultVal, obj);
//
//        expect(result).to.deep.equal(obj.funkier);
//      });
//
//
//      it('Works correctly (3)', function() {
//        var Constructor = function() {};
//        Constructor.prototype.prop = 42;
//        var obj = new Constructor();
//        var defaultVal = 'default';
//        var result = extractOrDefault('prop', defaultVal, obj);
//
//        expect(result).to.deep.equal(obj.prop);
//      });
//
//
//      testCurriedFunction(extractOrDefault, ['p', 42, {p: 10}]);
//    });
//
//
//    // The various object manipulation functions have a lot of commonality.
//    // We generate common tests.
//
//    var makeCommonTests = function(setter, shouldThrow) {
//      var defineProperty = object.defineProperty;
//
//
//      it('Behaves correctly if writable false (1)', function() {
//        var a = {};
//        defineProperty('foo', {writable: false, value: 1}, a);
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, a);
//        };
//
//        if (shouldThrow)
//          expect(fn).to.throw(Error);
//        else
//          expect(fn).to.not.throw(Error);
//      });
//
//
//      it('Behaves correctly if writable false (2)', function() {
//        var A = function() {};
//        defineProperty('foo', {enumerable: true, writable: false, value: 1}, A.prototype);
//
//        var b = new A();
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, b);
//        };
//
//
//        if (shouldThrow)
//          expect(fn).to.throw(Error);
//        else
//          expect(fn).to.not.throw(Error);
//      });
//
//
//      it('Behaves correctly if no setter in descriptor (1)', function() {
//        var a = (function() {
//          var a = {};
//          var privateProp = 1;
//          var getter = function() {return privateProp;};
//          defineProperty('foo', {get: getter}, a);
//          return a;
//        })();
//
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, a);
//        };
//
//
//        if (shouldThrow)
//          expect(fn).to.throw(Error);
//        else
//          expect(fn).to.not.throw(Error);
//      });
//
//
//      it('Behaves correctly if no setter in descriptor (2)', function() {
//        var a = (function() {
//          var A = function() {};
//          var privateProp = 1;
//          var getter = function() {return privateProp;};
//          defineProperty('foo', {get: getter}, A.prototype);
//
//          var b = new A();
//          return b;
//        })();
//
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, a);
//        };
//
//
//        if (shouldThrow)
//          expect(fn).to.throw(Error);
//        else
//          expect(fn).to.not.throw(Error);
//      });
//
//
//      it('Behaves correctly if preventExtensions has been called (1)', function() {
//        var a = {};
//        Object.preventExtensions(a);
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, a);
//        };
//
//        if (shouldThrow)
//          expect(fn).to.throw(Error);
//        else
//          expect(fn).to.not.throw(Error);
//      });
//
//
//      it('Behaves correctly if seal has been called (1)', function() {
//        var a = {};
//        Object.seal(a);
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, a);
//        };
//
//        if (shouldThrow)
//          expect(fn).to.throw(Error);
//        else
//          expect(fn).to.not.throw(Error);
//      });
//
//
//      it('Behaves correctly if freeze has been called (1)', function() {
//        var a = {};
//        Object.freeze(a);
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, a);
//        };
//
//        if (shouldThrow)
//          expect(fn).to.throw(Error);
//        else
//          expect(fn).to.not.throw(Error);
//      });
//
//
//      it('Behaves correctly if freeze has been called (2)', function() {
//        var a = {foo: 1};
//        Object.freeze(a);
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, a);
//        };
//
//
//        if (shouldThrow)
//          expect(fn).to.throw(Error);
//        else
//          expect(fn).to.not.throw(Error);
//      });
//    };
//
//
//    var makeCommonModificationTests = function(setter, shouldThrow) {
//      var defineProperty = object.defineProperty;
//      var hasOwnProperty = object.hasOwnProperty;
//
//
//      it('Object has property afterwards', function() {
//        var a = {foo: 1};
//        setter('foo', 42, a);
//
//        expect(hasOwnProperty('foo', a)).to.equal(true);
//      });
//
//
//      it('Object\'s property has correct value afterwards', function() {
//        var a = {foo: 1};
//        var val = 42;
//        setter('foo', val, a);
//
//        expect(a.foo).to.equal(val);
//      });
//
//
//      it('Behaves correctly if preventExtensions has been called (2)', function() {
//        var a = {foo: 1};
//        Object.preventExtensions(a);
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, a);
//        };
//
//        expect(fn).to.not.throw(Error);
//        expect(a.foo).to.equal(val);
//      });
//
//
//      it('Behaves correctly if seal has been called (2)', function() {
//        var a = {foo: 1};
//        Object.seal(a);
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, a);
//        };
//
//
//        expect(fn).to.not.throw(Error);
//        expect(a.foo).to.equal(val);
//      });
//
//
//      it('Propagates other errors', function() {
//        var a = (function() {
//          var a = {};
//          var privateProp = 1;
//          var getter = function() {return privateProp;};
//          var badSetter = function() {throw new ReferenceError();};
//          defineProperty('foo', {get: getter, set: badSetter}, a);
//          return a;
//        })();
//
//        var val = 42;
//        var fn = function() {
//          setter('foo', val, a);
//        };
//
//        expect(fn).to.throw(Error);
//      });
//
//
//      if (!shouldThrow) {
//        it('Propagates TypeErrors from causes other than the ones we suppress', function() {
//          var a = (function() {
//            var a = {};
//            var privateProp = 1;
//            var getter = function() {return privateProp;};
//            var badSetter = function() {throw new TypeError();};
//            defineProperty('foo', {get: getter, set: badSetter}, a);
//            return a;
//          })();
//
//          var val = 42;
//          var fn = function() {
//            setter('foo', val, a);
//          };
//
//          expect(fn).to.throw(Error);
//        });
//      }
//    };
//
//
//    var makeCommonCreationTests = function(setter, shouldThrow) {
//      var defineProperty = object.defineProperty;
//      var hasOwnProperty = object.hasOwnProperty;
//
//
//      it('Creates the property if it doesn\'t exist', function() {
//        var a = {};
//        var val = 42;
//        setter('foo', val, a);
//
//        expect(hasOwnProperty('foo', a)).to.equal(true);
//      });
//
//
//      it('Creates the property if it only exists on the prototype', function() {
//        var A = function() {};
//        A.prototype.foo = 1;
//        var b = new A();
//        var val = 42;
//        setter('foo', val, b);
//
//        expect(hasOwnProperty('foo', b)).to.equal(true);
//        expect(b.foo).to.equal(val);
//      });
//    };
//
//
//    var makeSetterTests = function(desc, setter, shouldThrow) {
//      var spec = {
//        name: desc,
//        arity: 3,
//        restrictions: [[], [], ['objectlike']],
//        validArguments: [['foo'], [1], [{}]]
//      };
//
//
//      describeFunction(spec, setter, function(setter) {
//        makeCommonTests(setter, shouldThrow);
//        makeCommonModificationTests(setter, shouldThrow);
//        makeCommonCreationTests(setter, shouldThrow);
//
//        testCurriedFunction(setter, ['foo', 42, {reset: function() {return {};}}]);
//      });
//    };
//
//
//    makeSetterTests('set', object.set, false);
//    makeSetterTests('setOrThrow', object.setOrThrow, true);
//
//
//    var makeModifierTests = function(desc, modifier, shouldThrow) {
//      var spec = {
//        name: desc,
//        arity: 3
//      };
//
//
//      describeFunction(spec, modifier, function(modifier) {
//        makeCommonTests(modifier, shouldThrow);
//        makeCommonModificationTests(modifier, shouldThrow);
//
//
//        it('Doesn\'t create the property if it doesn\'t exist', function() {
//          var a = {};
//          var val = 42;
//          var fn = function() {
//            modifier('foo', val, a);
//          };
//
//          if (!shouldThrow) {
//            expect(fn).to.not.throw(TypeError);
//            expect(a).to.not.have.property('foo');
//          } else {
//            expect(fn).to.throw(TypeError);
//            expect(a).to.not.have.property('foo');
//          }
//        });
//
//
//        testCurriedFunction(modifier, ['foo', 42, {reset: function() {return {foo: 1};}}]);
//      });
//    };
//
//
//    makeModifierTests('modify', object.modify, false);
//    makeModifierTests('modifyOrThrow', object.modifyOrThrow, true);
//
//
//    var makeCreatorTests = function(desc, creator, shouldThrow) {
//      var spec = {
//        name: desc,
//        arity: 3
//      };
//
//
//      describeFunction(spec, creator, function(creator) {
//        makeCommonTests(creator, shouldThrow);
//        makeCommonCreationTests(creator, shouldThrow);
//
//
//        it('Doesn\'t modify the property if it exists', function() {
//          var a = {foo: 1};
//          var val = 42;
//          var fn = function() {
//            creator('foo', val, a);
//          };
//
//          if (!shouldThrow) {
//            expect(fn).to.not.throw(TypeError);
//          } else {
//            expect(fn).to.throw(TypeError);
//          }
//
//          expect(a.foo).to.equal(1);
//        });
//
//
//        it('Behaves correctly if preventExtensions has been called (3)', function() {
//          var a = {foo: 1};
//          Object.preventExtensions(a);
//          var val = 42;
//          var fn = function() {
//            creator('foo', val, a);
//          };
//
//          if (!shouldThrow) {
//            expect(fn).to.not.throw(Error);
//          } else {
//            expect(fn).to.throw(TypeError);
//          }
//          expect(a.foo).to.equal(1);
//        });
//
//
//        it('Behaves correctly if seal has been called (3)', function() {
//          var a = {foo: 1};
//          Object.seal(a);
//          var val = 42;
//          var fn = function() {
//            creator('foo', val, a);
//          };
//
//
//          if (!shouldThrow) {
//            expect(fn).to.not.throw(Error);
//          } else {
//            expect(fn).to.throw(TypeError);
//          }
//
//          expect(a.foo).to.equal(1);
//        });
//
//
//        testCurriedFunction(creator, ['foo', 42, {reset: function() {return {};}}]);
//      });
//    };
//
//
//    makeCreatorTests('createProp', object.createProp, false);
//    makeCreatorTests('createPropOrThrow', object.createPropOrThrow, true);
//
//
//    // The delete functions also have a similar structure
//    var makeDeleterTests = function(desc, deleter, shouldThrow) {
//      var spec = {
//        name: desc,
//        arity: 2,
//        restrictions: [[], ['objectlike']],
//        validArguments: [['abc'], [{}]]
//      };
//
//
//      describeFunction(spec, deleter, function(deleter) {
//        var hasOwnProperty = object.hasOwnProperty;
//        var defineProperty = object.defineProperty;
//
//
//        it('Object does not have property afterwards', function() {
//          var a = {foo: 1};
//          deleter('foo', a);
//
//          expect(hasOwnProperty('foo', a)).to.equal(false);
//        });
//
//
//        it('Behaves correctly if object does not have property', function() {
//          var a = {bar: 1};
//          var fn = function() {
//            deleter('foo', a);
//          };
//
//          if (!shouldThrow)
//            expect(fn).to.not.throw(TypeError);
//          else
//            expect(fn).to.throw(TypeError);
//        });
//
//
//        it('Behaves correctly if object does not have property but prototype does', function() {
//          var A = function() {};
//          A.prototype.foo = 1;
//          var b = new A();
//          var fn = function() {
//            deleter('foo', b);
//          };
//
//          if (!shouldThrow)
//            expect(fn).to.not.throw(TypeError);
//          else
//            expect(fn).to.throw(TypeError);
//
//          expect(hasOwnProperty('foo', Object.getPrototypeOf(b))).to.equal(true);
//        });
//
//
//        it('Behaves correctly if configurable false', function() {
//          var a = {};
//          defineProperty('foo', {configurable: false, value: 1}, a);
//          var fn = function() {
//            deleter('foo', a);
//          };
//
//          if (shouldThrow)
//            expect(fn).to.throw(Error);
//          else
//            expect(fn).to.not.throw(Error);
//
//          expect(a).to.have.property('foo');
//          expect(a.foo).to.equal(1);
//        });
//
//
//        it('Behaves if preventExtensions called (1)', function() {
//          var a = {foo: 1};
//          Object.preventExtensions(a);
//          deleter('foo', a);
//
//          expect(hasOwnProperty('foo', a)).to.equal(false);
//        });
//
//
//        it('Behaves correctly if preventExtensions called (2)', function() {
//          var a = {};
//          Object.preventExtensions(a);
//          var fn = function() {
//            deleter('foo', a);
//          };
//
//          if (!shouldThrow)
//            expect(fn).to.not.throw(TypeError);
//          else
//            expect(fn).to.throw(TypeError);
//        });
//
//
//        it('Behaves if seal called (1)', function() {
//          var a = {};
//          Object.seal(a);
//          var fn = function() {
//            deleter('foo', a);
//          };
//
//          if (!shouldThrow)
//            expect(fn).to.not.throw(TypeError);
//          else
//            expect(fn).to.throw(TypeError);
//        });
//
//
//        it('Behaves correctly if seal called (2)', function() {
//          var a = {foo: 1};
//          Object.seal(a);
//          var fn = function() {
//            deleter('foo', a);
//          };
//
//          if (!shouldThrow)
//            expect(fn).to.not.throw(TypeError);
//          else
//            expect(fn).to.throw(TypeError);
//
//          expect(a).to.have.property('foo');
//        });
//
//
//        it('Behaves if freeze called (1)', function() {
//          var a = {};
//          Object.freeze(a);
//          var fn = function() {
//            deleter('foo', a);
//          };
//
//          if (!shouldThrow)
//            expect(fn).to.not.throw(TypeError);
//          else
//            expect(fn).to.throw(TypeError);
//        });
//
//
//        it('Behaves correctly if freeze called (2)', function() {
//          var a = {foo: 1};
//          Object.freeze(a);
//          var fn = function() {
//            deleter('foo', a);
//          };
//
//          if (!shouldThrow)
//            expect(fn).to.not.throw(TypeError);
//          else
//            expect(fn).to.throw(TypeError);
//
//          expect(a).to.have.property('foo');
//        });
//
//
//        if (shouldThrow)
//          testCurriedFunction(deleter, ['foo', {reset: function() {return {foo: 1};}}]);
//        else
//          testCurriedFunction(deleter, ['foo', {reset: function() {return {};}}]);
//      });
//    };
//
//
//    makeDeleterTests('deleteProp', object.deleteProp, false);
//    makeDeleterTests('deletePropOrThrow', object.deletePropOrThrow, true);
//
//
//    var nonObjects = [
//      {name: 'number', val: 1},
//      {name: 'boolean', val: true},
//      {name: 'string', val: 'a'},
//      {name: 'undefined', val: undefined},
//      {name: 'null', val: null}];
//
//
//    var makeKeyBasedTests = function(desc, fnUnderTest, verifier, expectNonEnumerable) {
//      var defineProperty = object.defineProperty;
//
//
//      var spec = {
//        name: desc,
//        arity: 1
//      };
//
//
//      describeFunction(spec, fnUnderTest, function(fnUnderTest) {
//        var makeNonObjectTest = function(val) {
//          return function() {
//            var result = fnUnderTest(val);
//
//            expect(Array.isArray(result)).to.equal(true);
//            expect(checkArrayContent(result, [])).to.equal(true);
//          };
//        };
//
//
//        nonObjects.forEach(function(test) {
//          it('Returns empty array for value of type ' + test.name,
//             makeNonObjectTest(test.val));
//        });
//
//
//        it('Returns empty array for empty object', function() {
//          var result = fnUnderTest({});
//
//          expect(Array.isArray(result)).to.equal(true);
//          expect(checkArrayContent(result, [])).to.equal(true);
//        });
//
//
//        var addReturnsCorrectTest = function(message, obj) {
//          it('Returns correct value for ' + message, function() {
//            var expected = verifier(obj);
//            var result = fnUnderTest(obj);
//
//            expect(Array.isArray(result)).to.equal(true);
//            expect(checkArrayContent(result, expected)).to.equal(true);
//          });
//        };
//
//
//        addReturnsCorrectTest('object (1)', {foo: 1, bar: 2, baz: 3});
//        addReturnsCorrectTest('object (2)', object);
//        addReturnsCorrectTest('array', [1, 2, 3]);
//        addReturnsCorrectTest('empty array', []);
//
//
//        it('Only returns own properties', function() {
//          var F = function() {this.baz = 42;};
//          F.prototype = {foo: 1, bar: 2};
//          var a = new F();
//          var expected = verifier(a);
//          var result = fnUnderTest(a);
//
//          expect(Array.isArray(result)).to.equal(true);
//          expect(checkArrayContent(result, expected)).to.equal(true);
//        });
//
//
//        it('Behaves correctly with non-enumerable properties', function() {
//          var a = {foo: 1, bar: 2};
//          defineProperty('baz', {enumerable: false, value: 1}, a);
//          var result = fnUnderTest(a).indexOf('baz');
//
//          expect(result !== -1).to.equal(expectNonEnumerable);
//        });
//      });
//    };
//
//
//    makeKeyBasedTests('keys', object.keys, Object.keys, false);
//    makeKeyBasedTests('values', object.values, function(obj) {
//      return Object.keys(obj).map(function(k) {return obj[k];});
//    }, false);
//    makeKeyBasedTests('getOwnPropertyNames', object.getOwnPropertyNames, Object.getOwnPropertyNames, true);
//
//
//    var makeKeyPairBasedTests = function(desc, fnUnderTest, verifier) {
//      var spec = {
//        name: desc,
//        arity: 1
//      };
//
//
//      describeFunction(spec, fnUnderTest, function(fnUnderTest) {
//        var makeNonObjectTest = function(val) {
//          return function() {
//            var result = fnUnderTest(val);
//
//            expect(Array.isArray(result)).to.equal(true);
//            expect(checkArrayContent(result, [])).to.equal(true);
//          };
//        };
//
//
//        nonObjects.forEach(function(test) {
//          it('Returns empty array for value of type ' + test.name,
//             makeNonObjectTest(test.val));
//        });
//
//
//        it('Returns empty array for empty object', function() {
//          var result = fnUnderTest({});
//
//          expect(Array.isArray(result)).to.equal(true);
//          expect(checkArrayContent(result, [])).to.equal(true);
//        });
//
//
//        var verifyKeys = function(obj, result) {
//          var keys = result.map(function(r) {return r[0];});
//          var expected = Object.keys(obj);
//
//          expect(Array.isArray(result)).to.equal(true);
//          expect(result.every(function(val) {
//            return Array.isArray(val) && val.length === 2;
//          })).to.equal(true);
//          expect(checkArrayContent(keys, expected)).to.equal(true);
//        };
//
//
//        var verifyValues = function(obj, result) {
//          var keys = result.map(function(r) {return r[0];});
//          var values = result.map(function(r) {return r[1];});
//          return values.every(function(val, i) {
//            var key = keys[i];
//            return verifier(val, key, obj);
//          });
//        };
//
//
//        var addReturnsCorrectTests = function(message, obj) {
//          it('Returns correct keys for ' + message, function() {
//            var result = fnUnderTest(obj);
//
//            verifyKeys(obj, result);
//          });
//
//
//          it('Returns correct values for ' + message, function() {
//            var result = fnUnderTest(obj);
//
//            verifyValues(obj, result);
//          });
//        };
//
//
//        addReturnsCorrectTests('object (1)', {foo: 1, bar: 2, baz: 3});
//        addReturnsCorrectTests('object (2)', object);
//        addReturnsCorrectTests('array', [1, 2, 3]);
//        addReturnsCorrectTests('empty array', []);
//
//
//        it('Only returns keys for own properties', function() {
//          var F = function() {this.baz = 42;};
//          F.prototype = {foo: 1, bar: 2};
//          var a = new F();
//          var result = fnUnderTest(a);
//
//          verifyKeys(a, result);
//        });
//
//
//        it('Only returns values for own properties', function() {
//          var F = function() {this.baz = 42;};
//          F.prototype = {foo: 1, bar: 2};
//          var a = new F();
//          var result = fnUnderTest(a);
//
//          verifyValues(a, result);
//        });
//      });
//    };
//
//
//    makeKeyPairBasedTests('keyValues', object.keyValues, function(val, key, obj) {return val === obj[key];});
//
//    var propVerifier = function(val, key, obj) {
//      return checkEquality(val, object.getOwnPropertyDescriptor(key, obj));
//    };
//    makeKeyPairBasedTests('descriptors', object.descriptors, propVerifier);
//
//
//    var makeCloneTests = function(desc, fnUnderTest, verifier) {
//      var spec = {
//        name: desc,
//        arity: 1
//      };
//
//
//      describeFunction(spec, fnUnderTest, function(fnUnderTest) {
//        var isPrototypeOf = object.isPrototypeOf;
//        var keys = object.keys;
//        var defineProperty = object.defineProperty;
//        var getOwnPropertyNames = object.getOwnPropertyNames;
//        var getOwnPropertyDescriptor = object.getOwnPropertyDescriptor;
//
//
//        it('New object has does not have same prototype', function() {
//          var F = function() {};
//          var a = new F();
//          var clone = fnUnderTest(a);
//
//          expect(isPrototypeOf(Object.getPrototypeOf(a), clone)).to.equal(false);
//        });
//
//
//        it('New array has does have same prototype', function() {
//          var a = [1, 2, 3];
//          var clone = fnUnderTest(a);
//
//          expect(isPrototypeOf(Object.getPrototypeOf(a), clone)).to.equal(true);
//        });
//
//
//        it('New object has same own keys as original', function() {
//          var a = {foo: 1, bar: 2, baz: 3};
//          var clone = fnUnderTest(a);
//          var origKeys = keys(a);
//          var cloneKeys = keys(clone);
//
//          expect(checkArrayContent(origKeys, cloneKeys)).to.equal(true);
//        });
//
//
//        it('New array has same length as original', function() {
//          var a = [1, 2, 3];
//          var clone = fnUnderTest(a);
//
//          expect(clone.length).to.equal(a.length);
//        });
//
//
//        it('New object has same non-enumerable keys as original', function() {
//          var a = {foo: 1, bar: 2};
//          defineProperty('baz', {enumerable: false, value: 42}, a);
//          var clone = fnUnderTest(a);
//          var origKeys = getOwnPropertyNames(a);
//          var cloneKeys = getOwnPropertyNames(clone);
//
//          expect(checkArrayContent(origKeys, cloneKeys)).to.equal(true);
//        });
//
//
//        it('Enumerable properties are enumerable on clone', function() {
//          var a = {foo: 1, bar: 2};
//          defineProperty('baz', {enumerable: false, value: 42}, a);
//          var clone = fnUnderTest(a);
//          var bazDescriptor = getOwnPropertyDescriptor('foo', clone);
//
//          expect(bazDescriptor.enumerable).to.equal(true);
//        });
//
//
//        it('Non-enumerable properties are non-enumerable on clone', function() {
//          var a = {foo: 1, bar: 2};
//          defineProperty('baz', {enumerable: false, value: 42}, a);
//          var clone = fnUnderTest(a);
//          var bazDescriptor = getOwnPropertyDescriptor('baz', clone);
//
//          expect(bazDescriptor.enumerable).to.equal(false);
//        });
//
//
//        it('New array has same values as original', function() {
//          var a = [1, 2, 3, function() {}, {foo: 7, bar: 42}];
//          var clone = fnUnderTest(a);
//          var result = clone.every(function(val, i) {
//            return verifier(val, a[i]);
//          });
//
//          expect(result).to.equal(true);
//        });
//
//
//        it('New object has same values as original', function() {
//          var a = {
//            foo: 42,
//            bar: function() {},
//            baz: [1, 2, 3],
//            other: {v1: true, v2: {foo: 7, bar: 9}, v3: null}
//          };
//          defineProperty('nonenum', {enumerable: false, value: 'a'}, a);
//
//          var clone = fnUnderTest(a);
//          var result = getOwnPropertyNames(clone).every(function(k) {
//            return verifier(clone[k], a[k]);
//          });
//
//          expect(result).to.equal(true);
//        });
//
//
//        it('Cloning copies properties all the way up the prototype chain', function() {
//          var a = {};
//          defineProperty('foo', {enumerable: true, value: 'a'}, a);
//          defineProperty('bar', {enumerable: false, value: 1}, a);
//          var F = function() {};
//          F.prototype = Object.create(a);
//          defineProperty('fizz', {enumerable: true, value: 3}, a);
//          defineProperty('buzz', {enumerable: false, value: 5}, a);
//          var b = new F();
//          var clone = fnUnderTest(b);
//          var cloneProps = getOwnPropertyNames(clone);
//          var hasProp = function(p) {return cloneProps.indexOf(p) !== -1;};
//          var expectedProps = ['foo', 'bar', 'fizz', 'buzz'];
//          var result = expectedProps.every(hasProp);
//
//          expect(result).to.equal(true);
//        });
//
//
//        it('Cloning doesn\'t copy Object.prototype values', function() {
//          var a = {};
//          var clone = fnUnderTest(a);
//          var objProto = getOwnPropertyNames(Object.prototype);
//          var cloneProps = getOwnPropertyNames(clone);
//          var result = objProto.every(function(k) {
//            return cloneProps.indexOf(k) === -1;
//          });
//
//          expect(result).to.equal(true);
//        });
//
//
//        it('Cloning doesn\'t copy Array.prototype values', function() {
//          var a = [];
//          var clone = fnUnderTest(a);
//          var arrProto = getOwnPropertyNames(Array.prototype);
//          var cloneProps = getOwnPropertyNames(clone);
//          var result = arrProto.every(function(k) {
//            // Array.prototype does have a length property!
//            if (k === 'length') return true;
//
//            return cloneProps.indexOf(k) === -1;
//          });
//
//          expect(result).to.equal(true);
//        });
//
//
//        it('Handles null correctly', function() {
//          var a = null;
//          var clone = fnUnderTest(a);
//
//          expect(a).to.equal(clone);
//        });
//      });
//    };
//
//
//    var shallowCheck = function(val, cloneVal) {
//      return val === cloneVal;
//    };
//
//    makeCloneTests('shallowClone', object.shallowClone, shallowCheck);
//
//
//    var deepCheck = function(val, cloneVal) {
//      if (Array.isArray(val)) {
//        return val.every(function(newVal, i) {
//          return deepCheck(newVal, cloneVal[i]);
//        });
//      }
//
//      if (typeof(val) !== 'object' || val === null)
//        return val === cloneVal;
//
//      if (typeof(cloneVal) !== 'object')
//        return false;
//
//      if (val === cloneVal)
//        return false;
//
//      var propChecker = function(p) {
//        return deepCheck(val[p], cloneVal[p]);
//      };
//
//      while (val !== Object.prototype) {
//        var props = object.getOwnPropertyNames(val);
//        if (!props.every(propChecker))
//          return false;
//        val = Object.getPrototypeOf(val);
//      }
//
//      return true;
//    };
//
//    makeCloneTests('deepClone', object.deepClone, deepCheck);
//
//
//    var extendSpec = {
//      name: 'extend',
//      arity: 2
//    };
//
//
//    describeFunction(extendSpec, object.extend, function(extend) {
//      it('Returns the destination object', function() {
//        var dest = {};
//
//        expect(extend({}, dest)).to.equal(dest);
//      });
//
//
//      it('Every enumerable property in object afterwards', function() {
//        var source = {foo: 1, baz: 'a', bar: {}, fizz: [], buzz: function() {}};
//        var dest = {};
//        extend(source, dest);
//
//        for (var key in source)
//          expect(dest).to.have.ownProperty(key);
//      });
//
//
//      it('Every enumerable property has correct value afterwards', function() {
//        var source = {foo: 1, baz: 'a', bar: {}, fizz: [], buzz: function() {}};
//        var dest = {};
//        extend(source, dest);
//
//        for (var key in source)
//          expect(dest[key]).to.equal(source[key]);
//      });
//
//
//      it('Every enumerable property from prototype chain in object afterwards', function() {
//        var proto = {foo: 1, baz: 'a', bar: {}, fizz: [], buzz: function() {}};
//        var source = Object.create(proto);
//        var dest = {};
//        extend(source, dest);
//
//        for (var key in proto)
//          expect(dest).to.have.ownProperty(key);
//      });
//
//
//      it('Every enumerable property has correct value afterwards', function() {
//        var proto = {foo: 1, baz: 'a', bar: {}, fizz: [], buzz: function() {}};
//        var source = Object.create(proto);
//        var dest = {};
//        extend(source, dest);
//
//        for (var key in proto)
//          expect(dest[key]).to.equal(proto[key]);
//      });
//
//
//      it('Non-enumerable properties not copied', function() {
//        var source = {};
//        object.defineProperty('foo', {enumerable: false, value: 1}, source);
//        var dest = {};
//        extend(source, dest);
//
//        expect(dest).to.not.have.property('foo');
//      });
//
//
//      it('Existing values overwritten', function() {
//        var source = {foo: 2};
//        var dest = {foo: 1};
//        extend(source, dest);
//
//        expect(dest.foo).to.equal(source.foo);
//      });
//
//
//      testCurriedFunction(extend, [{foo: 1}, {reset: function() {return {};}}]);
//    });
//
//
//    var extendOwnSpec = {
//      name: 'extendOwn',
//      arity: 2
//    };
//
//
//    describeFunction(extendOwnSpec, object.extendOwn, function(extendOwn) {
//      it('Returns the destination object', function() {
//        var dest = {};
//
//        expect(extendOwn({}, dest)).to.equal(dest);
//      });
//
//
//      it('Every enumerable property in object afterwards', function() {
//        var source = {foo: 1, baz: 'a', bar: {}, fizz: [], buzz: function() {}};
//        var dest = {};
//        extendOwn(source, dest);
//
//        for (var key in source)
//          expect(dest).to.have.ownProperty(key);
//      });
//
//
//      it('Every enumerable property has correct value afterwards', function() {
//        var source = {foo: 1, baz: 'a', bar: {}, fizz: [], buzz: function() {}};
//        var dest = {};
//        extendOwn(source, dest);
//
//        for (var key in source)
//          expect(dest[key]).to.equal(source[key]);
//      });
//
//
//      it('No enumerable properties from prototype chain in object afterwards', function() {
//        var proto = {foo: 1, baz: 'a', bar: {}, fizz: [], buzz: function() {}};
//        var source = Object.create(proto);
//        var dest = {};
//        extendOwn(source, dest);
//
//        for (var key in proto)
//          expect(dest).to.not.have.property(key);
//      });
//
//
//      it('Non-enumerable properties not copied', function() {
//        var source = {};
//        object.defineProperty('foo', {enumerable: false, value: 1}, source);
//        var dest = {};
//        extendOwn(source, dest);
//
//        expect(dest).to.not.have.property('foo');
//      });
//
//
//      it('Existing values overwritten', function() {
//        var source = {foo: 2};
//        var dest = {foo: 1};
//        extendOwn(source, dest);
//
//        expect(dest.foo).to.equal(source.foo);
//      });
//
//
//      testCurriedFunction(extendOwn, [{foo: 1}, {reset: function() {return {};}}]);
//    });
//  };
//
//
//  // AMD/CommonJS foo: aim to allow running testsuite in browser with require.js (TODO)
//  if (typeof(define) === "function") {
//    define(function(require, exports, module) {
//      testFixture(require, exports, module);
//    });
//  } else {
//    testFixture(require, exports, module);
//  }
//})();