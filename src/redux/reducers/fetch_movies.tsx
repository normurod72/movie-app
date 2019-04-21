import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../constants/api_call';
import { MOVIE } from '../constants/types';

const initialState = {
    fetching: false,
    data: [],
    error: null,
    page:1,
    total_pages:null,
    total_results:null
};

export default function (state :any = initialState, action: any) {
    switch (action.type) {
        case MOVIE+API_CALL_REQUEST:            
            return { ...state, fetching: true, page:action.page, error: null };
        case MOVIE+API_CALL_SUCCESS:    
            return { ...state, fetching: false, error:null, data:action.results, total_results:action.total_results, total_pages:action.total_pages };
        case MOVIE+API_CALL_FAILURE:
            return { ...state, fetching: false, data: null, error: action.error };
        default:
            return state;
    }
}