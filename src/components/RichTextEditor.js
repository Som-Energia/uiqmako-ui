import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import { TextareaAutosize } from '@material-ui/core'

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
  [
    'bold',
    'underline',
    'italic',
    'strike',
    'subscript',
    'superscript',
    'removeFormat',
  ],
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
  const { data } = props

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
                height={'auto'}
                setOptions={{
                  buttonList: editorButtons,
                  mode: 'classic',
                  defaultTag: 'html_block',
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
                rowsMax={10}
                width="80%"
              />
            )
        )}
    </div>
  )
}

export default RichTextEditor
