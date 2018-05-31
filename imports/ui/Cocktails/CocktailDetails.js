import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { URLSearchParams } from 'url';
import PropTypes from 'prop-types';

import history from '../../routes/history';

const queryString = require('query-string');

class CocktailDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            drinkname: '',
            category: '',
            alcohol: '',
            glass: '',
            ingredients: '',
            instructions: '',
            shopping: ''
        }

       //this gets the item id from the search string
        const parsed = queryString.parse(this.props.location.search);
        name = parsed.name;

        
    }

    
    componentDidMount() {
        const self=this;

        Meteor.call('cocktails.retreive', name, function(error,result){

            document.getElementById('lname').innerHTML=result.d_name;
            document.getElementById('lcategory').innerHTML=result.d_cat;
            document.getElementById('lalcohol').innerHTML=result.d_alcohol;
            document.getElementById('lglass').innerHTML=result.d_glass;
            document.getElementById('lingredients').innerHTML=result.d_ingredients;
            document.getElementById('linstructions').innerHTML=result.d_instructions;
            document.getElementById('lshopping').innerHTML=result.d_shopping;
            
            self.setState({
                drinkname: result.d_name,
                category: result.d_cat,
                alcohol: result.d_alcohol,
                glass: result.d_glass,
                ingredients: result.d_ingredients,
                instructions: result.d_instructions,
                shopping: result.d_shopping
            })

        });  
    }

    
    handleBackButton() {
        history.push('/cocktailsmain')
    }



    render() {
        return (
            <div className="page-content">


                <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>

                <div className="form-section">           
                    <h2 className="form-section_title">Drink</h2>
                    <label id="lname" className="secondaryfont"></label>
                </div>

                <div className="form-section">           
                    <h2 className="form-section_title">Category</h2>
                    <label id="lcategory" className="secondaryfont"></label>
                </div>

                <div className="form-section">           
                    <h2 className="form-section_title">Alcoholic</h2>
                    <label id="lalcohol" className="secondaryfont"></label>
                </div>

                <div className="form-section">           
                    <h2 className="form-section_title">Glass</h2>
                    <label id="lglass" className="secondaryfont"></label>
                </div>

                <div className="form-section">           
                    <h2 className="form-section_title">Ingredients</h2>
                    <label id="lingredients" className="secondaryfont"></label>
                </div>

                <div className="form-section">           
                    <h2 className="form-section_title">Instructions</h2>
                    <label id="linstructions" className="secondaryfont"></label>
                </div>

                <div className="form-section">           
                    <h2 className="form-section_title">Shopping</h2>
                    <label id="lshopping" className="secondaryfont"></label>
                </div>



            </div>
        );
    }
}

export default CocktailDetails;
