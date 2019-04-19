import * as React from 'react';
import { Card } from 'antd';
import { Container, Row, Col } from 'react-grid-system';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

import { formatDate } from '../../utils';
import GenreTags from '../genre_tags';

import './index.less';

export interface Props {
    movies: any,
    genres: any,
    title:string
};

class Movie extends React.Component<Props> {

    renderMovies(movies: any[]) {
        const { Meta } = Card;
        return movies.map((movie: any) =>
            <Col key={movie.id}>
                <Link to={`/details/${movie.id}`}>
                    <Card
                        className="movie-card"
                        hoverable={true}
                        cover={<img alt="example" src={"http://image.tmdb.org/t/p/w185" + movie.poster_path} />}
                    >
                        <div className="movie-card__top">
                            <Meta
                                title={movie.original_title}
                                description={formatDate(movie.release_date)}
                            />
                            <GenreTags genres_ids={movie.genre_ids} genres={this.props.genres.data} />
                        </div>
                        <div className="movie-card__bottom">
                            <StarRatings
                                rating={movie.vote_average / 2}
                                starRatedColor="#fadb14"
                                starEmptyColor="#e8e8e8"
                                numberOfStars={5}
                                starDimension="1.4em"
                                svgIconViewBox="64 64 896 896"
                                svgIconPath='M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z'
                                name="rating"
                            />
                            <span>{movie.vote_average}</span>
                        </div>
                    </Card>
                </Link>
            </Col>
        );
    }

    render() {
        const { movies, title } = this.props;
        return (
            <div className="movie">
                <div className="movie-grid">
                    <Container fluid={true}>
                        <h2>{title}</h2>
                        <Row justify="between">
                            {movies.data.length !== 0 && this.renderMovies(movies.data)}
                        </Row>
                    </Container>
                </div>
                {movies.fetching && "Fetching data ..."}
                {movies.error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
            </div>
        );
    }
}


export default Movie;