var assert = require('assert');
var TextStatistics = require('../index.js');

describe('TextStatistics', function() {

  describe('#sentenceCount()', function() {
    it('should count a single sentence', function() {
      var ts = TextStatistics('see spot run.');
      assert.equal(1, ts.sentenceCount());
    });

    it('should count a single sentence with a comma', function() {
      var ts = TextStatistics('see, spot runs.');
      assert.equal(1, ts.sentenceCount());
    });

    it('should count a few simple sentences', function() {
      var ts = TextStatistics('see spot run. good job spot. have a treat.');
      assert.equal(3, ts.sentenceCount());
    });
  });

  describe('#wordCount()', function() {
    it('a string w/o words should have word count of one, because dividing by zero', function() {
      var ts = TextStatistics('.');
      assert.equal(1, ts.wordCount());
    });

    it('should count the number of words in a text', function() {
      var ts = TextStatistics('see spot run');
      assert.equal(3, ts.wordCount());
    });

    it('should not count words with an apostrophe as two words', function() {
      var ts = TextStatistics('they\'re');
      assert.equal(1, ts.wordCount());
    });

    it('should not count the empty string after a period as a word', function() {
      var ts = TextStatistics('dog.');
      assert.equal(1, ts.wordCount());
    });

    it('should count an email address as a single word', function() {
      var ts = TextStatistics('textstatistics@example.com');
      assert.equal(1, ts.wordCount());
    });

    it('should count words with a dash as a single word', function() {
      var ts = TextStatistics('long-term');
      assert.equal(1, ts.wordCount());
    });

    it('should count words abbreviated with a ’ (not \') as one word', function() {
      var text = 'It’s also important to think about how people access your content.';
      var ts = TextStatistics(text);
      assert.equal(11, ts.wordCount());
    });
  });

  describe('#sentencesOver25WordsList()', function() {
    it('should catch a sentence with exactly 25 words', function() {
      var longSentence = 'This sentence has exactly twenty five words and so this test should complain about it ' +
                         'sixteen seventeen eighteen nineteen twenty twentyone twentytwo twentythree twentyfour twentyfive.';
      var ts = TextStatistics(longSentence);

      assert.equal(25, ts.wordCount());
      assert.equal(longSentence, ts.sentencesOver25WordsList()[0]);
    });

    it('should not catch a 24 word sentence', function() {
      var longSentence = 'This sentence has exactly twenty four words and so this test should complain about it ' +
                         'sixteen seventeen eighteen nineteen twenty twentyone twentytwo twentythree twentyfour.';
      var ts = TextStatistics(longSentence);

      assert.equal(24, ts.wordCount());
      assert.equal(0, ts.sentencesOver25WordsList().length);
    });

    it('should catch a longer than 25 word sentence', function() {
      var longSentence = 'This sentence has exactly twenty six words and so this test should complain about it ' +
                         'sixteen seventeen eighteen nineteen twenty twentyone twentytwo twentythree twentyfour twentyfive twentysix.';
      var ts = TextStatistics(longSentence);

      assert.equal(26, ts.wordCount());
      assert.equal(longSentence, ts.sentencesOver25WordsList()[0]);
    });
  });
});