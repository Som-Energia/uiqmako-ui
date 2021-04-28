import React, { Component, Suspense } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css';
import Routes from './routes'
import Title from './components/Title'
import { blue, indigo } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});


class App extends Component {
  render() {
    return (
    <div className="App">
        <header className="App-header">
          <Title/>
        </header>
        <ThemeProvider theme={theme}>
        <Suspense fallback={<></>}>
          <Routes />
        </Suspense>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
