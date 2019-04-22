import axios from "axios";
import { API_KEY, API_URL, API_LANG, API_INCLUDE_ADULT } from '../../api.conf.json';

export function fetchMovies(page: number) {
    return axios({
        method: "get",
        url: `${API_URL}movie/popular?api_key=${API_KEY}&language=${API_LANG}&page=${page}`
    });
}

export function fetchGenres() {
    return axios({
        method: "get",
        url: `${API_URL}genre/movie/list?api_key=${API_KEY}&language=${API_LANG}`
    });
}

export function searchMovies(query: string, page: number) {
    return axios({
        method: "get",
        url: `${API_URL}search/movie?api_key=${API_KEY}&language=${API_LANG}&query=${query}&page=${page}&include_adult=${API_INCLUDE_ADULT}`
    });
}

export function fetchMovieDetails(id: string) {
    return axios({
        method: "get",
        url: `${API_URL}movie/${id}?api_key=${API_KEY}`
    });
}

export function fetchMovieRecommendations(id: string) {
    return axios({
        method: "get",
        url: `${API_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=${API_LANG}&page=1`
    });
}

export function fetchSimilarMovies(id: string) {
    return axios({
        method: "get",
        url: `${API_URL}movie/${id}/similar?api_key=${API_KEY}&language=${API_LANG}&page=1`
    });
}