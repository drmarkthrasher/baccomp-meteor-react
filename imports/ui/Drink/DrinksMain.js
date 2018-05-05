import React, { Component } from 'react';

import AddDrink from './AddDrink';
import DrinksList from './DrinksList';
import MainNavigationBar from '../MainNavigationBar';
import DrinksListFilters from './DrinksListFilters';

class DrinksMain extends Component {
    render() {
        return (
            <div>
                <MainNavigationBar title="Drink Page"/>
                <div className="page-content">

                    <h2 className="addspaceabovex2"></h2>
                    <AddDrink/>
                    <DrinksListFilters/>
                    <DrinksList/>

                </div>

                

            </div>
        );
    }
}

export default DrinksMain;