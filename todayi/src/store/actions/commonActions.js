import axios from 'axios';

import {
    ADDED_ITEM,
    ADD_ITEM,
    ITEM_ERROR,
    GET_ITEMS
  } from '../actions/types';

  axios.defaults.withCredentials = true;

  export const addMenuItem = (item) => (dispatch, getState) => {
    dispatch({
        type: ADD_ITEM
      })
    console.log(item);
    const body = JSON.stringify(item);
    console.log(body);
    axios
      .post('http://localhost:5000/api/common/addMenuItem',body, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: ADDED_ITEM,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch({
          type: ITEM_ERROR,
          payload: err.response.message
        });
      });
  }

  export const getMenuItems = () => (dispatch, getState) => {
    console.log('menu items dispatch');
    axios
      .get('http://localhost:5000/api/common/menuItems', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_ITEMS,
          payload: res.data
        })
      )
      .catch(err => {
        console.log(err);
        dispatch({
          type: ITEM_ERROR,
          payload: err
        });
      });
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