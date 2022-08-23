import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

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
    label: 'TEMPLATE_HEADERS_LABEL_NAME',
    key: 'name',
    width: '100%',
  },
  {
    label: 'TEMPLATE_HEADERS_LABEL_SUBJECT',
    key: 'def_subject',
    width: '100%',
  },
  {
    label: 'TEMPLATE_HEADERS_LABEL_RECIPIENT',
    key: 'def_to',
    width: '49%',
    marginRight: '2%',
  },
  {
    label: 'TEMPLATE_HEADERS_LABEL_BCC',
    key: 'def_bcc',
    width: '49%',
  },
  {
    label: 'TEMPLATE_HEADERS_LABEL_LANGUAGE_SOURCE',
    key: 'lang',
    width: '49%',
    marginRight: '2%',
  },
  {
    label: 'TEMPLATE_HEADERS_LABEL_MODEL_INTERNAL_NAME',
    key: 'model_int_name',
    width: '49%',
  },
]
function TemplateHeaders(props) {
  const { t } = useTranslation()
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
              label={t(item.label)}
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
