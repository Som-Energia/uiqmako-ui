import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

import Alert from '@material-ui/lab/Alert'
import { useAlert } from 'context/alertDetails'

function SimpleSnackbar(props) {
  const { alertInfo, setAlertInfo } = useAlert()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlertInfo((alertInfo) => ({
      ...alertInfo,
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
        open={alertInfo?.open}
        onClose={handleClose}
        message={alertInfo?.message}
        autoHideDuration={30000}
      >
        <Alert onClose={handleClose} severity={alertInfo?.severity}>
          {alertInfo?.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
export default SimpleSnackbar
