import * as React from 'react';
import { connect } from "react-redux";
import EventListener, { withOptions } from 'react-event-listener';
import { Button, BackTop, Icon } from 'antd';

import logo from './assets/images/logo.png';
import Movie from './components/movie';
import Search from './components/search';
import { 
    fetchMovies, 
    fetchGenres, 
    updatePage, 
    updatePageSearch,
    searchMovies 
} from './redux/actions';

import './App.less';

export interface AppProps { 
    movies: any, 
    genres: any, 
    search: any,
    current:any, 
    onRequestMovie: any, 
    onRequestGenre: any, 
    onNewPageRequest: any,
    onNewSearchPageRequest:any,
    onSearchMovie:any,  
};

class App extends React.Component<AppProps> {

    onScroll = (e: any) => {
        const target = e.target.scrollingElement;
        if (target.offsetHeight + target.scrollTop >= target.scrollHeight && !this.props.movies.fetching) {
            if(this.props.movies.type==='movie'){
                this.props.onNewPageRequest();
            }
            if(this.props.movies.type==='search'){
                this.props.onNewSearchPageRequest();
            }            
        }
    };

    componentDidMount() {
        this.props.onRequestGenre();
        this.props.onRequestMovie();
    }

    onSearch=(e:any)=>{
        if(typeof e === 'string'){
            this.props.onSearchMovie(e);
        }else{
            this.props.onSearchMovie(e.currentTarget.value);
        }
    }

    onPopularMovies=(e:any)=>{
        this.props.onRequestMovie();
    }

    render() {
        if(this.props.search.data.length){
            console.log(this.props.search);
        }
        if(this.props.movies.data.length){
            console.log(this.props.movies.data);
        }        
        const {movies, genres}=this.props;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {
                        movies.type==='search' &&
                        <Button onClick={this.onPopularMovies} size={"large"}><Icon type="left" /> Back to popular movies</Button>
                    }
                </header>
                
                <Search 
                    onSearch={this.onSearch} 
                />
                
                <Movie 
                    movies={movies} 
                    genres={genres}
                    title={movies.type==='movie' ? 'Popular Movies':'Search Results'} 
                />

                <EventListener
                    target="window"
                    onScroll={withOptions(this.onScroll, { passive: true, capture: false })}
                />

                <BackTop>
                    <div className="ant-back-top-inner">
                        <Icon type="arrow-up" />
                    </div>
                </BackTop>
            </div>
        );
    }
}


const mapStateToProps = (state: any) => ({
    movies: state.movies,
    genres: state.genres,
    search: state.search,
    current: state.current
});

const mapDispatchToProps = (dispatch: any) => ({
    onRequestMovie: fetchMovies(dispatch),
    onRequestGenre: fetchGenres(dispatch),
    onNewPageRequest: updatePage(dispatch),
    onNewSearchPageRequest: updatePageSearch(dispatch),
    onSearchMovie:(query:string)=>searchMovies(dispatch, query)()
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
