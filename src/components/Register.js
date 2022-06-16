import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { register, currentUser } from 'services/api'
import { useAuth } from 'context/currentUser'

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
    fontSize: '1rem',
    color: '#fff',
    margin: theme.spacing(3, 0, 2),
  },
  linkLogin: {
    cursor: 'pointer',
    marginTop: theme.spacing(2),
  },
}))

function Register(props) {
  const classes = useStyles()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
  const [isInvalid, setisInvalid] = useState(false)
  const [msgError, setmsgError] = useState('')
  const [isPasswdInvalid, setPasswdInvalid] = useState(false)
  const { setCurrentUser } = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isPasswdInvalid) {
      register(username, password)
        .then((response) => {
          props.setToken(response)
          currentUser()
            .then((response) => {
              setCurrentUser(response)
            })
            .catch((error) => {})
        })
        .catch((error) => {
          switch (error?.message) {
            case 'Network Error':
              setmsgError("No s'ha pogut connectar amb el servidor")
              break
            case 'Request failed with status code 409':
              setmsgError("L'usuari ja existeix")
              break
            default:
              console.log(error?.message)
              setmsgError('Error desconegut')
          }
          setisInvalid(true)
          props.setToken('')
        })
    }
  }
  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registrar-se
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            error={isInvalid}
            helperText={isInvalid && msgError}
            required
            fullWidth
            id="username"
            label="Usuari"
            name="username"
            autoFocus
            onChange={(e) => {
              setisInvalid(false)
              setUsername(e.target.value)
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={isPasswdInvalid}
            helperText={
              isPasswdInvalid &&
              (password.length < 8
                ? 'La contrassenya ha de tenir mínim 8 caràcters'
                : 'Les contrassenyes no coincideixen')
            }
            fullWidth
            name="password"
            label="Contrassenya"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPasswdInvalid(password.length < 8)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={isPasswdInvalid}
            helperText={
              isPasswdInvalid &&
              (password.length < 8 ? '' : 'Les contrassenyes no coincideixen')
            }
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
          variant="h6"
          onClick={(e) => props.setIsRegister(false)}
          className={classes.linkLogin}
        >
          Ja tens usuari? <u>Entra</u>
        </Typography>
      </div>
    </>
  )
}

export default Register
