import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
            
        }
    }

    handleChange() {

        //this is for change in the input fields
        this.setState({
            type: document.getElementById('name').value
            
        })
    }


    render() {
        return (
            
            <div className="page-content">

                <h2 className="form-section_title">Personal Information</h2>
                <div className="form-section">
                    
                        <label>Name</label>
                        <input className='autoExpand form-input' rows='2' data-min-rows='2'
                            id="name" 
                            placeholder=''
                            onChange={this.handleChange.bind(this)}
                            value={this.state.name}>
                        </input>
                        <br/><br/>
                        Sex:   Male <input type="radio" name="gender"/>  Female <input type="radio" name="gender" /><br/>
                        <br/>
                        <label>Age</label>
                        <input className='autoExpand form-input' rows='2' data-min-rows='2'
                            id="age" 
                            placeholder=''
                            onChange={this.handleChange.bind(this)}
                            value={this.state.age}>
                        </input>

                        <label>Weight</label>
                        <input className='autoExpand form-input' rows='2' data-min-rows='2'
                            id="weight" 
                            placeholder=''
                            onChange={this.handleChange.bind(this)}
                            value={this.state.weight}>
                        </input>
                </div>

        
            </div>
        );
    }
}

export default Profile;