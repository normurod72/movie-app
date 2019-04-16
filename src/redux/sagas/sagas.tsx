import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchMovies() {
  return axios({
    method: "get",
    url: "https://api.themoviedb.org/3/movie/popular?api_key=fba25a747e5eb376b92c5512b70ab449&language=en-US&page=1"
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchMovies);
    const data = response.data.results;

    // dispatch a success action to the store with the new dog
    yield put({ type: "API_CALL_SUCCESS", data });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}