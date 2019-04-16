import {combineReducers} from 'redux';
import fetchMoviesReducer from './fetch_movies';

export default combineReducers({
    movies:fetchMoviesReducer
});