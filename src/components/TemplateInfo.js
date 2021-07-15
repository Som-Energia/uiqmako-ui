import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%',
    padding: '2rem',
    margin: '0 auto',
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  flexDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  name: {
    paddingBottom: '1rem',
    color: '#282c34',
  },
  info: {
    color: '#7c828e',
  },
}))

function TemplateInfo(props) {
  const { item } = props
  const { name, xml_id, model, id = '' } = item
  const classes = useStyles()

  return (
    <div>
      <Paper
        className={classes.paper}
        onClick={(e) => props.setClicked(e.target.id)}
        id={id}
      >
        <Typography variant="h4" className={classes.name} id={id}>
          {name}
        </Typography>
        <div className={classes.flexDiv}>
          <Typography variant="subtitle1" className={classes.info} id={id}>
            model: {model}
          </Typography>
          <Typography variant="subtitle1" className={classes.info} id={id}>
            xml_id: {xml_id}
          </Typography>
        </div>
      </Paper>
    </div>
  )
}

export default TemplateInfo
