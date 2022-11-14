import React, { Suspense, useEffect, useState } from 'react'
import './i18n/i18n'
import { ThemeProvider } from '@material-ui/styles'
import Routes from 'routes/index'
import { removeToken, getTokenInfo } from 'useToken'
import SimpleSnackbar from 'components/SimpleSnackbar'
import theme from 'styles/theme'
// import { CurrentUserProvider } from 'context/currentUser'
import { SessionProvider, useAuth } from 'context/sessionContext'
import { AlertInfoProvider } from 'context/alertDetails'

function App(props) {
  const alertProps = {
    open: false,
    message: '',
    severity: 'info',
  }

  const [initAlert] = useState(alertProps)

  useEffect(() => {
    const timeout = setInterval(() => {
      const { tokenDate } = getTokenInfo()
      if (tokenDate > Date.now()) {
        removeToken()
      }
    }, 3000000)

    return () => clearInterval(timeout)
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <AlertInfoProvider alertProps={{ ...initAlert }}>
            <Suspense fallback={<></>}>
              <Routes />
            </Suspense>
            <SimpleSnackbar alertProps={alertProps} />
          </AlertInfoProvider>
        </SessionProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
