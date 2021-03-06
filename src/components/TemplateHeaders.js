import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  textField: {
    display: 'inline-block',
    width: '50%',
  },
  container: {
    padding: '10px',
  },
  heading: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
}))

const fields = [
  {
    key: 'name',
    width: '100%',
  },
  {
    key: 'def_subject',
    width: '100%',
  },
  {
    key: 'def_to',
    width: '49%',
    marginRight: '2%',
  },
  {
    key: 'def_bcc',
    width: '49%',
  },
  {
    key: 'lang',
    width: '49%',
    marginRight: '2%',
  },
  {
    key: 'model_int_name',
    width: '49%',
  },
]
function TemplateHeaders(props) {
  const { enabledFields, headers } = props
  const [modifiedFields, setFields] = useState({})
  const classes = useStyles()
  useEffect(() => {
    setFields((p) => ({ ...headers }))
  }, [headers?.id])

  useEffect(() => {
    props.passChildData(modifiedFields)
  }, [modifiedFields])
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Capçaleres</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.container}>
          {fields?.map((item, index) => (
            <TextField
              className={classes.textField}
              label={item.key}
              id={item.key}
              key={item.key}
              fullWidth
              margin="dense"
              variant="outlined"
              style={{ width: item.width, marginRight: item.marginRight }}
              onChange={(event) => {
                setFields((prevModifiedFields) => ({
                  ...prevModifiedFields,
                  [event.target.id]: event.target.value,
                }))
              }}
              disabled={!enabledFields?.includes(item.key)}
              value={modifiedFields?.[item.key] || ''}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
export default TemplateHeaders
