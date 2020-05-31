import React, {FC} from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router-dom"

interface Props {
  component?: any
  render?: (props) => void
  loggedIn: boolean
}

const PrivateRoute: FC<Props> = ({component: Component, render, loggedIn, ...rest}) => {
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
