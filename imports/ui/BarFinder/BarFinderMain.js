import React, { Component } from 'react';
import axios from 'axios';
import { Geolocation } from 'meteor/mdg:geolocation';

import history from '../../routes/history';
import BarFinderList from './BarFinderList';

class BarFinderMain extends Component {

    handleBackButton() {
        history.push('/dashboard');
    }

    render() {
        return (
            <div>
                <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>
                
                <BarFinderList/>
                
            </div>
        );
    }
}

export default BarFinderMain;