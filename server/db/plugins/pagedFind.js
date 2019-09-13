'use strict';

/**
 * paged Find plugin attach a statics into your schema with the name pagedFind
 * @module schema/plugins/paged-find-plugin
 */

module.exports = function( /*app*/ ) {

  return function pagedFindPlugin(schema) {

    /**
     * Finds list of documents from a given schema
     * @param  {object}           options           options to find the object
     * @param  {Number}           options.limit     the total number of objects that is max can be returned
     * @param  {Number}           options.skip      the total number of objects that should skip
     * @param  {String}           options.keys      the keys that should be selected
     * @param  {object}           options.filters   query for finding result
     * @param  {object}           options.sort      sort object for finding result
     * @param  {requestCallback}  cb                callback to be executed after the find operation
     *
     * @memberof module:paged-Find-plugin
     *
     * @this schema
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
     * A.plugin('path to page find plugin');
     *
     *
     * A.pagedFind({},function (err,result) {
     *  console.log(err,result); // iff validation failed
     * });
     *
     */
    function pagedFind(options, cb) {

      var thisSchema = this; // jshint ignore:line

      if (!options.filters) {
        options.filters = {};
      }

      if (!options.keys) {
        options.keys = '';
      }

      if (options.limit === undefined || options.limit === null) {
        options.limit = 0;
      }

      if (!options.skip) {
        options.skip = 0;
      }

      if (!options.sort) {
        options.sort = {};
      }

      options.skip = Number(options.skip);
      options.limit = Number(options.limit);

      var output = {
        'data': null,
        'skip': Number(options.skip),
        'limit': Number(options.limit),
        'total': 0
      };

      var countResults = function(callback) {
        thisSchema.count(options.filters, function(err, count) {
          if (err) {
            return callback(err);
          } else {
            output.total = count;
            if (options.limit === 0) {
              output.skip = 0;
              output.limit = output.total;
            }
            return callback(null, 'done counting');
          }
        });
      };

      var getResults = function(callback) {
        var query = thisSchema.find(options.filters, options.keys);

        if (options.limit !== 0) {
          query.skip(options.skip);
          query.limit(options.limit);
        }

        query.sort(options.sort);

        if (options.populate) {
          if (!Array.isArray(options.populate)) {
            options.populate = [options.populate];
          }
          options.populate.forEach((each) => {
            query.populate(each);
          });
        }

        if (options.lean) {
          query.lean();
        }

        query.exec(function(err, results) {
          if (err) {
            return callback(err);
          } else {
            output.data = results;
            return callback(null, 'done getting records');
          }
        });
      };

      require('async').parallel([
          countResults,
          getResults
        ],
        function(err) {
          if (err) {
            return cb(err, null);
          } else {
            return cb(null, output);
          }
        });
    }

    schema.statics.pagedFindCB = pagedFind;

    schema.statics.pagedFind = function(options) {
      return new Promise((resolve, reject) => {
        pagedFind.apply(this, [options, (error, data) => error ? reject(error) : resolve(data)]);
      });
    };
  };
};