/* eslint-disable func-names */
/* eslint-disable no-use-before-define */

const mocha = require('mocha');
const assert = require('assert');

const Annotation = require('../lib/annotation');

mocha.describe('Annotation test', () => {
  mocha.it('Annotate with function declaration', () => {
    Annotation.annotate(foo, { fooParam: 'fooParam' });
    function foo() {}
    const actual = Annotation.getAnnotated();
    const expected = {
      foo: {
        objectInterface: { value: foo },
        params: { fooParam: 'fooParam' },
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  mocha.it('Annotate with function expression', () => {
    const fooInterface = Annotation.annotate('foo', { fooParam: 'fooParam' });
    const foo = (fooInterface.value = function () {});
    const actual = Annotation.getAnnotated();
    const expected = {
      foo: {
        objectInterface: { value: foo },
        params: { fooParam: 'fooParam' },
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  mocha.it('Annotate with object', () => {
    const fooInterface = Annotation.annotate('foo', { fooParam: 'fooParam' });
    const foo = (fooInterface.value = { objectParam: 'objectParam' });
    const actual = Annotation.getAnnotated();
    const expected = {
      foo: {
        objectInterface: { value: foo },
        params: { fooParam: 'fooParam' },
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  mocha.it('Annotate with variable', () => {
    const fooInterface = Annotation.annotate('foo', { fooParam: 'fooParam' });
    const foo = (fooInterface.value = 'fooVariable');
    const actual = Annotation.getAnnotated();
    const expected = {
      foo: {
        objectInterface: { value: foo },
        params: { fooParam: 'fooParam' },
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  mocha.it('Annotate with two different functions', () => {
    Annotation.annotate(foo, { fooParam: 'fooParam' });
    function foo() {}
    Annotation.annotate(bar, { barParam: 'barParam' });
    function bar() {}
    const actual = Annotation.getAnnotated();
    const expected = {
      foo: {
        objectInterface: { value: foo },
        params: { fooParam: 'fooParam' },
      },
      bar: {
        objectInterface: { value: bar },
        params: { barParam: 'barParam' },
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
});
