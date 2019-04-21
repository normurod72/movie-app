import * as React from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { Card} from 'antd';
import Img from 'react-image';
import ContentLoader from 'react-content-loader';

import { formatDate } from '../../utils';
import GenreTags from '../genre_tags';
import './index.less';
import {star} from '../../assets/star.svg.json';
import {NO_PHOTO_SRC, API_IMG_URL,API_IMG_POSTER_SIZE, API_IMG_PLACEHOLDER_SIZE} from '../../api.conf.json';

const { Meta } = Card;

interface Props { movie: any, loading:boolean,  genres:any[], type?:'horizontal'|'vertical' };

const MovieCard: React.FunctionComponent<Props> = ({ movie, genres, loading, type='horizontal' }: Props) =>{
    let srcPath=[]; 
    let placeholderPath=[];
    if(!loading){
        if(movie.poster_path===null){
            srcPath=[NO_PHOTO_SRC];
            placeholderPath=[NO_PHOTO_SRC];
        }else{
            srcPath=[`${API_IMG_URL}${API_IMG_POSTER_SIZE}${movie.poster_path}`, NO_PHOTO_SRC];
            placeholderPath=[`${API_IMG_URL}${API_IMG_PLACEHOLDER_SIZE}${movie.poster_path}`, NO_PHOTO_SRC];
        }
    }
    return(
        <React.Fragment>
            {
                loading ?
                <ContentLoader 
                    className="card-content-loader"
                    height={275}
                    width={412}
                    speed={2}
                    primaryColor="#d3d3d3"
                    secondaryColor="#e0dede"
                >
                    <rect x="190" y="25" rx="0" ry="0" width="195" height="30" /> 
                    <rect x="190" y="80" rx="0" ry="0" width="105" height="30" /> 
                    <rect x="190" y="137" rx="0" ry="0" width="130" height="30" /> 
                    <rect x="0" y="0" rx="3" ry="3" width="164" height="275" /> 
                    <rect x="190" y="215" rx="0" ry="0" width="185" height="30" />
                </ContentLoader> :
                <Link className={`movie-card-link-${type}`} to={`/details/${movie.id}`}>
                    <Card
                        className={`movie-card-${type}`}
                        hoverable={true}
                        cover={
                            <Img
                                src={srcPath}
                                loader={<Img
                                    style={{filter: 'blur(4px)', 'animation': 'hue 3s infinite'}}
                                    src={placeholderPath}
                                />}
                            />
                        }>
                        <div className="movie-card__top">    
                            <Meta
                                title={movie.original_title}
                                description={formatDate(movie.release_date)}
                            />
                            {
                                (genres.length!==0 && type==='horizontal') && 
                                <GenreTags genres_ids={movie.genre_ids} genres={genres} />
                            }
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
                </Link>
            }
        </React.Fragment>
    );
}

export default MovieCard;