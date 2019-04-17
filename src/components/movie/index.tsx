import * as React from 'react';
import './index.less';
import { Input, Card, Tag, Rate } from 'antd';
import { connect } from "react-redux";
import { Container, Row, Col } from 'react-grid-system';
import { fetchMovies, fetchGenres, updatePage } from '../../redux/actions';
import EventListener, { withOptions } from 'react-event-listener';

export interface Props { movies: any, genres: any, onRequestMovie: any, onRequestGenre: any, onNewPageRequest: any };

class Movie extends React.Component<Props> {

    handleScroll = (e: any) => {
        const target = e.target.scrollingElement;
        if (target.offsetHeight + target.scrollTop >= target.scrollHeight) {
            console.log('loadmore');
            if (!this.props.movies.fetching) {
                this.props.onNewPageRequest();
            }
        }
    };

    componentDidMount() {
        this.props.onRequestGenre();
        this.props.onRequestMovie();
    }

    renderMovies(movies: any[]) {
        return movies.map((movie: any) => <div key={movie.id}><h4>{movie.original_title}</h4><p>{movie.overview}</p></div>);
    }

    render() {
        const { movies, genres } = this.props;
        const { Search } = Input;
        const { Meta } = Card;
        if (!genres.fetching) {
            console.log(genres.data);
        }
        return (
            <div className="movie">
                <div className="searchbox">
                    <Container>
                        <Row justify="center">
                            <Col sm={8}>
                                <Search
                                    size="large"
                                    placeholder="input search text"
                                    onSearch={value => console.log(value)}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>
                {(
                    <div className="movie-grid">
                        <Container fluid={true}>
                            <h2>Movies list</h2>
                            <Row justify="between">
                                <Col>
                                    <Card
                                        className="movie-card"
                                        hoverable={true}
                                        cover={<img alt="example" src="http://image.tmdb.org/t/p/w185/xnopI5Xtky18MPhK40cZAGAOVeV.jpg" />}
                                    >
                                        <Meta
                                            title="Europe Street beat"
                                            description="March 23, 2019"
                                        />
                                        <div className="movie-genres">
                                            <Tag color="magenta">magenta</Tag>
                                            <Tag color="purple">red</Tag>
                                            <Tag color="volcano">volcano</Tag>
                                            <Tag color="orange">orange</Tag>
                                        </div>
                                        <Rate disabled={true} defaultValue={2} />
                                    </Card>
                                </Col>
                                <Col>
                                    <Card
                                        className="movie-card"
                                        hoverable={true}
                                        cover={<img alt="example" src="http://image.tmdb.org/t/p/w185/xnopI5Xtky18MPhK40cZAGAOVeV.jpg" />}
                                    >
                                        <Meta
                                            title="Europe Street beat"
                                            description="March 23, 2019"
                                        />
                                        <div>
                                            <Tag color="magenta">magenta</Tag>
                                            <Tag color="purple">red</Tag>
                                            <Tag color="volcano">volcano</Tag>
                                            <Tag color="orange">orange</Tag>
                                        </div>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card
                                        className="movie-card"
                                        hoverable={true}
                                        cover={<img alt="example" src="http://image.tmdb.org/t/p/w185/xnopI5Xtky18MPhK40cZAGAOVeV.jpg" />}
                                    >
                                        <Meta
                                            title="Europe Street beat"
                                            description="March 23, 2019"
                                        />
                                        <div>
                                            <Tag color="magenta">magenta</Tag>
                                            <Tag color="purple">red</Tag>
                                            <Tag color="volcano">volcano</Tag>
                                            <Tag color="orange">orange</Tag>
                                        </div>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card
                                        className="movie-card"
                                        hoverable={true}
                                        cover={<img alt="example" src="http://image.tmdb.org/t/p/w185/xnopI5Xtky18MPhK40cZAGAOVeV.jpg" />}
                                    >
                                        <Meta
                                            title="Europe Street beat"
                                            description="March 23, 2019"
                                        />
                                        <div>
                                            <Tag color="magenta">magenta</Tag>
                                            <Tag color="purple">red</Tag>
                                            <Tag color="volcano">volcano</Tag>
                                            <Tag color="orange">orange</Tag>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>

                        <div>
                            {this.renderMovies(movies.data)}
                        </div>
                    </div>
                )}
                {movies.fetching && "Fetching data ..."}
                {movies.error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
                <EventListener
                    target="window"
                    onScroll={withOptions(this.handleScroll, { passive: true, capture: false })}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    movies: state.movies,
    genres: state.genres
});

const mapDispatchToProps = (dispatch: any) => ({
    onNewPageRequest: updatePage(dispatch),
    onRequestMovie: fetchMovies(dispatch),
    onRequestGenre: fetchGenres(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);