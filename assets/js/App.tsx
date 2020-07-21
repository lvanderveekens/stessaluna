import "bootstrap/dist/css/bootstrap.min.css"
import "loaders.css/loaders.min.css"
import React, {FC, useEffect} from "react"
import Helmet from "react-helmet"
import {connect} from "react-redux"
import {Router} from "react-router"
import history from "./history/history"
import Routes from "./routes"
import {State} from "./store"
import {fetchCurrentUser} from "./store/auth/actions"
import styles from "./App.scss?module"

interface Props {
  loggedIn: boolean
  fetchCurrentUser: () => void
}

const App: FC<Props> = ({ loggedIn, fetchCurrentUser }) => {
  useEffect(() => {
    if (loggedIn) {
      fetchCurrentUser()
    }
  }, [])

  return (
    <div className={styles.app}>
      <Helmet>
        <title>Stessaluna</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#090029"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
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
  fetchCurrentUser,
}

export default connect(mapStateToProps, actionCreators)(App)
