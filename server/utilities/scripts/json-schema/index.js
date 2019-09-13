'use strict';

/**
 * Wrapper for type=object of json-schema
 * @param  {Object}  properties The schema of the inner properties of the object
 * @param  {Boolean} required   Whether this object is required or not
 * @return {Object}             The resulting object
 */
const objectSchema = function(properties, required) {
  return {
    'type': 'object',
    'required': required || false,
    'properties': properties
  };
};

/**
 * Wrapper for type=array of json-schema
 * @param  {Object}  item     The schema of the inner items of the array
 * @param  {Boolean} required Whether this object is required or not
 * @return {Object}           The resulting object
 */
const arraySchema = function(item, required) {
  return {
    'type': 'array',
    'required': required || false,
    'items': item
  };
};

module.exports = function(app) {

  ////////////////////////////
  // Fundamental Components //
  ////////////////////////////

  const countryCode = {
    'type': 'string',
    'required': true,
    'enum': Object.keys(app.config.countryCode.countryList)
  };

  // const phoneNumber = {
  //   'type': 'string',
  //   'required': true,
  //   'conform': value => app.utility.isValidate.phoneNumber(value)
  // };

  const email = {
    type: 'string',
    required: true,
    conform: value => app.utility.isValidate.email(value)
  };

  const password = {
    'type': 'string',
    'required': true,
    // 'conform': value => app.utility.isValidate.password(value)
  };

  const otp = {
    'type': 'number',
    'required': true,
    'length': 6
  };

  ////////////////////////
  // Derived Components //
  ////////////////////////

  // const phone = objectSchema({
  //   'countryCode': countryCode,
  //   'number': phoneNumber
  // }, true);

  return {
    'objectSchema': objectSchema,
    'arraySchema': arraySchema,
    'schema': {
      'countryCode': countryCode,
      'email': email,
      'password': password,
      'otp': otp
    }
  };
};