import * as React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import BackdropWrapper from '../backdrop_wrapper';
import AppHeader from '../app_header';

import './index.less';

export interface MovieDetailsProps {
    match:any, onMovieDetails:any, movieDetails:any
}
 
class MovieDetails extends React.Component<MovieDetailsProps> {
    
    componentWillMount(){
        this.props.onMovieDetails(this.props.match.params.id);
    }

    render() { 
        console.log(this.props);
        return (
            <BackdropWrapper image_path={"http://image.tmdb.org/t/p/original/bi4jh0Kt0uuZGsGJoUUfqmbrjQg.jpg"}>
                <AppHeader showButton={true} onPopularMovies={""} />
                <div className="movie-details">
                    <Container fluid={true}>
                        <Row justify="between">
                            <Col xs={12} sm={6} md={4}>
                                <div className="movie-details__photo">
                                    <img src="http://image.tmdb.org/t/p/w300/xnopI5Xtky18MPhK40cZAGAOVeV.jpg" alt="Movie poster image"/>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={8}>
                                <div className="movie-details__content">
                                    <h1>Hello from Movie Details</h1>
                                </div>
                            </Col>
                        </Row>
                    </Container>                    
                </div>
            </BackdropWrapper>
        );
    }
}
 
export default MovieDetails;
