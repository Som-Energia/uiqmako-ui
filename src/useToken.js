import { useState } from 'react'

export const getToken = () => {
  const tokenString = localStorage.getItem('token')
  //const userToken = JSON.parse(tokenString)
  return tokenString
}
export const removeToken = () => {
  console.log(localStorage['token'])
  localStorage.removeItem('token')
}

export const useToken = () => {
  const [uToken, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken)
    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token: uToken,
  }
}
