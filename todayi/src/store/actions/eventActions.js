import axios from 'axios';

import {
  ITEMS_LOADING,
  ADD_ITEM,
  ADDED_ITEM,
  ITEM_ERROR,
  GET_EVENTS,
  SET_PAGENUMBER
} from './types';

export const addType = (item) => (dispatch, getState) => {
      console.log(item);
      const body = JSON.stringify(item);
      console.log(body);
  
    axios
      .post('http://localhost:5000/api/todayi/addType',body)
      .then(res =>
        dispatch({
          type: ADDED_ITEM,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch({
          type: ITEM_ERROR
        });
      });
  };

  export const getEvents = (query) => (dispatch, state) => {
    axios
    .get('http://localhost:5000/api/todayi/getEvents',query)
    .then(res =>
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: ITEM_ERROR
      });
    });
  }
  export const addEventType = ({name, isActive}) => (dispatch, getState) => {

    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      // Request body
      const body = JSON.stringify({name, isActive});

    // User loading
    dispatch({ type: ADD_ITEM });
  
    axios
      .post('/api/todayi/addType',body, config)
      .then(res =>
        dispatch({
          type: ADDED_ITEM,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch({
          type: ITEM_ERROR,
          payload: err.response
        });
      });
  };
  export const setItemsLoading = () => {
    return {
      type: ITEMS_LOADING
    };
  };
  export const setEvents = (events, isLoading, hasMore) => (dispatch) => {
    dispatch({
      type: GET_EVENTS,
      payload: {events, isLoading, hasMore}
    })
  };
  export const setPageNumber = () => (dispatch) => {
    console.log('set page number')
    dispatch({
      type: SET_PAGENUMBER
    })
  };
  // Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};