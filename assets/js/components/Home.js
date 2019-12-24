import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('/api/posts')
      .then(res => res.json())
      .then((data) => {
        this.setState({ posts: data })
      })
      .catch(console.log)
  }

  render() {
    console.log('render');
    return (
      <ul>
        {this.state.posts.map((value, index) =>
          <li key={index}>{value.description}</li>)
        }
      </ul>
    )
  }
}

export default Home;