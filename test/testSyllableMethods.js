var assert = require('assert');
var TextStatistics = require('../index.js');

describe('TextStatistics', function() {
  describe('#wordsWithThreeSyllables()', function() {
    it('should ignore email addresses', function() {
      var ts = TextStatistics('syllablesyllablesyllable@example.com');
      assert.equal(0, ts.wordsWithThreeSyllables());
    });
  });

  describe('#wordsWithFourOrMoreSyllablesList()', function() {
    it('should ignore a long email address', function() {
      var ts = TextStatistics('syllablesyllablesyllable@example.com');
      assert.equal(0, ts.wordsWithFourOrMoreSyllablesList().length);
    });

    it('should ignore a 3 syllable word', function() {
      var ts = TextStatistics('syllable');
      assert.equal(0, ts.wordsWithFourOrMoreSyllablesList().length);
    });

    it('should catch a single long word', function() {
      var ts = TextStatistics('experiment.');
      assert.equal(1, ts.wordsWithFourOrMoreSyllablesList().length);
      assert.equal('experiment.', ts.wordsWithFourOrMoreSyllablesList()[0]);
    });

    it('should catch multiple long words', function() {
      var ts = TextStatistics('experimental emergencies.');
      assert.equal(2, ts.wordsWithFourOrMoreSyllablesList().length);
      assert.equal('experimental', ts.wordsWithFourOrMoreSyllablesList()[0]);
      assert.equal('emergencies.', ts.wordsWithFourOrMoreSyllablesList()[1]);
    });
  });

});
