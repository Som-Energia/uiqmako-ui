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
  const [modifiedTexts, setModifiedTexts] = useState([[]])
  const classes = useStyles()
  const { id } = useParams()
  const { data } = props
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    setModifiedTexts(data?.text?.by_type)
  }, [data?.meta_data?.id])

  const handleChange = (text, index) => {
    let modifiedTextsCopy = [...modifiedTexts]
    modifiedTextsCopy[index][1] = text
    props.setEditorText(modifiedTextsCopy)
  }

  return (
    <div className={classes.editorsList}>
      {modifiedTexts?.length > 0 &&
        modifiedTexts?.map(
          (item, index) =>
            (item[0] === 'html' && (
              <SunEditor
                key={index}
                className={classes.editorComplex}
                id={index}
                setContents={item[1]}
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
                key={index}
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
  )
}

export default RichTextEditor
