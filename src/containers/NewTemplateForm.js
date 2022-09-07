import React, { useState, useEffect } from 'react'
import { importableTemplates, createTemplate } from 'services/api'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'context/alertDetails'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import GetAppIcon from '@material-ui/icons/GetApp'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TemplateInfo from 'components/TemplateInfo'

// TODO: Download the list from api
const sources = [
  { key: 'PROD', description: 'Producció' },
  { key: 'TESTING', description: 'Testing' },
  { key: 'DUMMY', description: 'Simulat' },
]

const useStyles = makeStyles((theme) => ({
  form_root: {},
  paper: {
    padding: '1rem',
    borderRadius: '0',
  },
  input: {
    width: '1fr',
    grow: 1,
  },
  container: {
    margin: '2rem 5rem',
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: '1.8rem',
    fontWeight: 500,
    marginBottom: '1.5rem',
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
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  spin: {
    animation: '$spin 1s linear infinite',
  },
  loadingTemplates: {
    margin: 'auto',
    height: '100%',
    paddingTop: '2rem',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  resultPaper: {},
}))
function NewTemplateForm(props) {
  const [xml_id, setXmlId] = useState(undefined)
  const [erp, setErp] = useState('PROD')
  const [filter, setFilter] = useState('')
  const [availableTemplates, setAvailableTemplates] = useState(undefined)
  const [data, setData] = useState([])
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()
  const { setAlertInfo } = useAlert()
  const classes = useStyles()

  useEffect(() => {
    setAvailableTemplates(undefined)
    importableTemplates(erp)
      .then((response) => setAvailableTemplates(response.templates))
      .catch((error) => {
        console.log('Error retrieving the templates')
        setAlertInfo({
          open: true,
          severity: 'error',
          message: "No s'ha pogut baixar la llista de plantilles",
        })
        setAvailableTemplates([])
      })
  }, [erp])

  props.setSearchVisible(false)

  const handleChangeSource = (event) => {
    setErp(event.target.value)
  }
  const inputChange = (event) => {
    setFilter(event.target.value)
  }
  const handleDownloadIcon = (event, xml_id) => {
    setXmlId(xml_id)
    // TODO: Loading mode
    createTemplate(xml_id)
      .then((response) => {
        setData(response)
        setRedirect(true)
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setAlertInfo({
            open: true,
            severity: 'error',
            message: "No s'ha trobat l'XML ID",
          })
        }
      })
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
        <Paper
          className={classes.paper}
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <TextField
            className={classes.input}
            id="template-filter"
            label="Filtre"
            helperText="Filtra per nom o identificador"
            variant="outlined"
            margin="dense"
            onChange={inputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={classes.input}
            select
            required
            label={"Instància d'ERP"}
            name="erp-source"
            helperText="Origen de la plantilla"
            variant="outlined"
            margin="dense"
            value={erp}
            onChange={handleChangeSource}
          >
            {sources.map((source) => (
              <MenuItem selected={source.key == erp} value={source.key}>
                {source.description}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
        <Paper
          style={{
            width: '1fr',
            minHeight: 'calc(100vh - 19rem)',
            maxHeight: 'calc(100vh - 19rem)',
            height: '100%',
            overflow: 'scroll',
          }}
        >
          {availableTemplates === undefined ? (
            <Typography className={classes.loadingTemplates} component="h3">
              Carregant llistat de plantilles de l'ERP {erp}...
            </Typography>
          ) : availableTemplates.length === 0 ? (
            <Typography className={classes.loadingTemplates} component="h3">
              No hi ha plantilles disponibles
            </Typography>
          ) : (
            <List>
              {availableTemplates
                .filter((item) => {
                  const niceFilter = filter.trim().toLowerCase()
                  return (
                    !niceFilter ||
                    item.name.toLowerCase().includes(niceFilter) ||
                    item.xml_id.toLowerCase().includes(niceFilter)
                  )
                })
                .map((item, i) => (
                  <ListItem key={i} button selected={xml_id === item.xml_id}>
                    <ListItemText primary={item.name} secondary={item.xml_id} />
                    <ListItemSecondaryAction>
                      <IconButton
                        disabled={xml_id !== undefined}
                        aria-label="Import Template"
                        color="primary"
                        onClick={(ev) => handleDownloadIcon(ev, item.xml_id)}
                      >
                        {xml_id !== item.xml_id ? (
                          <GetAppIcon />
                        ) : (
                          <AutorenewIcon className={classes.spin} />
                        )}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          )}
        </Paper>
      </form>
    </div>
  )
}

export default NewTemplateForm
