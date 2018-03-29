import { dark } from 'material-ui/styles';
import merge from 'lodash.merge';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

const customTheme = {
    palette: { 
        textColor: purple,
      primary1Color: green,
      primary2Color: green,
      primary3Color: green
    }
  }; 
   
const theme = merge(dark,customTheme);

export default theme;