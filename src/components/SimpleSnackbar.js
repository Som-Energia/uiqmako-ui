import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

function SimpleSnackbar(props) {
  const { alertProps, setAlertProps } = props

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertProps((alertProps) => ({
      ...alertProps,
      open: false,
    }))
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        className={alertProps?.className}
        open={alertProps?.open}
        onClose={handleClose}
        message={alertProps?.message}
        autoHideDuration={30000}
      />
    </div>
  )
}
export default SimpleSnackbar
