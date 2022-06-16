import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'context/currentUser'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
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
    adminOnly: true,
    icon: <SettingsRoundedIcon />,
  },
]

const useStyles = makeStyles({
  menu: {
    maxWidth: '300px',
    paddingRight: '16px',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: '#f2f2f2',
  },

  menuContent: {
    position: 'sticky',
    top: '10px',
    height: '90vh',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
  },
  topItems: {
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
  },
  singleItem: {
    margin: '0.4rem 0',
  },
})

function Menu(props) {
  const classes = useStyles()
  const history = useHistory()
  const { setToken } = props
  const { currentUser, setCurrentUser } = useAuth()
  return (
    <div className={classes.menu}>
      <List className={classes.menuContent}>
        <div className={classes.topItems}>
          {menuItems.map((item, index) => (
            <ListItem
              button
              className={classes.singleItem}
              key={index}
              disabled={item.adminOnly && currentUser?.category !== 'admin'}
              onClick={(e) => history.push(item.path)}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText
                primary={item.title}
                secondary={item.disabled && 'Només per administradors'}
              />
            </ListItem>
          ))}
        </div>
        <div className={classes.menuLogOut}>
          <ListItem>
            <ListItemIcon>
              <AccountCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={currentUser.username} />
          </ListItem>
        </div>
        <div className={classes.menuLogOut}>
          <ListItem
            button
            onClick={(e) => {
              setToken('')
              setCurrentUser(false)
            }}
          >
            <ListItemIcon>
              <ExitToAppRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Sortir" />
          </ListItem>
        </div>
      </List>
    </div>
  )
}

export default Menu
