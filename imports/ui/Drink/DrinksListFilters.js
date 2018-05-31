import React, { Component } from 'react';
import { Session } from 'meteor/session';

class DrinksListFilters extends Component {
    render() {
        return (
            <div className="page-content">
            
                <label className="checkbox">
                    <input className="checkbox__box" type="checkbox" onChange={(e) => {
                        Session.set('showVisible', !e.target.checked)
                    }}/>
                        show hidden drinks
                </label>
            </div>
        );
    }
}

export default DrinksListFilters;
