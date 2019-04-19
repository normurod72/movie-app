import { API_CALL_REQUEST } from '../constants/api_call';
import { MOVIE, GENRE, NEW_PAGE, SEARCH, DETAILS } from '../constants/types';

export const fetchMovies = (dispatch: any) => () =>dispatch({ type: MOVIE+API_CALL_REQUEST });
export const fetchGenres = (dispatch: any) => () => dispatch({ type: GENRE+API_CALL_REQUEST });
export const updatePage = (dispatch: any)=>()=>dispatch({ type: MOVIE+NEW_PAGE });
export const updatePageSearch = (dispatch: any)=>()=>dispatch({ type: SEARCH+NEW_PAGE });
export const searchMovies = (dispatch: any, query:string)=>()=>dispatch({ type: SEARCH+API_CALL_REQUEST, query });
export const getMovieDetails = (dispatch: any, id:number)=>()=>dispatch({ type: DETAILS+API_CALL_REQUEST, id });