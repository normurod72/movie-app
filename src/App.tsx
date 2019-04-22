import * as React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Home from './components/home';
import MovieDetails from './components/movie_details';
import NotFound from './components/not_found';

import { 
    fetchMovies, 
    fetchGenres, 
    searchMovies,
    fetchMovieDetails,
    fetchMovieRecommendations,
    fetchSimilarMovies,
    flushDetailsData 
} from './redux/actions';

import './App.less';

export interface AppProps { 
    movies: any, 
    genres: any, 
    search: any,
    current:any,
    details:any, 
    recommendations:any,
    similar:any,
    onRequestMovie: any, 
    onRequestGenre: any, 
    onSearchMovie:any,
    onNewSelectedMovieDetails:any,
    onMovieRecommendations:any,
    onSimilarMovies:any,
    onDeleteDetailsData:any 
};

export interface AppState{
    currentSource:'movie'|'search', 
    searchQuery:string
};

class App extends React.Component<AppProps,AppState> {

    constructor(props:AppProps){
        super(props);
        this.state={
            currentSource:'movie',
            searchQuery:''
        }
    }

    onNewPageRequest=(pageNumber:number)=>{
        window.scrollTo(0, 0);
        if(this.state.currentSource==='movie'){
            this.props.onRequestMovie(pageNumber);
        }else{
            this.props.onSearchMovie(this.state.searchQuery,pageNumber);
        }
    }

    componentDidMount() {
        this.props.onRequestGenre();
        this.props.onRequestMovie(1);
    }

    onSearch=(e:any)=>{
        if(e.trim()!==this.state.searchQuery.trim()){
            if(e.trim()!==''){
                this.setState({currentSource:'search'});
                this.props.onSearchMovie(e, 1);
            }else{
                this.setState({currentSource:'movie', searchQuery:''});
            }
        }
        this.setState({searchQuery:e});
    }

    onPopularMovies=(e:any)=>{
        this.setState({currentSource:'movie', searchQuery:''});
    }

    onMovieDetails=()=>{
        this.props.onNewSelectedMovieDetails();
    }

    onMovieRecommendations=()=>{
        this.props.onMovieRecommendations();
    }

    onSimilarMovies=()=>{
        this.props.onSimilarMovies();
    }

    render() {               
        const {movies, genres, details, similar, recommendations, search} = this.props;        
        return (
            <Router>
                <Switch>
                    <Route path="/home" 
                        render={props=><Home {...props} 
                            movies={this.state.currentSource==='movie' ? movies: search} 
                            type={this.state.currentSource}
                            searchQuery={this.state.searchQuery}
                            genres={genres} 
                            onPopularMovies={this.onPopularMovies}
                            onNewPageRequest={this.onNewPageRequest}
                            onSearch={this.onSearch}
                        />} />
                    <Route 
                        path="/details/:id" 
                        render={props=><MovieDetails {...props} 
                            onMovieDetails={(id:number)=>this.props.onNewSelectedMovieDetails(id)} 
                            movieDetails={...details}
                            recommendations={recommendations}
                            similar={similar}
                            onFlushData={this.props.onDeleteDetailsData}
                            allGenres={genres.data}
                            onSimilarMovies={(id:number)=>this.props.onSimilarMovies(id)} 
                            onMovieRecommendations={(id:number)=>this.props.onMovieRecommendations(id)} 
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
    details: state.details,
    recommendations:state.recommendations,
    similar:state.similar
});

const mapDispatchToProps = (dispatch: any) => ({
    onRequestMovie: (page:number)=>fetchMovies(dispatch, page)(),
    onRequestGenre: fetchGenres(dispatch),
    onDeleteDetailsData:flushDetailsData(dispatch),
    onNewSelectedMovieDetails:(id:number)=>fetchMovieDetails(dispatch, id)(),
    onMovieRecommendations:(id:number)=>fetchMovieRecommendations(dispatch, id)(),
    onSimilarMovies:(id:number)=>fetchSimilarMovies(dispatch, id)(),
    onSearchMovie:(query:string, page:number)=>searchMovies(dispatch, query, page)()
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
