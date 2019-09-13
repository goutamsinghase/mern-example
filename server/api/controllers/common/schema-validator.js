'use strict';

module.exports = function(app) {

  const locationValidator = function() {

    let schema = {
      'x-auth-latitude': {
        'type': 'string',
        'required': true,
        'allowEmpty': false,
        'conform': function(value) {
          return app.utility.isValidate.isNumber(value);
        }
      },
      'x-auth-longitude': {
        'type': 'string',
        'required': true,
        'allowEmpty': false,
        'conform': function(value) {
          return app.utility.isValidate.isNumber(value);
        }
      }
    };
    return app.utility.apiValidate.headers(schema);
  };

  return {
    'locationValidator': locationValidator
  };
};