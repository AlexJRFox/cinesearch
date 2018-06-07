import React from 'react';
import './style.css';
class MovieDetails extends React.Component {
	constructor(props){
		super(props)
			//this.addToFavourites=this.addToFavourites.bind(this);
	}

	addToFavourites(movie){
		if(localStorage.getItem('movie') === null){
		let a = [];
		// localStorage.setItem('movie', ...JSON.stringify(movie));
		a.push(movie);
		localStorage.setItem('movie', JSON.stringify(a));
	} else {

		let a = JSON.parse(localStorage.getItem('movie'));
		 // Push the new data (whether it be an object or anything else) onto the array
		 a.push(movie);

		 localStorage.setItem('movie', JSON.stringify(a));
		}
	}

    render() {
        const {movie,onClick} = this.props
        return (
            <div className='movie-details'>
                <div className='movie-details-poster'>
                    <img src={movie.Poster}
                        alt={'Poster of movie'+ movie.Title} />
                    </div>
                <div className='movie-details-specs'>Title: {movie.Title}
					<p>Year: {movie.Year}</p>
				</div>
                <div className='movie-details-plot'>Plot: {movie.Plot}</div>
				<p><button className='favourites' onClick={()=>{this.addToFavourites(movie)}}>Add to favourites</button></p>
                <p><button onClick={onClick}>Close</button></p>
            </div>
        )
    }
}

export default MovieDetails;
