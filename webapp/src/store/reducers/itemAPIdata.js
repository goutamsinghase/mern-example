import {GET_ITEM_LIST_SUCCESS, CREATE_ITEM_SUCCESS, DELETE_ITEM_SUCCESS, EDIT_ITEM_SUCCESS, REFRESH_ITEM_SUCCESS} from "../constants/action-types";

const initialState = {
    itemList: {},
    itemCreated: false,
    itemDeleted: false,
    itemEdited: false
};

const itemAPIData = (state = initialState, action) => {

    switch (action.type) {

        case GET_ITEM_LIST_SUCCESS:
            return {
                ...state,
                itemList: action.payload.data,
                itemCreated: false,
                itemDeleted: false,
                itemEdited: false
            };

        case CREATE_ITEM_SUCCESS:
            return {
                ...state,
                itemCreated: true,
                itemDeleted: false,
                itemEdited: false
            };

        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                itemCreated: false,
                itemDeleted: true,
                itemEdited: false
            };

        case EDIT_ITEM_SUCCESS:
            return {
                ...state,
                itemCreated: false,
                itemDeleted: false,
                itemEdited: true
            };
        case REFRESH_ITEM_SUCCESS:
                return {
                    ...state,
                    itemCreated: false,
                    itemDeleted: false,
                    itemEdited: false
                };
        default:
            return state;
    }
};

export default itemAPIData;



