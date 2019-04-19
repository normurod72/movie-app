import * as React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Home from './components/home';
import MovieDetails from './components/movie_details';
import NotFound from './components/not_found';

import { 
    fetchMovies, 
    fetchGenres, 
    fetchNewMovies, 
    fetchNewSearchMovies,
    searchMovies,
    fetchMovieDetails 
} from './redux/actions';

import './App.less';

export interface AppProps { 
    movies: any, 
    genres: any, 
    search: any,
    current:any,
    details:any, 
    onRequestMovie: any, 
    onRequestGenre: any, 
    onNewPageRequest: any,
    onNewSearchPageRequest:any,
    onSearchMovie:any,
    onNewSelectedMovieDetails:any  
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
        //this.props.onRequestGenre();
        //this.props.onRequestMovie();
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

    onMovieDetails=()=>{
        this.props.onNewSelectedMovieDetails();
    }

    render() {
        if(this.props.search.data.length){
            console.log(this.props.search);
        }
        if(this.props.movies.data.length){
            console.log(this.props.movies.data);
        }
        if(this.props.details){
            // console.log(this.props.details);
        }        
        const {movies, genres, details} = this.props;
        return (
            <Router>
                <Switch>
                    <Route path="/home" 
                        render={props=><Home {...props} 
                            movies={movies} 
                            genres={genres} 
                            onPopularMovies={this.onPopularMovies}
                            onScroll={this.onScroll}
                            onSearch={this.onSearch}
                        />} />
                    <Route 
                        path="/details/:id" 
                        render={props=><MovieDetails {...props} 
                            onMovieDetails={(id:number)=>this.props.onNewSelectedMovieDetails(id)} 
                            movieDetails={...details} 
                        />} />
                    <Redirect from="/" exact={true} to="/home" />
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}


const mapStateToProps = (state: any) => ({
    movies: state.movies,
    genres: state.genres,
    search: state.search,
    current: state.current,
    details: state.details
});

const mapDispatchToProps = (dispatch: any) => ({
    onRequestMovie: fetchMovies(dispatch),
    onRequestGenre: fetchGenres(dispatch),
    onNewPageRequest: fetchNewMovies(dispatch),
    onNewSearchPageRequest: fetchNewSearchMovies(dispatch),
    onNewSelectedMovieDetails:(id:number)=>fetchMovieDetails(dispatch, id)(),
    onSearchMovie:(query:string)=>searchMovies(dispatch, query)()
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
