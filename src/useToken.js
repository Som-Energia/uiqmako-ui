import { useState } from 'react'

export const getToken = () => {
  const tokenString = localStorage.getItem('token')
  //const userToken = JSON.parse(tokenString)
  return tokenString
}

export const getTokenInfo = () => {
  const token = localStorage.getItem('token')
  const tokenDate = localStorage.getItem('tokenDate')
  return { token: token, tokenData: tokenDate }
}

export const removeToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('tokenDate')
}

/* export const useToken = () => {
  const [uToken, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    const expireHours =
      parseInt(`${process.env.REACT_APP_EXPIRE_TOKEN_HOURS}`) - 1
    localStorage.setItem('token', userToken)
    if (userToken && userToken !== '') {
      localStorage.setItem(
        'tokenDate',
        Date.now() + expireHours * (3600 * 1000)
      )
    } else {
      localStorage.removeItem('tokenDate')
    }

    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token: uToken,
  }
} */

export const saveToken = (userToken, tokenData) => {
  localStorage.setItem('token', userToken)
  if (userToken && userToken !== '') {
    localStorage.setItem('tokenDate', tokenData)
  } else {
    localStorage.removeItem('tokenDate')
  }
}
