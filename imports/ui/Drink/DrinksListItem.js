import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import history from '../../routes/history';



class DrinksListItem extends Component {
    constructor(props) {
        super(props)

        this.state={
          hr:0,
          min:0,
          ampm:"am",
          d:1,
          mon:"Jan",
          yr:2000

        }

    }

    
    componentDidMount() {

      var myhr=this.props.hour;
      var ampm="";
      myhr>11 ? ampm="pm" : ampm="am"
      myhr>12 ? myhr=myhr-12 : myhr=myhr

      var mymin=this.props.minute;
      mymin<10 ? mymin="0" + this.props.minute : mymin=this.props.minute;
      
      var mymonth=this.props.month;
      switch(this.props.month) {
        case 0:
          mymonth="Jan";
          break;
        case 1:
          mymonth="Feb";
          break;
        case 2: 
          mymonth="Mar";
          break;
        case 3:
          mymonth="Apr";
          break;
        case 4:
          mymonth="May";
          break;
        case 5:
          mymonth="Jun";
          break;
        case 6:
          mymonth="Jul";
          break;
        case 7:
          mymonth="Aug";
          break;
        case 8:
          mymonth="Sep";
          break;
        case 9:
          mymonth="Oct";
          break;
        case 10:
          mymonth="Nov";
          break;
        case 11:
          mymonth="Dec";
          break;
      }


      this.setState({
        hr:myhr,
        min:mymin,
        ampm: ampm,
        date:this.props.day,
        mon:mymonth,
        year:this.props.year
        
      })
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

              <div className="form-inlineelements2">
                <h2 className="primaryfont">{this.props.type}</h2>
                <p>{this.state.hr}:{this.state.min} {this.state.ampm}</p>
              </div>
              

              <div className="form-inlineelements2">
                <p className="item__message" className="secondaryfont">Description: {this.props.description}</p>
                <p>{this.state.mon} {this.state.date}, {this.state.year}</p>
              </div>
             
              
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