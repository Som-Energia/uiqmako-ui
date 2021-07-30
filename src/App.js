import React, { Suspense, useEffect, useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import Routes from 'routes'
import { useToken } from 'useToken'
import Login from 'components/LogIn'
import { pink, indigo } from '@material-ui/core/colors'
import SimpleSnackbar from 'components/SimpleSnackbar'

import theme from 'styles/theme'

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
      <ThemeProvider theme={theme}>
        {(token && (
          <Suspense fallback={<></>}>
            <Routes setToken={setToken} setAlertProps={setAlertProps} />
          </Suspense>
        )) || <Login setToken={setToken} />}
        <SimpleSnackbar alertProps={alertProps} setAlertProps={setAlertProps} />
      </ThemeProvider>
    </div>
  )
}

export default App
