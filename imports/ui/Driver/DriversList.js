import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import { Drivers } from '../../api/drivers';
import DriversListItem from './DriversListItem';
import { Session } from 'meteor/session';


class DriversList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drivers: []
        }
    }
    componentDidMount() {
        this.driversTracker = Tracker.autorun(() => {
            Meteor.subscribe('drivers');
            const drivers = Drivers.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({ drivers });
          })
    }
    componentWillUnmount() {
        this.driversTracker.stop();
    }
    renderDriversListItems() {
        if(this.state.drivers.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No Drivers Found</p>
                </div>
            )
        }
        return this.state.drivers.map((driver) => {
            return <DriversListItem key={driver._id} {...driver}/>
        })
    }
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderDriversListItems()}
                </FlipMove>
            </div>
        );
    }
}

export default DriversList;