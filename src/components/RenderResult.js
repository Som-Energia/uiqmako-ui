import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import { getRenderResult } from 'services/api'

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

  const [data, setData] = useState('gfdgds')
  useEffect(() => {
    getRenderResult(editId, caseId)
      .then((response) => {
        setData(response)
      })
      .catch((error) => {})
  }, [editId, caseId])

  return (
    <>
      <Paper className={classes.container}>
        <div
          className={classes.renderContainer}
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
