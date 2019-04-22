import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../constants/api_call';
import { SEARCH } from '../constants/types';

const initialState = {
    fetching: null,
    error: null,
    data: null,
    page:null,
    total_pages:null,
    query:null,
    total_results:null
};

export default function (state:any = initialState, action: any) {
    switch (action.type) {
        case SEARCH+API_CALL_REQUEST:           
            if(action.page===1){state.data=[];}
            return { ...state, fetching: true, error: null, page:action.page, query:action.query };
        case SEARCH+API_CALL_SUCCESS:
            return { ...state, fetching: false, data:action.results, total_pages:action.total_pages, total_results: action.total_results};
        case SEARCH+API_CALL_FAILURE:
            return { ...state, fetching: false, data: null, error: action.error };
        default:
            return state;
    }
}