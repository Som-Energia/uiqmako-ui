import React, { createContext, useContext, useState, useEffect } from 'react'

import * as userService from 'services/api'
import { removeToken, useToken } from 'useToken'

export const CurrentUserContext = createContext(null)

export const CurrentUserProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState({ ...user })
  const { token, setToken } = useToken()

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useAuth = () => useContext(CurrentUserContext)

/*
class CurrentUserProvider extends React.Component {
  state = {
    user: null,
  }

  constructor(props) {
    super(props)
    this.getCurrentUser = this.getCurrentUser.bind(this)
  }

  getCurrentUser() {
    if (this.state.user) {
      return
    }

    return userService.currentUser().then((res) => {
      this.setState({ user: res })
    })
  }

  render() {
    const { children } = this.props

    return (
      <Provider
        value={{
          user: this.state.user,
          getCurrentUser: this.getCurrentUser,
        }}
      >
        {children}
      </Provider>
    )
  }
}

export default CurrentUser
export { CurrentUserProvider, Consumer as CurrentUserConsumer }
*/
