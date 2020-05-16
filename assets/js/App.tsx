import "bootstrap/dist/css/bootstrap.min.css"
import "loaders.css/loaders.min.css"
import React, { FC, useEffect } from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { Router } from "react-router"
import history from "./history/history"
import Routes from "./routes"
import { State } from "./store"
import { fetchUser } from "./store/auth/actions"
import styles from "./App.scss?module"

interface Props {
  loggedIn: boolean
  fetchUser: () => void
}

const App: FC<Props> = ({ loggedIn, fetchUser }) => {
  useEffect(() => {
    if (loggedIn) {
      fetchUser()
    }
  }, [])

  return (
    <div className={styles.app}>
      <Helmet>
        <title>Stessaluna</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Helmet>
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  )
}

const mapStateToProps = (state: State) => ({
  loggedIn: state.auth.loggedIn,
})

const actionCreators = {
  fetchUser,
}

export default connect(mapStateToProps, actionCreators)(App)
