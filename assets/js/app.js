import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NewsFeed from "./feed/NewsFeed";

class App extends Component {
  render() {
    return (
      <div>
        <NewsFeed />
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));