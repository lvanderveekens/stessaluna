import React, { FC } from "react"
import { Route, Switch } from "react-router"
import { useHistory, useLocation } from "react-router-dom"
import HomePage from "../home/HomePage"
import LoginPage from "../login/LoginPage"
import NotFoundPage from "../not-found/NotFoundPage"
import CreatePostModal from "../post/create-post-modal/CreatePostModal"
import ProfilePage from "../profile/ProfilePage"
import RegistrationPage from "../register/RegistrationPage"
import { usePrevious } from "../util/hooks"
import PrivateRoute from "./PrivateRoute"

const Routes: FC = () => {
  const history = useHistory()

  const location = useLocation()
  const previousLocation = usePrevious(location)

  const getLocation = () => {
    if (location.pathname === "/create/post") {
      if (previousLocation && previousLocation.pathname !== "/create/post") {
        return previousLocation
      } else {
        return { ...location, pathname: "/" }
      }
    }
    return location
  }

  return (
    <>
      <Switch location={getLocation()}>
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Route
        exact
        path="/create/post"
        render={(props) => <CreatePostModal {...props} previousLocation={previousLocation} />}
      />
    </>
  )
}

export default Routes
