import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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

  const LoadEditSimple = () => {
    const SimpleEditor = lazy(() => import('./components/SimpleEditor'))
    return <SimpleEditor {...props} />
  }
  const LoadEditComplex = () => {
    const RichTextEditor = lazy(() => import('components/RichTextEditor'))
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
