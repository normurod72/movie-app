import * as React from 'react';
import { connect } from "react-redux";
import EventListener, { withOptions } from 'react-event-listener';

import logo from './assets/images/logo.png';
import Movie from './components/movie';
import Search from './components/search';
import { fetchMovies, fetchGenres, updatePage, searchMovies } from './redux/actions';

import './App.less';

export interface AppProps { 
    movies: any, 
    genres: any, 
    onRequestMovie: any, 
    onRequestGenre: any, 
    onNewPageRequest: any,
    onSearchMovie:any 
};

class App extends React.Component<AppProps> {

    onScroll = (e: any) => {
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

    onSearch=(e:any)=>{
        console.log(e.currentTarget.value);
        this.props.onSearchMovie(e.currentTarget.value);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                
                <Search 
                    onSearch={this.onSearch} 
                />
                
                <Movie 
                    movies={this.props.movies} 
                    genres={this.props.genres} 
                />

                <EventListener
                    target="window"
                    onScroll={withOptions(this.onScroll, { passive: true, capture: false })}
                />
            </div>
        );
    }
}


const mapStateToProps = (state: any) => ({
    movies: state.movies,
    genres: state.genres,
    search: state.search
});

const mapDispatchToProps = (dispatch: any) => ({
    onRequestMovie: fetchMovies(dispatch),
    onRequestGenre: fetchGenres(dispatch),
    onNewPageRequest: updatePage(dispatch),
    onSearchMovie:(query:string)=>searchMovies(dispatch, query)()
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
