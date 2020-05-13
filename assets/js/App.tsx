import "bootstrap/dist/css/bootstrap.min.css"
import "loaders.css/loaders.min.css"
import React, { FC, Fragment, useEffect, useRef } from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { Route, Switch, useLocation } from "react-router-dom"
import HomePage from "./home/HomePage"
import LoginPage from "./login/LoginPage"
import NotFoundPage from "./not-found/NotFoundPage"
import ProfilePage from "./profile/ProfilePage"
import RegistrationPage from "./register/RegistrationPage"
import PrivateRoute from "./route/PrivateRoute"
import { fetchUser } from "./store/auth/actions"
import { State } from "./store/configureStore"
import CreatePostModal from "./post/create-post-modal/CreatePostModal"

interface Props {
  loggedIn: boolean
  fetchUser: () => void
}

const App: FC<Props> = ({ loggedIn, fetchUser }) => {
  const location = useLocation()
  const previousLocation = usePrevious(location)

  const getLocation = () => {
    console.log("LOCATION")
    console.log(location)
    console.log("PREV LOCATION")
    console.log(previousLocation)

    if (location.pathname === "/create/post") {
      if (previousLocation) {
        return previousLocation
      }
      return { ...location, pathname: "/" }
    }
    return location
  }

  useEffect(() => {
    if (loggedIn) {
      fetchUser()
    }
  }, [])

  function usePrevious(value): Location | undefined {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef()

    // Store current value in ref
    // useEffect runs asynchronously and after a render is painted to the screen.
    useEffect(() => {
      console.log("USE EFFECT")
      console.log(value)
      ref.current = value
    }, [value]) // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current
  }

  return (
    <Fragment>
      <Helmet>
        <title>Stessaluna</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Helmet>
      <Switch location={getLocation()}>
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Route exact path="/create/post" component={CreatePostModal} />
    </Fragment>
  )
}

const mapStateToProps = (state: State) => ({
  loggedIn: state.auth.loggedIn,
})

const actionCreators = {
  fetchUser,
}

export default connect(mapStateToProps, actionCreators)(App)
