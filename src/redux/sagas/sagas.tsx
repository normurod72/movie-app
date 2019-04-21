import { takeLatest, call, put, all, delay} from "redux-saga/effects";
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE} from '../constants/api_call';
import {MOVIE, GENRE, NEW_PAGE, SEARCH, DETAILS, RECOMMENDATIONS, SIMILAR_MOVIES} from '../constants/types';
import {fetchMovies, fetchGenres, searchMovies, fetchMovieDetails, fetchMovieRecommendations, fetchSimilarMovies} from './functions';


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {    
    yield all([
        takeLatest(MOVIE+API_CALL_REQUEST, fetchMoviesSaga),
        takeLatest(MOVIE+NEW_PAGE, fetchMoviesSaga),
        takeLatest(GENRE+API_CALL_REQUEST, fetchGenresSaga),
        takeLatest(SEARCH+API_CALL_REQUEST, fetchSearchSaga),
        takeLatest(SEARCH+NEW_PAGE, fetchSearchSaga),
        takeLatest(DETAILS+API_CALL_REQUEST, fetchMovieDetailsSaga),
        takeLatest(RECOMMENDATIONS+API_CALL_REQUEST, fetchMovieRecommendationsSaga),
        takeLatest(SIMILAR_MOVIES+API_CALL_REQUEST, fetchSimilarMoviesSaga),
    ]);
}

function* fetchMovieDetailsSaga(payload:any){
    try {
        const response = yield call(fetchMovieDetails,payload.id);
        yield put({ type: DETAILS+API_CALL_SUCCESS, data:response.data });
    } catch (error) {
        yield put({ type: DETAILS+API_CALL_FAILURE, error });
    }
}

function* fetchMovieRecommendationsSaga(payload:any){
    try {
        const response = yield call(fetchMovieRecommendations,payload.id);
        yield put({ type: RECOMMENDATIONS+API_CALL_SUCCESS, data:response.data });
    } catch (error) {
        yield put({ type: RECOMMENDATIONS+API_CALL_FAILURE, error });
    }
}

function* fetchSimilarMoviesSaga(payload:any){
    try {
        const response = yield call(fetchSimilarMovies,payload.id);
        yield put({ type: SIMILAR_MOVIES+API_CALL_SUCCESS, data:response.data });
    } catch (error) {
        yield put({ type: SIMILAR_MOVIES+API_CALL_FAILURE, error });
    }
}

function* fetchMoviesSaga(payload:any) {
    try {
        const response = yield call(fetchMovies,payload.page);
        yield put({ type: MOVIE+API_CALL_SUCCESS, ...response.data });
    } catch (error) {
        yield put({ type: MOVIE+API_CALL_FAILURE, error });
    }
}

function* fetchSearchSaga(payload:any) {    
    try {
        if(payload.page===1){yield delay(1000);}
        
        const response = yield call(searchMovies,payload.query,payload.page);
        console.log(response);
        yield put({ type: SEARCH+API_CALL_SUCCESS, ...response.data });
    } catch (error) {
        yield put({ type: SEARCH+API_CALL_FAILURE, error });
    }
}

function* fetchGenresSaga() {
    try {
        const response = yield call(fetchGenres);        
        const data = response.data.genres;        
        yield put({ type: GENRE+API_CALL_SUCCESS, data });
    } catch (error) {
        yield put({ type: GENRE+API_CALL_FAILURE, error });
    }
}