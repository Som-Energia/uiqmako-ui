import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { doLogin } from 'services/users'
import { currentUser } from 'services/api'
import NavBar from './NavBar'
import Register from 'components/Register'
import { useAuth } from 'context/currentUser'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    marginTop: '50px',
    backgroundColor: '#fff',
    padding: '50px',
  },
  logoContainer: {
    marginBottom: theme.spacing(1),
    textAlign: 'center',
  },
  submit: {
    color: '#fff',
    fontSize: '1rem',
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  linkRegister: {
    cursor: 'pointer',
    marginTop: theme.spacing(2),
  },
}))

function LogIn(props) {
  const classes = useStyles()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [isInvalid, setisInvalid] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const { setCurrentUser } = useAuth()
  const handleSubmit = (event) => {
    event.preventDefault()
    doLogin(username, password)
      .then((response) => {
        props.setToken(response)
        currentUser()
          .then((response) => {
            setCurrentUser(response)
          })
          .catch((error) => {})
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          setisInvalid(true)
        }
        props.setToken('')
      })
  }

  return (
    <div>
      <NavBar />
      <Container component="main" maxWidth="xs" className={classes.container}>
        <div className={classes.logoContainer}>
          <img
            src="/cuca.png"
            layout="fixed"
            width={150}
            className={classes.logo}
          />
        </div>
        {(isRegister && (
          <Register setToken={props.setToken} setIsRegister={setIsRegister} />
        )) || (
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Inicia sessió per continuar
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                error={isInvalid}
                helperText={isInvalid && 'Usuari o contrassenya incorrectes'}
                required
                fullWidth
                id="username"
                label="Usuari"
                name="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                error={isInvalid}
                helperText={isInvalid && 'Usuari o contrassenya incorrectes'}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                ENTRAR
              </Button>
            </form>
            <Typography
              component="h2"
              variant="h6"
              onClick={(e) => setIsRegister(true)}
              className={classes.linkRegister}
            >
              No tens usuari? <u>Registra't</u>
            </Typography>
          </div>
        )}
      </Container>
    </div>
  )
}

export default LogIn
