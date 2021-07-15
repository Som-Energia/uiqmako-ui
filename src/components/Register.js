import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { register } from 'services/api'
import Title from './Title'

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

function Register(props) {
  const classes = useStyles()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
  const [isInvalid, setisInvalid] = useState(false)
  const [isPasswdInvalid, setPasswdInvalid] = useState(false)
  const [isLoading, setIsLoading] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isPasswdInvalid) {
      register(username, password)
        .then((response) => {
          props.setToken(response)
          setIsLoading(false)
        })
        .catch((error) => {
          setisInvalid(true)
          setIsLoading(false)
          props.setToken('')
        })
    }
  }

  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registre
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            error={isInvalid}
            helperText={isInvalid && "Aquest nom d'usuari ja existeix"}
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
            error={isPasswdInvalid}
            helperText={isPasswdInvalid && 'Les contrassenyes no coincideixen'}
            fullWidth
            name="password"
            label="Contrassenya"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={isPasswdInvalid}
            helperText={isPasswdInvalid && 'Les contrassenyes no coincideixen'}
            fullWidth
            name="repeatPassword"
            label="Repeteix la contrassenya"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            onBlur={(e) => setPasswdInvalid(password !== repeatPassword)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registra't
          </Button>
        </form>
        <Typography
          component="h2"
          variant="h5"
          onClick={(e) => props.setIsRegister(false)}
        >
          Ja tens usuari? Fes Log-In
        </Typography>
      </div>
    </>
  )
}

export default Register
