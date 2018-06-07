import React from 'react';
import Header from './Header';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import Favourites from './Favourites';
class App extends React.Component {
  constructor() {
    super();

function saveDataToLocalStorage(data)
	{
	var favouriteList = [];
	favouriteList = JSON.parse(localStorage.getItem('session'));
	favouriteList.push(data);
	localStorage.setItem('session',JSON.stringify(favouriteList));
	}

    this.state = {
      updateMovies: true,
      searchTerm: '',
      page: 1,
      movies: {},
      displayDetails: false,
      movie: {
        Title: "",
        Year: "",
        Rated: "",
        Released: "",
        Runtime: "",
        Genre: "",
        Director: "",
        Writer: "",
        Actors: "",
        Plot: "",
        Language: "",
        Country: "",
        Awards: "",
        Poster: "",
        Ratings: "",
        Metascore: "",
        imdbRating: "",
        imdbVotes: "",
        imdbID: "",
        Type: "",
        totalSeasons: "",
        Response: ""
	},
		showFavourites: false
    }
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onClickMovieCard = this.onClickMovieCard.bind(this);
    //this.fetchDisplayDetails = this.fetchDisplayDetails.bind(this);
    this.onClickRemoveDetails = this.onClickRemoveDetails.bind(this);
	this.showFavourites = this.showFavourites.bind(this);
  }


  onChangeSearch(event) {
    const searchTerm= event.target.value
    if(!this.state.movies.hasOwnProperty(searchTerm) || !this.state.movies[searchTerm].hasOwnProperty(this.state.page)){
    this.fetchAndUpdateMovies(searchTerm,this.state.page)
    }
    this.setState({
      searchTerm: searchTerm
    })
  }

  fetchAndUpdateMovies(searchTerm, page) {
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=80a5ae32`)
      .then((data) => {
        return data.json()
      }).then((json) => {
       this.setState(this.returnUpdatedMovies(json,searchTerm,page))
      })
  }

  returnUpdatedMovies(json,searchTerm,page){
    let updatedMovies = JSON.parse(JSON.stringify(this.state.movies))
    if (json.Response === 'True') {
      if(updatedMovies.hasOwnProperty(searchTerm)){
        updatedMovies[searchTerm][page]= json.Search
      }else{
        updatedMovies[searchTerm]={
          [page]: json.Search
        }
      }
    }else{
      updatedMovies[searchTerm]={
        [page]:null
      }
    }
    return {movies: updatedMovies}
  }


  onClickMovieCard(imdbID) {
	this.setState({
	  page: 0
	})
    this.fetchDisplayDetails(imdbID)
  }


  fetchDisplayDetails(imdbID) {
    fetch(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=80a5ae32`)
      .then((data) => {
        return data.json()
      }).then((json) => {
        if (json.Response !== 'False') {
          this.setState({
            displayDetails: true,
            movie: json
          })
        }
      })
  }

  onClickRemoveDetails() {
    this.setState({
	  page: 1,
      displayDetails: false
    })
  }

  showFavourites(){
	  console.log('click');
	  if(!this.state.showFavourites){
	this.setState({
		showFavourites: true
	  })
  }
  	  else{
	this.setState({
	  	showFavourites: false
	  	  })
	  }
  }

  componentDidMount() {
    this.fetchAndUpdateMovies(this.state.searchTerm, this.state.page);
  }

  render() {
    const details = this.state.displayDetails ?
      <MovieDetails
        movie={this.state.movie}
        onClick={this.onClickRemoveDetails}
      /> : null
      const moviesState = this.state.movies
    const movies = (moviesState.hasOwnProperty(this.state.searchTerm) && moviesState[this.state.searchTerm].hasOwnProperty(this.state.page)) ?
      moviesState[this.state.searchTerm][this.state.page] :
      null;

	  if(this.state.showFavourites===true){
		  return (
			  <div>
				<Header onChange={this.onChangeSearch} searchTerm={this.state.searchTerm} showFavouritesList={this.showFavourites}/>
				<Favourites/>
			  </div>

		  )
	  }
	  else{
		  return(
		  <div>
			<Header onChange={this.onChangeSearch} searchTerm={this.state.searchTerm} showFavouritesList={this.showFavourites}/>
			<MovieList
			  searchTerm={this.state.searchTerm}
			  movies={movies}
			  onClick={this.onClickMovieCard}
			/>
			{details}
		  </div>
	  )
	  }

  //   return (
  //     <div>
  //       <Header onChange={this.onChangeSearch} searchTerm={this.state.searchTerm}/>
  //       <MovieList
  //         searchTerm={this.state.searchTerm}
  //         movies={movies}
  //         onClick={this.onClickMovieCard}
  //       />
  //       {details}
  //     </div>
  //   )
  // }
}
}

export default App;
