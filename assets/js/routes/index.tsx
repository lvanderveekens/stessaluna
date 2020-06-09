import React, {FC, useEffect} from "react"
import {Route, Switch} from "react-router"
import {useLocation} from "react-router-dom"
import HomePage from "../home/HomePage"
import LoginPage from "../login/LoginPage"
import NotFoundPage from "../not-found/NotFoundPage"
import CreatePostModal from "../post/create-post/create-post-modal/CreatePostModal"
import ProfilePage from "../profile/ProfilePage"
import RegistrationPage from "../register/RegistrationPage"
import {usePrevious} from "../util/hooks"
import PrivateRoute from "./PrivateRoute"
import AboutPage from "../about/AboutPage";
import ReactGA from "react-ga";

const Routes: FC = () => {
  const location = useLocation()
  const previousLocation = usePrevious(location)

  useEffect(() => {
    // register metric on page load too
    ReactGA.pageview(location.pathname)
  }, [])

  const getLocation = () => {
    if (location.pathname === "/create-post") {
      if (previousLocation && previousLocation.pathname !== "/create-post") {
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
        <Route exact path="/" component={HomePage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={RegistrationPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <PrivateRoute
        exact
        path="/create-post"
        render={(props) => <CreatePostModal {...props} previousLocation={previousLocation} />}
      />
    </>
  )
}

export default Routes
