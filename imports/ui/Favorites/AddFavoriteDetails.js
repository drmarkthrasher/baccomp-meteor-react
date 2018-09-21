import React, { Component } from 'react';

import history from '../../routes/history';

class AddFavoriteDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            type: 'Beer',
            description: '',
            volume: 12,
            alcohol: 5
        }    
    }

    handleBackButton() {
        history.push('/favoritesmain');
    }

    handleCancel() {
        history.push('/favoritesmain');
    }

    handleTypeChange() {
        var vol, alc;
        var type=document.getElementById('type').value;
        if(type=="Beer"){
            vol=12;
            alc=5;
        }else if (type=="Light Beer") {
            vol=12;
            alc=4;
        }else if (type==="Wine") {
            vol=5;
            alc=12;
        }else if (type=="Whiskey Shot") {
            vol=1.5;
            alc=40;
        }else if (type=="Cocktail") {
            vol=1.5;
            alc=40;
        }

        this.setState({
            type: document.getElementById('type').value,
            volume: vol,
            alcohol: alc
        })
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

    onSubmit(e) {
        e.preventDefault();
     
        var type=this.state.type;
        var description=this.state.description;
        var volume=this.state.volume;
        var alcohol=this.state.alcohol;
        
    
        Meteor.call('favorites.insert', type, description, volume, alcohol,(err, res) => {
            if(!err) {
                history.push('/favoritesmain');
                // this.handleModalClose();
            } else {
                console.log(err.reason);
                // this.setState({ error: err.reason });
            }
        });


    }

    render() {
        return (
            <div className="page-content">

            <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>

            <div className="form-section">

            <h2 className="form-section_title">Drink</h2>
        
                <label>Type</label>         
                <select id="type" 
                        style={{marginBottom: 40}} 
                        className="form-input"
                        onChange={this.handleTypeChange.bind(this)}>
                    <option value="Beer">Beer</option>
                    <option value="Light Beer">Light Beer</option>
                    <option value="Wine">Wine</option>
                    <option value="Whiskey Shot">Whiskey Shot</option>
                    <option value="Cocktail">Cocktail</option>
                </select>
                            
                <label>Description</label>
                <input className='autoExpand form-input' rows='1' data-min-rows='1'
                    id="description" 
                    placeholder=''
                    onChange={this.handleChange.bind(this)}
                    value={this.state.description}>
                </input>

            </div>

            <h2 className="form-section_title">Alcohol</h2>
            <div className="form-section">
                    
                        <label>Volume (oz)</label>
                        <input className='autoExpand form-input' rows='2' data-min-rows='2'
                            id="volume" 
                            placeholder=''
                            onChange={this.handleChange.bind(this)}
                            value={this.state.volume}>
                        </input>
                    
                        <label>Alcohol Content (%)</label>
                        <input className='autoExpand form-input' rows='2' data-min-rows='2'
                            id="alcohol" 
                            placeholder=''
                            onChange={this.handleChange.bind(this)}
                            value={this.state.alcohol}>
                        </input>
            </div>
                        <h1 className="addspaceabove"></h1>
                    

            <button className="btn info" onClick={this.onSubmit.bind(this)}>Add Favorite</button>
            <button type="button" className="btn info" onClick={this.handleCancel.bind(this)}>Cancel</button>
        

            </div>
        );
    }
}

export default AddFavoriteDetails;