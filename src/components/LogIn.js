import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { doLogin } from 'services/api'
import Title from './Title'
import Register from 'components/Register'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function LogIn(props) {
  const classes = useStyles()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [isInvalid, setisInvalid] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    doLogin(username, password)
      .then((response) => {
        props.setToken(response)
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          setisInvalid(true)
        }
        props.setToken('')
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Title />
      {(isRegister && (
        <Register setToken={props.setToken} setIsRegister={setIsRegister} />
      )) || (
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
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
              label="Username"
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
              Sign In
            </Button>
          </form>
          <Typography
            component="h2"
            variant="h5"
            onClick={(e) => setIsRegister(true)}
          >
            No tens usuari? Registra't
          </Typography>
        </div>
      )}
    </Container>
  )
}

export default LogIn
