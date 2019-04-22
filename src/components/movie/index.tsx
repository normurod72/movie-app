import * as React from 'react';
import { Container } from 'react-grid-system';

import loadPagination from './pagination';
import loadError from './on_error';
import loadEmpty from './on_empty';
import loadMovies from './on_movies';
import './index.less';

export interface Props {
    movies: any,
    genres: any,
    title: string,
    onNewPageRequest: any
};

class Movie extends React.Component<Props> {
    render() {
        const { movies, title, genres } = this.props;
        return (
            <React.Fragment>
                {movies.data &&
                    <div className="movie">
                        <Container fluid={true}>
                            <h2>{title}</h2>
                        </Container>
                        {loadMovies(movies,genres)}
                        {loadEmpty(movies)}
                        {loadPagination(movies, this.props.onNewPageRequest)}
                    </div>}
                {loadError(movies)}
            </React.Fragment>
        );
    }
}

export default Movie;