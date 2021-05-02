import RichTextEditor from 'components/RichTextEditor'
import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './containers/Main'
import SingleTemplate from './containers/SingleTemplate'

function Routes(props) {
  const loadMainPage = () => {
    const MainPage = lazy(() => import('./containers/Main'))
    return <Main {...props} />
  }
  const loadNewTemplateForm = () => {
    const NewTemplateForm = lazy(() => import('./containers/NewTemplateForm'))
    return <NewTemplateForm {...props} />
  }

  const LoadSingleTemplate = () => {
    const SingleTemplate = lazy(() => import('./containers/SingleTemplate'))
    return <SingleTemplate {...props} />
  }

  const LoadEditSimple = () => {
    const SimpleEditor = lazy(() => import('./components/SimpleEditor'))
    return <SimpleEditor {...props} />
  }
  const LoadEditComplex = () => {
    const SimpleEditor = lazy(() => import('./components/RichTextEditor'))
    return <RichTextEditor {...props} />
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={loadMainPage} />
        <Route exact path="/newTemplate" render={loadNewTemplateForm} />
        <Route exact path="/templates/:id" render={LoadSingleTemplate} />
        <Route exact path="/editSimple/:id" render={LoadEditSimple} />
        <Route exact path="/editComplex/:id" render={LoadEditComplex} />
      </Switch>
    </Router>
  )
}

export default Routes
