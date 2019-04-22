import * as React from 'react';
import MovieCard from '../movie_card';

export default (movies:any) => (
    movies.fetching && 
    <React.Fragment>
        <MovieCard loading={true} movie={null} genres={[]} />
        <MovieCard loading={true} movie={null} genres={[]} />
        <MovieCard loading={true} movie={null} genres={[]} />
    </React.Fragment>
);