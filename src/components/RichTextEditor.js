import { React, useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextareaAutosize } from '@material-ui/core'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react'

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
  }, [data?.meta_data?.id, data?.text?.by_type])

  const handleChange = (text, index, editorType) => {
    let modifiedTextsCopy = [...modifiedTexts]
    if (editorType == 'tiny') {
      modifiedTextsCopy[index][1] = editorRef.current[index].getContent()
    } else {
      modifiedTextsCopy[index][1] = text
    }

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
                onEditorChange={(e) => handleChange(e, index, 'tiny')}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') e.preventDefault()
                }}
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
                    'undo redo removeformat pastetext | styles  fontfamily fontsize | ' +
                    'bold italic underline backcolor forecolor | alignleft aligncenter ' +
                    'alignright alignjustify lineheight | bullist numlist outdent indent | ' +
                    'image link table | charmap searchreplace | code help',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
            )) || (
              <TextareaAutosize
                id={index}
                key={index}
                value={(data && item[1]) || 'Text'}
                onChange={(e) => handleChange(e.target.value, index, 'simple')}
                className={classes.editorSimple}
                disabled={!data?.allowed_fields?.includes('python')}
                rowsMax={10}
                width="80%"
                onKeyDown={(e) => {
                  if (e.key === 'Tab') e.preventDefault()
                }}
              />
            )
        )}
    </div>
  )
}

RichTextEditor.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.shape({
      by_type: PropTypes.array,
    }),
    meta_data: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
}

export default RichTextEditor
