import { Route, HashRouter, Switch } from 'react-router-dom'
import React from 'react'
import LoginPage from './Pages/Login'
import HomePage from './Pages/Home'

export default () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </HashRouter>
    </div>
  )
}