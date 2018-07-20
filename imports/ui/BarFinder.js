import React, { Component } from 'react';

import history from '../routes/history';

class BarFinder extends Component {
    constructor(props) {
        super(props);

        this.state = {
              
        }

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