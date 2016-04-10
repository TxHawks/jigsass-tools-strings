'use strict';

/* global assert, fs, path, Sassaby,  */

describe('jigsass-tools-strings', () => {
  const file = path.resolve(__dirname, 'helpers/importer.scss');
  const sassaby = new Sassaby(file);

  it('Can be imported', () => {
    const sassaby = new Sassaby(file, { variables: { empty: '' } });
    sassaby.func('jig-var-equals').calledWithArgs('"", $empty');
  });


  describe('jigsass-str-to-number [Function]', () => {
    it('Converts a string to an integer', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('"24"')
        .equals(24);
    });

    it('Converts a string to a negative integer', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('"-24"')
        .equals(-24);
    });

    it('Converts a string to an integer with a unit', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('"24px"')
        .equals('24px');
    });

    it('Converts a string padded with zero to an integer', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('"024"')
        .equals(24);
    });

    it('Converts a string paddend with zero to a negative integer', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('"-024"')
        .equals(-24);
    });

    it('Converts a string to a float', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('"24.5"')
        .equals(24.5);
    });

    it('Converts a string to a negative float', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('"-24.5"')
        .equals(-24.5);
    });

    it('Converts a string to a float bellow 1', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('".51"')
        .equals('.51');
    });

    it('Converts a string to a negative float bellow 1 (zero padded)', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('"-0.5"')
        .equals(-.5);
    });

    it('Converts a string to a float bellow 1 (zero padded)', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('"0.5"')
        .equals('.5');
    });

    it('Converts a string to a negative float bellow 1 (zero padded)', () => {
      sassaby.func('jigsass-str-to-number')
        .calledWithArgs('"-0.5"')
        .equals(-.5);
    });
  });


  describe('jigsass-str-trim [Function]', () => {
    it('Removes whitespace at beginning and end of a string', () => {
      sassaby.func('jigsass-str-trim')
        .calledWithArgs('"   a padded string   "')
        .equals('"a padded string"');
        ;
    });

    it('Removes whitespace only at the beginning of a string', () => {
      sassaby.func('jigsass-str-trim')
        .calledWithArgs('"   a padded string   "', true, false)
        .equals('"a padded string   "');
        ;
    });

    it('Removes whitespace only at the end of a string', () => {
      sassaby.func('jigsass-str-trim')
        .calledWithArgs('"   a padded string   "', false, true)
        .equals('"   a padded string"');
        ;
    });
  });


  describe('jigsass-str-split [Function]', () => {
    it('Returns `$string` when separator doesn\' exist in string', () => {
      sassaby.func('jigsass-str-split')
        .calledWithArgs('string, foo')
        .equals('string');
    });

    it('Returns `$string` when separator is false or null', () => {
      sassaby.func('jigsass-str-split')
        .calledWithArgs('string')
        .equals('string');
    });

    it('Explodes into a list of letters', () => {
      sassaby.func('jigsass-str-split')
        .calledWithArgs('string, ""')
        .equals('s,t,r,i,n,g');
    });

    it('Splits string by separator', () => {
      sassaby.func('jigsass-str-split')
        .calledWithArgs('"this is a list", " "')
        .equals('"this","is","a","list"');
    });

    it('Splits string by multi-character separator', () => {
      sassaby.func('jigsass-str-split')
        .calledWithArgs('"bem--modifier", "--"')
        .equals('"bem","modifier"');
    });

    it('Splits string to a limit of separator occurrences', () => {
      sassaby.func('jigsass-str-split')
        .calledWithArgs('"foo bar baz quax frog", " ", 2')
        .equals('"foo","bar"');
    });

    it('Trims whitespace correctly', () => {
      sassaby.func('jigsass-str-split')
        .calledWithArgs('"this, is ,   a, list,of , words", ","')
        .equals('"this"," is ","   a","list","of ","words"');
    });
  });


  describe('jigsass-str-replace [Function]', () => {
    it('Replaces a substring in the middle of a string', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('A string to search in', 'to', 'we can')
        .equals('A string we can search in');
    });

    it('Replaces a substring at he beginning of a sring', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('"foo bar baz"', 'foo', 'quax')
        .equals('quax bar baz');
    });

    it('Replace all instances of the substring by default', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('foo bar baz quax foo bar norf', 'bar', 'frog')
        .equals('foo frog baz quax foo frog norf');
    });

    it('Can replace only a single instance of the substring', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('foo bar baz quax foo bar norf', 'bar', 'frog', '$replace-all: false')
        .equals('foo frog baz quax foo bar norf');
    });

    it('Is case sensitive', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('foo Bar baz', 'bar', 'quax')
        .equals('foo Bar baz');
    });

    it('Can ignore case diffrences', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('foo Bar baz', 'bar', 'Quax', '$match-case: false')
        .equals('foo Quax baz');
    });
  });

  describe('jigsass-str-escape [Function]', () => {
    it('Escapes special characters in a string', () => {
      sassaby.func('jigsass-str-escape')
        .calledWithArgs('"a string w%th special ch.arac:ters"')
        .equals('a\\ string\\ w\\%th\\ special\\ ch\\.arac\\:ters');
    });
  });
});
