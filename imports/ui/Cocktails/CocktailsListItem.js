import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import history from '../../routes/history';

class CocktailsListItem extends Component {
    constructor(props) {
        super(props)

        this.state={
          description: "nothing"
        }

    }

    onGoToDetails(e) {
        // history.push({
        //   pathname: '/drinkdetails',
        //   search: `id=${this.props._id}`
        // })
      }


    render() {
        return (
            <div>

                <div className="item" className="modal-itembackground">
                    <h2 className="primaryfont">{this.props.d_name}</h2>
                    <p className="secondaryfont">{this.props.d_cat}</p>  
                    
                    <button className="button button--pill" onClick={this.onGoToDetails.bind(this)}>
                        Details
                    </button>
                </div>
            </div>
        );
    }
}

export default CocktailsListItem;
