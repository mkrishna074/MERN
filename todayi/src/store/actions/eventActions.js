import axios from 'axios';

import {
  ITEMS_LOADING,
  ADDED_ITEM,
  ITEM_ERROR,
  GET_EVENTS,
  SET_PAGENUMBER,
  SET_SEARCHTEXT,
  GET_ITEMS
} from './types';

axios.defaults.withCredentials = true;

export const addType = (item) => (dispatch, getState) => {
      console.log(item);
      const body = JSON.stringify(item);
      console.log(body);
  
    axios
      .post('/api/todayi/addType',body, tokenConfig(getState))
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
    .get('/api/todayi/getEvents',query)
    .then(res => {console.log(res.data);
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: ITEM_ERROR
      });
    });
  }
  export const addEventType = (type) => (dispatch, getState) => {
    axios
      .post('/api/todayi/addType',type, tokenConfig(getState))
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
  export const getEventTypes = () => (dispatch, getState) => {
    console.log('getEventTypes');
    axios
      .get('/api/todayi/getEventTypes', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_ITEMS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch({
          type: ITEM_ERROR,
          payload: err.response.message
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
  export const setStateSearchTxt = (searchTxt) => (dispatch) => {
    console.log(searchTxt);
    dispatch({
      type: SET_SEARCHTEXT,
      payload: searchTxt
    })
  };
  // Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = localStorage.getItem('token');

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
       'Access-Control-Allow-Origin': 'https://localhost:5000'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};