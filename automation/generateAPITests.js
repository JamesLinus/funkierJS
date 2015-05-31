module.exports = (function() {
  "use strict";

  var fs = require('fs');
  var path = require('path');

  var APIFunction = require('../docgen/APIFunction');
  var APIObject = require('../docgen/APIObject');


  var preamble = [
    '(function() {',
    '  "use strict";',
    '',
    '',
    '  /* NOTE: THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT MANUALLY */',
    '',
    '',
    '  var expect = require(\'chai\').expect;',
    '  var funkier = require(\'../../lib/funkier\');',
    '',
    '',
    '  describe(\'Documented values\', function() {'];


  var postscript = [
    '  });',
    '})();'];


  var addExistenceTest = function(name, buffer) {
    buffer.push('      it(\'' + name + ' exists\', function() {');
    buffer.push('        expect(funkier).to.have.a.property(\'' + name + '\');');
    buffer.push('      });');
    buffer.push('');
    buffer.push('');
  };


  var addSynonymTest = function(value, buffer) {
    var name = value.name;
    var aliases = value.synonymFor;
    buffer.push('      it(\'' + name + ' is a synonym for ' + aliases + '\', function() {');
    buffer.push('        expect(funkier.' + name + ').to.equal(funkier.' + aliases + ');');
    buffer.push('      });');
  };


  var addIsReexportedTest = function(value, dest, buffer) {
    // Value contains a filename. This filename will be relative to process.cwd, as the values will have been
    // collated during the current task run. We need to produce a path for the require call relative to the
    // location of the test file.

    var testFileAbsolute = path.resolve(process.cwd(), dest);
    var fileAbsolute = path.resolve(process.cwd(), value.filename);
    var relative = path.relative(path.dirname(testFileAbsolute), path.dirname(fileAbsolute));
    if (relative === '') relative = '.';

    var filename = relative + path.sep + path.basename(value.filename, path.extname(value.filename));
    var name = value.name;

    buffer.push('      it(\'funkierJS\\\'s ' + name + ' is indeed the documented value\', function() {');
    buffer.push('        var module = require(\'' + filename + '\');');
    buffer.push('        expect(funkier.' + name + ').to.equal(module.' + name + ');');
    buffer.push('      });');
    buffer.push('');
    buffer.push('');
  };


  var addIsObjectTest = function(name, buffer) {
    buffer.push('      it(\'' + name + ' is an object\', function() {');
    buffer.push('        expect(funkier.' + name + ').to.be.an(\'object\');');
    buffer.push('      });');
  };


  var addIsFunctionTest = function(name, buffer) {
    buffer.push('      it(\'' + name + ' is a function\', function() {');
    buffer.push('        expect(funkier.' + name + ').to.be.a(\'function\');');
    buffer.push('      });');
    buffer.push('');
    buffer.push('');
  };


  var addHasCorrectArityTest = function(value, buffer) {
    var arity = value.parameters.length;
    buffer.push('      it(\'' + value.name + ' has documented arity\', function() {');
    buffer.push('        expect(funkier.arityOf(funkier.' + value.name + ')).to.equal(' + arity + ');');
    buffer.push('      });');
    buffer.push('');
    buffer.push('');
  };


  var addIsCurriedTest = function(name, buffer) {
    buffer.push('      it(\'' + name + ' is curried\', function() {');
    buffer.push('        expect(funkier.arityOf._isCurried(funkier.' + name + ')).to.equal(true);');
    buffer.push('      });');
  };


  var addExportsDocumentedTests = function(names, buffer) {
    buffer.push('  });');
    buffer.push('');
    buffer.push('');
    buffer.push('  describe(\'Exported values\', function() {');
    buffer.push('    var documentedNames;');
    buffer.push('');
    buffer.push('');
    buffer.push('    beforeEach(function() {');

    names = '      documentedNames = [\'help\', ' + names.map(function(o) { return '\'' + o.name + '\''; }).join(', ') + '];';
    while (names.length > 120) {
      var last = names.slice(0, 120).lastIndexOf(', ') + 1;
      buffer.push(names.slice(0, last));
      names = '        ' + names.slice(last);
    }
    buffer.push(names);
    buffer.push('    });');
    buffer.push('');
    buffer.push('');
    buffer.push('    Object.keys(funkier).forEach(function(k) {');
    buffer.push('      var prop = funkier[k];');
    buffer.push('      if (k[0] === \'_\' || prop === null ||');
    buffer.push('          (typeof(prop) !== \'object\' && typeof(prop) !== \'function\'))');
    buffer.push('        return;');
    buffer.push('');
    buffer.push('      it(k + \' is documented\', function() {');
    buffer.push('        expect(documentedNames.indexOf(k)).to.not.equal(-1);');
    buffer.push('      });');
    buffer.push('    });');
  };


  return function(collated, options) {
    var buffer = preamble;
    
    var byName = collated.byName();

    byName.forEach(function(documentedValue, i, arr) {
      var pushPostscript = function() {
        buffer.push('    });');
        if (i === arr.length - 1) return;
        buffer.push('');
        buffer.push('');
      };


      buffer.push('    describe(\'' + documentedValue.name + '\', function() {');
      addExistenceTest(documentedValue.name, buffer);
      
      if ('synonymFor' in documentedValue) {
        addSynonymTest(documentedValue, buffer);
        pushPostscript();
        return;
      }

      addIsReexportedTest(documentedValue, options.dest, buffer);

      if (documentedValue instanceof APIObject) {
        addIsObjectTest(documentedValue.name, buffer);
        pushPostscript();
        return;
      }

      addIsFunctionTest(documentedValue.name, buffer);
      addHasCorrectArityTest(documentedValue, buffer);

      // Don't require constructors to be curried
      if (!(/^[A-Z]/.test(documentedValue.name)))
        addIsCurriedTest(documentedValue.name, buffer);

      pushPostscript();
    });


    addExportsDocumentedTests(byName, buffer);

    buffer = buffer.concat(postscript).map(function(s) {
      return /\n$/.test(s) ? s : s + '\n';
    });

    buffer = buffer.join('');

    fs.writeFileSync(options.dest, buffer, {encoding: 'utf-8'});
  };
})();
