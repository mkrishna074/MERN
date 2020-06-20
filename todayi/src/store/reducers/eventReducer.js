import {
    GET_EVENTS,
    ADDED_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING,
    ITEM_ERROR,
    SEARCH_EVENTS,
    SET_PAGENUMBER,
    SET_SEARCHTEXT
  } from '../actions/types';
  
  const initialState = {
    events: [],
    loading: false,
    responseMsg: '',
    searchTxt: '',
    isError: false,
    hasMore: false,
    pageNumber: 1
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_EVENTS:
        return {
          ...state,
          events: action.payload.events,
          loading: action.payload.isLoading,
          hasMore: action.payload.hasMore,
        };
      case DELETE_ITEM:
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload)
        };
      case ADDED_ITEM:
        return {
          ...state,
          responseMsg: action.payload
        };
      case ITEMS_LOADING:
        return {
          ...state,
          loading: true
        };
      case ITEM_ERROR:
        return {
          ...state,
          isError: true,
          responseMsg: action.payload?.data?.message.replace(/"/g, '')
        }
      case SEARCH_EVENTS:
        return {
          ...state,
          searchText: action.payload
        }
      case SET_PAGENUMBER:
        console.log('SET_PAGENUMBER');
        return {
          ...state,
          pageNumber: state.pageNumber + 1
        }
      case SET_SEARCHTEXT:
        return {
          ...state,
          searchTxt: action.payload
        }
      default:
        return state;
    }
  }