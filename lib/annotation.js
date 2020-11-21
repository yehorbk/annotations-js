'use strict';

const annotate = (input, params) => {
  if (!this.annotatedObjectsList) {
    this.annotatedObjectsList = {};
  }
  const isFunctionalInput = typeof input === 'function';
  const objectInterface = { value: isFunctionalInput ? input : null };
  const identifier = isFunctionalInput ? input.name : input;
  this.annotatedObjectsList[identifier] = { objectInterface, params };
  return objectInterface;
};

const getAnnotatedList = () => this.annotatedObjectsList;

const getAnnotated = name => this.annotatedObjectsList[name];

function Annotation() {}

Annotation.bind = (annotation, params = {}) => {
  if (typeof annotation !== 'function') {
    throw Error('Annotation must be a function');
  }
  if (!this.annotations) {
    this.annotations = {};
  }
  const annotationPrototype = { annotate, getAnnotatedList, getAnnotated };
  Object.setPrototypeOf(annotation, annotationPrototype);
  this.annotations[annotation.name] = { annotation, params };
};

Annotation.getAnnotations = () => this.annotations;

module.exports = Annotation;
