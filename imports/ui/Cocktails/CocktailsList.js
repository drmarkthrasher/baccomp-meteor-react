import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import history from '../../routes/history';
import { Cocktails } from '../../api/cocktails';
import CocktailsListItem from './CocktailsListItem';

class CocktailsList extends Component {
    constructor(props){
        super(props);

        this.state = {
            cocktails: [],
            name: ""
        }
    }

    componentDidMount() {
        this.cocktailsTracker = Tracker.autorun(() => {
            Meteor.subscribe('cocktails');
            const cocktails = Cocktails.find({}).fetch();
            this.setState({ cocktails });
          })

    }

    componentWillUnmount() {
        this.cocktailsTracker.stop();
    }

    renderCocktailsListItems() {
        if(this.state.cocktails.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No Cocktails Found</p>
                </div>
            )
        }
        return this.state.cocktails.map((cocktail) => {
            return <CocktailsListItem key={cocktail._id} {...cocktail}/>               
        })
    }


    handleChange() {

        this.setState({
            name: document.getElementById('name').value
        })

        Meteor.call('cocktails.parse', document.getElementById('name').value,(err, res) => {
            if(!err) {
                this.setState({cocktails:res})
            } else {
                
            }
        });

    }

    handleBackButton() {
        history.push('/dashboard');
    }


    render() {
        return (
            <div>

                <div className="page-content">

                    <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>

                    <div className="form-section">
                            
                        <label>Cocktail Search...</label>
                        <input className='autoExpand form-input' rows='1' data-min-rows='1'
                        id="name" 
                        placeholder=''
                        onChange={this.handleChange.bind(this)}
                        value={this.state.name}>
                        </input>
                
                    </div>


                   
                </div>

                
                <FlipMove maintainContainerHeight={true}>
                {this.renderCocktailsListItems()}
                </FlipMove>


                
            </div>
        );
    }
}

export default CocktailsList;