import axios from 'axios';
import history from '../../helpers/history'


import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_MATCH,
  API_ERROR
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ name, email, password, confirmPassword }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if(password !== confirmPassword){
    dispatch({
      type: PASSWORD_MATCH
    })
    return false;
  }

  axios
    .post('http://localhost:5000/api/auth/register', { name, email, password }, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      history.push('/')
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response
      });
    });
};

// Login User
export const login = ({ email, password, referer }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('http://localhost:5000/api/auth/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      history.push(referer)
    }
    )
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response
      });
    });
};

// Logout User
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
  history.push('/');
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