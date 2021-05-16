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
