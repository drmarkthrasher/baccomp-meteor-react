import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import history from '../../routes/history';
import { Favorites } from '../../api/favorites';
import FavoritesListItem from './FavoritesListItem';

class FavoritesList extends Component {
    constructor(props){
        super(props);

        this.state = {
           favorites:[]
        }
    }

    componentDidMount() {
        this.favoritesTracker = Tracker.autorun(() => {
            Meteor.subscribe('favorites');
            const favorites = Favorites.find({}).fetch();
            this.setState({ favorites });
          })
    }

    componentWillUnmount() {
        this.favoritesTracker.stop();
    }

    renderFavoritesListItems() {
            if(this.state.favorites.length === 0) {
                return (
                    <div className="item">
                        <p className="item__status-message">No Favorites Found</p>
                    </div>
                )
            }
            return this.state.favorites.map((favorite) => {
                return <FavoritesListItem key={favorite._id} {...favorite}/>
                    
            })
    }

    
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderFavoritesListItems()}
                </FlipMove>
            </div>
        );
    }
}

export default FavoritesList;
