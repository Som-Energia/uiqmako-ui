import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

function SimpleSnackbar(props) {
  const handleClick = () => {
    props.setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    props.setOpen(false)
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={props.open}
        onClose={handleClose}
        message={props.message}
        autoHideDuration={3000}
      />
    </div>
  )
}
export default SimpleSnackbar
