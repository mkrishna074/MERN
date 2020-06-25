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
  PASSWORD_MATCH
} from './types';
axios.defaults.withCredentials = true;

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user')
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
      console.log(res.data);
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
  axios
    .post('http://localhost:5000/api/auth/logout')
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
      history.push('/login');
    })
};

//refresh token
export const refreshToken = () => (dispatch, getState) => {
  const config = {
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:5000'
    }
};
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
if (token) {
    config.headers['x-auth-token'] = token;
    config.headers['x-auth-user'] = user;
}
  axios
  .post('http://localhost:5000/api/auth/refreshToken', config)
  .then(res => {
        if(res.data.message === 'Token expired' || res.data.message === 'No cookie'){
            console.log('Token expired');
            dispatch({
              type: LOGOUT_SUCCESS
            });
        } else if(res.data.message === 'Please continue'){
            console.log('Please continue');
        } else if(res.data.token){
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
          });
        } else  {
          dispatch({
            type: LOGOUT_SUCCESS
          });
        }
    }
  ).catch(err => {
    console.log(err.response);
    dispatch({
      type: LOGOUT_SUCCESS
    });
  });
}