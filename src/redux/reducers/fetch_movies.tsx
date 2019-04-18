import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../constants/api_call';
import { MOVIE, NEW_PAGE, SEARCH } from '../constants/types';

const initialState = {
    fetching: false,
    data: [],
    error: null,
    page:1,
    type:'movie'
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case MOVIE+API_CALL_REQUEST:
            if(state.type==='search'){
                state.type='movie';
                state.data=[];
            }
            return { ...state, fetching: true, error: null };
        case MOVIE+NEW_PAGE:
            state.page=state.page+1;
            return { ...state, fetching: true, error: null };
        case MOVIE+API_CALL_SUCCESS:
            const d=[...state.data, ...action.data];
            return { ...state, fetching: false, data:d };
        case MOVIE+SEARCH+API_CALL_SUCCESS:
            state.type='search';
            return { ...state, fetching: false, data:action.data };
        case MOVIE+API_CALL_FAILURE:
            return { ...state, fetching: false, data: null, error: action.error };
        default:
            return state;
    }
}