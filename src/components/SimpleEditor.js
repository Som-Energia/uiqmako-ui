import React, { useEffect, useState } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import { startEditing, saveEditChanges } from 'services/api'
import TemplateHeaders from 'components/TemplateHeaders'
import Accordion from '@material-ui/core/Accordion'
import Paper from '@material-ui/core/Paper'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  editor: {
    width: '100%',
  },
  container: {
    margin: '1% 10%',
    textAlign: 'center',
  },
}))

function SimpleEditor(props) {
  const classes = useStyles()
  const { id } = useParams()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editorText, setText] = useState('')
  const [headersData, setHeadersdData] = useState({})
  const [saveEditsResponse, setSaveEditsResponse] = useState([])
  const history = useHistory()

  useEffect(() => {
    startEditing(id)
      .then((response) => {
        setData(response)
        setIsLoading(false)
        setText(response.text.def_body_text)
        setHeadersdData(Object.assign({}, response.headers, response.meta_data))
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [id])
  const saveChanges = (e) => {
    saveEditChanges(id, editorText, [], headersData)
      .then((response) => {
        setSaveEditsResponse(response?.result)
        setIsLoading(false)
        if (response?.result) {
          history.push('/')
        }
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }
  console.log('allowed', data.allowed_fields)
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
          <TextareaAutosize
            value={editorText || 'Text'}
            className={classes.editor}
            rowsMin={10}
            disabled={!data?.allowed_fields.includes('python')}
            onChange={(event) => setText(event.target.value)}
          />
        </AccordionDetails>
      </Accordion>
      <Button color="primary" variant="contained" onClick={saveChanges}>
        Guardar Canvis
      </Button>
    </Paper>
  )
}

export default SimpleEditor
