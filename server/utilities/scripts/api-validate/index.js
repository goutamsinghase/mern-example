'use strict';

/**
 * Validation plugin
 */
const reval = require('revalidator');

function allValidate(schema) {
  return function(req, res, next) {

    let queue = [];

    if (schema.hasOwnProperty('headers')) {
      queue
        .push({
          'schema': { 'properties': schema.headers },
          'value': req.headers,
          'where': 'headers'
        });
    }

    if (schema.hasOwnProperty('params')) {
      queue
        .push({
          'schema': { 'properties': schema.params },
          'value': req.params,
          'where': 'params'
        });
    }

    if (schema.hasOwnProperty('query')) {
      queue
        .push({
          'schema': { 'properties': schema.query },
          'value': req.query,
          'where': 'query'
        });
    }

    if (schema.hasOwnProperty('body')) {
      queue
        .push({
          'schema': { 'properties': schema.body },
          'value': req.body,
          'where': 'body'
        });
    }

    if (schema.hasOwnProperty('files')) {

      if (!req.uploadError) {
        queue
          .push({
            'schema': { 'properties': schema.files },
            'value': req.files,
            'where': 'files'
          });
      } else {
        return next({ 'errCode': 'UPLOAD_ERROR' });
      }
    }

    let output = queue
      .map((e) => {
        let o = reval.validate(e.value, e.schema);
        if (!o.valid) {
          o.errors.forEach((error) => error.where = e.where);
        }
        return o;
      })
      .reduce((acc, val) => {
        return {
          'valid': acc.valid && val.valid,
          'errors': acc.errors.concat(val.errors)
        };
      }, {
        'valid': true,
        'errors': []
      });

    if (!output.valid) {
      req.workflow.outcome.errors = output.errors.map((e) => `${e.property} ${e.message} in ${e.where}`);
      next({ 'errCode': 'API_VALIDATION_ERROR' });
    } else {
      next();
    }
  };
}

function headerValidate(schema) {
  return allValidate({ 'headers': schema });
}

function bodyValidate(schema) {
  return allValidate({ 'body': schema });
}

function paramsValidate(schema) {
  return allValidate({ 'params': schema });
}

function queryValidate(schema) {
  return allValidate({ 'query': schema });
}

function filesValidate(schema) {
  return allValidate({ 'files': schema });
}

module.exports = {
  'headers': headerValidate,
  'body': bodyValidate,
  'params': paramsValidate,
  'query': queryValidate,
  'file': filesValidate,
  'all': allValidate
};