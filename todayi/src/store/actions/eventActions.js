import axios from 'axios';
import Event from '../../models/event.model'

import { returnErrors } from './errorActions';
import {
  ITEMS_LOADING,
  ADD_ITEM,
  ADDED_ITEM,
  ITEM_ERROR
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
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: ITEM_ERROR
        });
      });
  };
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
        dispatch(returnErrors(err.response.data, err.response.status));
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