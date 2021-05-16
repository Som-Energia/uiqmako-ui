import { React, useEffect, useState } from 'react'
import { checkEdits } from 'services/api'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import TemplateInfo from 'components/TemplateInfo'
import TemplateHeaders from 'components/TemplateHeaders'
import RichTextEditor from 'components/RichTextEditor'

const useStyles = makeStyles((theme) => ({
  editor: {
    textAlign: 'left',
  },
  editorContainer: {
    textAlign: 'left',
    margin: '0 auto',
    padding: '2% 10%',
  },
  paper: {
    overflow: 'auto',
    padding: '2%',
  },
  preview: {
    padding: '2%',
  },
}))

function SingleTemplate(props) {
  const { id } = useParams()
  const { data, templateId } = props
  const [editResponse, setEditResponse] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [confirmEdit, setConfirmEdit] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [chosenEditor, setChosenEditor] = useState(false)
  const classes = useStyles()
  const history = useHistory()
  const createPreview = () => {
    return {
      __html: data?.text.def_body_text || 'TEXT',
    }
  }
  useEffect(() => {
    if (chosenEditor !== false) {
      checkEdits(templateId, confirmEdit)
        .then((response) => {
          console.log('ab', response)
          setEditResponse(response)
          setIsLoading(false)
          if (response.current_edits && response.current_edits.length !== 0) {
            setOpenDialog(true)
          } else {
            history.push(`/edit/${chosenEditor}/${templateId}`)
          }
        })
        .catch((error) => {
          setIsLoading(false)
        })
    }
  }, [chosenEditor])

  const doNothing = (e) => console.log(e)

  const confirmDialog = (
    <div>
      <Dialog
        open={openDialog}
        onClose={(e) => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alerta</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Actualment hi ha ${editResponse?.current_edits?.length} edicions en curs`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => setOpenDialog(false)} color="primary">
            Cancel·lar
          </Button>
          <Button
            onClick={(e) => history.push(`/edit/${chosenEditor}/${templateId}`)}
            color="primary"
            autoFocus
          >
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
  return (
    <div>
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
      <Paper className={classes.paper}>
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
    </div>
  )
}

export default SingleTemplate