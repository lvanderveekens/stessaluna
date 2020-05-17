import React, { FC } from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router-dom"

interface Props {
  loggedIn: boolean
}

const PrivateRoute: FC<Props> = ({ loggedIn, ...rest }) => {
  if (!loggedIn) {
    return <Redirect to="/login" />
  }
  return <Route {...rest} />
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
})

export default connect(mapStateToProps)(PrivateRoute)
