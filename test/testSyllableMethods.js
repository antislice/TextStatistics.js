var assert = require('assert');
var TextStatistics = require('../index.js');

describe('TextStatistics', function() {
  describe('#wordsWithThreeSyllables()', function() {
    it('should ignore email addresses');
  });

  describe('#wordsWithFourOrMoreSyllablesList()', function() {
    it('should ignore a long email address');
    it('should ignore a 3 syllable word');
    it('should catch a single long word');
    it('should catch multiple long words');
  });

});
