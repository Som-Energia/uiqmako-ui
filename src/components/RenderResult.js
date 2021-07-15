import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { getRenderResult } from 'services/api'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    margin: '0 auto',
    height: '80%',
    padding: '1%',
  },
  renderContainer: {
    all: 'initial',
  },
  contentIframe: {
    width: '100%',
    height: '100%',
  },
}))

function RenderResult(props) {
  const classes = useStyles()
  const { editId, caseId } = useParams()

  const [data, setData] = useState('gfdgds')

  useEffect(() => {
    getRenderResult(editId, caseId)
      .then((response) => {
        setData(response)
      })
      .catch((error) => {})
  }, [editId, caseId])
  return (
    <Paper className={classes.container}>
      <div
        className={classes.renderContainer}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </Paper>
  )
}

export default RenderResult
