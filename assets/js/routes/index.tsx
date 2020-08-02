import React, {FC, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"
import {Route, Switch} from "react-router"
import HomePage from "../home/HomePage"
import LoginPage from "../login/LoginPage"
import NotFoundPage from "../not-found/NotFoundPage"
import CreatePostModal from "../post/create-post-modal/CreatePostModal"
import ProfilePage from "../profile/ProfilePage"
import RegistrationPage from "../register/RegistrationPage"
import {usePrevious} from "../util/hooks"
import PrivateRoute from "./PrivateRoute"
import AboutPage from "../about/AboutPage";
import ResetPasswordPage from "../reset-password/ResetPasswordPage";
import ChooseNewPasswordPage from "../reset-password/choose-new-password/ChooseNewPasswordPage";
import EditPostModal from "../post/edit-post-modal/EditPostModal";

const Routes: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const previousLocation = usePrevious(location)
  const modalPaths = ["/create-post", "/edit-post"]

  const hasModalPath = (location?) => {
    if (!location) {
      return false
    }
    for (const modalPath of modalPaths) {
      if (location.pathname.startsWith(modalPath)) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    if (hasModalPath(location) || hasModalPath(previousLocation)) {
      return
    }
    // scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getLocation = () => {
    for (const modalPath of modalPaths) {
      if (location.pathname.startsWith(modalPath)) {
        if (previousLocation && !previousLocation.pathname.startsWith(modalPath)) {
          return previousLocation
        } else {
          return { ...location, pathname: "/" }
        }
      }
    }
    return location
  }

  const handleModalClose = () => {
    if (previousLocation) {
      history.push(previousLocation.pathname)
    } else {
      history.push("/")
    }
  }

  return (
    <>
      <Switch location={getLocation()}>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={RegistrationPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route exact path="/reset-password/reset" component={ChooseNewPasswordPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <PrivateRoute
        exact
        path="/create-post"
        render={(props) => <CreatePostModal {...props} onClose={handleModalClose}/>}
      />
      <PrivateRoute
        exact
        path="/edit-post/:id"
        render={(props) => <EditPostModal {...props} onClose={handleModalClose}/>}
      />
    </>
  )
}

export default Routes
