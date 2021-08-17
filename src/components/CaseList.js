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
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'
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
  primaryColorAvatar: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.primary,
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
  input: {
    pointerEvents: 'auto',
  },
  dialogContent: {
    margin: '2px',
    padding: '2px',
  },
  dialogTitle: {
    fontFamily: 'Montserrat',
    fontSize: '1.2rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  caseList: {
    marginLeft: '25px',
  },
  reviewAll: {
    fontFamily: 'Montserrat',
    fontSize: '1rem',
    fontWeight: 600,
    padding: '1rem',
    textAlign: 'left',
  },
}))

function CaseList(props) {
  const classes = useStyles()
  const { open, onClose, templateId, editId } = props
  const [data, setData] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [inputNameError, setInputNameError] = useState(false)
  const [inputIdError, setInputIdError] = useState(false)
  const [newId, setNewId] = useState('')
  const [newName, setNewName] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (open) {
      getTemplateCases(templateId)
        .then((response) => {
          setData(response)
          setHasChanges(false)
        })
        .catch((error) => {})
    }
  }, [open, hasChanges])

  const handleCreateCase = (event) => {
    event.preventDefault()

    if (!newName || newName === '') {
      setInputNameError(true)
    } else if (!newId || newId === '') {
      setInputIdError(true)
    } else {
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
  }
  const addCaseForm = (
    <>
      <TextField
        className={classes.input}
        style={{ width: '40%', marginRight: '5%' }}
        id="outlined-basic"
        label="Nom"
        variant="outlined"
        required={true}
        error={inputNameError}
        value={newName}
        onChange={(e) => {
          setNewName(e.target.value)
          setInputNameError(false)
        }}
      />
      <TextField
        className={classes.input}
        style={{ width: '40%', marginRight: '5%' }}
        id="outlined-basic"
        label="Id"
        variant="outlined"
        error={inputIdError}
        required={true}
        value={newId}
        onChange={(e) => {
          setNewId(e.target.value)
          setInputIdError(false)
        }}
      />
    </>
  )
  return (
    <Dialog aria-labelledby="case-dialog-title" open={open}>
      <div className={classes.dialogContent}>
        <div className={classes.dialogTitle}></div>
        <DialogTitle
          disableTypography
          className={classes.dialogTitle}
          id="case-dialog-title"
        >
          Casos de la plantilla
          <ListItemAvatar
            style={{ cursor: 'pointer', textAlign: 'right' }}
            onClick={() => onClose('')}
          >
            <Close
              className={classes.primaryColorAvatar}
              fontSize="medium"
              className={classes.icon}
            />
          </ListItemAvatar>
        </DialogTitle>
        <List className={classes.caseList}>
          {data?.cases?.map((item, index) => (
            <ListItem
              button
              onClick={(e) => {
                onClose(item.id)
              }}
              key={item.case_id}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          <ListItem
            style={{ pointerEvents: 'none' }}
            autoFocus
            button
            onClick={() => console.log('he fet clic')}
          >
            {addCaseForm}
            <ListItemAvatar onClick={(e) => handleCreateCase(e)}>
              <AddRoundedIcon
                style={{ pointerEvents: 'auto' }}
                className={classes.primaryColorAvatar}
                fontSize="large"
                className={classes.icon}
              />
            </ListItemAvatar>
          </ListItem>
          <ListItem
            autoFocus
            button
            className={classes.reviewAll}
            disabled={!data.cases || data.cases.length === 0}
            onClick={(e) => {
              history.push(`/validation/${templateId}/${editId}`)
            }}
          >
            <ListItemAvatar>
              <CheckRoundedIcon
                style={{ pointerEvents: 'auto' }}
                className={classes.primaryColorAvatar}
                fontSize="large"
                className={classes.icon}
                fontSize="large"
              />
            </ListItemAvatar>
            Revisar-los tots i pujar edició a l'ERP
          </ListItem>
        </List>
      </div>
    </Dialog>
  )
}

export default CaseList
