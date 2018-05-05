import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import { Drinks } from '../../api/drinks';
import DrinksListItem from './DrinksListItem';
import { Session } from 'meteor/session';

class DrinksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: []
        }
    }

    componentDidMount() {
        this.drinksTracker = Tracker.autorun(() => {
            Meteor.subscribe('drinks');
            const drinks = Drinks.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({ drinks });
          })
    }

    componentWillUnmount() {
        this.drinksTracker.stop();
    }

    renderDrinksListItems() {
        if(this.state.drinks.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No Drinks Found</p>
                </div>
            )
        }
        return this.state.drinks.map((drink) => {
            return <DrinksListItem key={drink._id} {...drink}/>
        })
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderDrinksListItems()}
                </FlipMove>
            </div>
        );
    }
}

export default DrinksList;