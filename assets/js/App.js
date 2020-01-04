import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import NavBar from "./nav/NavBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';

class App extends Component {

  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <Route path="/login" component={Login} />
          </Route>
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));