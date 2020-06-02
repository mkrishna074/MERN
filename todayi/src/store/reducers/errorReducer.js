import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
    msg :{},
    statusCode: null,
    id: null
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_ERRORS:
            return{
                msg :action.payload.msg,
                statusCode: action.payload.statusCode,
                id: action.payload.id
            };
        case CLEAR_ERRORS:
            return{
                msg :{},
                statusCode: null,
                id: null
            };
        default:
            return state;
    }
}