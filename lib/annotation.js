'use strict';

const AnnotationsExceptions = require('./annotations-exceptions');
const AnnotationsPrototype = require('./annotations-prototype');

function Annotation() {}

Annotation.bind = function (annotation, params = {}) {
  if (typeof annotation !== 'function') {
    throw new Error(AnnotationsExceptions.INVALID_BINDING);
  }
  if (typeof params !== 'object') {
    throw new Error(AnnotationsExceptions.INVALID_PARAMS);
  }
  if (!this.annotations) {
    this.annotations = {};
  }
  Object.setPrototypeOf(annotation, AnnotationsPrototype);
  this.annotations[annotation.name] = { annotation, params };
};

Annotation.getAnnotations = function () {
  return this.annotation;
};

module.exports = Annotation;
