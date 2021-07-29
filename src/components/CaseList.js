import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Close from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { getTemplateCases, createCase } from 'services/api'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  editor: {
    width: '100%',
  },
  container: {
    margin: '1% 10%',
    textAlign: 'center',
  },
  avatarBackground: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  input: {
    paddingBottom: '1rem',
    width: '80%',
  },
  title: {
    fontSize: '3em',
    color: '#7c828e',
    marginBottom: '2%',
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  singleButton: {
    width: '15%',
    margin: '1%',
  },
  resultPaper: {},
}))

function CaseList(props) {
  const classes = useStyles()
  const { open, onClose, templateId, editId } = props
  const [data, setData] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [newId, setNewId] = useState('')
  const [newName, setNewName] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (open) {
      getTemplateCases(templateId)
        .then((response) => {
          setData(response)
          setHasChanges(false)
          console.log('%%%%%%%%%Carrego')
        })
        .catch((error) => {})
    }
  }, [open, hasChanges])

  const handleCreateCase = (event) => {
    event.preventDefault()
    createCase(newName, newId, templateId)
      .then((response) => {
        setHasChanges(true)
        setNewId('')
        setNewName('')
      })
      .catch((error) => {
        setNewId('')
        setNewName('')
      })
  }
  const addCaseForm = (
    <>
      <TextField
        className={classes.input}
        id="outlined-basic"
        label="Nom"
        variant="outlined"
        required={true}
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <TextField
        className={classes.input}
        id="outlined-basic"
        label="Id"
        variant="outlined"
        required={true}
        value={newId}
        onChange={(e) => setNewId(e.target.value)}
      />
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          className={classes.singleButton}
          onClick={(e) => handleCreateCase(e)}
        >
          Afegeix un nou cas
        </Button>
      </div>
    </>
  )
  return (
    <Dialog aria-labelledby="case-dialog-title" open={open}>
      <DialogTitle id="case-dialog-title">Tria el cas</DialogTitle>
      <List>
        {data?.cases?.map((item, index) => (
          <ListItem
            button
            onClick={(e) => {
              console.log('ap', item)
              onClose(item.id)
            }}
            key={item.case_id}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatarBackground}>
                <ArrowRight />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={() => console.log('he fet clic')}>
          <ListItemAvatar>
            <Avatar>
              <AddRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          {addCaseForm}
        </ListItem>
        <ListItem autoFocus button onClick={() => console.log('he fet clic')}>
          <ListItemAvatar></ListItemAvatar>
          <Button
            color="primary"
            variant="contained"
            disabled={!data.cases || data.cases.length === 0}
            onClick={(e) => {
              history.push(`/validation/${templateId}/${editId}`)
            }}
          >
            Revisar-los tots i pujar edició a l'ERP
          </Button>
        </ListItem>
        <ListItem button onClick={() => onClose('')} key={-1}>
          <ListItemAvatar>
            <Avatar>
              <Close />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={'Tancar'} />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default CaseList
