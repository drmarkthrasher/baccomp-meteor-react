import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from '../client/styles/material-ui-theme';
import MainNavigationBar from './MainNavigationBar';

import history from '../routes/history';




class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };
  }   
  
  
  componentWillMount() {
    // delete Session.keys['drinkDateFilter'];

    // Your parse code, but not seperated in a function
    // var csvFilePath = './uploadCSV.csv';
    // var csvFilePath= "./uploadCSV.csv";

    // console.log(csvFilePath);

    // Papa.parse(csvFilePath, {
    //   header: true,
    //   download: true,
    //   skipEmptyLines: true,
    //   // Here this is also available. So we can call our custom class method
    //   complete: function(results) {
    //     console.log(results);
    // }
      
    // });


  }


  gotoDrinksMain = (event) => {
    history.push('/drinksmain');
  }

  gotoBACGauge = (event) => {
    history.push('/bacgauge')
  }

  gotoCocktailsMain = (event) => {
    history.push('/cocktailsmain')
  }

  gotoBarFinder = (event) => {
    history.push('/barfinder')
  }
  
    
    render() {
        return (   

          <div>
          
          <MuiThemeProvider theme={theme}>        
          <div>
            
            <MainNavigationBar title='BAC Comp'/> 

            <div className="top-container">        
              <img className="img-top" src="cocktail.png" />
            </div>
            
            <div className="button-row">
              <button className="homebutton" 
                onClick={this.gotoDrinksMain.bind(this)}>
                <img src="mydrinks.png" width="50px" height="50px"/> My Drinks</button>
              <button className="homebutton"
                onClick={this.gotoBACGauge.bind(this)}>
                <img src="bacgauge.png" width="50px" height="50px"/> BAC %</button>
            </div>

            <div className="button-row">
              <button className="homebutton"
                onClick={this.gotoCocktailsMain.bind(this)}>
                <img src="bartender.png" width="50px" height="50px"/> Bartender</button>
              <button className="homebutton"
                onClick={this.gotoBarFinder.bind(this)}>
                <img src="barfinder.png" width="50px" height="50px"/> Finder</button>
            </div>
          
          </div>
          </MuiThemeProvider>
        </div>
          
        );
    }
}
  
export default DashBoard;
