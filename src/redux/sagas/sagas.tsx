import { takeLatest, call, put, all, select, delay} from "redux-saga/effects";
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE} from '../constants/api_call';
import {MOVIE, GENRE, NEW_PAGE, SEARCH, DETAILS} from '../constants/types';
import {fetchMovies, fetchGenres, searchMovies, fetchMovieDetails} from './functions';


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {    
    yield all([
        takeLatest(MOVIE+API_CALL_REQUEST, fetchMoviesSaga),
        takeLatest(MOVIE+NEW_PAGE, fetchMoviesSaga),
        takeLatest(GENRE+API_CALL_REQUEST, fetchGenresSaga),
        takeLatest(SEARCH+API_CALL_REQUEST, fetchSearchSaga),
        takeLatest(SEARCH+NEW_PAGE, fetchSearchSaga),
        takeLatest(DETAILS+API_CALL_REQUEST, fetchMovieDetailsSaga)
    ]);
}

const getSearchState=(state:any)=>state.search;
const getMoviesState=(state:any)=>state.movies;

function* fetchMovieDetailsSaga(payload:any){
    try {
        const response = yield call(fetchMovieDetails,payload.id);
        yield put({ type: DETAILS+API_CALL_SUCCESS, data:response.data });
    } catch (error) {
        yield put({ type: DETAILS+API_CALL_FAILURE, error });
    }
}


function* fetchMoviesSaga() {    
    try {
        const movies=yield select(getMoviesState);
        const response = yield call(fetchMovies,movies.page);
        const data = response.data.results;
        yield put({ type: MOVIE+API_CALL_SUCCESS, data });
    } catch (error) {
        yield put({ type: MOVIE+API_CALL_FAILURE, error });
    }
}

function* fetchSearchSaga() {    
    try {
        const state=yield select(getSearchState);
        if(state.page===1){
            yield delay(2000);
        }
        const response = yield call(searchMovies,state.query,state.page);
        const data = response.data.results;
        if(state.page===1){
            yield put({ type: MOVIE+SEARCH+API_CALL_SUCCESS, data });
        }else{
            yield put({ type: MOVIE+API_CALL_SUCCESS, data });
        }
    } catch (error) {
        yield put({ type: MOVIE+API_CALL_FAILURE, error });
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