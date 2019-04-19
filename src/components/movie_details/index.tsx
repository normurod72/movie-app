import * as React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Typography, Divider} from 'antd';
import StarRatings from 'react-star-ratings';

import BackdropWrapper from '../backdrop_wrapper';
import AppHeader from '../app_header';
import GenreTags from '../genre_tags';
import './index.less';
import logo from '../../assets/images/logo.png';

const {Title, Paragraph}=Typography;
export interface MovieDetailsProps {
    match:any, onMovieDetails:any, movieDetails:any
}
 
class MovieDetails extends React.Component<MovieDetailsProps> {
    
    componentWillMount(){
        this.props.onMovieDetails(this.props.match.params.id);
    }

    renderMovieDetails=()=>{
        const { 
            backdrop_path, 
            original_title, 
            poster_path, 
            overview,
            homepage,
            budget, 
            popularity,
            release_date,
            revenue,
            tagline,
            spoken_languages,
            genres,
            production_companies,
            production_countries,
            vote_average 
        }=this.props.movieDetails.data;
        return (
            <BackdropWrapper image_path={`http://image.tmdb.org/t/p/original/${backdrop_path}`}>
                <AppHeader showButton={true} onPopularMovies={""} />
                <div className="movie-details">
                    <Container fluid={true}>
                        <Row justify="between">
                            <Col md={9}>
                                <Row justify="between">
                                <Col xs={12} sm={6} md={4}>
                                    <div className="movie-details__photo">
                                        <img src={`http://image.tmdb.org/t/p/w300/${poster_path}`} alt="Movie poster image"/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={8}>
                                    <div className="movie-details__content">
                                        <Title>
                                            {original_title}
                                        </Title>
                                            <StarRatings
                                                rating={vote_average / 2}
                                                starRatedColor="#01d277"
                                                starEmptyColor="#adadad"
                                                numberOfStars={5}
                                                starDimension="1.4em"
                                                svgIconViewBox="64 64 896 896"
                                                svgIconPath='M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z'
                                                name="rating"
                                            />
                                        <Title level={3}>{tagline}</Title>
                                        <a href={homepage}>homepage</a>
                                        <Paragraph>{overview}</Paragraph>
                                        <div><b>Release date: </b> {release_date}</div>
                                        <div><b>Revenue: </b> {revenue}</div>
                                        <div><b>Budget: </b> {budget}</div>
                                        <div><b>Popularity: </b> {popularity}</div>
                                        <div><b>Languages: </b> {spoken_languages.map((i:any)=>i.name+",")}</div>
                                        <Title level={4}>Genres</Title>
                                        <div><GenreTags genres_ids={genres.map((e:any)=>e.id)} genres={genres} /></div>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <Title className="sidebar-title" level={4}>Recommendations</Title>

                                </Col>
                                </Row>
                            </Col>
                            
                            <Col xs={12} sm={12} md={3}>
                                <Title className="sidebar-title" level={4}>Production companies</Title>
                                {
                                    production_companies.map((c:any)=>
                                        <div key={c.id} className="movie-company">
                                            <img className="movie-company__logo" src={c.logo_path?`http://image.tmdb.org/t/p/w185/${c.logo_path}`:logo} alt=""/>
                                            <span className="movie-company__name">{c.name} ({c.origin_country})</span>                                    
                                        </div>
                                    )
                                }
                                <Divider dashed={true} />
                                <Title className="sidebar-title" level={4}>Production countries</Title>
                                {
                                    production_countries.map((c:any, k:number)=>
                                        <div key={k} className="movie-country">
                                            <span className="movie-country__name">{c.name} ({c.iso_3166_1})</span>                                    
                                        </div>
                                    )
                                }
                            </Col>
                        </Row>
                    </Container>                    
                </div>
            </BackdropWrapper>
        );
    }

    render() { 
        console.log(this.props);
        return (
            this.props.movieDetails.data ? this.renderMovieDetails() : "Fetching data ..." 
        );
    }
}
 
export default MovieDetails;
