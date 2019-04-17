import { takeLatest, call, put, all, select} from "redux-saga/effects";
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE} from '../constants/api_call';
import {MOVIE, GENRE, NEW_PAGE} from '../constants/types';
import {fetchMovies, fetchGenres} from './functions';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {    
    yield all([
        takeLatest(MOVIE+API_CALL_REQUEST, fetchMoviesSaga),
        takeLatest(NEW_PAGE, fetchMoviesSaga),
        takeLatest(GENRE+API_CALL_REQUEST, fetchGenresSaga)
    ]);
}

const getCurrentPage=(state:any)=>state.movies.page;

function* fetchMoviesSaga(payload:any) {    
    try {
        const page=yield select(getCurrentPage);
        const response = yield call(fetchMovies,page);
        const data = response.data.results;
        yield put({ type: MOVIE+API_CALL_SUCCESS, data });
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