import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from '../client/styles/material-ui-theme';
import MainNavigationBar from './MainNavigationBar';




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
  
    
    render() {
        return (   

          <div>
          
          <MuiThemeProvider theme={theme}>        
          <div>
            
            <MainNavigationBar title='BAC Comp'/> 
          
          </div>
          </MuiThemeProvider>
        </div>
          
        );
    }
}
  
export default DashBoard;
