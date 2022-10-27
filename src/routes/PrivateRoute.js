import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/sessionContext'
import Loader from '../components/common/Loader'

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser, loadedData } = useAuth()
  return (
    <>
      {loadedData ? (
        <Route
          {...rest}
          render={({ location }) =>
            currentUser ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
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
export default PrivateRoute
