import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../constants/api_call';
import { GENRE } from '../constants/types';

const initialState = {
    fetching: null,
    data: [],
    error: null
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case GENRE+API_CALL_REQUEST:
            return { ...state, fetching: true, error: null };
        case GENRE+API_CALL_SUCCESS:
            return { ...state, fetching: false, data: action.data };
        case GENRE+API_CALL_FAILURE:
            return { ...state, fetching: false, data: null, error: action.error };
        default:
            return state;
    }
}