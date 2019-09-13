'use strict';

/**
 * This Plugin helps to validate your documents.
 * It executes and check all keys and validate each keys and send an custom error
 * this module adds a validateKeys method if you attach this plugin in schema
 * @module schema/plugins/validate-plugin
 */

module.exports = function(app) {

  var message = app.utility.message,
    dateHelper = app.utility.dateHelper;

  return function(schema) {

    var _ = require('underscore');

    /**
     *
     * @param {requestCallback} cb callback to be executed after the find operation
     *
     * @this schema-document-object
     *
     * @example
     * var A = mongoose.models('a' , new mongosoe.Schema({
     *    x : {
     *      type : String,
     *      match : /a/,
     *      required : true
     *    }
     * }));
     *
     * A.plugin('path to validate plugin');
     *
     * var x = new A({
     *  x : 'b'
     * });
     *
     * x.validateKeys(function (err) {
     *  console.log(err); // iff validation failed
     * });
     *
     */
    function validateKeys(cb) {

      var self = this, // jshint ignore:line
        error = {};

      schema.eachPath(function(path, schemaType) {

        if (schemaType.options.required) {
          if (path.indexOf('.') === -1) {
            if (schemaType.options.type.name === 'Number' || schemaType.options.type.name === 'Boolean') {
              if (self[path] === undefined || self[path] === null) {
                error[path] =
                  schemaType.options.message && schemaType.options.message.REQUIRED ?
                  schemaType.options.message.REQUIRED : message.REQUIRED(path);
              }
            } else if (!self[path]) {
              error[path] =
                schemaType.options.message && schemaType.options.message.REQUIRED ?
                schemaType.options.message.REQUIRED : message.REQUIRED(path);
            }
          } else if (path.indexOf('.') > -1) {
            var parts = path.split('.'),
              tmpval = self.toObject();
            while (tmpval[parts[0]]) {
              tmpval = tmpval[parts.shift()];
            }

            if (parts.length !== 0) {
              error[path] =
                schemaType.options.message && schemaType.options.message.REQUIRED ?
                schemaType.options.message.REQUIRED : message.REQUIRED(path);
            }

          }
        }

        if (self[path] && schemaType.options.match) {
          if (!(new RegExp(schemaType.options.match)).test(self[path])) {
            error[path] =
              schemaType.options.message && schemaType.options.message.INVALID ?
              schemaType.options.message.INVALID : message.INVALID(path);
          }
        }

        if (self[path] && schemaType.options.type.name === 'Date') {
          if (!dateHelper.isDate(self[path])) {
            error[path] =
              schemaType.options.message && schemaType.options.message.INVALID ?
              schemaType.options.message.INVALID : message.INVALID(path);
          }
        }

        if (self[path] && schemaType.options.type.name === 'String') {
          if (!_.isString(self[path])) {
            error[path] =
              schemaType.options.message && schemaType.options.message.INVALID ?
              schemaType.options.message.INVALID : message.INVALID(path);
          }
        }

        if (self[path] && schemaType.options.type.name === 'Number') {
          if (!_.isNumber(self[path])) {
            error[path] =
              schemaType.options.message && schemaType.options.message.INVALID ?
              schemaType.options.message.INVALID : message.INVALID(path);
          } else {

            if (schemaType.options.min !== undefined &&
              schemaType.options.min !== null &&
              (Number(self[path]) < Number(schemaType.options.min))) {
              error[path] =
                schemaType.options.message && schemaType.options.message.MIN ?
                schemaType.options.message.MIN : message.MIN(path, schemaType.options.min);
            }

            if (schemaType.options.max !== undefined &&
              schemaType.options.max !== null &&
              (Number(self[path]) > Number(schemaType.options.max))) {
              error[path] =
                schemaType.options.message && schemaType.options.message.MAX ?
                schemaType.options.message.MAX : message.MAX(path, schemaType.options.max);
            }
          }
        }

      });

      if (Object.keys(error).length > 0) {
        return cb(error);
      } else {
        cb(null);
      }

    }

    function pValidateKeys() {
      return new Promise((s, f) => {
        validateKeys.call(this, (e) => e ? f(e) : s());
      });
    }

    schema.methods.validateKeys = validateKeys;
    schema.methods.pValidateKeys = pValidateKeys;
  };
};
