import React from 'react'
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
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ margin: '10px' }}
        open={alertInfo?.open}
        onClose={handleClose}
        message={alertInfo?.message}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleClose}
          style={{ padding: '20px', fontWeight: '500', fontSize: '1.1em' }}
          severity={alertInfo?.severity}
        >
          {alertInfo?.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
export default SimpleSnackbar
