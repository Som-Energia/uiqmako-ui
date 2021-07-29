import React, { Suspense, useEffect, useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import 'App.css'
import Routes from 'routes'
import { useToken } from 'useToken'
import Login from 'components/LogIn'
import { pink, indigo } from '@material-ui/core/colors'
import SimpleSnackbar from 'components/SimpleSnackbar'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: pink[900],
    },
    primary: {
      main: pink[700],
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', 'sans-serif'].join(','),
  },
})

function App(props) {
  const { token, setToken } = useToken()
  const [alertProps, setAlertProps] = useState({
    className: 'alert-red',
    open: false,
    message: 'Sóc una alerta',
  })

  //const setOpenAlert = useEffect(() => {}, [])

  return (
    <div className="App">
      {(token && (
        <ThemeProvider theme={theme}>
          <Suspense fallback={<></>}>
            <Routes setToken={setToken} setAlertProps={setAlertProps} />
          </Suspense>
        </ThemeProvider>
      )) || <Login setToken={setToken} />}
      <SimpleSnackbar alertProps={alertProps} setAlertProps={setAlertProps} />
    </div>
  )
}

export default App
