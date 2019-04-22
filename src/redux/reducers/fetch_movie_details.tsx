import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../constants/api_call';
import { DETAILS,FLUSH_DATA } from '../constants/types';

const initialState = {
    fetching: null,
    data: null,
    error: null
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case DETAILS+API_CALL_REQUEST:            
            return { ...state, fetching: true, data:null, error: null };
        case FLUSH_DATA:            
            return { ...state, fetching: null, data:null, error: null };
        case DETAILS+API_CALL_SUCCESS:
            return { ...state, fetching: false, data:action.data };
        case DETAILS+API_CALL_FAILURE:
            return { ...state, fetching: false, data: null, error: action.error };
        default:
            return state;
    }
}