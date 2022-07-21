import React, { useState } from 'react'
import { createTemplate } from 'services/api'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, TextField, Typography, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import TemplateInfo from 'components/TemplateInfo'
import { useAlert } from 'context/alertDetails'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '2rem',
    marginTop: '1.5rem',
    textAlign: 'center',
    borderRadius: '0',
  },
  input: {
    width: '100%',
  },
  container: {
    margin: '2rem 5rem',
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: '1.8rem',
    fontWeight: 500,
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  singleButton: {
    width: '15%',
    margin: '0 auto',
    marginTop: theme.spacing(2),
  },
  resultPaper: {},
}))
function NewTemplateForm(props) {
  const classes = useStyles()
  const [xml_id, setXmlId] = useState('')
  const [data, setData] = useState([])
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()
  const { setAlertInfo } = useAlert()

  props.setSearchVisible(false)

  const inputChange = (event) => {
    setXmlId(event.target.value)
  }
  const handleCreateTemplate = (event) => {
    event.preventDefault()
    createTemplate(xml_id)
      .then((response) => {
        setData(response)
        setRedirect(true)
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setAlertInfo({
            open: true,
            message: "No s'ha trobat l'ID Semàntic",
            severity: 'error',
          })
        }
      })
  }
  if (redirect) {
    var text = data?.created
      ? 'Plantilla creada correctament'
      : data?.conflict
      ? 'Ja existeix una plantilla algun camp coincident'
      : 'Ja existeix aquesta plantilla'

    if (redirect)
      return (
        <>
          <div className={classes.container}>
            <Typography className={classes.title} component="h2" variant="h3">
              {text}
            </Typography>
          </div>
          <TemplateInfo item={data.template} setClicked={(e) => undefined} />
          <Button
            variant="outlined"
            onClick={(e) => {
              history.push('/')
            }}
            color="primary"
            className={classes.singleButton}
          >
            Tornar a la llista
          </Button>
        </>
      )
  }
  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h3">
        Afegir una nova plantilla
      </Typography>
      <form
        className={classes.form_root}
        autoComplete="off"
        onSubmit={handleCreateTemplate}
      >
        <Paper className={classes.paper}>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Id semàntic"
            variant="outlined"
            required={true}
            onChange={inputChange}
          />
        </Paper>
        <div className={classes.buttons}>
          <Button
            variant="outlined"
            onClick={(e) => {
              history.push('/')
            }}
            color="primary"
            className={classes.singleButton}
          >
            Cancel·lar
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className={classes.singleButton}
          >
            Afegeix
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewTemplateForm
