import React, { lazy, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import NavBar from 'components/NavBar'
import Menu from 'containers/Menu'
//import { useAuth } from 'context/currentUser'
import { useAuth } from 'context/sessionContext'
import { makeStyles } from '@material-ui/core/styles'
import { saveToken } from './useToken'
import { Axios } from './services/axios'
import Loader from './components/common/Loader'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'between',
    minHeight: '100vh',
    position: 'relative',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
  },
}))

function Routes(props) {
  const { removeSessionToken } = useAuth()
  Axios.setAuthContextToAxios(removeSessionToken)

  const classes = useStyles()
  const [searchText, setSearchText] = useState('')
  const [searchVisible, setSearchVisible] = useState(false)
  const { currentUser, loadedData } = useAuth()
  const loadMainPage = () => {
    const MainPage = lazy(() => import('./containers/Main'))
    return (
      <MainPage
        {...props}
        setSearchVisible={setSearchVisible}
        search={searchText}
      />
    )
  }
  const loadTemplatesByModel = () => {
    const TemplateList = lazy(() => import('./containers/TemplateList'))
    return <TemplateList {...props} setSearchVisible={setSearchVisible} />
  }
  const loadNewTemplateForm = () => {
    const NewTemplateForm = lazy(() => import('./containers/NewTemplateForm'))
    return <NewTemplateForm {...props} setSearchVisible={setSearchVisible} />
  }

  const loadEdits = () => {
    const TemplateEditList = lazy(() => import('./containers/TemplateEditList'))
    return <TemplateEditList {...props} setSearchVisible={setSearchVisible} />
  }

  const LoadSingleTemplate = () => {
    const SingleTemplate = lazy(() => import('./containers/SingleTemplate'))
    return <SingleTemplate {...props} />
  }

  const LoadEditor = () => {
    const Editor = lazy(() => import('./containers/Editor'))
    return <Editor {...props} />
  }

  const LoadRenderResult = () => {
    const Editor = lazy(() => import('./components/RenderResult'))
    return <Editor {...props} />
  }
  const LoadResultStepper = () => {
    const CaseStepper = lazy(() => import('./components/CaseStepper'))
    return <CaseStepper {...props} />
  }

  const loadUsers = () => {
    const Users = lazy(() => import('./components/Users'))
    return (
      <Users
        {...props}
        setSearchVisible={setSearchVisible}
        search={searchText}
      />
    )
  }

  const loadLogin = () => {
    const Login = lazy(() => import('./components/LogIn'))
    return <Login />
  }

  const BaseRoute = ({ children }) => {
    return (
      <>
        <header>
          <NavBar setSearchText={setSearchText} searchVisible={searchVisible} />
        </header>
        <div className={classes.container}>
          <Menu setToken={saveToken} />
          <div className={classes.main}>{children}</div>
        </div>
      </>
    )
  }

  const ProtectedRoute = ({ children, ...rest }) => {
    return (
      <BaseRoute>
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
      </BaseRoute>
    )
  }

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <>
        {loadedData ? (
          <BaseRoute>
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
          </BaseRoute>
        ) : (
          <Loader />
        )}
      </>
    )
  }

  const PublicRoute = ({ children, ...rest }) => {
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

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            {loadMainPage()}
          </PrivateRoute>
          <ProtectedRoute exact path="/settings">
            <PrivateRoute render={loadUsers} />
          </ProtectedRoute>
          <PrivateRoute exact path="/edits">
            {loadEdits()}
          </PrivateRoute>
          <PrivateRoute exact path="/templatesByModel/:model">
            {loadEdits()}
          </PrivateRoute>
          <PrivateRoute exact path="/newTemplate">
            {loadNewTemplateForm()}
          </PrivateRoute>
          <PrivateRoute exact path="/templates/:id">
            {LoadSingleTemplate()}
          </PrivateRoute>
          <PrivateRoute exact path="/edit/:editor/:id">
            {LoadEditor()}
          </PrivateRoute>
          <PrivateRoute exact path="/validation/:template_id/:edit_id">
            {LoadResultStepper()}
          </PrivateRoute>
          <PrivateRoute exact path="/render/:editId/:caseId">
            {LoadRenderResult()}
          </PrivateRoute>
          <PublicRoute exact path="/login">
            {loadLogin()}
          </PublicRoute>
        </Switch>
      </Router>
    </div>
  )
}

export default Routes
