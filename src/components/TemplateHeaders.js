import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
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
}))

const fields = [
  {
    key: 'name',
    width: '80%',
  },
  {
    key: 'def_subject',
    width: '80%',
  },
  {
    key: 'def_to',
    width: '40%',
  },
  {
    key: 'def_bcc',
    width: '40%',
  },
  {
    key: 'lang',
    width: '40%',
  },
  {
    key: 'model_int_name',
    width: '40%',
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
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Capçaleres</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {fields?.map((item, index) => (
            <TextField
              className={classes.textField}
              label={item.key}
              id={item.key}
              key={item.key}
              fullWidth
              margin="dense"
              variant="outlined"
              style={{ width: item.width }}
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
