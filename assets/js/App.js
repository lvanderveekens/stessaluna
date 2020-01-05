import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import NavBar from "./nav/NavBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';
import { Container } from 'react-bootstrap';

const App = (props) => {

  const initialState = {
    authenticated: localStorage.getItem('luna-app:jwt-token') !== null,
    token: localStorage.getItem('luna-app:jwt-token'),
  }

  const [state, setState] = React.useState(initialState);

  const setAuthenticated = (authenticated) => {
    console.log("setAuthenticated(): " + authenticated);
    setState(prevState => ({
      ...prevState,
      authenticated
    }))
  };

  const setToken = (token) => {
    console.log("setToken(): " + token);
    localStorage.setItem('luna-app:jwt-token', token);
    setState(prevState => ({
      ...prevState,
      token
    }))
  };

  return (
    <Router>
      <NavBar authenticated={state.authenticated} token={state.token} />
      <Container>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} authenticated={state.authenticated} token={state.token} />} />
          <Route path="/login" render={(props) => <Login {...props} setAuthenticated={setAuthenticated} setToken={setToken} />} />
        </Switch>
      </Container>
    </Router>
  )
}

ReactDom.render(<App />, document.getElementById('root'));