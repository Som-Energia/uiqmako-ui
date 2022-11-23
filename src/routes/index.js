import React, { lazy, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import NavBar from 'components/NavBar'
import Menu from 'containers/Menu'
import { useAuth } from 'context/sessionContext'
import { makeStyles } from '@material-ui/core/styles'
import { saveToken } from '../useToken'
import { Axios } from '../services/axios'
import PrivateRoute from './PrivateRoute'
import ProtectedRoute from './ProtectedRoute'
import LoginRoute from './LoginRoute'

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

  const BaseScreen = ({ children }) => {
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

  const loadMainPage = () => {
    const MainPage = lazy(() => import('../containers/Main'))
    return (
      <BaseScreen>
        <MainPage
          {...props}
          setSearchVisible={setSearchVisible}
          search={searchText}
        />
      </BaseScreen>
    )
  }

  const loadTemplatesByModel = () => {
    const TemplateList = lazy(() => import('../containers/TemplateList'))
    return (
      <BaseScreen>
        <TemplateList {...props} setSearchVisible={setSearchVisible} />
      </BaseScreen>
    )
  }

  const loadNewTemplateForm = () => {
    const NewTemplateForm = lazy(() => import('../containers/NewTemplateForm'))
    return (
      <BaseScreen>
        <NewTemplateForm {...props} setSearchVisible={setSearchVisible} />
      </BaseScreen>
    )
  }

  const loadEdits = () => {
    const TemplateEditList = lazy(() =>
      import('../containers/TemplateEditList')
    )
    return (
      <BaseScreen>
        <TemplateEditList {...props} setSearchVisible={setSearchVisible} />
      </BaseScreen>
    )
  }

  const LoadSingleTemplate = () => {
    const SingleTemplate = lazy(() => import('../containers/SingleTemplate'))
    return (
      <BaseScreen>
        <SingleTemplate {...props} />
      </BaseScreen>
    )
  }

  const LoadEditor = () => {
    const Editor = lazy(() => import('../containers/Editor'))
    return (
      <BaseScreen>
        <Editor {...props} />
      </BaseScreen>
    )
  }

  const LoadRenderResult = () => {
    const Editor = lazy(() => import('../components/RenderResult'))
    return (
      <BaseScreen>
        <Editor {...props} />
      </BaseScreen>
    )
  }
  const LoadResultStepper = () => {
    const CaseStepper = lazy(() => import('../components/CaseStepper'))
    return (
      <BaseScreen>
        <CaseStepper {...props} />
      </BaseScreen>
    )
  }

  const loadUsers = () => {
    const Users = lazy(() => import('../components/Users'))
    return (
      <BaseScreen>
        <Users
          {...props}
          setSearchVisible={setSearchVisible}
          search={searchText}
        />
      </BaseScreen>
    )
  }

  const loadLogin = () => {
    const Login = lazy(() => import('../components/LogIn'))
    return <Login />
  }

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            {loadMainPage()}
          </PrivateRoute>
          <ProtectedRoute exact path="/settings">
            {loadUsers()}
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
          <LoginRoute exact path="/login">
            {loadLogin()}
          </LoginRoute>
        </Switch>
      </Router>
    </div>
  )
}

export default Routes
