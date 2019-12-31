import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/home/Home'

function routes() {
  return (
    <Switch>
      <Route component={Home} exact />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  )
}

export default routes
