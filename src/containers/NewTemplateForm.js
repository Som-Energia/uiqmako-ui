import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { createTemplate } from '../services/api'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, TextField, Typography, Button } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import TemplateInfo from '../components/TemplateInfo'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: '2rem',
    width: '80%',
    padding: '2rem',
    margin: '0 auto',
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  input: {
    paddingBottom: '1rem',
    width: '80%',
  },
  title: {
    fontSize: '3em',
    color: '#7c828e',
    marginBottom: '2%',
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  singleButton: {
    width: '15%',
    margin: '1%',
  },
  resultPaper: {},
}))
function NewTemplateForm() {
  const classes = useStyles()
  const [xml_id, setXmlId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [redirect, setRedirect] = useState(false)

  const inputChange = (event) => {
    setXmlId(event.target.value)
    //TODO: call api
  }
  const handleCreateTemplate = (event) => {
    event.preventDefault()
    createTemplate(xml_id)
      .then((response) => {
        setData(response)
        setIsLoading(false)
        setRedirect(true)
      })
      .catch((error) => {
        setIsLoading(false)
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
        <div>
          <Typography className={classes.title} variant="h3">
            {text}
          </Typography>
          <TemplateInfo item={data.template} />
          <Button
            variant="outlined"
            to={{ pathname: '/' }}
            component={Link}
            color="primary"
            className={classes.singleButton}
          >
            Tornar a la llista
          </Button>
        </div>
      )
  }
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h3">
          Afegir una nova plantilla
        </Typography>
        <form
          className={classes.form_root}
          autoComplete="off"
          onSubmit={handleCreateTemplate}
        >
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Id semàntic"
            variant="outlined"
            required={true}
            onChange={inputChange}
          />
          <div className={classes.buttons}>
            <Button
              variant="outlined"
              to={{ pathname: '/' }}
              component={Link}
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
      </Paper>
    </div>
  )
}

export default NewTemplateForm
