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
    
    render() {
        return (   
          <MuiThemeProvider theme={theme}>        
            <div className="page-content" >
               
            <MainNavigationBar title='BAC Comp'/> 
            
            </div>
            </MuiThemeProvider>
        );
    }
}
  
export default DashBoard;