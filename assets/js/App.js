import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import NavBar from "./nav/NavBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';
import { Container } from 'react-bootstrap';

class App extends Component {

  render() {
    return (
      <Router>
        <NavBar />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </Container>
      </Router>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));