import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getTemplateCases, uploadEdit } from 'services/api'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useParams, useHistory } from 'react-router-dom'
import RenderResultStep from './RenderResultStep'
import SourcesList from './SourcesList'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  stepper: {
    width: '60%',
    margin: '1rem 20%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  progress: {
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

function CaseStepper(props) {
  const classes = useStyles()
  const { template_id, edit_id } = useParams()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [openSourcesList, setOpenSourcesList] = useState(false)
  const [selectedSource, setSelectedSource] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const history = useHistory()

  useEffect(() => {
    getTemplateCases(template_id)
      .then((response) => {
        setData(response)
      })
      .catch((error) => {})
  }, [template_id])

  useEffect(() => {
    if (selectedSource && selectedSource !== undefined) {
      uploadEdit(edit_id, selectedSource)
        .then((response) => {
          history.push('/')
          setSelectedSource('')
        })
        .catch((error) => {
          console.log('--', error)
          if (error.response?.status === 409) {
            if (
              error.response.data?.detail ===
              'Edit from an outdated template version'
            ) {
              setOpenDialog(true)
            } else {
              console.log('else', error.response)
            }
          }
          setSelectedSource('')
          console.log('error')
        })
    }
  }, [selectedSource])

  const handleNext = () => {
    setLoading(true)
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setLoading(true)
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }
  console.log(activeStep)
  console.log('if', activeStep === 0)

  const conflictDialog = (
    <>
      <Dialog
        open={openDialog}
        onClose={(e) => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alerta</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Error en pujar els canvis: l'edició parteix d'una versió vella de la
            plantilla
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              setOpenDialog(false)
            }}
            color="primary"
          >
            Tancar
          </Button>
          <Button
            onClick={(e) => history.push(`/edit/complex/${template_id}`)}
            color="primary"
            autoFocus
          >
            Tornar a l'editor
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        alternativeLabel
      >
        {data?.cases?.map((item, idx) => (
          <Step key={idx}>
            <StepLabel>{item.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === data?.cases?.length ? (
          <div>
            <Typography className={classes.instructions}>
              Tots els casos marcats com a correctes
            </Typography>
            <Button onClick={handleReset}>Tornar a l'inici</Button>
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => {
                setOpenSourcesList(true)
              }}
            >
              Pujar canvis a l'ERP
            </Button>
          </div>
        ) : (
          data?.cases &&
          data?.cases.length !== 0 && (
            <div>
              <RenderResultStep
                setLoading={setLoading}
                setError={setError}
                setAlertProps={props.setAlertProps}
                editId={edit_id}
                caseId={data?.cases[activeStep].id}
              />

              <div>
                <Button
                  onClick={(e) => history.push(`/edit/complex/${template_id}`)}
                  className={classes.backButton}
                  disabled={loading}
                >
                  Tornar a l'edició
                </Button>
                <Button
                  disabled={activeStep == 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Anterior
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={loading || error}
                >
                  Acceptar i Següent
                </Button>
              </div>
            </div>
          )
        )}
      </div>
      <SourcesList
        data={{}}
        open={openSourcesList}
        onClose={(e) => {
          setSelectedSource(e)
          setOpenSourcesList(false)
        }}
      />
      {conflictDialog}
    </div>
  )
}

export default CaseStepper
