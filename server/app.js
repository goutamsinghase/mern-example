#!/usr/bin/env node

'use strict';

//////////////////
// Dependencies //
/////////////////;
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');


/////////////////////////////////
// Promise Configuration Setup //
/////////////////////////////////
global.Promise = require('bluebird');
if (process.env.NODE_ENV === 'production') {
  Promise.config({
    warnings: false,
    longStackTraces: false,
    cancellation: false,
    monitoring: false
  });
} else {
  Promise.config({
    warnings: false,
    longStackTraces: true,
    cancellation: true,
    monitoring: true
  });
}

//////////////////////////////
// Creating the express app //
//////////////////////////////
const app = express();

//////////////////////////
// Attach Helmet to app //
//////////////////////////
app.use(helmet());

///////////////////////////////////////
// Attaching the reference to config //
///////////////////////////////////////
app.config = require('./config')(app);

//////////////////////
// Express settings //
//////////////////////
app.disable('x-powered-by');
app.set('port', app.config.server.port);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

///////////////////////////
// Express global locals //
///////////////////////////
app.locals.projectName = app.config.project.name;
app.locals.copyrightYear = app.config.project.copyrightYear;
app.locals.companyName = app.config.project.companyName;
app.locals.path = __dirname;


///////////////////////////////
// Packet compression plugin //
///////////////////////////////
// app.use(require('compression')());

//////////////////////////////////////
// Attaching method-override module //
//////////////////////////////////////
app.use(require('method-override')());

/////////////////////////////////////////////////////
// Attaching the body-parser module for urlencoded //
/////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

///////////////////////////
// Attaching CORS module //
///////////////////////////
app.use(require('cors')({
  'origin': '*',
  'methods': ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'],
  'allowedHeaders': ['accept', 'content-type', 'x-auth-deviceid', 'x-auth-devicetype', 'x-auth-token', 'x-auth-latitude', 'x-auth-longitude'],
  'preflightContinue': false,
  'optionsSuccessStatus': 204
}));



/////////////////////////////
// Attaching the utilities //
/////////////////////////////
app.utility = require('./utilities')(app);

/////////////////////////////////////////////////////////////
// Attaching the workflow module & default-language module //
/////////////////////////////////////////////////////////////
app.use(app.utility.attachWorkflow, app.utility.localize.addDefaultLanguage);

////////////////////////////////////////////////
// Connect the DB and Initialize the models ////
////////////////////////////////////////////////
const db = require('./db')(app);

//////////////////////
// attaching models //
//////////////////////

app.models = db.models;

//////////////////////////////
// Set the Default Language //
//////////////////////////////
if (process.env.NODE_ENV !== 'production') {
  app.locals.defaultLanguage = 'en-us';
} else {
  app.locals.defaultLanguage = 'en-us';
}


///////////////////////////
// Attaching the modules //
///////////////////////////
app.module = require('./api//modules')(app);


///////////////////////////////////////////
// Production or development environment //
///////////////////////////////////////////
if (process.env.NODE_ENV !== 'production') {

  /////////////////////////
  // Attaching Home Page //
  /////////////////////////
  app.use('', express.static(`${__dirname}/public/development/home`));

  /////////////////////////////////
  // Attaching the dev Admin build //
  /////////////////////////////////
  app.use('/admin', express.static(`${__dirname}/public/development/admin`));

  //////////////////////////////
  // Attaching Request Logger //
  //////////////////////////////
  app.use(require('morgan')('dev'));

  /////////////////////////////
  // Attaching Pretty Console //
  //////////////////////////////
  require('./utilities/scripts/pretty-console')(app);

} else {

  /////////////////////////
  // Attaching Home Page //
  /////////////////////////
  app.use('', express.static(`${__dirname}/public/production/home`));

  /////////////////////////////////
  // Attaching the production Admin build //
  /////////////////////////////////
  app.use('/admin', express.static(`${__dirname}/public/production/admin`));

  //////////////////////////////
  // Attaching Pretty Console //
  //////////////////////////////
  require('./utilities/scripts/pretty-console')(app);

}

//////////////////////////////////
// Attaching the uploads folder //
//////////////////////////////////
app.use('/uploads', express.static(`${__dirname}/public/uploads`));

app.use('/api/v1', [

  //////////////////////////
  // Attaching the routes //
  //////////////////////////
  require('./api/controllers/')(app),

  ////////////////////////////////////
  // Attaching the response handler //
  ////////////////////////////////////
  require('./api/responseHandler/')(app),

  /////////////////////////////////////////
  // Attaching the default error handler //
  /////////////////////////////////////////
  // app.utility.errorHandler
]);

if (process.env.NODE_ENV !== 'production') {
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'development', 'home', 'index.html'));
  });

} else {

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'production', 'home', 'index.html'));
  });

}

///////////////////////////////
// Default 404 error handler //
///////////////////////////////
app.use(function(req, res) {
  res.status(400).end();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// For Warning: Possible EventEmitter memory leak detected. 11 wakeup listeners added. Use emitter.setMaxListeners() to increase limit //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
require('events').EventEmitter.prototype._maxListeners = 100;

//////////////////////////////////////
// Execute the init module (if any) //
//////////////////////////////////////
if (app.module.hasOwnProperty('init')) {

  app.module.init(app, (error) => {

    if (error) {

      console.log('Server can\'t be started.');
      console.log(error);
      process.exit();

    } else {

      ///////////////////////
      // Listening on port //
      ///////////////////////
      app.server = app.listen(process.env.PORT, () => console.log('Server listening on : ', process.env.PORT));
    }

  });

} else {

  console.log('Server can\'t be started. As this project requires init module');
  process.exit();

}

module.exports = app;
