const mocha = require('mocha');
const assert = require('assert');

const AnnotationsExceptions = require('../lib/annotations-exceptions');
const Annotation = require('../lib/annotation');

Annotation.bind(CustomAnnotation);
function CustomAnnotation() {}

mocha.describe('Annotation test', () => {
  mocha.it('Bind invalid input', () => {
    assert.throws(() => {
      Annotation.bind('foo');
    }, new Error(AnnotationsExceptions.INVALID_BINDING));
  });

  mocha.it('Bind invalid params', () => {
    assert.throws(() => {
      Annotation.bind(FooAnnotation, 'foo');
      function FooAnnotation() {}
    }, new Error(AnnotationsExceptions.INVALID_PARAMS));
  });

  mocha.it('Annotate with function declaration', () => {
    CustomAnnotation.annotate(foo, { fooParam: 'fooParam' });
    function foo() {}
    const actual = CustomAnnotation.getAnnotated();
    const expected = {
      foo: {
        objectInterface: { value: foo },
        params: { fooParam: 'fooParam' },
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  mocha.it('Annotate with function expression', () => {
    const fooInterface = CustomAnnotation.annotate('foo', {
      fooParam: 'fooParam',
    });
    const foo = (fooInterface.value = () => {});
    const actual = CustomAnnotation.getAnnotated();
    const expected = {
      foo: {
        objectInterface: { value: foo },
        params: { fooParam: 'fooParam' },
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  mocha.it('Annotate with object', () => {
    const fooInterface = CustomAnnotation.annotate('foo', {
      fooParam: 'fooParam',
    });
    const foo = (fooInterface.value = { objectParam: 'objectParam' });
    const actual = CustomAnnotation.getAnnotated();
    const expected = {
      foo: {
        objectInterface: { value: foo },
        params: { fooParam: 'fooParam' },
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  mocha.it('Annotate with variable', () => {
    const fooInterface = CustomAnnotation.annotate('foo', {
      fooParam: 'fooParam',
    });
    const foo = (fooInterface.value = 'fooVariable');
    const actual = CustomAnnotation.getAnnotated();
    const expected = {
      foo: {
        objectInterface: { value: foo },
        params: { fooParam: 'fooParam' },
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  mocha.it('Annotate with two different functions', () => {
    CustomAnnotation.annotate(foo, { fooParam: 'fooParam' });
    function foo() {}
    CustomAnnotation.annotate(bar, { barParam: 'barParam' });
    function bar() {}
    const actual = CustomAnnotation.getAnnotated();
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

  mocha.it('Annotate with invalid input', () => {
    assert.throws(() => {
      CustomAnnotation.annotate({}, { fooParam: 'fooParam' });
    }, new Error(AnnotationsExceptions.INVALID_INPUT));
  });

  mocha.it('Annotate with invalid params', () => {
    assert.throws(() => {
      CustomAnnotation.annotate('foo', 'fooParam');
    }, new Error(AnnotationsExceptions.INVALID_PARAMS));
  });
});
