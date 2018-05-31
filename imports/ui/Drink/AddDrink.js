import React, { Component } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import history from '../../routes/history';
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
            type: 'Beer',
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
        

    
        Meteor.call('drinks.insert', type, description, volume, alcohol, 
        day, month, year, hour, minute,(err, res) => {
            if(!err) {

                this.handleModalClose();
            } else {
                this.setState({ error: err.reason });
            }
        });


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
        this.setState({
            isOpen: true,
            type: 'Beer',
            volume: 12,
            alcohol: 5
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

     handleBackButton() {
        history.push('/dashboard');
    }
    
    render() {
        return (
            <div className="page-content">

                <button className="btn info" onClick={this.handleBackButton.bind(this)}>Back</button>

                <button className="btn info" onClick={this.handleNewDrink.bind(this)}>Add Drink</button>
            
               


                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add Drink"
                    // onAfterOpen={() => this.id.description.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="form-section"
                    className="modal-scroll"
                    overlayClassName="boxed-view boxed-view--modal"
                    >
                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit.bind(this)} >
                    
                    
                    <h2 className="form-section_title">Drink</h2>
                    <div className="form-section">

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
                        
                    <h2 className="form-section_title">Consumption</h2>
                    <div className="form-section"> 

                            <div className="form-inlineelements" >
                                <label>Date</label>          
                                <DatePicker onChange={this.onDateChange.bind(this)} 
                                    selected={this.state.date}></DatePicker>                                               
                            </div>

                            <div className="form-inlineelements">
                                <label>Time</label>
                                <TimePicker
                                    value={this.state.time}
                                    onChange={this.onTimeChange.bind(this)}
                                    showSecond={false}
                                    use12Hours/>  
                            </div>
                            
                    </div>    

                        <button className="btn info">Add Drink</button>
                        <button type="button" className="btn info" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    
                    
                        </form>
                </Modal>     
            </div>
        );
    }
}

export default AddDrink;