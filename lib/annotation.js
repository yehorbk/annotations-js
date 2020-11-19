'use strict';

function Annotation() {}

Annotation.annotate = (input, params) => {
  if (!this.annotatedObjectsList) {
    this.annotatedObjectsList = {};
  }
  const isFunctionValue = typeof input === 'function';
  const objectInterface = { value: isFunctionValue ? input : null };
  const identifier = isFunctionValue ? input.name : input;
  this.annotatedObjectsList[identifier] = { objectInterface, params };
  return objectInterface;
};

Annotation.getAnnotated = () => this.annotatedObjectsList;

module.exports = Annotation;
