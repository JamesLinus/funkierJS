(function() {
  "use strict";


  var testFixture = function(require, exports) {
    var chai = require('chai');
    var expect = chai.expect;

    var base = require('../base');
    var date = require('../date');

    // Import utility functions
    var testUtils = require('./testUtils');
    var exportsProperty = testUtils.exportsProperty;
    var exportsFunction = testUtils.exportsFunction;
    var testCurriedFunction = testUtils.testCurriedFunction;
    var checkArrayEquality = testUtils.checkArrayEquality;
    var getRealArity = base.getRealArity;


    describe('Date exports', function() {
      var expectedFunctions = ['getDayOfMonth', 'getDayOfWeek', 'getFullYear', 'getHours',
                               'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds',
                               'toEpochMilliseconds', 'getTimezoneOffset', 'getUTCDayOfMonth',
                               'getUTCDayOfWeek', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds',
                               'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'toLocaleDateString',
                               'toLocaleString', 'toLocaleTimeString', 'toDateString', 'toTimeString',
                               'toISOString', 'toUTCString'];

      // Automatically generate existence tests for each expected function
      expectedFunctions.forEach(function(f) {
        it('date.js exports \'' + f + '\' property', exportsProperty(date, f));
        it('\'' + f + '\' property of date.js is a function', exportsFunction(date, f));
      });
    });


    var makeUnaryDateTest = function(desc, fnUnderTest, verifier) {
      describe(desc, function() {
        it('Has correct arity', function() {
          expect(getRealArity(fnUnderTest)).to.equal(1);
        });


        it('Works correctly (1)', function() {
          var testDate = new Date(2000, 0, 1, 0, 0, 0, 0);
          var result = fnUnderTest(testDate);

          expect(result).to.equal(testDate[verifier]());
        });


        it('Works correctly (2)', function() {
          var d = new Date();
          var result = fnUnderTest(d);

          expect(result).to.equal(d[verifier]());
        });
      });
    };


    makeUnaryDateTest('getDayOfMonth', date.getDayOfMonth, 'getDate');
    makeUnaryDateTest('getDayOfWeek', date.getDayOfWeek, 'getDay');
    makeUnaryDateTest('getFullYear', date.getFullYear, 'getFullYear');
    makeUnaryDateTest('getHours', date.getHours, 'getHours');
    makeUnaryDateTest('getMilliseconds', date.getMilliseconds, 'getMilliseconds');
    makeUnaryDateTest('getMinutes', date.getMinutes, 'getMinutes');
    makeUnaryDateTest('getMonth', date.getMonth, 'getMonth');
    makeUnaryDateTest('getSeconds', date.getSeconds, 'getSeconds');
    makeUnaryDateTest('toEpochMilliseconds', date.toEpochMilliseconds, 'getTime');
    makeUnaryDateTest('getTimezoneOffset', date.getTimezoneOffset, 'getTimezoneOffset');
    makeUnaryDateTest('getUTCDayOfMonth', date.getUTCDayOfMonth, 'getUTCDate');
    makeUnaryDateTest('getUTCDayOfWeek', date.getUTCDayOfWeek, 'getUTCDay');
    makeUnaryDateTest('getUTCFullYear', date.getUTCFullYear, 'getUTCFullYear');
    makeUnaryDateTest('getUTCHours', date.getUTCHours, 'getUTCHours');
    makeUnaryDateTest('getUTCMilliseconds', date.getUTCMilliseconds, 'getUTCMilliseconds');
    makeUnaryDateTest('getUTCMinutes', date.getUTCMinutes, 'getUTCMinutes');
    makeUnaryDateTest('getUTCMonth', date.getUTCMonth, 'getUTCMonth');
    makeUnaryDateTest('getUTCSeconds', date.getUTCSeconds, 'getUTCSeconds');
    makeUnaryDateTest('toLocaleDateString', date.toLocaleDateString, 'toLocaleDateString');
    makeUnaryDateTest('toLocaleString', date.toLocaleString, 'toLocaleString');
    makeUnaryDateTest('toLocaleTimeString', date.toLocaleTimeString, 'toLocaleTimeString');
    makeUnaryDateTest('toDateString', date.toDateString, 'toDateString');
    makeUnaryDateTest('toTimeString', date.toTimeString, 'toTimeString');
    makeUnaryDateTest('toISOString', date.toISOString, 'toISOString');
    makeUnaryDateTest('toUTCString', date.toUTCString, 'toUTCString');
  };


  // AMD/CommonJS foo: aim to allow running testsuite in browser with require.js (TODO)
  if (typeof(define) === "function") {
    define(function(require, exports, module) {
      testFixture(require, exports, module);
    });
  } else {
    testFixture(require, exports, module);
  }
})();
