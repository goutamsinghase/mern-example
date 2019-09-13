'use strict';

module.exports = function(app) {

  const mongoose = require('mongoose');

  /////////////////////////
  // Requiring db config //
  /////////////////////////
  const config = require('./config');

  ////////////////////////////////////////////////////
  // Setting Promise library to be used by Mongoose //
  ////////////////////////////////////////////////////
  mongoose.Promise = global.Promise;

  ///////////////////////////
  // Requiring the plugins //
  ///////////////////////////
  const plugins = {
    'pagedFind': require('./plugins/pagedFind')(app),
    'validate': require('./plugins/validate')(app),
    'scheduler': require('./plugins/mongoose-scheduler')(app),
  };

  //////////////////////////////////
  // Attaching the global plugins //
  //////////////////////////////////
  mongoose.plugin(plugins.pagedFind);
  mongoose.plugin(plugins.validate);

  /////////////////////////////////////////////////
  // Connecting to MongoDB and storing reference //
  /////////////////////////////////////////////////
  const db = mongoose.createConnection((app.get('env') === 'production') ? config.uri.production : (app.get('env') === 'testing') ? config.uri.testing : config.uri.development, {
    useMongoClient: true
  });

  ////////////////////////////////////////
  // Attaching db config to db instance //
  ////////////////////////////////////////
  db.config = config;

  ////////////////////////////////////////////////////
  // Initializing and attaching the Mongoose Models //
  ////////////////////////////////////////////////////
  db.models = {
    'User': db.model('User', require('./models/user')(app, mongoose, plugins)),
    'Notification': db.model('Notification', require('./models/notification')(app, mongoose, plugins)),
    'Item': db.model('Item', require('./models/item')(app, mongoose, plugins))
  };

  return db;
};