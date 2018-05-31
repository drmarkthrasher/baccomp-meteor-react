import React, { Component } from 'react';

import AddDrink from './AddDrink';
import DrinksList from './DrinksList';
import MainNavigationBar from '../MainNavigationBar';
import DrinksListFilters from './DrinksListFilters';
import DrinksDateFilter from './DrinksDateFilter';

class DrinksMain extends Component {
    render() {
        return (
            <div >
                
                <div className="page-content">

                    
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