import { API_CALL_REQUEST } from '../constants/api_call';
import { MOVIE, GENRE, NEW_PAGE, SEARCH, DETAILS, RECOMMENDATIONS, SIMILAR_MOVIES } from '../constants/types';

export const fetchMovies = (dispatch: any, page:number) => () => dispatch({ type: MOVIE + API_CALL_REQUEST, page });
export const fetchGenres = (dispatch: any) => () => dispatch({ type: GENRE + API_CALL_REQUEST });
export const fetchNewMovies = (dispatch: any) => () => dispatch({ type: MOVIE + NEW_PAGE });
export const fetchNewSearchMovies = (dispatch: any) => () => dispatch({ type: SEARCH + NEW_PAGE });
export const searchMovies = (dispatch: any, query: string, page:number) => () => dispatch({ type: SEARCH + API_CALL_REQUEST, query, page });
export const fetchMovieDetails = (dispatch: any, id: number) => () => dispatch({ type: DETAILS + API_CALL_REQUEST, id });
export const fetchMovieRecommendations = (dispatch: any, id: number) => () => dispatch({ type: RECOMMENDATIONS + API_CALL_REQUEST, id });
export const fetchSimilarMovies = (dispatch: any, id: number) => () => dispatch({ type: SIMILAR_MOVIES + API_CALL_REQUEST, id });