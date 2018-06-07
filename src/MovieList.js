import React from 'react';
import MovieCard from './MovieCard';
import './style.css';
class MovieList extends React.Component{

    loopMovies(){
        return (
        this.props.movies.map(movie=>{
            return <MovieCard movie={movie} onClick={this.props.onClick} key={movie.imdbID}/>
        })
        )
    }
    render(){

        const movies = this.props.movies ? this.loopMovies() : '';
        return(
            <div className='movie-list'>
                {/* <p id='search-text'>For search term {searchTerm}:</p> */}
                <div className='movie-cards'>
                    {movies}
                </div>
            </div>
        )
    }
}

export default MovieList;
