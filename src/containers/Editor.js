import React, { useEffect, useState } from 'react'
import { useConfirm } from 'material-ui-confirm'
import { makeStyles } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import {
  checkEdits,
  startEditing,
  saveEditChanges,
  discardEditChanges,
} from 'services/api'
import TemplateHeaders from 'components/TemplateHeaders'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SimpleEditor from '../components/SimpleEditor'
import RichTextEditor from '../components/RichTextEditor'
import CaseList from '../components/CaseList'
import { useAlert } from 'context/alertDetails'

//import { useAuth } from 'context/currentUser'
import { useAuth } from 'context/sessionContext'

const useStyles = makeStyles((theme) => ({
  editor: {
    width: '100%',
  },
  container: {
    margin: '2rem 5rem',
  },
  buttonGroup: {
    marginTop: '2%',
    textAlign: 'justify',
    display: 'flex',
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: '1.8rem',
    fontWeight: 500,
  },
  heading: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
}))

function Editor(props) {
  const classes = useStyles()
  const { editor, id } = useParams()
  const [data, setData] = useState([])
  const [editorText, setText] = useState('')
  const [editId, setEditId] = useState('')
  const [groupEditorText, setGroupEditorText] = useState([])
  const [headersData, setHeadersdData] = useState({})
  const [saveEditsResponse, setSaveEditsResponse] = useState([])
  const [openCaseDialog, setOpenCaseDialog] = useState(false)
  const [selectedCase, setSelectedCase] = useState(false)
  const [isNewEdit, setIsNewEdit] = useState(false)
  const history = useHistory()
  const { setAlertInfo } = useAlert()

  const { currentUser } = useAuth()

  const confirm = useConfirm()

  useEffect(() => {
    startEditing(id)
      .then((response) => {
        setData(response)
        setIsNewEdit(response.created)
        setEditId(response['edit_id'])
        setText(response.text.def_body_text)
        setHeadersdData(Object.assign({}, response.headers, response.meta_data))
      })
      .catch((error) => {})
  }, [id])
  useEffect(() => {
    if (selectedCase) {
      history.push(`/render/${editId}/${selectedCase}`)
    }
  }, [selectedCase, editId])

  const handleEditError = (error) => {
    let message = 'Hi ha hagut un error.'
    checkEdits(id)
      .then((response) => {
        if (response.current_edits[0].user_id !== currentUser.id) {
          message = `L'edició és propietat de ${response.current_edits[0].user.username}`
        }
        setAlertInfo({
          open: true,
          message: message,
          severity: 'error',
        })
      })
      .catch((error) => {
        setAlertInfo({
          open: true,
          message: message,
          severity: 'error',
        })
      })
  }

  const saveChanges = (e) => {
    saveEditChanges(id, editorText, groupEditorText, headersData)
      .then((response) => {
        setSaveEditsResponse(response?.result)
        setIsNewEdit(false)
        setAlertInfo({
          open: true,
          message: "L'edició s'ha guardat correctament.",
          severity: 'success',
        })
      })
      .catch(handleEditError)
  }

  const changeEditor = (e) => {
    saveEditChanges(id, editorText, groupEditorText, headersData)
      .then((response) => {
        setSaveEditsResponse(response?.result)
        setIsNewEdit(false)
        setAlertInfo({
          open: true,
          message: "L'edició s'ha guardat correctament.",
          severity: 'success',
        })
        startEditing(id)
          .then((response) => {
            setData(response)
            setIsNewEdit(response.created)
            setEditId(response['edit_id'])
            setText(response.text.def_body_text)
            setHeadersdData(
              Object.assign({}, response.headers, response.meta_data)
            )
            if (editor === 'complex') {
              /* When switching to the simple editor groupEditorText must be empty. Otherwise, the API will
              always store this value (which the simple editor does not use) instead of the editorText value. */
              setGroupEditorText([])
            }
            history.push(
              `/edit/${editor === 'simple' ? 'complex' : 'simple'}/${id}`
            )
          })
          .catch((error) => {})
      })
      .catch(handleEditError)
  }

  const discardChanges = (e) => {
    confirm({
      title: 'Confirmació',
      description: "S'eliminarà l'edició permanentment, vols continuar?",
      confirmationText: 'Continuar',
      cancellationText: 'Cancel·lar',
    }).then(() => {
      discardEditChanges(id)
        .then((response) => {
          history.push('/')
        })
        .catch(handleEditError)
    })
  }

  return (
    <div className={classes.container}>
      <Typography variant="h3" component="h2" className={classes.title}>
        {headersData.name}
      </Typography>
      <TemplateHeaders
        passChildData={setHeadersdData}
        enabledFields={data?.allowed_fields}
        headers={headersData}
      />
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Cos del correu</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {(editor === 'simple' && (
            <SimpleEditor
              data={data}
              className={classes.editor}
              disabledField={!data?.allowed_fields?.includes('python')}
              setEditorText={setText}
            />
          )) || (
            <RichTextEditor data={data} setEditorText={setGroupEditorText} />
          )}
        </AccordionDetails>
      </Accordion>
      <div className={classes.buttonGroup}>
        {!isNewEdit && (
          <Button
            color="secundary"
            variant="outlined"
            onClick={(e) => discardChanges(e)}
          >
            Eliminar l'edició
          </Button>
        )}

        <Button
          color="secundary"
          variant="outlined"
          onClick={(e) => {
            if (isNewEdit) {
              discardChanges(e)
            } else {
              history.push('/')
            }
          }}
        >
          Sortir Sense Guardar
        </Button>

        {editor === 'simple' ? (
          <Button
            color="secundary"
            variant="contained"
            disabled={true}
            onClick={(e) => {
              changeEditor(e)
            }}
          >
            Editor HTML
          </Button>
        ) : (
          <Button
            color="secundary"
            variant="contained"
            disabled={true}
            // disabled={!currentUser?.allowed_fields?.includes('python')}
            onClick={(e) => {
              changeEditor(e)
            }}
          >
            Editor Simple
          </Button>
        )}

        <Button color="primary" variant="contained" onClick={saveChanges}>
          Guardar Canvis
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={(e) => {
            saveChanges(e)
            setOpenCaseDialog(true)
          }}
        >
          Veure resultat
        </Button>
      </div>
      <CaseList
        data={{}}
        open={openCaseDialog}
        templateId={id}
        editId={editId}
        onClose={(e) => {
          setSelectedCase(e)
          setOpenCaseDialog(false)
        }}
      />
    </div>
  )
}

export default Editor
