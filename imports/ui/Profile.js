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
                <label className="primaryfont">Name</label>
                <input className='autoExpand form-input' rows='1' data-min-rows='1'
                    id="name" 
                    placeholder=''
                    onChange={this.handleChange.bind(this)}
                    value={this.state.name}>
                </input>
        
            </div>
        );
    }
}

export default Profile;