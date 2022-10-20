import React, { Suspense, useEffect, useState } from 'react'
import './i18n/i18n'
import { ThemeProvider } from '@material-ui/styles'
import Routes from 'routes'
import { useToken } from 'useToken'
import Login from 'components/LogIn'
import SimpleSnackbar from 'components/SimpleSnackbar'
import theme from 'styles/theme'
import { CurrentUserProvider } from 'context/currentUser'
import { AlertInfoProvider } from 'context/alertDetails'

function App(props) {
  const alertProps = {
    open: false,
    message: '',
    severity: 'info',
  }
  const { token, setToken } = useToken()
  const [initAlert] = useState(alertProps)

  useEffect(() => {
    const timeout = setInterval(() => {
      const date = localStorage.getItem('tokenDate')
      if (date > Date.now()) {
        setToken('')
      }
    }, 10800000)

    return () => clearInterval(timeout)
  }, [setToken])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CurrentUserProvider>
          <AlertInfoProvider alertProps={{ ...initAlert }}>
            {(token && (
              <Suspense fallback={<></>}>
                <Routes setToken={setToken} />
              </Suspense>
            )) || <Login setToken={setToken} />}
            <SimpleSnackbar alertProps={alertProps} />
          </AlertInfoProvider>
        </CurrentUserProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
