import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer'; 
import eventReducer from './eventReducer'; 

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    event: eventReducer
})