import { React, useEffect, useState } from 'react'
import { getSingleTemplate } from 'services/api'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  editor: {
    textAlign: 'left',
  },
  editorContainer: {
    textAlign: 'left',
    margin: '0 auto',
    padding: '2% 10%',
  },
}))

function SingleTemplate(props) {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    getSingleTemplate(id)
      .then((response) => {
        setData(response)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [id])

  return (
    <div className={classes.editorContainer}>
      <Paper>
        <Button
          color="primary"
          variant="contained"
          onClick={(event) => history.push('/editSimple/1')}
        >
          Editor Simple
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={(event) => history.push('/editComplex/1')}
        >
          Editor HTML
        </Button>
      </Paper>
    </div>
  )
}

export default SingleTemplate
