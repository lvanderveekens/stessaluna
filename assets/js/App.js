import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import NavBar from "./nav/NavBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';
import { Container } from 'react-bootstrap';

const App = (props) => {

  const initialState = {
    authenticated: localStorage.getItem('luna-app:jwt-token') !== null,
  }

  const [state, setState] = React.useState(initialState);

  const setAuthenticated = (authenticated) => {
    console.log("setAuthenticated()");
    setState({ authenticated });
  };

  return (
    <Router>
      <NavBar authenticated={state.authenticated} />
      <Container>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} authenticated={state.authenticated} />} />
          <Route path="/login" render={(props) => <Login {...props} setAuthenticated={setAuthenticated} />} />
        </Switch>
      </Container>
    </Router>
  )
}

ReactDom.render(<App />, document.getElementById('root'));