import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Close from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { getSourcesList } from 'services/api'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

const useStyles = makeStyles((theme) => ({}))

function SourcesList(props) {
  const classes = useStyles()
  const { open, onClose } = props
  const [data, setData] = useState('')

  useEffect(() => {
    if (open) {
      getSourcesList()
        .then((response) => {
          setData(response)
        })
        .catch((error) => {})
    }
  }, [open])

  return (
    <Dialog aria-labelledby="case-dialog-title" open={open}>
      <DialogTitle id="case-dialog-title">
        Tria l'ERP on pujar els canvis
      </DialogTitle>
      <List>
        {data?.sources?.map((item, index) => (
          <ListItem
            button
            onClick={(e) => {
              onClose(item.name)
            }}
            key={index}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatarBackground}>
                <ArrowRight />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={item.uri} />
          </ListItem>
        ))}
        <ListItem button onClick={() => onClose(false)} key={-1}>
          <ListItemAvatar>
            <Avatar>
              <Close />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={'Cancel·lar'} />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default SourcesList
