import { USER_LOADING, USER_LOADED, AUTH_ERROR,
     LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, 
     REGISTER_SUCCESS, REGISTER_FAIL, PASSWORD_MATCH } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') !== null,
    isLoading: false,
    isError: false,
    responseMsg: '',
    user: null,
    username: localStorage.getItem('user')
};
      
export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
        return {
            ...state,
            isLoading: true
        };
        case USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload
        };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', action.payload.user.name);
        return {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            isAuthenticated: true,
            isError: false,
            isLoading: false,
            responseMsg: '',
            username: action.payload.user.name
        };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        localStorage.removeItem('token');
        console.log(action.payload);
        return {
            ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isError: true,
            responseMsg: action.payload.data.message.replace(/"/g, '')
        };
        case PASSWORD_MATCH:
            return{
                ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isError: true,
            responseMsg: 'Password doesn\'t match.'
            };
        default:
        return state;
    }
}