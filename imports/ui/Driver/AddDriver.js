import React, { Component } from 'react';
import Modal from 'react-modal';

class AddDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            error: ''
        }
    }

    
    componentWillMount() {
        Modal.setAppElement('body');  //this added to make some warning go away??
    }
    

    onSubmit(e) {
        e.preventDefault();

        const name = this.refs.name.value.trim();
        const height = '';
        const weight = '';
        const raceTeam = this.refs.raceTeam.value.trim();
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

        this.refs.name.value= '';
        this.refs.raceTeam.value= '';    
    }
    handleModalClose() {
       this.setState({ 
           isOpen: false,
           error: ''}) 
    }
    render() {
        return (
            <div>
            <h1>quick fix to add space</h1>
            <h1>quick fix to add space</h1>
                <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Driver</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add Driver"
                    onAfterOpen={() => this.refs.name.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                    >
                    <p>Add Driver</p>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input type="text" ref="name" placeholder="Name"/><br/>
                        <input type="text" ref="raceTeam" placeholder="Race Team"/><br/>
                        <button className="button">Add Driver</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                </Modal>     
            </div>
        );
    }
}

export default AddDriver;