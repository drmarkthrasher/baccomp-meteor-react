import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import history from '../../routes/history';

class DrinksListItem extends Component {
    constructor(props) {
        super(props)
    }

    onGoToDetails(e) {
        history.push({
          pathname: '/drinkdetails',
          search: `id=${this.props._id}`
        })
      }

    render() {
        return (
            <div className="item" className="modal-itembackground">
              <h2 className="primaryfont">{this.props.type}</h2>
              <p className="item__message" className="secondaryfont">Description: {this.props.description}</p>
              <button className="button button--pill" onClick={this.onGoToDetails.bind(this)}>
                Details
              </button>
              <button className="button button--pill" onClick={() => {
                Meteor.call('drinks.setVisibility', this.props._id, !this.props.visible);
                }}
                >
                {this.props.visible ? 'Hide' : 'Unhide'}
              </button>
              <button className="button button--pill" onClick={() => {
                Meteor.call('drinks.delete', this.props._id);
                }}
                >
                Delete
              </button>
            </div>
          );
    }
}

export default DrinksListItem;