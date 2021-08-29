import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { getRenderResult } from 'services/api'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useAlert } from 'context/alertDetails'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    margin: '1rem auto',
    height: '80%',
    padding: '1%',
  },
  renderContainer: {
    all: 'initial',
  },
}))

function RenderResultStep(props) {
  const classes = useStyles()
  const { editId, caseId, setLoading, loading, setAlertProps, setError } = props
  const { setAlertInfo } = useAlert()
  const [data, setData] = useState('')

  useEffect(() => {
    getRenderResult(editId, caseId)
      .then((response) => {
        setData(response)
        setLoading(false)
      })
      .catch((error) => {
        let errorMsg =
          'Error en el renderitzat: ' + error?.response?.data?.detail
        setData(errorMsg)
        setLoading(false)
        setError(true)

        setAlertInfo({
          open: true,
          message: errorMsg,
          severity: 'error',
        })
      })
  }, [editId, caseId])
  return (
    <>
      {loading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
        <Paper className={classes.container}>
          <div
            className={classes.renderContainer}
            dangerouslySetInnerHTML={{ __html: data }}
          />
        </Paper>
      )}
    </>
  )
}

export default RenderResultStep
