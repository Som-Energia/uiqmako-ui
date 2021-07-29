import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getTemplateCases, uploadEdit } from 'services/api'
import CircularProgress from '@material-ui/core/CircularProgress'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useParams, useHistory } from 'react-router-dom'
import RenderResultStep from './RenderResultStep'
import SourcesList from './SourcesList'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
        })
        .catch((error) => {
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

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
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
              {loading && <CircularProgress />}
              <RenderResultStep
                setLoading={setLoading}
                setError={setError}
                setAlertProps={props.setAlertProps}
                editId={edit_id}
                caseId={data?.cases[activeStep].id}
              />
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={(e) => history.push(`/edit/complex/${template_id}`)}
                  className={classes.backButton}
                  disabled={loading}
                >
                  Tornar a l'edició
                </Button>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                  disabled={loading || error}
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
    </div>
  )
}

export default CaseStepper
