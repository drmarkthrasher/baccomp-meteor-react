import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import { Cocktails } from '../../api/cocktails';
import CocktailsListItem from './CocktailsListItem';

class CocktailsList extends Component {
    constructor(props){
        super(props);

        this.state = {
            cocktails: []
        }
    }

    componentDidMount() {
        this.cocktailsTracker = Tracker.autorun(() => {
            Meteor.subscribe('cocktails');
            const cocktails = Cocktails.find({}).fetch();
            this.setState({ cocktails });
          })
    }

    componentWillUnmount() {
        this.cocktailsTracker.stop();
    }

    renderCocktailsListItems() {
        if(this.state.cocktails.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No Cocktails Found</p>
                </div>
            )
        }
        return this.state.cocktails.map((cocktail) => {

            return <CocktailsListItem key={cocktail._id} {...cocktail}/>
                
        })
    }


    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                {this.renderCocktailsListItems()}
                </FlipMove>
            </div>
        );
    }
}

export default CocktailsList;