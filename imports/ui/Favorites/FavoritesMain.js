import React, { Component } from 'react';

import history from '../../routes/history';
import FavoritesList from './FavoritesList';

class FavoritesMain extends Component {
    constructor(props){
        super(props);

        this.state = {
           
        }
    }

    handleBackButton() {
        history.push('/drinksmain');
    }

    handleNewFavorite() {
        history.push('/addfavoritedetails');
    }


    render() {
        return (
            <div>
                <div className="page-content">
                
                    <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>

                    <button className="btn info" onClick={this.handleNewFavorite.bind(this)}>New</button>

                    <FavoritesList/>
                    
                </div>
            </div>
        );
    }
}

export default FavoritesMain;