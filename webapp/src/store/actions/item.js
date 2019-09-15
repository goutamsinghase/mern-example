// API Config
import {apiURLs} from '../api-config/api.urls';
// Action Types Constant
import {GET_ITEM_LIST, CREATE_ITEM, DELETE_ITEM, EDIT_ITEM, REFRESH_ITEM} from "../constants/action-types";

//////////////////// Get Item List // //////////////////
export const getItemList = (skip, limit, searchKey) => {
    return {
        type: GET_ITEM_LIST,
        payload: {
            request: {
                url: apiURLs.item+ '?skip='+skip+'&limit='+limit,
                method: "GET"
            }
        },
        hideToast: true
    };
};

//  Create  Item //
export const createItem = (payload) => {
    return {
        type: CREATE_ITEM,
        payload: {
            request: {
                url: apiURLs.item,
                method: "POST",
                data: payload
            }
        }
    };
};

// Edit Item //
export const editItem = (menuId, payload) => {
    return {
        type: EDIT_ITEM,
        payload: {
            request: {
                url: apiURLs.item + '/'+ menuId,
                method: "PUT",
                data: payload
            }
        }
    };
};

// Delete Item
export const removeItem = (itemId) => {
    return {
        type: DELETE_ITEM,
        payload: {
            request: {
              url: apiURLs.item + '/'+ itemId,
                method: "DELETE"
            }
        }
    };
};

export const refreshDataList = ()=>{
    return {
        type: REFRESH_ITEM
    };
}

