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
import InfoIcon from '@material-ui/icons/Info'
import { useHistory } from 'react-router-dom'
//import { useAuth } from 'context/currentUser'
import { useAuth } from 'context/sessionContext'
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TemplateModelList from './TemplateModelList'

const menuItems = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeRoundedIcon />,
    subitems: <TemplateModelList />,
  },
  {
    title: 'Edicions en curs',
    path: '/edits',
    icon: <BorderColorRoundedIcon />,
  },
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
  const { currentUser, setCurrentUser, removeSessionToken } = useAuth()
  return (
    <div className={classes.menu}>
      <List className={classes.menuContent}>
        <div className={classes.topItems}>
          {menuItems.map((item, index) => (
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              sx={{
                height: 240,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: 'auto',
              }}
            >
              <TreeItem
                label={
                  <ListItem
                    button
                    className={classes.singleItem}
                    key={index}
                    disabled={
                      item.adminOnly && currentUser?.category !== 'admin'
                    }
                    onClick={(e) => history.push(item.path)}
                  >
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText
                      primary={item.title}
                      secondary={item.disabled && 'Només per administradors'}
                    />
                  </ListItem>
                }
                nodeId={index}
              >
                {item.subitems && <div>{item.subitems}</div>}
              </TreeItem>
            </TreeView>
          ))}
        </div>
        <div className={classes.menuLogOut}>
          <ListItem>
            <ListItemIcon>
              <AccountCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={currentUser?.username} />
          </ListItem>
        </div>
        <a
          className={classes.menuLogOut}
          style={{ textDecoration: 'none', color: 'currentColor' }}
          target="_blank"
          href={process.env.REACT_APP_MANUAL_URL}
        >
          <ListItem
            button
            onClick={(e) => {
              console.log("anirem a l'infinit i més enllà")
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Manual UI-QMako" />
          </ListItem>
        </a>
        <div className={classes.menuLogOut}>
          <ListItem
            button
            onClick={(e) => {
              removeSessionToken()
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
