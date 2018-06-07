import React from 'react'
class Favourites extends React.Component {
	constructor(props){
		super(props)
			this.removeFavs=this.removeFavs.bind(this);
	}
	componentDidMount(){
		var retrievedObject = localStorage.getItem('movie');
			if(retrievedObject === null){
				console.log('No favourites yet!!!');
			}
			// else {
			// 	JSON.parse(retrievedObject).map(movie=>{
			// 		{movie}
			// 	})
			// }
	}

	removeFavs(Title){
		let storageObject = localStorage.getItem('movie');
		let movieObject = JSON.parse(storageObject);
		let indexMovie = movieObject.find(function(element){
			return element.Title === Title
		})
		let movieIndex = movieObject.indexOf(indexMovie);
		movieObject.splice(movieIndex,1);
		localStorage.setItem('movie', JSON.stringify(movieObject));
		this.forceUpdate();
	}


    render() {
		var retrievedObject = localStorage.getItem('movie');
        const movie = JSON.parse(retrievedObject);
		console.log(movie);
        return (
			<div>
            {movie.map((movie, i)=>{
		       return <div className='movie-details' key={i}>
                <div className='movie-details-poster'>
                    <img src={movie.Poster}
                        alt={'Poster of movie'+ movie.Title} />
                    </div>
                <div className='movie-details-specs'>Title: {movie.Title}
					<p>Year: {movie.Year}</p>
				</div>
                <div className='movie-details-plot'>Plot: {movie.Plot}</div>
				<div><button onClick={()=>{this.removeFavs(movie.Title)}}>Remove from Favourites</button></div>
            </div> })}
		</div>
        )
    }
}

export default Favourites;
