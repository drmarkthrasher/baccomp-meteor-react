import React, { Component } from 'react';

import history from '../routes/history';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id:"abc",
            fullname: 'Default',
            gender: 'Male',
            age: 21,
            weight: 200
        }
    }

    componentDidMount() {

        //create profile if it doesn't already exist
        Meteor.call('profiles.find',(err,res) => {
            if(!res) {
                fullname="Default";
                gender="Male";
                age=21;
                weight=200;
                Meteor.call('profiles.insert', fullname, gender, age, weight,(err, res) => {
                    if(!err) {
                        console.log("Profile is inserted");
                        Meteor.call('profiles.find',(err,res) => {
                            this.setState({
                                id: res._id
                            })
                        })
                        
                        
                    } else {
                        console.log("Error on insert is "+err);
                        
                    }
                });
            } else {
                // document.getElementById('fullname').value=res.fullname;               
                // document.getElementById('age').value=res.age;
                // document.getElementById('weight').value=res.weight;

                this.setState ({
                    id:res._id,
                    fullname: res.fullname,
                    gender: res.gender,
                    age: res.age,
                    weight: res.weight
                })
                         
            }
        })
      
    }
    

    handleChange() {

        //this is for change in the input fields
        this.setState({
            fullname: document.getElementById('fullname').value,
            age: document.getElementById('age').value,
            weight: document.getElementById('weight').value
            
            
        })
    }

    handleRadioChange(e) {

        this.setState({
            gender: e.target.value
        })
        
    }

    onSubmit() {
        id=this.state.id,
        fullname=this.state.fullname;
        gender=this.state.gender;
        age=this.state.age;
        weight=this.state.weight;

        Meteor.call('profiles.save', id, fullname, gender, age, weight,
         function(error,result){
        }) 

        history.push('/dashboard');

    }


    handleBackButton() {
        history.push('/dashboard');
    }


    render() {
        return (
            
            <div className="page-content">

            <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>

                <div className="form-section">
                    <h2 className="form-section_title">Personal Information</h2>
                </div>
                
                <div className="form-section">
                    
                        <label>Name</label>
                        <input className='autoExpand form-input' rows='2' data-min-rows='2'
                            id="fullname" 
                            placeholder=''
                            onChange={this.handleChange.bind(this)}
                            value={this.state.fullname}>
                        </input>

                        <br/><br/>
                        <div >
                        <label>Gender:</label>
                        
                        <div className="radiobutton">
                            <li>
                                <label >
                                <input className="radiobutton-text"
                                    type="radio"
                                    value="Male"
                                    checked={this.state.gender === "Male"}
                                    onChange={this.handleRadioChange.bind(this)}/>
                                Male
                                </label>
                            </li>
                            <li>
                                <label>
                                <input
                                    type="radio"
                                    value="Female"
                                    checked={this.state.gender === "Female"}
                                    onChange={this.handleRadioChange.bind(this)}/>
                                Female
                                </label>
                            </li>
                        </div>
                        
                        </div> 

                        <label>Age</label>
                        <input type="number" className='autoExpand form-input' rows='2' data-min-rows='2'
                            id="age" 
                            placeholder=''
                            onChange={this.handleChange.bind(this)}
                            value={this.state.age}>
                        </input>

                        <label>Weight</label>
                        <input type="number" className='autoExpand form-input' rows='2' data-min-rows='2'
                            id="weight" 
                            placeholder=''
                            onChange={this.handleChange.bind(this)}
                            value={this.state.weight}>
                        </input>
                </div>

        
                <button className="btn info"
                        onClick={this.onSubmit.bind(this)}>Save Profile</button>

            </div>
        );
    }
}

export default Profile;