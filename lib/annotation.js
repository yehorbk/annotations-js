'use strict';

function Annotation() {}

Annotation.annotate = (value, params) => {
  if (!this.annotatedObjectsList) {
    this.annotatedObjectsList = {};
  }
  const objectInterface = { value: null };
  const identifier = typeof value === 'function' ? value.name : value;
  this.annotatedObjectsList[identifier] = { objectInterface, params };
  return objectInterface;
};

Annotation.getAnnotated = () => this.annotatedObjectsList;

module.exports = Annotation;
