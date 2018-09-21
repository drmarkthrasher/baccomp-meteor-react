import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import history from '../../routes/history';

class FavoritesListItem extends Component {
    constructor(props) {
        super(props)

        this.state={
            
        }

    }

    onGoToDetails(e) {
        history.push({
          pathname: '/favoritedetails',
          search: `id=${this.props._id}`
        })
      }

    handleDelete(e) {
        Meteor.call('favorites.delete', this.props._id);
    }

    handleCreateDrink(e) {
        var m = moment();
        day=m.date();
        month=m.month();
        year=m.year();
        hour=m.hour();
        minute=m.minute();

        const date = new Date();
        date.setDate(day);
        date.setMonth(month);
        date.setFullYear(year);
        date.setHours(hour);
        date.setMinutes(minute);

        var type=this.props.type;
        var description=this.props.description;
        var volume=this.props.volume;
        var alcohol=this.props.alcohol;

        Meteor.call('drinks.insert', type, description, volume, alcohol, 
        day, month, year, hour, minute,date,(err, res) => {
            if(!err) {
                history.push('/drinksmain');
                // this.handleModalClose();
            } else {
                this.setState({ error: err.reason });
            }
        });

    }


    render() {
        return (
            <div className="item" className="modal-itembackground">

              <div className="form-inlineelements2">
                <h2 className="primaryfont">{this.props.type}</h2>
              </div>
              

              <div className="form-inlineelements2">
                <p className="item__message" className="secondaryfont">Description: {this.props.description}</p>
              </div>
             
              
              <button className="button button--pill" onClick={this.onGoToDetails.bind(this)}>Details</button>
              <button className="button button--pill" onClick={this.handleDelete.bind(this)}>UnFavorite</button>
            
              <button className="button button--pill" onClick={this.handleCreateDrink.bind(this)}>Create Drink</button>
            


            </div>
        );
    }
}

export default FavoritesListItem;