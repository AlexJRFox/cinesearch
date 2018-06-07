import React from 'react';
import './style.css';

class Header extends React.Component{
    render(){
        const {onChange, searchTerm, showFavouritesList} = this.props;
        return(
            <header>
                <h1 className='logo'>CINESEARCH</h1>
				<h3>The Cinema Resource</h3>
                <form>
                 <input type='text' placeholder='Search Movie' onChange={onChange} value={searchTerm}/>
                </form>
				<p><button className='favourites' onClick={showFavouritesList}>Favourites</button></p>
            </header>
        )
    }
}

export default Header;
