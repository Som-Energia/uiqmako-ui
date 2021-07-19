import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Title from 'components/Title'
import Menu from 'containers/Menu'

function Routes(props) {
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

  const loadUsers = () => {
    const Users = lazy(() => import('./components/Users'))
    return <Users {...props} />
  }

  return (
    <Router>
      <header className="App-header">
        <Title />
      </header>
      <div className="container">
        <div className="menu">
          <Menu setToken={props.setToken} />
        </div>
        <div className="main">
          <Switch>
            <Route exact path="/" render={loadMainPage} />
            <Route exact path="/settings" render={loadUsers} />
            <Route exact path="/newTemplate" render={loadNewTemplateForm} />
            <Route exact path="/templates/:id" render={LoadSingleTemplate} />
            <Route exact path="/edit/:editor/:id" render={LoadEditor} />
            <Route
              exact
              path="/render/:editId/:caseId"
              render={LoadRenderResult}
            />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default Routes
