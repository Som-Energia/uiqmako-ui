import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/sessionContext'
import Loader from '../components/common/Loader'

const LoginRoute = ({ children, ...rest }) => {
  const { currentUser, loadedData } = useAuth()
  return (
    <>
      {loadedData ? (
        <Route
          {...rest}
          render={({ location }) =>
            !currentUser ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            )
          }
        />
      ) : (
        <Loader />
      )}
    </>
  )
}
export default LoginRoute
