import React, { Component } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import history from '../../routes/history';
import 'react-datepicker/dist/react-datepicker.css';

const divStyle={
    margin: '50px'
};

class AddDrink extends Component {
    constructor(props){
        super(props);

        var m = moment();

    }

    componentDidMount() {
    

    }

    componentWillMount() {
        Modal.setAppElement('body');  //this added to make some warning go away??
    }

    handleNewDrink() {

        history.push('./adddrinkdetails');

     }

     

     handleBackButton() {
        history.push('/dashboard');
    }

    handleFavorites() {
        history.push('/favoritesmain');
    }
    
    render() {
        return (
            <div className="page-content">

                <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>

                <button className="btn info" onClick={this.handleNewDrink.bind(this)}>Add Drink</button>
            
                <button className="btn info" onClick={this.handleFavorites.bind(this)}>Favorites</button>
            </div>
        );
    }
}

export default AddDrink;