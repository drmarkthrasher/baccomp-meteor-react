import React, { Component } from 'react';

class DrinksDateFilter extends Component {
    constructor(props){
        super(props);


    }

componentWillMount() {
    if(!Session.get('drinkDateFilter')) Session.set('drinkDateFilter', "All");
}

componentDidMount() {
    document.getElementById('filter').value=Session.get('drinkDateFilter');
}



handleDateChange(){

    Session.set('drinkDateFilter', document.getElementById('filter').value);



}

    render() {
        return (
            <div>
                <div className="form-section">
                    <label>List Filter</label> 
                        <select id="filter" 
                                style={{marginBottom: 40}} 
                                className="form-input"
                                onChange={this.handleDateChange.bind(this)}>
                            <option value="Last 6 hours">Last 6 hours</option>
                            <option value="Last 12 hours">Last 12 hours</option>
                            <option value="Last Day">Last Day</option>
                            <option value="Last Week">Last Week</option>
                            <option value="All">All</option>
                        </select>

                       


                </div>
            </div>
        );
    }
}

export default DrinksDateFilter;