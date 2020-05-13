import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import { Router } from "react-router-dom"
import App from "./App"
import history from "./history/history"
import { store } from "./store/configureStore"

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)
