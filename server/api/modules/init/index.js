'use strict';

module.exports = function(app, next) {

  const parallelScripts = [
    require('./scripts/default-user')
  ];

  Promise.all(parallelScripts.map(e => e(app)))
    .then(() => next())
    .catch(next);
};