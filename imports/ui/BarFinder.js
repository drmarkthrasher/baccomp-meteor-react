import React, { Component } from 'react';
import axios from 'axios';
import { Geolocation } from 'meteor/mdg:geolocation';

import history from '../routes/history';


const config = {
    headers: {'Authorization': 'Bearer PFkk7Dbv-6ma8eS3_tV2yCbI8_MlyFTFACSzn0lX4oyjKG5sDc8X0qcwY4vGZxU1T-Rjkow3EG1DsJg49U3WEjWUTWWrP_5hPglhtT4dfsiXJ_2ItkdH8GiRXQlVW3Yx'
        },
    params: {
        term:'liquor',
        location: 'bowling green, ky',
        // latitude: 36.9116944,
        // longitude: -86.45135909999,
    }
};

var latlng=Geolocation.latLng();

class BarFinder extends Component {

    constructor(props) {
        super(props);


        this.state = {
              latlng: Geolocation.latLng()
        }

        
    }

    
    componentWillMount() {

        var latlng=Geolocation.latLng();
        console.log(latlng);

        axios.get('https://cors-anywhere.herokuapp.com/'+'https://api.yelp.com/v3/businesses/search', config)
        .then(response => console.log(response.data.businesses));
        
    }
    

    handleBackButton() {
        history.push('/dashboard');
    }

    render() {
        return (
            <div className="page-content">
                <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>

                <h1 className="primaryfont">This page will utilize Google Maps to find bars/liquor stores</h1>
            </div>
        );
    }
}

export default BarFinder;