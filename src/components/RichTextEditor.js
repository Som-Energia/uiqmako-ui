import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import SunEditor, { buttonList } from 'suneditor-react'
import { getSingleTemplate } from '../services/api'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import { Paper } from '@material-ui/core'
import { TextareaAutosize } from '@material-ui/core'
import TemplateHeaders from './TemplateHeaders'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const editorButtons = [
  ['undo', 'redo'],
  ['fontSize', 'formatBlock'],
  ['paragraphStyle', 'blockquote'],
  ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
  ['fontColor', 'hiliteColor'],
  ['outdent', 'indent'],
  ['align', 'horizontalRule', 'list'],
  ['table', 'link', 'image'],
  ['preview', 'codeView'],
]
const useStyles = makeStyles((theme) => ({
  editor: {
    width: '100%',
  },
  container: {
    margin: '1%',
    textAlign: 'center',
  },
}))

function RichTextEditor(props) {
  const [editorsTexts, setTexts] = useState([
    ['html', 'Text'],
    ['html', ' '],
  ])
  const classes = useStyles()
  const { id } = useParams()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [headersData, setHeadersdData] = useState({})

  useEffect(() => {
    getSingleTemplate(id)
      .then((response) => {
        setData(response)
        setIsLoading(false)
        setTexts(response.body_text_by_type)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [id])
  const handleChange = (text, index) => {
    let editorsTextsCopy = [...editorsTexts]
    editorsTextsCopy[index][1] = text
    setTexts(editorsTextsCopy)
    console.log(editorsTexts)
  }
  const handleSave = (text, isChanged) => {}
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
          <Paper>
            <ul className="list-template">
              {editorsTexts.length > 0 &&
                editorsTexts?.map(
                  (item, index) =>
                    (item[0] === 'html' && (
                      <SunEditor
                        id={index}
                        setContents={item[1]}
                        onChange={(e) => handleChange(e, index)}
                        setDefaultStyle="text-align: left;"
                        height={(item[1].lenght > 20 && '500px') || '200px'}
                        setOptions={{
                          callBackSave: handleSave,
                          buttonList: editorButtons,
                        }}
                      />
                    )) || (
                      <TextareaAutosize
                        id={index}
                        value={(data && item[1]) || 'Text'}
                        onChange={(e) => handleChange(e.target.value, index)}
                        className={classes.editor}
                        //rowsMin={10}
                        rowsMax={10}
                        width="80%"
                      />
                    )
                )}
            </ul>
          </Paper>
        </AccordionDetails>
      </Accordion>
      <Button
        color="primary"
        variant="contained"
        onClick={(event) => console.log('editortext', editorsTexts)}
      >
        Guardar Canvis
      </Button>
    </Paper>
  )
}

export default RichTextEditor
