import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import blue from 'material-ui/colors/blue';
import indigo from 'material-ui/colors/indigo';
import teal from 'material-ui/colors/teal';

export default theme = createMuiTheme({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'normal'
    },
    palette: {
        primary: indigo,
        secondary: teal,
        type: 'light'
    },
    typography: {
        htmlFontSize: 10,
        fontSize: 20,
        button: {
            
            
            
            height: 48,
            padding: '0 30px',
            
            fontStyle: 'italic',
            fontWeight: 500,
        },
    },
    textField: {
        width: 800
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    }
})