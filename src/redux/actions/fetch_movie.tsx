import {API_CALL_REQUEST} from '../constants/api_call';

export const fetchMovies=(dispatch:any) => () =>dispatch({ type: API_CALL_REQUEST });