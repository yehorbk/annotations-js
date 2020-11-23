# Annotations-JS

Library that provides annotations functionality in vanilla JavaScript.

# Installation

Install library via npm:

```
$ npm install annotations-js
```

# How to Use

## Creating custom annotation
First of all, you need to get the main `Annotation` function by connecting the library.
To create your own custom annotation, you need to call the `bind` function from `Annotation`, passing your function (annotation) to it.
This function will set generic annotation prototype to your annotation and then you will be able to use your
annotation or extend it's functionality.

```javascript
const Annotation = require('annotations.js');

Annotation.bind(CustomAnnotation);
function CustomAnnotation() {}
```

To get all binded annotations in your application you can use method `getAnnotations` from `Annotation`.

## Working with annotation
With your custom annotation you can annotate functions, objects and variables. All annotated items will
be stored in annotation's storage that can be returned from `getAnnotated` method. Also you able to
pass params with annotated item. To annotate a function declaration - use next syntax:

```javascript
CustomAnnotation.annotate(FooFunction, { fooParam: 'fooParam' });
function FooFunction() {}
```

If you want to annotate functional expressions, objects, variables, etc. - there is
special syntax for it. The `annotate` method returns interface for your annotated value:

```javascript
 const fooInterface = CustomAnnotation.annotate('fooObject');
 const fooObject = fooInterface.value = { objectParam: 'objectParam' };
```

The string literal `'fooObject'` in this example - it's a key for annotated item.
It is advisable to name it the same as the annotated one.

# Linting

Unfortunately, not all basic linter configurations allow you to work with multi-assignment
and use of a function before it's declared, so if you are using ESLint you should
disable these rules: `no-multi-assign`, `no-use-before-define`.

# Author

**Yehor Bublyk**: [GitHub](https://github.com/yehorbk) • [Twitter](https://twitter.com/yehorbk)
