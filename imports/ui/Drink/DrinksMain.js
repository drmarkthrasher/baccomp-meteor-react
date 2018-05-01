import React, { Component } from 'react';

import AddDrink from './AddDrink';
import MainNavigationBar from '../MainNavigationBar';

class DrinksMain extends Component {
    render() {
        return (
            <div>
                <MainNavigationBar title="Drink Page"/>
                <div className="page-content">

                    <AddDrink/>
                    
                </div>

                

            </div>
        );
    }
}

export default DrinksMain;