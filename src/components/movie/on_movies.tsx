import * as React from 'react';
import { Container } from 'react-grid-system';

import MovieCard from '../movie_card';
import loadingMovie from './movie_loading';

export default (movies:any, genres:any)=>(
    <div className="movie-grid">
        <Container fluid={true}>
            {movies.data.length !== 0 &&
                movies.data.map((movie: any, key: number) =>
                    <MovieCard
                        key={movie.id + key}
                        loading={false}
                        movie={movie}
                        genres={genres.data} />)}
            {loadingMovie(movies)}
        </Container>
    </div>
);