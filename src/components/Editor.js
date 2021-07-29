import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import { startEditing, saveEditChanges, discardEditChanges } from 'services/api'
import TemplateHeaders from 'components/TemplateHeaders'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SimpleEditor from './SimpleEditor'
import RichTextEditor from './RichTextEditor'
import CaseList from './CaseList'

const useStyles = makeStyles((theme) => ({
  editor: {
    width: '100%',
  },
  container: {
    margin: '1% 10%',
    textAlign: 'center',
  },
  buttonGroup: {
    marginTop: '2%',
    textAlign: 'justify',
    display: 'flex',
    justifyContent: 'space-around',
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

  useEffect(() => {
    startEditing(id)
      .then((response) => {
        setData(response)
        setIsNewEdit(response.created)
        console.log('response', response)
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

  const saveChanges = (e) => {
    saveEditChanges(id, editorText, groupEditorText, headersData)
      .then((response) => {
        setSaveEditsResponse(response?.result)
        setIsNewEdit(false)
      })
      .catch((error) => {})
  }
  const discardChanges = (e) => {
    discardEditChanges(id)
      .then((response) => {
        history.push('/')
      })
      .catch((error) => {})
  }

  console.log('selected', selectedCase)
  console.log('allowed', editor)
  return (
    <div className={classes.container}>
      <Typography variant="h3" component="h2">
        {headersData.name}
      </Typography>
      <TemplateHeaders
        passChildData={setHeadersdData}
        enabledFields={data?.allowed_fields}
        headers={headersData}
      />
      <Accordion>
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
            Descartar l'edició
          </Button>
        )}

        <Button
          color="secundary"
          variant="outlined"
          onClick={(e) => {
            console.log('entrooo', isNewEdit)
            if (isNewEdit) {
              discardChanges(e)
            } else {
              console.log('else')
              history.push('/')
            }
          }}
        >
          Sortir Sense Guardar
        </Button>

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
          console.log('seleeecteeed', selectedCase)
        }}
      />
    </div>
  )
}

export default Editor
