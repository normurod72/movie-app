import * as React from 'react';
import EventListener, { withOptions } from 'react-event-listener';
import { BackTop, Icon } from 'antd';

import Search from '../search';
import Movie from '../movie';
import AppHeader from '../app_header';
import BackdropWrapper from '../backdrop_wrapper';

import './index.less';

interface Props { movies: any, genres:any, onPopularMovies:any, onSearch:any, onScroll:any };

const Home: React.FC<Props> = ({ movies, genres, onPopularMovies, onSearch, onScroll }: Props) => (
    <BackdropWrapper image_path={"http://image.tmdb.org/t/p/original/bi4jh0Kt0uuZGsGJoUUfqmbrjQg.jpg"}>
        <AppHeader 
            showButton={movies.type==='search'}
            onPopularMovies={onPopularMovies}
        />
        <Search
            onSearch={onSearch}
        />
        <Movie
            movies={movies}
            genres={genres}
            title={movies.type === 'movie' ? 'Popular Movies' : 'Search Results'}
        />
        <EventListener
            target="window"
            onScroll={withOptions(onScroll, { passive: true, capture: false })}
        />
        <BackTop>
            <div className="ant-back-top-inner">
                <Icon type="arrow-up" />
            </div>
        </BackTop>
    </BackdropWrapper>
);

export default Home;