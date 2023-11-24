import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

var color = '#96b633'

if (process.env.REACT_APP_API_BASE_URL.includes('test')) color = '#f49900'
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: color,
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
    source: {
      prod: {
        color: '#96b633',
      },
      test: {
        color: '#f49900',
      },
    },
  },
})

export default theme
