import "bootstrap/dist/css/bootstrap.min.css"
import React, { FC, Fragment } from "react"
import Helmet from "react-helmet"
import { Route, Router, Switch } from "react-router-dom"
import history from "./history/history"
import HomePage from "./home/HomePage"
import LoginPage from "./login/LoginPage"
import NotFoundPage from "./not-found/NotFoundPage"
import ProfilePage from "./profile/ProfilePage"
import RegistrationPage from "./register/RegistrationPage"
import PrivateRoute from "./route/PrivateRoute"

const App: FC = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Stessaluna</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegistrationPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App
