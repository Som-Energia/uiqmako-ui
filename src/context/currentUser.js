import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from 'services/api'

export const CurrentUserContext = createContext(null)

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    getCurrentUser()
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err))
  })

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useAuth = () => useContext(CurrentUserContext)
