import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from 'components/NavBar'
import Menu from 'containers/Menu'

import { makeStyles } from '@material-ui/core/styles'

function Routes(props) {
  const classes = useStyles()

  const loadMainPage = () => {
    const MainPage = lazy(() => import('./containers/Main'))
    return <MainPage {...props} />
  }
  const loadNewTemplateForm = () => {
    const NewTemplateForm = lazy(() => import('./containers/NewTemplateForm'))
    return <NewTemplateForm {...props} />
  }

  const LoadSingleTemplate = () => {
    const SingleTemplate = lazy(() => import('./containers/SingleTemplate'))
    return <SingleTemplate {...props} />
  }

  const LoadEditor = () => {
    const Editor = lazy(() => import('./components/Editor'))
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
    return <Users {...props} />
  }

  return (
    <div className={classes.root}>
      <Router>
        <header>
          <NavBar />
        </header>
        <div className="container">
          <Menu setToken={props.setToken} />
          <div className={classes.main}>
            <Switch>
              <Route exact path="/" render={loadMainPage} />
              <Route exact path="/settings" render={loadUsers} />
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
    paddingLeft: '300px',
  },
}))
