import React, { Suspense, useEffect, useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import Routes from 'routes'
import { useToken } from 'useToken'
import Login from 'components/LogIn'
import { pink, indigo } from '@material-ui/core/colors'
import SimpleSnackbar from 'components/SimpleSnackbar'
import { currentUser } from 'services/api'
import theme from 'styles/theme'
import { CurrentUserProvider } from 'context/currentUser'
import { AlertInfoProvider } from 'context/alertDetails'

function App(props) {
  const { token, setToken } = useToken()

  const alertProps = {
    open: true,
    message: '',
    severity: 'info',
  }
  const [user, setUser] = useState(false)

  useEffect(() => {
    console.log('efeeeect')
    //if (token) {
    currentUser()
      .then((response) => {
        setUser(response)
        console.log('cosaeffect', response)
      })
      .catch((error) => {})
  }, [])

  useEffect(() => {
    const timeout = setInterval(() => {
      console.log('timeeee')
      const date = localStorage.getItem('tokenDate')
      console.log(date)
      if (date < Date.now()) {
        setToken('')
      } else {
        console.log('else')
      }
    }, 3000000)

    return () => clearInterval(timeout)
  }, false)
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CurrentUserProvider user={user}>
          <AlertInfoProvider alertProps={{ alertProps }}>
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
