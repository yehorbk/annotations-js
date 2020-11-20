'use strict';

const annotate = (input, params) => {
  if (!this.annotatedObjectsList) {
    this.annotatedObjectsList = {};
  }
  const isFunctionValue = typeof input === 'function';
  const objectInterface = { value: isFunctionValue ? input : null };
  const identifier = isFunctionValue ? input.name : input;
  this.annotatedObjectsList[identifier] = { objectInterface, params };
  return objectInterface;
};

const getAnnotated = () => this.annotatedObjectsList;

function Annotation() {}

Annotation.bind = (annotation, params = {}) => {
  if (typeof annotation !== 'function') {
    throw Error('Annotation must be a function');
  }
  if (!this.annotations) {
    this.annotations = {};
  }
  const annotationPrototype = { annotate, getAnnotated };
  Object.setPrototypeOf(annotation, annotationPrototype);
  this.annotations[annotation.name] = { annotation, params };
};

Annotation.getAnnotations = () => this.annotations;

module.exports = Annotation;
