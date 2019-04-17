import axios from "axios";

const API_KEY="fba25a747e5eb376b92c5512b70ab449";

export function fetchMovies(page:number) {
    return axios({
        method: "get",
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    });
}

export function fetchGenres() {
    return axios({
        method: "get",
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    });
}