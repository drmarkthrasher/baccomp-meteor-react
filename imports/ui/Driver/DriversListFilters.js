import React, { Component } from 'react';
import { Session } from 'meteor/session';

class DriversListFilters extends Component {
    render() {
        return (
            <div>
                <label className="checkbox">
                    <input className="checkbox__box" type="checkbox" onChange={(e) => {
                        Session.set('showVisible', !e.target.checked)
                    }}/>
                        show hidden drivers
                </label>
            </div>
        );
    }
}

export default DriversListFilters;