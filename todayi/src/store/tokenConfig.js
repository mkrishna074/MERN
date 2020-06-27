    import {refreshToken} from './actions/authActions'
    import {useSelector, useDispatch, shallowEqual} from 'react-redux'
    import axios from 'axios';
  

const TokenConfig = () => {
axios.interceptors.request.use(function (config) {
  console.log('interceptor');
  let serverCallUrl = new URL(config.url)

    if (serverCallUrl.pathname.includes('/auth')) return config
  //store
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const state = useSelector(state => state, shallowEqual);

    dispatch(refreshToken());
    console.log('after dispatch');
    // Get token from localstorage
    const token = state.auth.token;
    const user = state.auth.username;
  
    // Headers
    config = {
      headers: {
        'Content-type': 'application/json',
         'Access-Control-Allow-Origin': 'https://localhost:5000'
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
      config.headers['userName'] = user;
    }
    console.log('endInteceptor');
  return config;
}, function (error) {
  console.log('errorInteceptor');
  return Promise.reject(error);
})
}

export default TokenConfig;