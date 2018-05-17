import React, { Component } from 'react';

import AddDrink from './AddDrink';
import DrinksList from './DrinksList';
import MainNavigationBar from '../MainNavigationBar';
import DrinksListFilters from './DrinksListFilters';
import DrinksDateFilter from './DrinksDateFilter';

class DrinksMain extends Component {
    render() {
        return (
            <div className="page-content">
                <MainNavigationBar title="Drink Page"/>
                <div className="page-content">

                    <h2 className="addspaceabovex2"></h2>
                    <AddDrink/>
                    <DrinksListFilters/>
                    <DrinksDateFilter/>
                    <DrinksList/>

                </div>

                

            </div>
        );
    }
}

export default DrinksMain;