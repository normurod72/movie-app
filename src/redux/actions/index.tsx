import { API_CALL_REQUEST } from '../constants/api_call';
import { MOVIE, GENRE, NEW_PAGE, SEARCH } from '../constants/types';

export const fetchMovies = (dispatch: any) => () =>dispatch({ type: MOVIE+API_CALL_REQUEST });
export const fetchGenres = (dispatch: any) => () => dispatch({ type: GENRE+API_CALL_REQUEST });
export const updatePage = (dispatch: any)=>()=>dispatch({ type: MOVIE+NEW_PAGE });
export const searchMovies = (dispatch: any, query:string)=>()=>dispatch({ type: SEARCH+API_CALL_REQUEST, query });