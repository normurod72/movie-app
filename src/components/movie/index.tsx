import * as React from 'react';
import { Container} from 'react-grid-system';
import { Pagination } from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

import MovieCard from '../movie_card';
import './index.less';

export interface Props {
    movies: any,
    genres: any,
    title:string,
    onNewPageRequest:any
};

class Movie extends React.Component<Props> {

    renderMovies(movies: any[]) {
        return movies.map((movie: any, key:number) =>
            <ReactCSSTransitionGroup
                key={movie.id+key}
                transitionName="example"
                transitionEnterTimeout={1500}
                transitionLeaveTimeout={300}>
                <MovieCard loading={false}  movie={movie} genres={this.props.genres.data} />
                
            </ReactCSSTransitionGroup>
            
        );
    }

    onChange=(pageNumber:number)=> {        
        this.props.onNewPageRequest(pageNumber);
    }

    render() {
        const { movies, title } = this.props;
        console.log(movies);
        
        return (
            <div className="movie">
                <Container fluid={true}>
                    <h2>{title}</h2>
                </Container>
                <div className="movie-grid">
                    <Container fluid={true}>
                        {   
                            movies.data.length !== 0 && 
                            this.renderMovies(movies.data)
                        }
                        {
                            movies.fetching && 
                            <React.Fragment>
                                <MovieCard loading={true} movie={null} genres={[]} />
                                <MovieCard loading={true} movie={null} genres={[]} />
                                <MovieCard loading={true} movie={null} genres={[]} />
                            </React.Fragment>
                        }
                    </Container>
                </div>
                <div className="pagination-container">
                    {
                        movies.data.length !== 0 && 
                        <Pagination 
                            hideOnSinglePage={true}
                            showQuickJumper={true} 
                            defaultCurrent={1}  
                            current={movies.page}  
                            total={movies.total_pages*10} 
                            onChange={this.onChange} />
                    }
                </div>
                
                {movies.error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
            </div>
        );
    }
}


export default Movie;