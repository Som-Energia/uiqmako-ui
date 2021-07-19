import React, { Suspense } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import 'App.css'
import Routes from 'routes'
import { useToken } from 'useToken'
import Login from 'components/LogIn'
import { blue, indigo } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900],
    },
    primary: {
      main: indigo[700],
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', 'sans-serif'].join(','),
  },
})

function App(props) {
  const { token, setToken } = useToken()

  return (
    <div className="App">
      {(token && (
        <ThemeProvider theme={theme}>
          <Suspense fallback={<></>}>
            <Routes setToken={setToken} />
          </Suspense>
        </ThemeProvider>
      )) || <Login setToken={setToken} />}
    </div>
  )
}

export default App
