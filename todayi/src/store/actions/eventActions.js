import axios from 'axios';
import Event from '../../models/event.model'

import { returnErrors } from './errorActions';
import {
  ITEMS_LOADING,
  ADD_ITEM,
  DELETE_ITEM,
  GET_ITEMS,
  ADDED_ITEM,
  ITEM_ERROR
} from './types';

export const addEvent = (item) => (dispatch, getState) => {

    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      // Request body
      const body = JSON.stringify(item);

    // User loading
    dispatch({ type: ADD_ITEM });
  
    axios
      .post('/api/todayi/add',item, config)
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