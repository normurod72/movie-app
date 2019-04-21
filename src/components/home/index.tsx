import * as React from 'react';

import Search from '../search';
import Movie from '../movie';
import AppHeader from '../app_header';
import BackdropWrapper from '../backdrop_wrapper';
import {API_IMG_URL,API_IMG_BACKDROP_SIZE,HOME_BACKDROP_IMG} from '../../api.conf.json';

import './index.less';

interface Props { 
    movies: any, 
    genres:any, 
    onPopularMovies:any, 
    onSearch:any, 
    onNewPageRequest:any, 
    type:string,
    searchQuery:string 
};

class Home extends React.Component<Props>{

    componentWillUnmount(){
        console.log("Going away");
        
    }

    render(){
        const {type, onPopularMovies, onSearch, searchQuery, movies, genres, onNewPageRequest} = this.props;
        return (
            <BackdropWrapper image_path={`${API_IMG_URL}${API_IMG_BACKDROP_SIZE}/${HOME_BACKDROP_IMG}`}>
                <AppHeader 
                    showButton={type==='search'}
                    onPopularMovies={onPopularMovies}
                />
                <Search
                    onSearch={onSearch}
                    query={searchQuery}
                />
                <Movie
                    movies={movies}
                    genres={genres}
                    onNewPageRequest={onNewPageRequest}
                    title={type === 'movie' ? 'Popular Movies' : 'Search Results'}
                />
            </BackdropWrapper>
        );
    }
}

export default Home;