import React, { Suspense, useEffect, useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import Routes from 'routes'
import { useToken } from 'useToken'
import Login from 'components/LogIn'
import SimpleSnackbar from 'components/SimpleSnackbar'
import { currentUser } from 'services/api'
import theme from 'styles/theme'
import { CurrentUserProvider } from 'context/currentUser'
import { AlertInfoProvider, useAlert } from 'context/alertDetails'

function App(props) {
  const alertProps = {
    open: false,
    message: '',
    severity: 'info',
  }
  const { token, setToken } = useToken()
  const [initAlert, setInitAlert] = useState(alertProps)
  const [user, setUser] = useState(false)

  useEffect(() => {
    currentUser()
      .then((response) => {
        setUser(response)
      })
      .catch((error) => {})
  }, [])

  useEffect(() => {
    const timeout = setInterval(() => {
      const date = localStorage.getItem('tokenDate')
      if (date > Date.now()) {
        setToken('')
      } else {
      }
    }, 3000000)

    return () => clearInterval(timeout)
  }, false)
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CurrentUserProvider user={user}>
          <AlertInfoProvider alertProps={{ ...initAlert }}>
            {(token && (
              <Suspense fallback={<></>}>
                <Routes setToken={setToken} user={user} />
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
