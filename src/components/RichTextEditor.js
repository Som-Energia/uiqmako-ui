import { React, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import SunEditor from 'suneditor-react'
import { startEditing, saveEditChanges } from 'services/api'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import { Paper } from '@material-ui/core'
import { TextareaAutosize } from '@material-ui/core'
import TemplateHeaders from 'components/TemplateHeaders'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

let editorButtons = [
  ['undo', 'redo'],
  [
    ':p-More Paragraph-default.more_paragraph',
    'font',
    'fontSize',
    'formatBlock',
    'paragraphStyle',
    'blockquote',
  ],
  ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
  ['fontColor', 'hiliteColor'],
  ['outdent', 'indent'],
  ['align', 'horizontalRule', 'list', 'lineHeight'],
  ['table', 'link', 'image'],
  ['preview', 'codeView'],
]

const useStyles = makeStyles((theme) => ({
  editorSimple: {
    width: '99.5%',
    maxWidth: '99.5%',
    margin: '1% 0',
  },
  editorComplex: {
    borderColor: 'red',
  },
  container: {
    margin: '1%',
    textAlign: 'center',
  },
  editorsList: {
    // margin: '3% 3% 3% 3%',
    width: '100%',
    minWidth: '100%',
    display: 'inline-block',
  },
}))

function RichTextEditor(props) {
  const [editorsTexts, setTexts] = useState([[]])
  const classes = useStyles()
  const { id } = useParams()
  const [data, setData] = useState([])
  const [saveEditsResponse, setSaveEditsResponse] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isHTMLallowed, setIsHTMLallowed] = useState(false)
  const [disabledEditors, setDisabledEditors] = useState([])
  const [headersData, setHeadersdData] = useState({})
  const history = useHistory()

  useEffect(() => {
    startEditing(id)
      .then((response) => {
        setData(response)
        setIsLoading(false)
        setTexts(response.text.by_type)
        setHeadersdData(Object.assign({}, response.headers, response.meta_data))
        console.log('abans', response)
        setDisabledEditors(Array(response.text.by_type.length).fill(false))
        if (response.allowed_fields.includes('html')) {
          setIsHTMLallowed(true)
        }
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [id])
  const handleChange = (text, index) => {
    let editorsTextsCopy = [...editorsTexts]
    editorsTextsCopy[index][1] = text
    setTexts(editorsTextsCopy)
  }
  const saveChanges = (e) => {
    saveEditChanges(id, '', editorsTexts, headersData)
      .then((response) => {
        setSaveEditsResponse(response?.result)
        setIsLoading(false)
        if (response?.result) {
          history.push('/')
        }
        // setTexts(response.text.by_type)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }
  console.log('abansfora', disabledEditors)

  const updateDisabled = (isCodeView, index) => {
    let value = false
    console.log('en a uncio', data)
    console.log('abans', index, disabledEditors)
    if (isCodeView && !isHTMLallowed) {
      value = true
      console.log('hodsa')
    }
    let copy = [...disabledEditors]
    console.log('copy', copy)
    copy[index] = value
    setDisabledEditors(copy)
    console.log(disabledEditors[index])
  }

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
          <div style={{ display: 'inline-block', width: '100%' }}>
            <div className={classes.editorsList}>
              {editorsTexts?.length > 0 &&
                editorsTexts?.map(
                  (item, index) =>
                    (item[0] === 'html' && (
                      <SunEditor
                        key={index}
                        className={classes.editorComplex}
                        id={index}
                        setContents={item[1]}
                        toggleCodeView={(isCodeView) =>
                          updateDisabled(isCodeView, index)
                        }
                        disabled={disabledEditors[index]}
                        onChange={(e) => handleChange(e, index)}
                        setDefaultStyle="text-align: left; display: inline-block"
                        //minHeight={'100px'}
                        height={'auto'}
                        setOptions={{
                          mode: 'inline',
                          buttonList: editorButtons,
                        }}
                      />
                    )) || (
                      <TextareaAutosize
                        id={index}
                        value={(data && item[1]) || 'Text'}
                        onChange={(e) => handleChange(e.target.value, index)}
                        className={classes.editorSimple}
                        disabled={!data?.allowed_fields?.includes('python')}
                        //rowsMin={10}
                        rowsMax={10}
                        width="80%"
                      />
                    )
                )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Button color="primary" variant="contained" onClick={saveChanges}>
        Guardar Canvis
      </Button>
    </Paper>
  )
}

export default RichTextEditor
