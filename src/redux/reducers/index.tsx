import { combineReducers } from 'redux';
import fetchMoviesReducer from './fetch_movies';
import fetchGenresReducer from './fetch_genres';
import searchMoviesReducer from './search_movies';
import fetchMovieDetails from './fetch_movie_details';

export default combineReducers({
    movies: fetchMoviesReducer,
    genres: fetchGenresReducer,
    search: searchMoviesReducer,
    details:fetchMovieDetails
});