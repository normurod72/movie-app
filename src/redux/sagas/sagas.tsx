import { takeLatest, call, put, all, select, delay} from "redux-saga/effects";
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE} from '../constants/api_call';
import {MOVIE, GENRE, NEW_PAGE, SEARCH} from '../constants/types';
import {fetchMovies, fetchGenres, searchMovies} from './functions';


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {    
    yield all([
        takeLatest(MOVIE+API_CALL_REQUEST, fetchMoviesSaga),
        takeLatest(MOVIE+NEW_PAGE, fetchMoviesSaga),
        takeLatest(GENRE+API_CALL_REQUEST, fetchGenresSaga),
        takeLatest(SEARCH+API_CALL_REQUEST, fetchSearchSaga),
    ]);
}

const getCurrentPage=(state:any)=>state.movies.page;
const getSearchState=(state:any)=>state.search;

function* fetchMoviesSaga() {    
    try {
        const page=yield select(getCurrentPage);
        const response = yield call(fetchMovies,page);
        const data = response.data.results;
        yield put({ type: MOVIE+API_CALL_SUCCESS, data });
    } catch (error) {
        yield put({ type: MOVIE+API_CALL_FAILURE, error });
    }
}

function* fetchSearchSaga() {    
    try {
        yield delay(2000);
        const state=yield select(getSearchState);
        const response = yield call(searchMovies,state.query,state.page);
        const data = response.data.results;
        console.log(response);
        yield put({ type: SEARCH+API_CALL_SUCCESS, data });
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