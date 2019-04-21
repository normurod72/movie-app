import { combineReducers } from 'redux';
import fetchMoviesReducer from './fetch_movies';
import fetchGenresReducer from './fetch_genres';
import searchMoviesReducer from './search_movies';
import fetchMovieDetails from './fetch_movie_details';
import fetchMovieRecommendationsReducer from './fetch_movie_recommendations';
import fetchSimilarMoviesReducer from './fetch_similar_movies';

export default combineReducers({
    movies: fetchMoviesReducer,
    genres: fetchGenresReducer,
    search: searchMoviesReducer,
    details:fetchMovieDetails,
    recommendations:fetchMovieRecommendationsReducer,
    similar:fetchSimilarMoviesReducer
});