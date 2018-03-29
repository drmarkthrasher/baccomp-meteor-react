import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import history from '../../routes/history';

class DriversListItem extends Component {
  constructor(props) {
    super(props)
  }
  onGoToDetails(e) {
    history.push({
      pathname: '/driverdetails',
      search: `id=${this.props._id}`
    })
  }
  render() {
    return (
      <div className="item">
        <h2>{this.props.name}</h2>
        <p className="item__message">Race Team: {this.props.raceTeam}</p>
        <button className="button button--pill" onClick={this.onGoToDetails.bind(this)}>
          Details
        </button>
        <button className="button button--pill" onClick={() => {
          Meteor.call('drivers.setVisibility', this.props._id, !this.props.visible);
          }}
          >
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
        <button className="button button--pill" onClick={() => {
          Meteor.call('drivers.delete', this.props._id);
          }}
          >
          Delete
        </button>
      </div>
    );
  }
}

export default DriversListItem;
