import axios from "axios";

const API_KEY="fba25a747e5eb376b92c5512b70ab449";
const API_URL="https://api.themoviedb.org/3/";
const API_LANG="en-US";
const API_INCLUDE_ADULT=false;

export function fetchMovies(page:number) {
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

export function searchMovies(query:string, page:number) {
    console.log(query, page);
    
    return axios({
        method: "get",
        url: `${API_URL}search/movie?api_key=${API_KEY}&language=${API_LANG}&query=${query}&page=${page}&include_adult=${API_INCLUDE_ADULT}`
    });
}