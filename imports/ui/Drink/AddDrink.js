import React, { Component } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const divStyle={
    margin: '50px'
};

class AddDrink extends Component {
    constructor(props){
        super(props);

        var m = moment();

        this.state = {
            isOpen: false,
            type: 'beer',
            description: '',
            volume: 0,
            alcohol: 0,
            day: m.date(),
            month: m.month(),
            year: m.year(),
            hour: m.hour(),
            minute: m.minute(),
            date: moment(),
            time: moment(),
            error: ''
        }
    }



    componentDidMount() {
    //     var d = new Date();
    //  console.log(d.getHours());
    //  console.log(d.getMinutes());
    //  console.log(d.getSeconds());


    }

    componentWillMount() {
        Modal.setAppElement('body');  //this added to make some warning go away??
    }

    onSubmit(e) {
        e.preventDefault();

        
        var type=this.state.type;
        var description=this.state.description;
        var volume=this.state.volume;
        var alcohol=this.state.alcohol;
        var day=this.state.day;
        var month=this.state.month;
        var year=this.state.year;
        var hour=this.state.hour;
        var minute=this.state.minute;

        // console.log(this.state.type+" "+this.state.description+" "+this.state.volume+" "+this.state.alcohol);
        // console.log(this.state.day+" "+this.state.month+" "+this.state.year);
        // console.log(this.state.hour+" "+this.state.minute);

    
        Meteor.call('drinks.insert', type, description, volume, alcohol, 
        day, month, year, hour, minute, (err, res) => {
            if(!err) {

                this.handleModalClose();
            } else {
                this.setState({ error: err.reason });
            }
        });


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

    handleModalClose() {
        this.setState({ 
            isOpen: false,
            error: ''}) 
     }

     handleNewDrink() {
        // var d = new Date();
        this.setState({
            isOpen: true,
            type: 'beer'
            // hour: d.getHours(),
            // minute: d.getMinutes()
        })
     }

     onDateChange(date) {
        
        var m=moment();
        m.set({date:date.date(),month:date.month(),year:date.year()})
        this.setState({
            date: m,
            day: date.date(),
            month: date.month(),
            year: date.year()
        })

        
     }

     onTimeChange(time) {

         var m=moment();
         m.set({hour:time.hour(),minute:time.minute()})
         this.setState({
            time: m,
            hour: time.hour(),
            minute: time.minute()
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
                    <div className="modal-input">
                    
                    
                        <select id="type" 
                                style={{marginBottom: 40}} 
                                className="modal-selector"
                                onChange={this.handleChange.bind(this)}>
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

                            <h1 className="addspaceabove"></h1>
                        
                            <div className="modal-inlineelements" >
                                <label className="primaryfont">Date</label>          
                                <DatePicker onChange={this.onDateChange.bind(this)} 
                                    selected={this.state.date}></DatePicker>                                               
                            </div>

                            <div className="modal-inlineelements">
                                <label className="primaryfont">Time</label>
                                <TimePicker
                                    value={this.state.time}
                                    onChange={this.onTimeChange.bind(this)}
                                    showSecond={false}
                                    use12Hours/>  
                            </div>
                        

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