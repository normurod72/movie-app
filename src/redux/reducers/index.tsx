import { combineReducers } from 'redux';
import fetchMoviesReducer from './fetch_movies';
import fetchGenresReducer from './fetch_genres';

export default combineReducers({
    movies: fetchMoviesReducer,
    genres: fetchGenresReducer
});