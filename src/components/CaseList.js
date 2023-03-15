import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'
import Close from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import { getTemplateCases, createCase, deleteCase } from 'services/api'

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
    marginRight: '25px',
  },
  caseItem: {
    backgroundColor: theme?.palette?.background?.default,
    marginBottom: '4px',
  },
  reviewAll: {
    fontFamily: 'Montserrat',
    fontSize: '1rem',
    fontWeight: 600,
    padding: '1rem',
    textAlign: 'left',
  },
  deleteIcon: {
    marginRight: '1rem',
  },
  caseRow: {
    display: 'flex',
    alignItems: 'center',
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

  const handleDelete = async (event, item) => {
    event.preventDefault()
    deleteCase(item.id, item.template_id).then((response) => {
      setHasChanges(true)
    })
  }

  const catchReturn = (e) => {
    if (e.key === 'Enter') {
      handleCreateCase(e)
      e.preventDefault()
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
        onKeyPress={(e) => catchReturn(e)}
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
        onKeyPress={(e) => catchReturn(e)}
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
            <div key={`div-${index}`} className={classes.caseRow}>
              <IconButton
                key={`ib-${index}`}
                aria-label="delete"
                className={classes.deleteIcon}
                onClick={(e) => handleDelete(e, item)}
              >
                <DeleteIcon />
              </IconButton>
              <ListItem
                key={`list-${index}`}
                className={classes.caseItem}
                button
                onClick={(e) => {
                  onClose(item.id)
                }}
              >
                <ListItemText primary={item.name} />
                <ArrowForwardIosIcon className={classes.icon} />
              </ListItem>
            </div>
          ))}
          <ListItem
            style={{ pointerEvents: 'none', marginTop: '1rem' }}
            autoFocus
            onClick={() => {}}
          >
            {addCaseForm}
            <IconButton
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => handleCreateCase(e)}
            >
              <AddRoundedIcon
                style={{ pointerEvents: 'auto' }}
                fontSize="large"
                className={classes.icon}
              />
            </IconButton>
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
                fontSize="large"
                className={classes.icon}
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
