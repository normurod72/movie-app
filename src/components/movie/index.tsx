import * as React from 'react';
import './index.less';
import { Input } from 'antd';
import { connect } from "react-redux";
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
        if (!genres.fetching) {
            console.log(genres.data);
        }
        return (
            <div className="movie">
                <div className="searchbox">
                    <Search
                        size="large"
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                    />
                </div>
                <EventListener
                    target="window"
                    onScroll={withOptions(this.handleScroll, { passive: true, capture: false })}
                />
                {(
                    <div className="movie">
                        <h2>Movies list</h2>
                        <div>
                            {this.renderMovies(movies.data)}
                        </div>
                    </div>
                )}
                {movies.fetching && "Fetching data ..."}
                {movies.error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

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