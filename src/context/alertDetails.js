import React, { createContext, useContext, useState } from 'react'

export const AlertContext = createContext(null)

export const AlertInfoProvider = ({ alertProps, children }) => {
  const [alertInfo, setAlertInfo] = useState({ ...alertProps })

  return (
    <AlertContext.Provider value={{ alertInfo, setAlertInfo }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)
