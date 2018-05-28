import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';


import CocktailsList from './CocktailsList';

class CocktailsMain extends Component {
    constructor(props){
        super(props);

        this.state = {
            description: "nothing"
        }
    }
    

   

    handleChange() {

    }

    render() {
        return (
            <div>
                <p>Home page for cocktails</p>

                <input className='autoExpand form-input' rows='1' data-min-rows='1'
                id="description" 
                placeholder=''
                onChange={this.handleChange.bind(this)}
                value={this.state.description}>
            </input>

           <CocktailsList/>

            </div>
        );
    }
}

export default CocktailsMain;
