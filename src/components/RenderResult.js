import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import { getRenderResult } from 'services/api'
import { useAlert } from 'context/alertDetails'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    width: '90%',
    margin: '0 auto',
    height: '100%',
    padding: '1%',
  },
  renderContainer: {
    all: 'initial',
  },
  containerError: {
    color: 'red',
  },
  singleButton: {
    width: '15%',
    margin: '0 auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(10),
  },
}))

function RenderResult(props) {
  const classes = useStyles()
  const { editId, caseId } = useParams()
  const history = useHistory()
  const { setAlertInfo } = useAlert()
  const [data, setData] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    getRenderResult(editId, caseId)
      .then((response) => {
        setData(response)
        setError(false)
      })
      .catch((error) => {
        let errorMsg =
          'Error en el renderitzat: ' + error?.response?.data?.detail
        setAlertInfo({
          open: true,
          message: errorMsg,
          severity: 'error',
        })
        setData({ body: errorMsg })
        setError(true)
      })
  }, [editId, caseId])

  return (
    <>
      {!error && (
        <Paper className={classes.container}>
          {Object.entries(data)?.map(
            ([key, value]) =>
              key != 'body' && (
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  style={{
                    width: '100%',
                    marginRight: '5px',
                    marginLeft: '5px',
                    display: 'inline-block',
                  }}
                  key={key}
                  label={key}
                  value={value}
                  disabled={true}
                />
              )
          )}
        </Paper>
      )}
      <Paper className={classes.container}>
        <div
          className={[classes.renderContainer, error && classes.containerError]
            .filter((e) => e)
            .join(' ')}
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      </Paper>
      <Button
        color="primary"
        variant="contained"
        className={classes.singleButton}
        onClick={history.goBack}
      >
        Tornar a l'editor
      </Button>
    </>
  )
}

export default RenderResult
