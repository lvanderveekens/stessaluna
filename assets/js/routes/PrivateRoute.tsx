import React, {FC} from "react"
import {connect} from "react-redux"
import {Redirect, Route, RouteProps} from "react-router-dom"

interface OwnProps {
  component?: any
  render?: (props) => any
  loggedIn: boolean
}

const PrivateRoute: FC<OwnProps & RouteProps> = ({component: Component, render, loggedIn, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      loggedIn
        ? (render ? render(props) : <Component {...props}/>)
        : <Redirect to="/login"/>
    )}/>
  )
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
})

export default connect(mapStateToProps)(PrivateRoute)
