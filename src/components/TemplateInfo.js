import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

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
    color: '#282c34',
    textAlign: 'left',
  },
  info: {
    color: '#7c828e',
  },
  iconTest: {
    marginRight: '8px',
    color: theme?.palette?.source?.test?.color,
  },
  iconProd: {
    marginRight: '8px',
    color: theme?.palette?.source?.prod?.color,
  },
  lastUpdated: {
    fontSize: '14px',
  },
}))

function TemplateInfo(props) {
  const { item, setClicked, handleDelete } = props
  const { name, xml_id, model, id = '', last_updated, from_server } = item
  const classes = useStyles()

  return (
    <>
      <Paper
        className={classes.paper}
        onClick={(e) => {
          setClicked(id)
        }}
        elevation={1}
        id={id}
        mb={4}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4" className={classes.name}>
            <MailOutlineRoundedIcon
              fontSize="large"
              className={
                from_server?.toUpperCase().includes('TEST')
                  ? classes.iconTest
                  : classes.iconProd
              }
            />
            {name}
          </Typography>
          <IconButton
            key={`${id}`}
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(e, item)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <div>
          <Typography variant="subtitle1" className={classes.info}>
            {'[' + from_server + '] ' + model}
          </Typography>
          <p className={classes.lastUpdated}>
            {last_updated &&
              last_updated.slice(0, 10) + ' ' + last_updated.slice(11, 16)}
          </p>
        </div>
      </Paper>
    </>
  )
}

export default TemplateInfo
