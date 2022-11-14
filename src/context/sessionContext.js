import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from 'services/api'
import { saveToken, getTokenInfo, removeToken } from '../useToken'

const EXPIRE_HOURS = parseInt(`${process.env.REACT_APP_EXPIRE_TOKEN_HOURS}`) - 1

const initialState = {
  currentUser: null,
  token: null,
  tokenDate: null,
  loadedData: false,
}

export const SessionContext = createContext(null)

export const SessionProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  const setCurrentUser = (user) => {
    setState((prev) => ({ ...prev, currentUser: user }))
  }

  const setSessionToken = (token, tokenDate) => {
    const tokenDateTmp = tokenDate || Date.now() + EXPIRE_HOURS * (3600 * 1000)
    saveToken(token, tokenDateTmp)
    setState((prev) => ({ ...prev, token: token, tokenData: tokenDateTmp }))
  }

  const removeSessionToken = () => {
    removeToken()
    setState({ ...initialState, loadedData: true })
  }

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setCurrentUser(res)
      })
      .then(() => {
        const { token, tokenDate } = getTokenInfo()
        setSessionToken(token, tokenDate)
        setState((prev) => ({ ...prev, loadedData: true }))
      })
      .catch((err) => {
        removeSessionToken()
        console.log(err)
      })
  }, [])

  const { currentUser, token, tokenData, loadedData } = state

  return (
    <SessionContext.Provider
      value={{
        currentUser,
        token,
        tokenData,
        loadedData,
        setSessionToken,
        getTokenInfo,
        setCurrentUser,
        removeSessionToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export const useAuth = () => useContext(SessionContext)
