import { useState } from 'react'

export const getToken = () => {
  const tokenString = localStorage.getItem('token')
  //const userToken = JSON.parse(tokenString)
  return tokenString
}
export const removeToken = () => {
  localStorage.removeItem('token')
}

export const useToken = () => {
  const [uToken, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    const expireHours =
      parseInt(`${process.env.REACT_APP_EXPIRE_TOKEN_HOURS}`) - 1
    localStorage.setItem('token', userToken)
    if (userToken && userToken !== '') {
      const now = Date.now()
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
}
