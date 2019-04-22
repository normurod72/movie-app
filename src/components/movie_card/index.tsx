import * as React from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import loadingCard from './loading_card';
import { formatDate } from '../../utils';
import imageLoader from '../../utils/image_loader';
import GenreTags from '../genre_tags';
import './index.less';
import { star } from '../../assets/star.svg.json';

const { Meta } = Card;

interface Props { movie: any, loading: boolean, genres: any[], type?: 'horizontal' | 'vertical' };

const MovieCard: React.FunctionComponent<Props> = ({ movie, genres, loading, type = 'horizontal' }: Props) => {
    return (
        <React.Fragment>
            {loading ?
                loadingCard() :
                <Link className={`movie-card-link-${type}`} to={`/details/${movie.id}`}>
                    <Card
                        className={`movie-card-${type}`}
                        hoverable={true}
                        cover={
                            imageLoader(movie.poster_path)
                        }>
                        <div className="movie-card__top">
                            <Meta
                                title={movie.original_title}
                                description={formatDate(movie.release_date)}
                            />
                            {(genres.length !== 0 && type === 'horizontal') && <GenreTags genres_ids={movie.genre_ids} genres={genres} />}
                        </div>
                        <div className="movie-card__bottom">
                            <StarRatings
                                rating={movie.vote_average / 2}
                                starRatedColor="#fadb14"
                                starEmptyColor="#e8e8e8"
                                numberOfStars={5}
                                starDimension="1.4em"
                                svgIconViewBox="64 64 896 896"
                                svgIconPath={star}
                                name="rating"
                            />
                            <span>{movie.vote_average}</span>
                        </div>
                    </Card>
                </Link>}
        </React.Fragment>
    );
}

export default MovieCard;