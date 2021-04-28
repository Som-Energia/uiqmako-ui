import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './containers/Main'


function Routes(props) {
  const loadMainPage = () => {
    const MainPage = lazy(() => import('./containers/Main'))
    return <Main {...props} />
  }
  const loadNewTemplateForm = () => {
    const NewTemplateForm = lazy(() => import('./containers/NewTemplateForm'))
    return <NewTemplateForm {...props} />
  }

  return (
    <Router>
        <Switch>
          <Route exact path='/' render={ loadMainPage } />
          <Route exact path='/newTemplate' render={ loadNewTemplateForm } />
        </Switch>
    </Router>
  )
}

export default Routes