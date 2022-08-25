import { React, useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextareaAutosize } from '@material-ui/core'

import { Editor } from '@tinymce/tinymce-react'

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
  const editorRef = useRef({})

  useEffect(() => {
    setModifiedTexts(data?.text?.by_type)
  }, [data?.meta_data?.id])

  const handleChange = (text, index) => {
    let modifiedTextsCopy = [...modifiedTexts]
    modifiedTextsCopy[index][1] = editorRef.current[index].getContent()
    props.setEditorText(modifiedTextsCopy)
  }

  return (
    <div className={classes.editorsList}>
      {modifiedTexts?.length > 0 &&
        modifiedTexts?.map(
          (item, index) =>
            (item[0] === 'html' && (
              <Editor
                id={index}
                key={index}
                tinymceScriptSrc={
                  process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'
                }
                onInit={(evt, editor) => (editorRef.current[index] = editor)}
                value={item[1]}
                onEditorChange={(e) => handleChange(e, index)}
                init={{
                  menubar: false,
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'preview',
                    'help',
                    'wordcount',
                    'code',
                  ],
                  toolbar:
                    'undo redo | blocks | ' +
                    'bold italic backcolor forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help |' +
                    'image code',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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
