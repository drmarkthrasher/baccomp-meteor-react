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
