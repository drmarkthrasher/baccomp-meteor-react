import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';
import moment from 'moment';

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

            var currenttime=moment();

            var m=moment();
                var day=drink.day;
                var month=drink.month;
                var year=drink.year;
                var hour=drink.hour;
                var minute=drink.minute;
                m.set({date:day,month:month,year:year,hour:hour,minute:minute})               
                //hours ago
                var timelapsed=moment.duration(currenttime-m)/1000/60/60;

            if(Session.get('drinkDateFilter')=="All"){
                return <DrinksListItem key={drink._id} {...drink}/>
            }else if(Session.get('drinkDateFilter')=="Last Week"){
                if(timelapsed<168){
                    return <DrinksListItem key={drink._id} {...drink}/>
                }
            }else if(Session.get('drinkDateFilter')=="Last Day"){
                if(timelapsed<24){
                    return <DrinksListItem key={drink._id} {...drink}/>
                }
            }else if(Session.get('drinkDateFilter')=="Last 12 hours"){
                if(timelapsed<12){
                    return <DrinksListItem key={drink._id} {...drink}/>
                }
            }else if(Session.get('drinkDateFilter')=="Last 6 hours"){
                if(timelapsed<6){
                    return <DrinksListItem key={drink._id} {...drink}/>
                }
            }
                
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