(function() {
  "use strict";


  var expect = require('chai').expect;
  var APIPrototype = require('../../docgen/APIPrototype');
  var APIObject = require('../../docgen/APIObject');


  describe('APIObject constructor', function() {
    it('Constructor returns an object of the correct type', function() {
      expect(new APIObject('foo', 'a.js', 'Bar', 'baz', {})).to.be.an.instanceOf(APIObject);
    });


    it('Constructor is new agnostic', function() {
      expect(APIObject('foo', 'a.js', 'Bar', 'baz', {})).to.be.an.instanceOf(APIObject);
    });


    it('Returned objects should have APIPrototype in their prototype chain', function() {
      expect(APIPrototype.isPrototypeOf(APIObject('foo', 'a.js', 'Bar', 'baz', {}))).to.equal(true);
    });


    /*
     * Invalid test generation: The constructor takes five parameters. The first four should be strings, and the
     * last an object. We wish to test that the constructor throws when supplied an argument of invalid type at each
     * position. We generate these tests automatically.
     *
     */

    ['name', 'filename', 'category', 'summary', 'options'].forEach(function(paramName, i, arr) {
      var stringInvalids = [1, true, {}, [], function() {}, undefined, null];
      var objectInvalids = [1, true, 'abc', [], function() {}, undefined, null];

      (i === arr.length - 1 ? objectInvalids: stringInvalids).map(function(invalid, j) {
        it('Constructor throws when ' + paramName + ' is invalid (' + (j + 1) + ')', function() {
          var args = ['foo', 'a.js', 'Bar', 'baz', {}];
          args[i] = invalid;
          var fn = function() {
            APIObject.apply(null, args);
          };

          expect(fn).to.throw();
        });
      });
    });
  });


  describe('APIObject objects', function() {
    it('name property correct', function() {
      var name = 'fizz';
      var obj = APIObject(name, 'a.js', 'Bar', 'baz', {});
      expect(obj.name).to.equal(name);
    });


    it('filename property correct', function() {
      var filename = 'a.js';
      var obj = APIObject('fizz', filename, 'Bar', 'baz', {});
      expect(obj.filename).to.equal(filename);
    });


    it('category property correct', function() {
      var category = 'Bar';
      var obj = APIObject('fizz', 'a.js', category, 'baz', {});
      expect(obj.category).to.equal(category);
    });


    it('summary property correct', function() {
      var summary = 'baz';
      var obj = APIObject('fizz', 'a.js', 'Bar', summary, {});
      expect(obj.summary).to.equal(summary);
    });


    it('summary property shorn of trailing newlines', function() {
      var summary = 'baz';
      var obj = APIObject('fizz', 'a.js', 'Bar', summary + '    \n', {});
      expect(obj.summary).to.equal(summary);
    });


    it('Newlines within the summary are preserved', function() {
      var summary = 'baz\nfoo';
      var obj = APIObject('fizz', 'a.js', 'Bar', summary, {});
      expect(obj.summary).to.equal(summary);
    });


    /*
     * The 'details', and 'examples' properties share some common characteristics:
     *   - They are arrays of strings
     *   - They should default to an empty array if not present in the options object
     *   - The array should be a clone of the value supplied to the constructor (not a reference)
     *   - The array should be immutable
     *
     * Given this commonality, we can automatically generate the tests.
     *
     */

    ['details', 'examples'].forEach(function(property) {
      it(property + ' is an empty array if not provided', function() {
        var obj = APIObject('fizz', 'a.js', 'Bar', 'baz', {});
        expect(obj[property]).to.deep.equal([]);
      });


      it(property + ' is correct when provided', function() {
        var expected = ['line 1', 'line 2', 'line 3'];
        var options = {};
        options[property] = expected;
        var obj = APIObject('fizz', 'a.js', 'Bar', 'baz', options);
        expect(obj[property]).to.deep.equal(expected);
      });


      it(property + ' is a copy of supplied array when provided', function() {
        var expected = ['line 1', 'line 2', 'line 3'];
        var options = {};
        options[property] = expected;
        var obj = APIObject('fizz', 'a.js', 'Bar', 'baz', options);
        expect(obj[property] === expected).to.equal(false);
      });


      it(property + ' array is immutable (1)', function() {
        var expected = ['line 1', 'line 2', 'line 3'];
        var options = {};
        options[property] = expected;
        var obj = APIObject('fizz', 'a.js', 'Bar', 'baz', options);

        expect(Object.isFrozen(obj[property])).to.equal(true);
      });


      it(property + ' array is immutable (2)', function() {
        var obj = APIObject('fizz', 'a.js', 'Bar', 'baz', {});
        expect(Object.isFrozen(obj[property])).to.equal(true);
      });
    });


    it('Returned objects are immutable (1)', function() {
      var obj = APIObject('fizz', 'a.js', 'Bar', 'baz', {});

      expect(Object.isFrozen(obj)).to.equal(true);
    });


    it('Returned objects are immutable (2)', function() {
      var options = {
        details: ['line 1', 'line 2'],
        examples: ['line 1']
      };
      var obj = APIObject('fizz', 'a.js', 'Bar', 'baz', options);

      expect(Object.isFrozen(obj)).to.equal(true);
    });


    it('Categories are normalized', function() {
      var obj = APIObject('fizz', 'a.js', 'foo', 'buzz', {});

      expect(obj.category).to.equal('Foo');
    });


    it('Category normalization preserves camelCasing other than for the first letter', function() {
      var obj = APIObject('fizz', 'a.js', 'fooBar', 'buzz', {});

      expect(obj.category).to.equal('FooBar');
    });


    it('Paragraph breaks in details are preserved', function() {
      var details = ['Line 1', '', 'Line 2', '  ', 'Line 3'];
      var obj = APIObject('fizz', 'a.js', 'Bar', 'buzz', {details: details});
      expect(obj.details).to.deep.equal(details.map(function(s) { return s.trim(); }));
    });


    ['details', 'examples'].forEach(function(propName) {
      it('Trailing newlines at the end of ' + propName + ' entries are stripped', function() {
        var values = ['Line 1', 'Line 2'];
        var valuesToSupply = values.map(function(s, i) {
        var whitespace = '';
        for (var j = 0; j < i + 1; j++) whitespace += ' ';
          return s + whitespace + '\n';
        });

        var options = {};
        options[propName] = valuesToSupply;
        var obj = APIObject('fizz', 'a.js', 'Bar', 'buzz', options);
        expect(obj[propName]).to.deep.equal(values);
      });


      it('Internal newlines are split in ' + propName + ' entries', function() {
        var values = ['Line 1', 'Line 2'];
        var valuesToSupply = [values.join('\n')];
        var options = {};
        options[propName] = valuesToSupply;
        var obj = APIObject('fizz', 'a.js', 'Bar', 'buzz', options);
        expect(obj[propName]).to.deep.equal(values);
      });
    });
  });
})();
