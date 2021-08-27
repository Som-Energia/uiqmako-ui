import React, { createContext, useContext, useState } from 'react'

export const CurrentUserContext = createContext(null)

export const CurrentUserProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState({ ...user })

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useAuth = () => useContext(CurrentUserContext)
