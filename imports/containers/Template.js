import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { purple, red, green } from 'material-ui/colors';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import MenuIcon from 'material-ui-icons/Menu';


import NavDrawer from '../components/NavDrawer';
import Signup from '../ui/Signup';
import Login from '../ui/Login';



export const theme = createMuiTheme({
    palette: {
        
        type: 'dark',
        primary: red,
        secondary: red,
        primarytext: green,
        accent1Color: red,
        pickerHeaderColor: red,
    },
   
});



class Template extends Component {
    state = {
        open: true,
    }
    render() {
        const { classes } = this.props;
        return (          
            <MuiThemeProvider theme={theme}>
                <div> 
                    <AppBar position="static" className="testMaterialUI">
                        <Toolbar>
                            <IconButton color="contrast" aria-label="Menu">
                                 <MenuIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" >
                                Race Day
                            </Typography>
                        <Button color="contrast">Login</Button>
                        </Toolbar>
                    </AppBar>  

                </div>
            </MuiThemeProvider>  
        );
    }
}

export default Template;