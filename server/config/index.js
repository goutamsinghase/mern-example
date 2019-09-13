

module.exports = function( /*app*/ ) {
  'use strict';

  const config = {
    'project': require('./scripts/project'),
    'server': require('./scripts/server'),
    'page': require('./scripts/page'),
    'lang': require('./scripts/lang'),
    'countryCode': require('./scripts/country-phone'),
    'user': require('./scripts/user')
    };

  return config;
};