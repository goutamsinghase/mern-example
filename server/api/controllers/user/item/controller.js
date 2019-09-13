'use strict';
/**
 * This Controller handles all functionality of Item
 * @module Controllers/User/Group
 */
module.exports = function(app) {

  /**
   * item module
   * @type {Object} The Item Module
   */
  const item = app.module.item;

  /**
   * Adds a item 
   * @param  {Object}   req  Request
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const addItem = (req, res, next) => {
    item.add(req.session.user, req.body)
      .then(data => {
        req.workflow.outcome.data = data;
        req.workflow.emit('response');
      })
      .catch(next);
  };

  /**
   * Deletes a item
   * @param  {Object}   req  Request
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const removeItem = (req, res, next) => {
    item.remove(req.session.user, req.itemId)
      .then(() => req.workflow.emit('response'))
      .catch(next);
  };

  /**
   * Fetches a item
   * @param  {Object}   req  Request
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const getItem = (req, res, next) => {
   
        req.workflow.outcome.data = req.itemId;
        req.workflow.emit('response');
   
  };

  /**
   * Fetches a list of items
   * @param  {Object}   req  Request
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const listItem = (req, res, next) => {
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 10;
    let options = {
        'filters': {
            'user': req.session.user._id,
        },
        'skip': skip,
        'limit': limit
    };

    item.list(options)
      .then(data => {
        req.workflow.outcome.data = data;
        req.workflow.emit('response');
      })
      .catch(next);
  };
  return {
   add: addItem,
   delete: removeItem,
   list: listItem,
   get:  getItem
  };
};