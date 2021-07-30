import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { removeToken } from 'useToken.js'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { useHistory } from 'react-router-dom'

const menuItems = [
  { title: 'Home', path: '/', icon: <HomeRoundedIcon /> },
  {
    title: 'Afegir una nova plantilla',
    path: '/newTemplate',
    icon: <AddRoundedIcon />,
  },
  {
    title: 'Administració de Permisos',
    path: '/settings',
    disabled: false,
    icon: <SettingsRoundedIcon />,
  },
]

const useStyles = makeStyles({
  menu: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    paddingRight: '16px',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    height: '100vh',
    backgroundColor: '#f2f2f2',
  },
  menuContent: {
    position: 'sticky',
    top: 30,
  },
})

function Menu(props) {
  const classes = useStyles()
  const history = useHistory()
  const { setToken } = props

  return (
    <div className={classes.menu}>
      <List className={classes.menuContent}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            disabled={item.disabled}
            onClick={(e) => history.push(item.path)}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText
              primary={item.title}
              secondary={item.disabled && 'Només per administradors'}
            />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={(e) => {
            setToken('')
          }}
        >
          <ListItemIcon>
            <ExitToAppRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Sortir" />
        </ListItem>
      </List>
    </div>
  )
}

export default Menu
