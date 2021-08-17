import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { getRenderResult } from 'services/api'
import CircularProgress from '@material-ui/core/CircularProgress'

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

  const [data, setData] = useState('gfdgds')

  useEffect(() => {
    getRenderResult(editId, caseId)
      .then((response) => {
        setData(response)
        setLoading(false)
        console.log('he rebut')
      })
      .catch((error) => {
        let errorMsg =
          'Error en el renderitzat: ' + error?.response?.data?.detail
        setData(errorMsg)
        setLoading(false)
        setError(true)

        /* setAlertProps((alertProps) => ({
          ...alertProps,
          open: true,
          message: errorMsg,
        }))*/
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
