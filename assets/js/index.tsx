import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./store"
import ReactGA from 'react-ga';

const trackingId = "UA-114305707-2"
ReactGA.initialize(trackingId)

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
