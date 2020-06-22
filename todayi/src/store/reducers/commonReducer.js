import {
    ADDED_ITEM,
    ADD_ITEM,
    ITEM_ERROR
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
          isLoading: true
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
      default:
        return state;
    }
}