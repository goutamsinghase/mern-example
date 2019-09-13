'use strict';

module.exports = function(app) {
  
  const Item = app.models.Item;

  const addItem = (userDoc, itemPayload)=>{
    itemPayload.user = userDoc._id;
    return Item.find({
      user: userDoc._id, 
      name: itemPayload.name
    }).then((itemDocs)=>itemDocs.length? Promise.reject({'errCode': 'ITEM_ALREADY_THERE'}): Promise.resolve(new Item(itemPayload).save()));
  };
  
  const editItem = (itemDoc, editedPayload)=>{

  };

  const removeItem = (userDoc, itemDoc)=>{
    return Item.remove({user: userDoc._id, _id: itemDoc._id});
  };

  const listItem = (options)=>{
    return Item.pagedFind(options);
  }

  return {'add': addItem, 'edit': editItem, 'remove': removeItem, 'list': listItem};

};
