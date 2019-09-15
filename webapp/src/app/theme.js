import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        'main': '#3489bc'
    }
  }, 
  typography: {
    useNextVariants: true,
  }
});

export default theme;