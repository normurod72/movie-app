import * as React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Typography, Divider } from 'antd';
import StarRatings from 'react-star-ratings';

import BackdropWrapper from '../backdrop_wrapper';
import AppHeader from '../app_header';
import GenreTags from '../genre_tags';
import MovieSwiper from '../movie_swiper';
import './index.less';
import { API_IMG_URL, API_IMG_BACKDROP_SIZE } from '../../api.conf.json';
import { star } from '../../assets/star.svg.json';
import imageLoader from '../../utils/image_loader';
import loadingContent from './loading_content';

const { Title, Paragraph } = Typography;
export interface MovieDetailsProps {
    match: any,
    history: any,
    location: any,
    onMovieDetails: any,
    movieDetails: any,
    onSimilarMovies: any,
    onMovieRecommendations: any,
    recommendations: any,
    similar: any,
    allGenres: any[],
    onFlushData: any
}

class MovieDetails extends React.Component<MovieDetailsProps> {

    state = {
        id: null,
        error: null
    }

    shouldComponentUpdate(nextProps: MovieDetailsProps) {
        if (this.state.id && this.state.id !== nextProps.match.params.id) {
            this.props.onMovieDetails(nextProps.match.params.id);
            this.props.onSimilarMovies(nextProps.match.params.id);
            this.props.onMovieRecommendations(nextProps.match.params.id);
            this.setState({ id: nextProps.match.params.id });
        }
        return true;
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.onMovieDetails(this.props.match.params.id);
        this.props.onSimilarMovies(this.props.match.params.id);
        this.props.onMovieRecommendations(this.props.match.params.id);
        this.setState({ id: this.props.match.params.id });
    }

    componentWillReceiveProps() {
        if (this.props.match.params.id !== this.state.id) {
            this.props.onFlushData();
            window.scrollTo(0, 0);
        }
    }

    componentWillUnmount = () => {
        this.props.onFlushData();
    }

    renderMovieDetails = () => {
        const {
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
        } = this.props.movieDetails.data;

        return (
            <div className="movie-details">
                <Container fluid={true}>
                    <Row justify="between">
                        <Col md={9}>
                            <Row justify="between">
                                <Col xs={12} sm={6} md={4}>
                                    <div className="movie-details__photo">
                                        {imageLoader(poster_path, "w500")}
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
                                            svgIconPath={star}
                                            name="rating"
                                        />
                                        <Title level={3}>{tagline}</Title>
                                        <a href={homepage}>Visit movie website</a>
                                        <Paragraph>{overview}</Paragraph>
                                        <div><b>Release date: </b> {release_date}</div>
                                        <div><b>Revenue: </b> {revenue}</div>
                                        <div><b>Budget: </b> {budget}</div>
                                        <div><b>Popularity: </b> {popularity}</div>
                                        <div><b>Languages: </b> {spoken_languages.map((i: any) => i.name + ",")}</div>
                                        <br /><br />
                                        <Title level={4}>Genres</Title>
                                        <div>{this.props.allGenres.length !== 0 && <GenreTags genres_ids={genres.map((e: any) => e.id)} genres={this.props.allGenres} />}</div>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    {this.props.recommendations.data &&
                                        <MovieSwiper
                                            title={"Recommendations"}
                                            movies={this.props.recommendations.data.results}
                                            genres={this.props.allGenres} />}
                                </Col>
                                <Col md={12}>
                                    {this.props.similar.data &&
                                        <MovieSwiper
                                            title={"Similar movies"}
                                            movies={this.props.similar.data.results}
                                            genres={this.props.allGenres} />}
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12} sm={12} md={3}>
                            <Title className="sidebar-title" level={4}>Production companies</Title>
                            {production_companies.map((c: any) =>
                                <div key={c.id} className="movie-company">
                                    <span className="movie-company__name">{c.name} ({c.origin_country})</span>
                                </div>
                            )}
                            <Divider dashed={true} />
                            <Title className="sidebar-title" level={4}>Production countries</Title>
                            {production_countries.map((c: any, k: number) =>
                                <div key={k} className="movie-country">
                                    <span className="movie-country__name">{c.name} ({c.iso_3166_1})</span>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    render() {
        const { data } = this.props.movieDetails;
        if (this.props.movieDetails.error) {
            this.props.history.push('/not-found');
        }
        return (

            <React.Fragment>
                {data ? (
                    <BackdropWrapper image_path={`${API_IMG_URL}${API_IMG_BACKDROP_SIZE}/${data && data.backdrop_path}`}>
                        <AppHeader showButton={true} onPopularMovies={() => this.props.history.push('/home')} />
                        {this.renderMovieDetails()}
                    </BackdropWrapper>
                ) : (
                    <div>
                        <AppHeader showButton={true} onPopularMovies={() => this.props.history.push('/home')} />
                        {loadingContent()}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default MovieDetails;
