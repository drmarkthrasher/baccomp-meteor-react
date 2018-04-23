import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { URLSearchParams } from 'url';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import 'antd/dist/antd.css';  //required for formatting to work
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText} from 'material-ui/Form';

import theme from '../../client/styles/material-ui-theme';
import history from '../../routes/history';

const queryString = require('query-string');
const { TextArea } = Input;
const FormItem = Form.Item;





class DriverDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'Anonymous',
            height: '',
            weight: '',
            raceTeam: '',
            raceTeamWebsite: '',
            suit: '',
            shoes: '',
            gloves: '',
            helmet: '',
            hans: '',
            personalNotes: ''
        }

       //this gets the item id from the search string
        const parsed = queryString.parse(this.props.location.search);
        id = parsed.id;

        
    }

    
    componentWillMount() {
        console.log('Prior to mount');
        
        

    }
    
       
    componentDidMount() {
        Meteor.call('drivers.retreive', id, function(error,result){
            document.getElementById('name').value=result.name;
            document.getElementById('height').value=result.height;
            document.getElementById('weight').value=result.weight;
            document.getElementById('raceTeam').value=result.raceTeam;
            document.getElementById('raceTeamWebsite').value=result.raceTeamWebsite;
            document.getElementById('suit').value=result.suit;
            document.getElementById('shoes').value=result.shoes;
            document.getElementById('gloves').value=result.gloves;
            document.getElementById('helmet').value=result.helmet;
            document.getElementById('hans').value=result.hans;
            document.getElementById('personalNotes').value=result.personalNotes;  
        })   
        
    }


    handleChange = (e) => {
       
       this.setState({ name: document.getElementById('name').value,
                    height: document.getElementById('height').value,
                    weight: document.getElementById('weight').value,
                    raceTeam: document.getElementById('raceTeam').value,
                    raceTeamWebsite: document.getElementById('raceTeamWebsite').value,
                    suit: document.getElementById('suit').value,
                    shoes: document.getElementById('shoes').value,
                    gloves: document.getElementById('gloves').value,
                    helmet: document.getElementById('helmet').value,
                    hans: document.getElementById('hans').value,
                    personalNotes: document.getElementById('personalNotes').value    
                });
       
    }
    
    onSubmit(e) {
        e.preventDefault();

        const name=document.getElementById('name').value;
        const height=document.getElementById('height').value;
        const weight=document.getElementById('weight').value;
        const raceTeam=document.getElementById('raceTeam').value;
        const raceTeamWebsite=document.getElementById('raceTeamWebsite').value;
        const suit=document.getElementById('suit').value;
        const shoes=document.getElementById('shoes').value;
        const gloves=document.getElementById('gloves').value;
        const helmet=document.getElementById('helmet').value;
        const hans=document.getElementById('hans').value;
        const personalNotes=document.getElementById('personalNotes').value;

       Meteor.call('drivers.save', id, name, height, weight, raceTeam, raceTeamWebsite,
            suit, shoes, gloves, helmet, hans, personalNotes, function(error,result){
        })   
    }


    render() {
        return (
            
                <div className="screenbackground">

                    <div className="form-section">
                        <label>Driver's Name</label>
                        <textarea className='autoExpand form-input' rows='2' data-min-rows='2' 
                        id="name"
                        placeholder=''
                        onChange={this.handleChange}
                        value={this.state.name}></textarea>

                    </div>

                    <h2 className="form-section_title">Personal Informaton</h2>
                    <div className="form-section">
                        <label>Height</label>
                        <textarea className='autoExpand form-input' rows='2' data-min-rows='2'
                            id="height" 
                            placeholder=''
                            onChange={this.handleChange}
                            value={this.state.height}>
                        </textarea>

                        <label>Weight</label>
                        <textarea className='autoExpand form-input' rows='2' data-min-rows='2' 
                            id="weight"
                            placeholder=''
                            onChange={this.handleChange}
                            value={this.state.weight}>
                        </textarea>

                        <label>Race Team</label>
                        <textarea className='autoExpand form-input' rows='2' data-min-rows='2' 
                            id="raceTeam"
                            placeholder=''
                            onChange={this.handleChange}
                            value={this.state.raceTeam}>
                        </textarea>

                        <label>Race Team Website</label>
                        <textarea className='autoExpand form-input' rows='2' data-min-rows='2' 
                            id="raceTeamWebsite"
                            placeholder=''
                            onChange={this.handleChange}
                            value={this.state.raceTeamWebsite}>
                        </textarea>
                    </div>

                    <h2 className="form-section_title">Equipment</h2>
                    <div className="form-section">
                        <label>Suit</label>
                        <textarea className='autoExpand form-input' rows='2' data-min-rows='2' 
                            id="suit"
                            placeholder=''
                            onChange={this.handleChange}
                            value={this.state.suit}>
                        </textarea>

                        <label>Shoes</label>
                        <textarea className='autoExpand form-input' rows='2' data-min-rows='2' 
                            id="shoes"
                            placeholder=''
                            onChange={this.handleChange}
                            value={this.state.shoes}>
                        </textarea>

                        <label>Gloves</label>
                        <textarea className='autoExpand form-input' rows='2' data-min-rows='2'
                            id="gloves"
                            placeholder=''
                            onChange={this.handleChange}
                            value={this.state.gloves}>
                        </textarea>

                        <label>Helmet</label>
                        <textarea className='autoExpand form-input' rows='2' data-min-rows='2' 
                            id="helmet"
                            placeholder=''
                            onChange={this.handleChange}
                            value={this.state.helmet}>
                        </textarea>

                        <label>HANS</label>
                        <textarea className='autoExpand form-input' rows='2' data-min-rows='2' 
                            id="hans"
                            placeholder=''
                            onChange={this.handleChange}
                            value={this.state.hans}>
                        </textarea>
                    </div>

                    <h2 className="form-section_title">General</h2>
                    <div className="form-section">
                        <label>Personal Notes</label>
                        <textarea className='autoExpand form-input' rows='5' data-min-rows='5' 
                            id="personalNotes"
                            placeholder=''
                            onChange={this.handleChange}
                            value={this.state.personalNotes}>
                        </textarea>
                    </div>

   
                    
                <button style={{margin: 20}} className="button"
                onClick={this.onSubmit}>Save Data</button>

                </div>
        
        );
    }
}


export default DriverDetails;