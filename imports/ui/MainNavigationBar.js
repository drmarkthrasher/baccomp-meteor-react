import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar'; 
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon  from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { Drawer } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';

import history from '../routes/history';
import theme from '../client/styles/material-ui-theme';


// We can inject some CSS into the DOM.
const styles = {
    button: {
        background: 'primary',
        borderRadius: 10,
        border: 0,
        color: 'white',
    },
  };




  class MainNavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 'Home',
            open: false
          };
    }

    onLogout() {
        Accounts.logout();      
    }

    openDrawer = event => {
        this.setState ({
          open: true
        })
      };

    closeDrawer = event => {
        this.setState ({
            open: false
        })
    }

    gotoDashboard = (event) => {
        history.push('/dashboard');
        this.closeDrawer();
    }

    gotoDriversMain = (event) => {
        history.push('/driversmain');
        this.closeDrawer();
    }

    gotoTracksMain = (event) => {
        // history.push('/')
        this.closeDrawer();
    }

    gotoCarsMain = (event) => {
        //history.push('/')
        this.closeDrawer();
    }


    render() {
        const { classes } =this.props;  //used if using styles from above
        return (
            <MuiThemeProvider theme={theme}>  
                <div>
                    <AppBar>
                        <Toolbar>
                        <IconButton color="contrast" aria-label="Menu"
                            onClick={this.openDrawer.bind(this)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit">
                            {this.props.title}
                        </Typography>
                        <Button className={classes.button} color="accent" onClick={this.onLogout.bind(this)}>Logout</Button>
                        </Toolbar>
                    </AppBar>

                    <Drawer 
                        open={this.state.open}
                        onClick={(this.closeDrawer.bind(this))}
                        >
                        <MenuItem value="Home" onClick={this.gotoDashboard.bind(this)}>Home</MenuItem>
                        <Divider/>
                        <MenuItem value="Driver" onClick={ this.gotoDriversMain.bind(this)}>Driver</MenuItem>
                        <MenuItem value="Track" onClick={this.gotoTracksMain.bind(this)} >Track</MenuItem>
                        <MenuItem value="Car" onClick={this.gotoCarsMain.bind(this)}>Car</MenuItem>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}

MainNavigationBar.propTypes = {
    title: PropTypes.string.isRequired
}

export default withStyles(styles)(MainNavigationBar);