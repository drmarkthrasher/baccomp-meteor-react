import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';
import axios from 'axios';
import { Geolocation } from 'meteor/mdg:geolocation';

import BarFinderListItem from './BarFinderListItem';
import history from '../../routes/history';


var latlng=Geolocation.latLng();

class BarFinderList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: 'liquor,bar',
            latitude:'',
            longitude:'',
            locations: []
        }
    }

    
    componentWillMount() {

        //This will run everytime the latlng changes
        Tracker.autorun(() => {
            //navigator.geolocation.getCurrentPosition(console.log);
            latlng=Geolocation.latLng();
            if(latlng) {
                console.log("The updated position is "+latlng.lat+" "+latlng.lng);
                this.setState({
                    latitude: latlng.lat,
                    longitude: latlng.lng
                })
            }else {
                console.log("No position determined yet");
            }             
            });
        
    }

    showLocation() {

        const config = {
            headers: {'Authorization': 'Bearer PFkk7Dbv-6ma8eS3_tV2yCbI8_MlyFTFACSzn0lX4oyjKG5sDc8X0qcwY4vGZxU1T-Rjkow3EG1DsJg49U3WEjWUTWWrP_5hPglhtT4dfsiXJ_2ItkdH8GiRXQlVW3Yx'
                },
            params: {
                term:this.state.term,
                // location: 'bowling green, ky',
                latitude: this.state.latitude,
                longitude: this.state.longitude,
            }
        };
        
  
        if(latlng){
            axios.get('https://cors-anywhere.herokuapp.com/'+'https://api.yelp.com/v3/businesses/search?', config)
            .then(response => {
                console.log(response.data.businesses);
                this.setState({ locations: response.data.businesses })
            });
        }
        

    }

    renderBarFinderListItems() {
        if(this.state.locations.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No Locations Found</p>
                </div>
            )
        }

        return this.state.locations.map((location) => {
            return <BarFinderListItem key={location.id} {...location}/>
        })
    }
    

    render() {
        return (
            <div>
                <button className="btn info" onClick={this.showLocation.bind(this)}>Show Location</button>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderBarFinderListItems()}
                </FlipMove>
            </div>
        );
    }
}

export default BarFinderList;