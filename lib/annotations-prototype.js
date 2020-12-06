'use strict';

const AnnotationsExceptions = require('./annotations-exceptions');

const annotate = function (input, params = {}) {
  if (typeof input !== 'function' && typeof input !== 'string') {
    throw new Error(AnnotationsExceptions.INVALID_INPUT);
  }
  if (typeof params !== 'object') {
    throw new Error(AnnotationsExceptions.INVALID_PARAMS);
  }
  if (!this.annotatedObjects) {
    this.annotatedObjects = {};
  }
  const isFunctionalInput = typeof input === 'function';
  const objectInterface = { value: isFunctionalInput ? input : null };
  const identifier = isFunctionalInput ? input.name : input;
  this.annotatedObjects[identifier] = { objectInterface, params };
  return objectInterface;
};

const getAnnotated = function () {
  return this.annotatedObjects;
};

module.exports = { annotate, getAnnotated };
