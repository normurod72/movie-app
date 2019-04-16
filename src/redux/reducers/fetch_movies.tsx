import {API_CALL_REQUEST,API_CALL_SUCCESS, API_CALL_FAILURE } from '../constants/api_call';

// reducer with initial state
const initialState = {
  fetching: false,
  data: null,
  error: null
};

export default function (state = initialState, action:any) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, data: action.data };
    case API_CALL_FAILURE:
      return { ...state, fetching: false, dog: null, error: action.error };
    default:
      return state;
  }
}