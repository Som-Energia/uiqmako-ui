import React, { useEffect, useState } from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { makeStyles } from '@material-ui/core/styles'

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
  const { data, setEditorText } = props
  const [modifiedText, setModifiedText] = useState('')
  useEffect(() => {
    setModifiedText(data?.text?.def_body_text)
  }, [data?.meta_data?.id])

  console.log('dis', data?.text?.def_body_text)
  return (
    <TextareaAutosize
      value={modifiedText}
      className={classes.editor}
      rowsMin={10}
      //disabled={props.disabledField}
      onChange={(event) => {
        setModifiedText(event.target.value)
        setEditorText(event.target.value)
      }}
    />
  )
}

export default SimpleEditor
