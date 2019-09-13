'use strict';

/**
 * Unique ID generation module
 * @type {Npm.Module}
 */
const Puid = require('puid');

module.exports = function(app, mongoose /*, plugins*/ ) {

  const userSchema = new mongoose.Schema({
    /**
     * Display Id
     */
    'displayId': {
      'type': String,
      'unique': true
    },
    /**
     * Personal Info
     */
    'personalInfo': {
      /**
       * First name
       */
      'firstName': {
        'type': String
      },
      /**
       * Last name
       */
      'lastName': {
        'type': String
      },
      /**
       * Full Name
       */
      'fullName': {
        'type': String
      },
      /**
       * Email
       */
      'email': {
        'type': String
      }
    },
    /**
     * Authentication Info
     */
    'authenticationInfo': {
      'password': {
        'type': String
      },
      /**
       * OTP object
       */
      'otp': {
        /**
         * Code string
         */
        'code': String,

        /**
         * Time at which OTP will become invalid
         */
        'timeout': Date
      }
    },
    /**
     * Account Status
     */
    'accountStatus': {
      'type': Number,
      'required': true,
      'default': 1
    },
    /** 
     * Session Information
     */
    'sessionInfo': {
      'deviceId': {
        'type': String
      },
      'notificationKey': {
        'type': String
      },
      'deviceType': {
        'type': Number
      },
      'token': {
        'type': String
      },
      'destroyTime': {
        'type': Date
      }
    }
  }, {
    'versionKey': false,
    'timestamps': true,
    'autoIndex': true,
    'usePushEach': true
  });

    /**
   * Pre Hook to save name as full
   * @param  {Object} next) {                     this.fullName The Full Name
   */
  userSchema.pre('save', function(next) {
    this.personalInfo.fullName = this.personalInfo.firstName + ' ' + this.personalInfo.lastName;
    next();
  });

  userSchema.on('init', function(model) {
    //Checking Session timeout every minute
    setInterval(() => {
      model.update({
          'sessionInfo.destroyTime': {
            $lte: new Date()
          }
        }, {
          '$unset': {
            'sessionInfo': 1
          }
        }, {
          multi: true
        })
        .exec()
        .catch(console.log);
    }, 60 * 1000); // Run every min
  });

  ////////////////////
  // Authentication //
  ////////////////////



  //////////////////////
  // Session Handling //
  //////////////////////

  /**
   * Returns an unique token
   * @return {String} The unique token
   */
  const getToken = function() {
    let puid = new Puid();
    return puid.generate();
  };

  /**
   * Returns the destroy time of a session
   * @return {Number} The destroy time for a session
   */
  const getDestroyTime = function() {
    return new Date(new Date().getTime() + app.config.user.sessionExpiredTime);
  };

  /**
   * Handles the session token and returns it, with or without the user data and status data
   * @param  {Boolean} getUserInfo True, if user data and status data are to be retrieved
   * @return {Promise}             The Promise
   */
  const handleSessionToken = function(getUserInfo) {

    return function(userDoc) {
      if (!getUserInfo) {
        return Promise.resolve({
          'token': userDoc.sessionInfo.token
        });
      } else {
        return userDoc.populate({ path: 'contacts', select: 'displayId personalInfo' }).execPopulate()
          .then(userDoc => {
            return Promise.resolve({
              'token': userDoc.sessionInfo.token,
              'userType': app.config.user.role.user,
              'userId': userDoc,
              'deviceId': userDoc.sessionInfo.deviceId
            });
          });
      }
    };
  };

  /**
   * Creates a new session
   * @param  {Number}   deviceType            The device type
   * @param  {String}   deviceId              The device id
   * @param  {Object}   userDoc               The user document
   * @return {Promise}                        The Promise
   */
  userSchema.statics.createSession = function(deviceType, deviceId, userDoc, notificationKey) {
    let sessionInfo = {
      'deviceType': deviceType,
      'token': getToken(),
      'destroyTime': getDestroyTime(),
      'deviceId': deviceId
    };

    if (notificationKey) {
      sessionInfo.notificationKey = notificationKey;
    }

    userDoc.sessionInfo = sessionInfo;

    return this.removeSessionByDeviceId(deviceId)
      .then(() => this.removeSessionByUserId(userDoc._id))
      .then(() => (userDoc.save()))
      .then(handleSessionToken(true));
  };

  /**
   * Validates a session
   * @param  {String}  token       The unique token
   * @param  {Number}  deviceType  The device type
   * @param  {String}  deviceId    The device id
   * @param  {Boolean} getUserInfo True, if user doc is to be retrieved along with token
   * @return {Promise}             The Promise
   */
  userSchema.statics.validateSession = function(token, deviceType, deviceId, getUserInfo) {

    return this.findOne({
        'sessionInfo.token': token,
        'sessionInfo.deviceId': deviceId,
        'sessionInfo.deviceType': deviceType,
        'sessionInfo.destroyTime': {
          '$gt': new Date()
        }
      })
      .exec()
      .then((userDoc) => {
        if (!userDoc) {
          return Promise.reject({ 'errCode': 'SESSION_NOT_FOUND' });
        }

        if (userDoc.accountStatus === app.config.user.accountStatus.user.blocked) {
          return Promise.reject({
            'errCode': 'USER_HAS_BEEN_SUSPENDED'
          });
        }

        if (userDoc.accountStatus === app.config.user.accountStatus.user.deleted) {
          return Promise.reject({
            'errCode': 'USER_HAS_BEEN_DELETED'
          });
        }

        userDoc.sessionInfo.destroyTime = getDestroyTime();
        return userDoc.save().then(handleSessionToken(getUserInfo || true));
      });
  };

   /**
   * Update a session
   * @param  {String}  token       The unique token
   * @param  {Number}  deviceType  The device type
   * @param  {String}  deviceId    The device id
   * @param  {Boolean} getUserInfo True, if user doc is to be retrieved along with token
   * @return {Promise}             The Promise
   */
  userSchema.statics.updateSession = function(token, deviceType, deviceId, getUserInfo, notificationKey) {

    return this.findOne({
        'sessionInfo.token': token,
        'sessionInfo.deviceId': deviceId,
        'sessionInfo.deviceType': deviceType,
        'sessionInfo.destroyTime': {
          '$gt': new Date()
        }
      })
      .exec()
      .then((userDoc) => {
        if (!userDoc) {
          return Promise.reject({ 'errCode': 'SESSION_NOT_FOUND' });
        }

        if (userDoc.accountStatus === app.config.user.accountStatus.boothUser.blocked) {
          return Promise.reject({
            'errCode': 'USER_HAS_BEEN_SUSPENDED'
          });
        }

        if (userDoc.accountStatus === app.config.user.accountStatus.boothUser.deleted) {
          return Promise.reject({
            'errCode': 'USER_HAS_BEEN_DELETED'
          });
        }
        if (notificationKey) {
          userDoc.sessionInfo.notificationKey = notificationKey;
        }
        return userDoc.save().then(handleSessionToken(getUserInfo || true));
      });
  };

  /**
   * Removes a session by its userId
   * @param  {String}  userId      The ObjectId of the user
   * @return {Promise}             The Promise
   */
  userSchema.statics.removeSessionByUserId = function(userId) {

    return this.update({
      '_id': userId
    }, {
      $unset: {
        sessionInfo: 1
      }
    }).exec();
  };

  userSchema.statics.removeSessionByDeviceId = function(deviceId) {

    return this.update({
      'sessionInfo.deviceId': deviceId
    }, {
      $unset: {
        sessionInfo: 1
      }
    }).exec();
  };

  userSchema.statics.removeSession = function(token, deviceType, deviceId) {

    return this.update({
        'sessionInfo.deviceId': deviceId,
        'sessionInfo.token': token,
        'sessionInfo.deviceType': deviceType,
      }, {
        $unset: {
          sessionInfo: 1
        }
      })
      .exec();

  };

  return userSchema;
};