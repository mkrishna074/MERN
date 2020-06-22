import {combineReducers} from 'redux';
import authReducer from './authReducer'; 
import eventReducer from './eventReducer';
import commonReducer from './commonReducer';  

export default combineReducers({
    auth: authReducer,
    event: eventReducer,
    common: commonReducer
})