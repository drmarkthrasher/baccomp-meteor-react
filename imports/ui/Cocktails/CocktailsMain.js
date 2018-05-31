import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Cocktails } from '../../api/cocktails';
import CocktailsList from './CocktailsList';

class CocktailsMain extends Component {
    constructor(props){
        super(props);

        
    }

    componentDidMount() {

    }
   
    render() {
        return (
            <div>
            
                <CocktailsList/>

            </div>
        );
    }
}

export default CocktailsMain;
