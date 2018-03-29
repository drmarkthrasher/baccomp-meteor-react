import React, { Component } from 'react';

import PrivateHeader from '../../ui/PrivateHeader';
import AddDriver from './AddDriver';
import DriversList from './DriversList';
import DriversListFilters from './DriversListFilters';
import MainNavigationBar from '../MainNavigationBar';

class DriverMain extends Component {
    render() {
        return (
            <div>
                <MainNavigationBar title="Driver Page"/>
                <div className="page-content">
                    
                    <AddDriver/>
                    <DriversListFilters/>
                    <DriversList/>
                    
                </div>
                
            </div>
        );
    }
}

export default DriverMain;