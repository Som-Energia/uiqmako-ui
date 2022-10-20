import { React, useEffect, useState, useRef } from 'react'
import { checkEdits, transferUserEdit } from 'services/api'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Fab from '@material-ui/core/Fab'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import TemplateHeaders from 'components/TemplateHeaders'
import MenuList from '@material-ui/core/MenuList'
import Popper from '@material-ui/core/Popper'
import Grow from '@material-ui/core/Grow'
import MenuItem from '@material-ui/core/MenuItem'
import EditIcon from '@material-ui/icons/Edit'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
//import { useAuth } from 'context/currentUser'
import { useAuth } from 'context/sessionContext'

const useStyles = makeStyles((theme) => ({
  editor: {
    textAlign: 'left',
  },
  editorContainer: {
    textAlign: 'left',
    margin: '0 auto',
    padding: '2% 10%',
  },
  paperAll: {
    overflow: 'auto',
    padding: '2%',
    backgroundColor: '#f2f2f2',
  },
  preview: {
    padding: '2%',
  },
  editIcon: {
    position: 'fixed',
    bottom: '10%',
    left: '45%',
    zIndex: '10',
  },
  transparentPaper: {
    backgroundColor: 'transparent',
  },
  menuListItem: {
    pointerEvents: 'none',
    '&:hover, &:focus': {
      backgroundColor: 'transparent',
    },
    justifyContent: 'center',
  },
  fabListItem: {
    pointerEvents: 'auto',
  },
}))

const StyledMenu = withStyles({
  root: {
    backgroundColor: 'transparent',
    position: 'relative',
  },
})((props) => <MenuList elevation={0} {...props} />)

function SingleTemplate(props) {
  const { data, templateId } = props
  const [editResponse, setEditResponse] = useState(true)
  const [confirmEdit, setConfirmEdit] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [successTransfer, setSuccessTransfer] = useState(false)
  const [openTransferDialog, setOpenTransferDialog] = useState(false)
  const [chosenEditor, setChosenEditor] = useState(false)
  const [editExpanded, setEditExpanded] = useState(false)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const classes = useStyles()
  const history = useHistory()
  const { currentUser } = useAuth()

  const createPreview = () => {
    return {
      __html: data?.text?.def_body_text || '',
    }
  }
  useEffect(() => {
    if (chosenEditor !== false) {
      checkEdits(templateId, confirmEdit)
        .then((response) => {
          setEditResponse(response)
          if (response.current_edits && response.current_edits.length !== 0) {
            setOpenDialog(true)
          } else {
            history.push(`/edit/${chosenEditor}/${templateId}`)
          }
        })
        .catch((error) => {})
    }
  }, [chosenEditor])
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }
  const doNothing = (e) => {}

  const transferEdit = (e) => {
    transferUserEdit(templateId, currentUser.id)
      .then((response) => {
        if (response.result && response.result === currentUser.id) {
          setSuccessTransfer(true)
        } else {
          setSuccessTransfer(false)
        }
        setOpenDialog(false)
        setOpenTransferDialog(true)
      })
      .catch((error) => {})
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])
  const confirmDialog = (
    <>
      <Dialog
        open={openDialog}
        onClose={(e) => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alerta</DialogTitle>
        <DialogContent>
          {editResponse?.current_edits && (
            <DialogContentText id="alert-dialog-description">
              {`Ja n'hi ha una edició en curs de l'usuari ${editResponse?.current_edits[0]?.user?.username}`}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => transferEdit()} color="primary">
            Transferir
          </Button>
          <Button
            onClick={(e) => {
              setOpenDialog(false)
              setChosenEditor(false)
            }}
            color="primary"
          >
            Cancel·lar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
  const responseDialog = (
    <>
      <Dialog
        open={openTransferDialog}
        onClose={(e) => setOpenTransferDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {successTransfer ? 'Transferència completada' : 'Error'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {successTransfer
              ? "S'ha transferit l'edició al teu usuari"
              : "No s'ha pogut transferir l'edició"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              setOpenTransferDialog(false)
              setChosenEditor(false)
            }}
            color="primary"
          >
            Acceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.editIcon}
        onClick={() => setEditExpanded(!editExpanded)}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        ref={anchorRef}
      >
        <EditIcon />
      </Fab>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{
          zIndex: '100',
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
              zIndex: '100',
            }}
          >
            <Paper elevation={0} className={classes.transparentPaper}>
              <ClickAwayListener onClickAway={handleClose}>
                <StyledMenu autoFocusItem={open} id="menu-list-grow">
                  <MenuItem
                    className={classes.menuListItem}
                    children={
                      <Fab
                        className={classes.fabListItem}
                        color="primary"
                        variant="extended"
                        disabled={
                          !currentUser?.allowed_fields?.includes('python')
                        }
                        id="simple"
                        onClick={(e) => {
                          setChosenEditor('simple')
                        }}
                      >
                        Editor Simple
                      </Fab>
                    }
                    onClick={handleClose}
                  />
                  <MenuItem
                    className={classes.menuListItem}
                    children={
                      <Fab
                        className={classes.fabListItem}
                        color="primary"
                        variant="extended"
                        id="0"
                        onClick={(e) => setChosenEditor('complex')}
                      >
                        Editor HTML
                      </Fab>
                    }
                    onClick={handleClose}
                  />
                </StyledMenu>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {editExpanded && (
        <>
          <Button
            color="primary"
            variant="contained"
            id="simple"
            onClick={(e) => {
              setChosenEditor('simple')
            }}
          >
            Editor Simple
          </Button>
          <Button
            color="primary"
            variant="contained"
            id="0"
            onClick={(e) => setChosenEditor('complex')}
          >
            Editor HTML
          </Button>
        </>
      )}

      <Paper elevation={0} className={classes.paperAll}>
        <TemplateHeaders
          headers={Object.assign({}, data?.headers, data?.meta_data)}
          passChildData={doNothing}
        />
        <Paper
          className={classes.preview}
          dangerouslySetInnerHTML={createPreview()}
        />
      </Paper>
      {confirmDialog}
      {responseDialog}
    </>
  )
}

export default SingleTemplate
