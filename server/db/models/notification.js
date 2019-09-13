'use strict';

module.exports = function(app, mongoose /*, plugins*/ ) {

  const notificationSchema = new mongoose.Schema({

    /**
     * ObjectId of the user to whom this notification is addressed
     */
    'user': {
      type: mongoose.Schema.Types.ObjectId
    },

    /**
     * The user role. 1 -> user, 2 -> admin
     * This field will be used with userId to populate the proper data
     */
    'userType': {
      type: Number,
      validate: {
        isAsync: false,
        validator: function(v) {
          return Object.keys(app.config.user.role).some((e) => app.config.user.role[e] === v);
        },
        message: app.utility.message.INVALID('userType')
      }
    },

    /**
     * Medium of notification. 1 -> email, 2 -> sms, 3 -> push, 4 -> inApp
     */
    'medium': {
      type: Number,
      required: true,
      validate: {
        isAsync: false,
        validator: function(v) {
          return Object.keys(app.config.notification.medium).some((e) => app.config.notification.medium[e] === v);
        },
        message: app.utility.message.INVALID('medium')
      }
    },

    /**
     * True, if the notification has been sent
     */
    'sent': {
      type: Boolean,
      'default': false
    },

    /**
     * Sent time when the notification was sent
     */
    'sentTime': {
      type: Date,
    },

    /**
     * True, if the notification has been seen
     */
    'seen': {
      type: Boolean,
      'default': false
    },

    /**
     * Email Content
     */
    'emailContent': {
      'to': String,
      'subject': String,
      'body': String,
      'cc': [String],
      'messageId': String
    },

    /**
     * sms Contents
     */
    'smsContent': {
      'to': String,
      'body': String
    },

    /**
     * push Content
     */
    'pushContent': {
      'device': String,
      'title': String,
      'body': String,
      'data': {
        'type': {
          'type': String
        },
        'info': Object
      }
    },

    /**
     * inApp Content
     */
    'inAppContent': {
      'type': {
        'type': String
      },
      'info': Object, 
      'event': Object, 
      'data': Object
    }

  }, {
    'versionKey': false,
    'timestamps': true
  });

  notificationSchema.on('init', function( /*model*/ ) {

    //Notification send 
    const timeInterval = 30 * 1000; // run in every 10 seconds
    setInterval(() => {
      // app.module.notification.sendAll()
      //   .catch(( /*err*/ ) => {
      //     console.log(`-------------------------- In Notification ----------------------`);
      //     // console.log(err);
      //   });

    }, timeInterval);

    // Notification Remove
    const removeTimeInterval = 24 * 60 * 60 * 1000; // run every day
    setInterval(() => {
      // this.remove({
      //     'createdAt': {
      //       $lte: new Date(new Date().getTime() - 45 * 24 * 60 * 60 * 1000) // delete all notification before 45 days
      //     }
      //   })
      //   .catch(console.log);
    }, removeTimeInterval);

  });


  return notificationSchema;
};