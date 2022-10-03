import React, { lazy, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import NavBar from 'components/NavBar'
import Menu from 'containers/Menu'
import { useAuth } from 'context/currentUser'
import { makeStyles } from '@material-ui/core/styles'

function Routes(props) {
  const classes = useStyles()
  const [searchText, setSearchText] = useState('')
  const [searchVisible, setSearchVisible] = useState(false)

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
    return (
      <TemplateList
        {...props}
        setSearchVisible={setSearchVisible}
        search={searchText}
      />
    )
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

  return (
    <div className={classes.root}>
      <Router>
        <header>
          <NavBar setSearchText={setSearchText} searchVisible={searchVisible} />
        </header>
        <div className={classes.container}>
          <Menu setToken={props.setToken} />
          <div className={classes.main}>
            <Switch>
              <Route exact path="/" render={loadMainPage} />
              <ProtectedRoute exact path="/settings">
                <Route render={loadUsers} />
              </ProtectedRoute>
              <Route exact path="/edits" render={loadEdits} />
              <Route
                exact
                path="/templatesByModel"
                render={loadTemplatesByModel}
              />
              <Route exact path="/newTemplate" render={loadNewTemplateForm} />
              <Route exact path="/templates/:id" render={LoadSingleTemplate} />
              <Route exact path="/edit/:editor/:id" render={LoadEditor} />
              <Route
                exact
                path="/validation/:template_id/:edit_id"
                render={LoadResultStepper}
              />
              <Route
                exact
                path="/render/:editId/:caseId"
                render={LoadRenderResult}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default Routes

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

const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
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
  )
}
