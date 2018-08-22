import React, { Component } from 'react';

class BarFinderListItem extends Component {
    constructor(props) {
        super(props)

        this.state={
          description: "nothing"
        }

    }


    render() {
        return (
            <div>
                <div className="item" className="modal-itembackground">
                    <img className="smallimage" src={this.props.image_url}></img>
                    <h2 className="primaryfont">{this.props.name}</h2>
                    <p className="secondaryfont">{this.props.distance}</p>             
                </div>
            </div>
        );
    }
}

export default BarFinderListItem;
