import * as React from 'react';
import './index.less';
import { connect } from "react-redux";
import {fetchMovies} from '../../redux/actions/fetch_movie';
export interface Props{fetching:boolean, movies:any[], onRequestMovie:any, error:any};

class Movie extends React.Component<Props> {
  
  componentWillMount(){
    this.props.onRequestMovie();
  }

  render() {
    const { fetching, movies, error } = this.props;
    if(!fetching&&movies!==null){
      console.log(movies);
    }
    return (
      <div className="App">     

        {fetching ? (
          "Fetching data..."
        ) : (
          <div className="movie">
              <h2>Movies list</h2>
              <div>
              {movies.map((movie:any)=><div key={movie.id}><h4>{movie.original_title}</h4><p>{movie.overview}</p></div>)}
              </div>
          </div>
        )}

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

      </div>
    );
  }
}

const mapStateToProps = (state:any) => ({
    fetching: state.movies.fetching,
    movies: state.movies.data||[],
    error: state.movies.error
});

const mapDispatchToProps = (dispatch:any) => ({
    onRequestMovie: fetchMovies(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);