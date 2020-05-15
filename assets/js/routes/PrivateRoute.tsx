import React from "react"
import { Route, Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const PrivateRoute = ({ loggedIn, ...rest }) => {
  if (!loggedIn) {
    return <Redirect to="/login" />
  }
  return <Route {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
})

export default connect(mapStateToProps)(PrivateRoute)
