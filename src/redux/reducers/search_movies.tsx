import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../constants/api_call';
import { NEW_PAGE, SEARCH } from '../constants/types';

const initialState = {
    fetching: false,
    data: [],
    error: null,
    page:1,
    query:null
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case SEARCH+API_CALL_REQUEST:            
            return { ...state, fetching: true, error: null, query:action.query };
        case SEARCH+NEW_PAGE:
            state.page=state.page+1;
            return { ...state, fetching: true, error: null };
        case SEARCH+API_CALL_SUCCESS:
            const d=[...state.data, ...action.data];
            return { ...state, fetching: false, data:d };
        case SEARCH+API_CALL_FAILURE:
            return { ...state, fetching: false, data: null, error: action.error };
        default:
            return state;
    }
}