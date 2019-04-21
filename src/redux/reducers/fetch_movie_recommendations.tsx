import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../constants/api_call';
import { RECOMMENDATIONS } from '../constants/types';

const initialState = {
    fetching: false,
    data: null,
    error: null
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case RECOMMENDATIONS+API_CALL_REQUEST:            
            return { ...state, fetching: true, error: null };
        case RECOMMENDATIONS+API_CALL_SUCCESS:
            console.log(action.data);
            
            return { ...state, fetching: false, data:action.data };
        case RECOMMENDATIONS+API_CALL_FAILURE:
            return { ...state, fetching: false, data: null, error: action.error };
        default:
            return state;
    }
}