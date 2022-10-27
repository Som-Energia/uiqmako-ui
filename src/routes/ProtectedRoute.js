import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/sessionContext'
import Loader from '../components/common/Loader'

const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser, loadedData } = useAuth()

  return (
    <>
      {loadedData ? (
        <Route
          {...rest}
          render={({ location }) =>
            currentUser && currentUser?.category === 'admin' ? (
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
export default ProtectedRoute
