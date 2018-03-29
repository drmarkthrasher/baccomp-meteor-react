import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Menu, { MenuItem }from 'material-ui/Menu';
import Button from 'material-ui/Button'

class NavDrawer extends Component {
    state = {
        open: false
    }
    toggle = () => {
        this.setState((prevState,props) => {
            return {
                open: !prevState.open
            }       
        })
    }
    render() {
        return (
            <div>
                
                <Drawer open={this.state.open}>
                    <Divider/>
                    <Link to="/signup">
                        <MenuItem onClick={this.toggle.bind(this)} primaryText={'Signup'}/>
                    </Link>
                    <Link to="/">
                        <MenuItem onClick={this.toggle.bind(this)} primaryText={'Login'}/>
                    </Link>
                  
                </Drawer>

            </div>
        );
    }
}

export default NavDrawer;