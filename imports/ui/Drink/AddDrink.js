import React, { Component } from 'react';
import Modal from 'react-modal';

class AddDrink extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            type: 'Beer',
            description: '',
            volume: 0,
            alcohol: 0,
            day: 0,
            month: 0,
            year: 0,
            hour: 0,
            minute: 0,
            error: ''
        }
    }

    componentDidMount() {
        var d = new Date();
     console.log(d.getHours());
     console.log(d.getMinutes());
     console.log(d.getSeconds());


    }

    componentWillMount() {
        Modal.setAppElement('body');  //this added to make some warning go away??
    }

    onSubmit(e) {
        e.preventDefault();


        // const name = this.refs.name.value.trim();
        const height = '';
        const weight = '';
        // const raceTeam = this.refs.raceTeam.value.trim();
        const raceTeamWebsite = '';
        const suit = '';
        const shoes = '';
        const gloves = '';
        const helmet = '';
        const hans = '';
        const personalNotes = '';
    
        Meteor.call('drivers.insert', name, height, weight, raceTeam, raceTeamWebsite,
        suit, shoes, gloves, helmet, hans, personalNotes, (err, res) => {
            if(!err) {
                this.handleModalClose();
            } else {
                this.setState({ error: err.reason });
            }
        });

        // this.refs.name.value= '';
        // this.refs.raceTeam.value= '';    
    }

    handleChange() {
        this.setState({
            type: 'Something',
            description: document.getElementById('description').value,
            volume: document.getElementById('volume').value,
            alcohol: document.getElementById('alcohol').value,
            // day: document.getElementById('day').value,
            // month: document.getElementById('month').value,
            // year: document.getElementById('year').value,
            hour: document.getElementById('hour').value,
            minute: document.getElementById('minute').value
        })
    }

    handleModalClose() {
        this.setState({ 
            isOpen: false,
            error: ''}) 
     }

     handleNewDrink() {
         var d = new Date();
         this.setState({
             isOpen: true,
             hour: d.getHours(),
             minute: d.getMinutes()
         })
     }
    
    render() {
        return (
            <div className="page-content">
            <h1>quick fix to add space</h1>
            <h1>quick fix to add space</h1>
                <button className="button" onClick={this.handleNewDrink.bind(this)}>+ Add Drink</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add Drink"
                    // onAfterOpen={() => this.id.description.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="form-section"
                    overlayClassName="boxed-view boxed-view--modal"
                    >
                    <p className="primaryfont">Drink Type</p>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit.bind(this)} >
                    <div className="model-input">
                    
                    
                        <select name = "type" style={{marginBottom: 40}} className="modal-selector">
                            <option value="beer" className="modal-selector">Beer</option>
                            <option value="lightbeer">Light Beer</option>
                            <option value="wine">Wine</option>
                            <option value="shot">Whiskey Shot</option>
                            <option value="cocktail">Cocktail</option>
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
                        
                            <label className="primaryfont">Date</label>
                            <input type="date" className='autoExpand form-input'  rows='2' data-min-rows='2'
                                id="date" 
                                placeholder=''
                                onChange={this.handleChange.bind(this)}
                                value={this.state.alcohol}>
                            </input>
                        
                            <label className="primaryfont">Hour</label>
                            <input className='autoExpand form-input' rows='2' data-min-rows='2'
                                id="hour" 
                                placeholder=''
                                onChange={this.handleChange.bind(this)}
                                value={this.state.hour}>
                            </input>

                            <label className="primaryfont">Minute</label>
                            <input className='autoExpand form-input' rows='2' data-min-rows='2'
                                id="minute" 
                                placeholder=''
                                onChange={this.handleChange.bind(this)}
                                value={this.state.minute}>
                            </input>
                        

                        <button className="button">Add Drink</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </div>
                    
                        </form>
                </Modal>     
            </div>
        );
    }
}

export default AddDrink;