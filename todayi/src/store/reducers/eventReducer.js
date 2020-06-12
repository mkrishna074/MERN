import {
    GET_ITEMS,
    ADDED_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING,
    ITEM_ERROR
  } from '../actions/types';
  
  const initialState = {
    events: [],
    loading: false,
    responseMsg: ''
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ITEMS:
        return {
          ...state,
          items: action.payload,
          loading: false
        };
      case DELETE_ITEM:
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload)
        };
      case ADDED_ITEM:
        return {
          ...state,
          responseMsg: 'Added event successfully.'
        };
      case ITEMS_LOADING:
        return {
          ...state,
          loading: true
        };
      case ITEM_ERROR:
        return {
          ...state,
          responseMsg: action.payload?.data?.message.replace(/"/g, '')
        }
      default:
        return state;
    }
  }