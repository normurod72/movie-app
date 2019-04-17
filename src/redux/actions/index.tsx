import { API_CALL_REQUEST } from '../constants/api_call';
import { MOVIE, GENRE, NEW_PAGE } from '../constants/types';

export const fetchMovies = (dispatch: any) => () =>{
    return dispatch({ type: MOVIE+API_CALL_REQUEST });
}
export const fetchGenres = (dispatch: any) => () => dispatch({ type: GENRE+API_CALL_REQUEST });
export const updatePage = (dispatch: any)=>()=>dispatch({ type: NEW_PAGE });