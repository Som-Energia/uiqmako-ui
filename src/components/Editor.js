import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import { startEditing, saveEditChanges, uploadEdit } from 'services/api'
import TemplateHeaders from 'components/TemplateHeaders'
import Accordion from '@material-ui/core/Accordion'
import Paper from '@material-ui/core/Paper'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SimpleEditor from './SimpleEditor'
import RichTextEditor from './RichTextEditor'
import CaseList from './CaseList'
import SourcesList from './SourcesList'

const useStyles = makeStyles((theme) => ({
  editor: {
    width: '100%',
  },
  container: {
    margin: '1% 10%',
    textAlign: 'center',
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
  const [openSourcesList, setOpenSourcesList] = useState(false)
  const [selectedCase, setSelectedCase] = useState(false)
  const [selectedSource, setSelectedSource] = useState(false)
  const history = useHistory()

  useEffect(() => {
    startEditing(id)
      .then((response) => {
        setData(response)
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
      })
      .catch((error) => {})
  }
  useEffect(() => {
    if (selectedSource && selectedSource !== undefined) {
      uploadEdit(editId, selectedSource)
        .then((response) => {
          console.log(response)
          history.push('/')
        })
        .catch((error) => {
          console.log('error')
        })
    }
  }, [selectedSource])

  console.log('selected', selectedCase)
  console.log('allowed', editor)
  return (
    <Paper className={classes.container}>
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
      <Button
        color="primary"
        variant="contained"
        onClick={(e) => history.push('/')}
      >
        Cancel·lar Canvis
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
        Guardar Canvis i veure resultat
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={(e) => {
          saveChanges(e)
          setOpenSourcesList(true)
        }}
      >
        Guardar Canvis i pujar-los a l'ERP
      </Button>
      <CaseList
        data={{}}
        open={openCaseDialog}
        template_id={id}
        onClose={(e) => {
          setSelectedCase(e)
          setOpenCaseDialog(false)
          console.log('seleeecteeed', selectedCase)
        }}
      />
      <SourcesList
        data={{}}
        open={openSourcesList}
        onClose={(e) => {
          setSelectedSource(e)
          setOpenSourcesList(false)
          console.log('sourceee   seleeecteeed', selectedSource)
        }}
      />
    </Paper>
  )
}

export default Editor
