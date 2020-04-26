import { store, persistor } from "./store/configureStore"
import { Provider } from "react-redux"
import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import { PersistGate } from "redux-persist/integration/react"

ReactDom.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)
