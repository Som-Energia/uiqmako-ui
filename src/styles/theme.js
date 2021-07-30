import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#96b633',
    },
    secondary: {
      main: '#a1a1a1',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f2f2f2',
    },
    text: {
      primary: '#4d4d4d',
    },
    typography: {
      htmlFontSize: 16,
    },
    shape: {
      borderRadius: '0',
    },
  },
})

export default theme
