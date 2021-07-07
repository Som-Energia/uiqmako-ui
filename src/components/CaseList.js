import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import AddIcon from '@material-ui/icons/Add'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Close from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import { getTemplateCases, createCase } from 'services/api'
import TemplateHeaders from 'components/TemplateHeaders'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

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
  const { open, onClose, template_id } = props
  const [data, setData] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [newId, setNewId] = useState('')
  const [newName, setNewName] = useState('')

  useEffect(() => {
    if (open) {
      getTemplateCases(template_id)
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
    createCase(newName, newId, template_id)
      .then((response) => {
        setHasChanges(true)
      })
      .catch((error) => {})
  }
  const addCaseForm = (
    <>
      <TextField
        className={classes.input}
        id="outlined-basic"
        label="Nom"
        variant="outlined"
        required={true}
        onChange={(e) => setNewName(e.target.value)}
      />
      <TextField
        className={classes.input}
        id="outlined-basic"
        label="Id"
        variant="outlined"
        required={true}
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
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          {addCaseForm}
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
