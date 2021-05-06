import { React, useEffect, useState } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { getSingleTemplate } from 'services/api'
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
    width: '80%',
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
  useEffect(() => {
    getSingleTemplate(id)
      .then((response) => {
        setData(response)
        setIsLoading(false)
        setText(response.template.def_body_text)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [id])
  return (
    <Paper className={classes.container}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Capçaleres</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TemplateHeaders
            passChildData={setHeadersdData}
            enabledFields={[]}
            headers={data.template}
          />
        </AccordionDetails>
      </Accordion>
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
            width="80%"
            onChange={(event) => setText(event.target.value)}
          />
        </AccordionDetails>
      </Accordion>
      <Button color="primary" variant="contained" onClick={(event) => {}}>
        Guardar Canvis
      </Button>
    </Paper>
  )
}

export default SimpleEditor
