import React from 'react';
import './style.css';

class MovieCard extends React.Component {
    constructor(){
        super();
        this.clickHandler= this.clickHandler.bind(this);
    }
    clickHandler(event){
        event.preventDefault();
        this.props.onClick(this.props.movie.imdbID);
    }
    render() {
        const {movie} = this.props;
        return (
            <div className='movie-card' onClick={this.clickHandler} >
                <div className='image-wrapper'>
                    <img className='movie-image' src={movie.Poster}/>
                </div>
                <div className='movie-card-details'>
                    <p>Title: {movie.Title}</p>
                    <p>Year: {movie.Year}</p>
                </div>
            </div>
        )
    }
}
export default MovieCard;
