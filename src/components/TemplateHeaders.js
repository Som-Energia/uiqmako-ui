import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

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
  const [modifiedFields, setFields] = useState(headers)
  const classes = useStyles()

  return (
    <Paper>
      {fields?.map((item, index) => (
        <TextField
          className={classes.textField}
          label={item.key}
          id={item.key}
          fullWidth
          margin="dense"
          variant="outlined"
          style={{ width: item.width }}
          onChange={(event) => {
            setFields((prevModifiedFields) => ({
              ...prevModifiedFields,
              [event.target.id]: event.target.value,
            }))
            props.passChildData(modifiedFields)
          }}
          //disabled={!enabledFields.includes(item.key)}
          value={modifiedFields?.[item.key] || ''}
        />
      ))}
    </Paper>
  )
}
export default TemplateHeaders
