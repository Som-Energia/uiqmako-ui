import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%',
    padding: '2rem',
    margin: '0 auto',
    marginTop: '0.05rem',
    marginBottom: '16px',
    textAlign: 'left',
    cursor: 'pointer',
  },
  flexDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Montserrat',
    fontSize: '1.8rem',
    fontWeight: '500',
    paddingBottom: '1rem',
    color: '#282c34',
    textAlign: 'left',
  },
  info: {
    color: '#7c828e',
  },
  icon: {
    marginRight: '8px',
  },
  lastUpdated: {
    fontSize: '14px',
  },
}))

function TemplateInfo(props) {
  const { item, setClicked } = props
  const { name, xml_id, model, id = '', last_updated } = item
  const classes = useStyles()

  return (
    <>
      <Paper
        className={classes.paper}
        onClick={(e) => setClicked(id)}
        elevation={1}
        id={id}
        mb={4}
      >
        <Typography variant="h4" className={classes.name}>
          <MailOutlineRoundedIcon fontSize="large" className={classes.icon} />
          {name}
        </Typography>
        <div>
          <Typography variant="subtitle1" className={classes.info}>
            {model}
          </Typography>
          <p className={classes.lastUpdated}>
            {last_updated.slice(0, 10)} {last_updated.slice(11, 16)}
          </p>
        </div>
      </Paper>
    </>
  )
}

export default TemplateInfo
