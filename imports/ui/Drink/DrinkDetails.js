import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { URLSearchParams } from 'url';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import history from '../../routes/history';

const queryString = require('query-string');

class DrinkDetails extends Component {
    constructor(props) {
        super(props);

        var m = moment();

        this.state = {
            type: 'Beer',
            description: '',
            volume: '',
            alcohol: '',
            day: m.date(),
            month: m.month(),
            year: m.year(),
            hour: m.hour(),
            minute: m.minute(),
            date: moment(),
            time: moment()
        }

       //this gets the item id from the search string
        const parsed = queryString.parse(this.props.location.search);
        id = parsed.id;

        
    }

    componentWillMount() {

        

        
    }
    
       
    componentDidMount() {

        const self=this;

        Meteor.call('drinks.retreive', id, function(error,result){

            
            document.getElementById('type').value=result.type;
    
            Session.set("day", result.day);
            Session.set("month",result.month);
            Session.set("year", result.year);
            Session.set("hour", result.hour);
            Session.set("minute", result.minute);

            var m=moment();
            m.set({date:Session.get('day'),month:Session.get('month'),year:Session.get('year')});
            m.set({hour:Session.get('hour'),minute:Session.get('minute')});
            
            self.setState({
                type: result.type,
                description: result.description,
                volume: result.volume,
                alcohol: result.alcohol,
                date: m,
                time: m
            })

        });  
            
        
        
    }

    handleChange() {

        //this is for change in the input fields
        this.setState({
            type: document.getElementById('type').value,
            description: document.getElementById('description').value,
            volume: document.getElementById('volume').value,
            alcohol: document.getElementById('alcohol').value
        })
    }

    onDateChange(date) {
        
        var m=moment();
        m.set({date:date.date(),month:date.month(),year:date.year()})
        // var d= new Date();
        // d.setDate(date.date());
        // d.setMonth(date.date());
        // d.setFullYear(date.date());
        this.setState({
            date: m,
            day: date.date(),
            month: date.month(),
            year: date.year()
        })

        Session.set("day", date.date());
        Session.set("month",date.month());
        Session.set("year", date.year());

        
     }

     onTimeChange(time) {

         var m=moment();
         m.set({hour:time.hour(),minute:time.minute()})
         this.setState({
            time: m,
            hour: time.hour(),
            minute: time.minute()
         })

         Session.set("hour", time.hour());
         Session.set("minute",time.minute());
     }

     onSubmit(e) {
        e.preventDefault();

        console.log("Submit is being called");

        const type=document.getElementById('type').value;
        const description=document.getElementById('description').value;
        const volume=document.getElementById('volume').value;
        const alcohol=document.getElementById('alcohol').value;
        const day = Session.get("day");
        const month = Session.get("month");
        const year = Session.get("year");
        const hour = Session.get("hour");
        const minute = Session.get("minute");
        // const day = this.state.day;
        // const month= this.state.month;
        // const year = this.state.year;
        // const hour = this.state.hour;
        // const minute = this.state.minute;

       Meteor.call('drinks.save', id, type, description, volume, alcohol, day,
            month, year, hour, minute, function(error,result){
        })   

        history.push('/drinksmain');
    }



    render() {
        return (
            <div className="modal-input">
                    
                    
                        <select id="type" 
                                style={{marginBottom: 40}} 
                                className="form-input"
                                onChange={this.handleChange.bind(this)}>
                            <option value="Beer">Beer</option>
                            <option value="Light Beer">Light Beer</option>
                            <option value="Wine">Wine</option>
                            <option value="Whiskey Shot">Whiskey Shot</option>
                            <option value="Cocktail">Cocktail</option>
                        </select>

                        <div>
                            <label className="primaryfont">Description</label>
                            <input className='autoExpand form-input' rows='1' data-min-rows='1'
                                id="description" 
                                placeholder=''
                                onChange={this.handleChange.bind(this)}
                                value={this.state.description}>
                            </input>
                        </div>
                        
                            <label className="primaryfont">Volume (oz)</label>
                            <input className='autoExpand form-input' rows='2' data-min-rows='2'
                                id="volume" 
                                placeholder=''
                                onChange={this.handleChange.bind(this)}
                                value={this.state.volume}>
                            </input>
                        
                            <label className="primaryfont">Alcohol Content (%)</label>
                            <input className='autoExpand form-input' rows='2' data-min-rows='2'
                                id="alcohol" 
                                placeholder=''
                                onChange={this.handleChange.bind(this)}
                                value={this.state.alcohol}>
                            </input>

                            <h1 className="addspaceabove"></h1>
                        
                            <div className="form-inlineelements" >
                                <label className="primaryfont">Date</label>          
                                <DatePicker onChange={this.onDateChange.bind(this)} 
                                    selected={this.state.date}></DatePicker>                                               
                            </div>

                            <div className="form-inlineelements">
                                <label className="primaryfont">Time</label>
                                <TimePicker
                                    value={this.state.time}
                                    onChange={this.onTimeChange.bind(this)}
                                    showSecond={false}
                                    use12Hours/>  
                            </div>
                        

                        <button className="button"
                        onClick={this.onSubmit}>Save</button>
                    
                    </div>
                    

        );
    }
}

export default DrinkDetails;