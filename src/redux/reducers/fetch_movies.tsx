import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../constants/api_call';
import { MOVIE, NEW_PAGE,CURRENT_PAGE } from '../constants/types';

const initialState = {
    fetching: false,
    data: [],
    error: null,
    page:1
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case MOVIE+API_CALL_REQUEST:
            return { ...state, fetching: true, error: null };
        case NEW_PAGE:
            state.page=state.page+1;
            return { ...state, fetching: true, error: null };
        case CURRENT_PAGE:
            return { ...state, fetching: false, error: null };
        case MOVIE+API_CALL_SUCCESS:
            const d=[...state.data, ...action.data];
            return { ...state, fetching: false, data:d };
        case MOVIE+API_CALL_FAILURE:
            return { ...state, fetching: false, data: null, error: action.error };
        default:
            return state;
    }
}