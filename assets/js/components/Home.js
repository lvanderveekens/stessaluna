import React, { Component, Fragment } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';

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

  async handleClick() {
    console.log('CLICKED');
    const response = await axios.post('/api/posts/')
    console.log(response.data)
  }

  render() {
    return (
      <Fragment>
        Posts in database:
        <ul>
          {this.state.posts.map((post, index) =>
            <li key={index}>{post.text}</li>)
          }
        </ul>
        <Button onClick={this.handleClick}>New post</Button>
      </Fragment>
    )
  }
}

export default Home;