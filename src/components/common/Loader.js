import React from 'react'
import { CircularProgress, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  loadingGrid: {
    display: 'column',
    margin: 'auto',
    gap: '10px',
  },
  itemLoadingGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

function Loader() {
  const classes = useStyles()
  return (
    <Grid item container className={classes.loadingGrid}>
      <Grid item container className={classes.itemLoadingGrid} xs={12}>
        {process.env.REACT_APP_API_BASE_URL.includes('test') ? (
          <img
            src="/cuca_testing.png"
            layout="fixed"
            width={150}
            className={classes.logo}
            alt="app_icon"
          />
        ) : (
          <img
            src="/cuca.png"
            layout="fixed"
            width={150}
            className={classes.logo}
            alt="app_icon"
          />
        )}
      </Grid>
      <Grid container item className={classes.itemLoadingGrid} xs={12}>
        <CircularProgress size={80} />
      </Grid>
    </Grid>
  )
}

export default Loader
