import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuIcon from '@material-ui/icons/Menu'
import { useState } from 'react'

const NavBar = (props) => {
  const classes = useStyles()
  const { setSearchText, searchVisible } = props

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar>
        <div className={classes.logo}>
          <img src="/cuca.png" alt="cuca" />
          <Typography variant="h1">UI-QMako</Typography>
        </div>
        {searchVisible && (
          <TextField
            className={classes.searchField}
            onChange={(e) => setSearchText(e.target.value)}
            label="Cerca"
            variant="outlined"
            margin="dense"
          />
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    flexGrow: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      maxHeight: '38px',
      marginRight: '12px',
      marginBottom: '8px',
    },
    '& h1': {
      fontFamily: 'Montserrat',
      fontSize: '1.1rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: theme.palette.text.primary,
    },
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
  },
  searchField: {
    fontSize: '300',
  },
}))
