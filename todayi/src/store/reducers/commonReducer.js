import {
    ADDED_ITEM,
    ADD_ITEM,
    ITEM_ERROR,
    GET_ITEMS
  } from '../actions/types';

  const initialState = {
    menuItems: [],
    isError: false,
    isLoading: false,
    errorMsg: '',
    responseMsg: ''
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_ITEM:
        return {
          ...state,
          isLoading: true,
          errorMsg: '',
          responseMsg: ''
        };
      case ITEM_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMsg: action.payload
        };
      case ADDED_ITEM:
        return {
          ...state,
          isLoading: false,
          responseMsg: action.payload
        };
      case GET_ITEMS:
        console.log(action.payload);
        return {
          ...state,
          menuItems: action.payload,
          loading: false
        };
      default:
        return state;
    }
}