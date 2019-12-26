import React, { Component, Fragment } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';

class NewsFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.handleNewPostClick = this.handleNewPostClick.bind(this);
    this.handleDeletePostClick = this.handleDeletePostClick.bind(this);
  }

  componentDidMount() {
    this.fetchPosts()
  }

  async handleNewPostClick() {
    const response = await axios.post('/api/posts/');
    console.log(response.data);
    this.fetchPosts()
  }
  
  async handleDeletePostClick(post) {
    const response = await axios.delete('/api/posts/' + post.id);
    console.log(response.data);
    this.fetchPosts()
  }

  fetchPosts() {
    fetch('/api/posts')
      .then(res => res.json())
      .then((data) => {
        this.setState({ posts: data })
      })
      .catch(console.log);
  }

  render() {
    return (
      <Fragment>
        Posts in database:
        <ul>
          {this.state.posts.map((post, index) =>
            <li key={index}>{post.id}: {post.text} <Button onClick={() => this.handleDeletePostClick(post)}>Delete</Button></li>)
          }
        </ul>
        <Button onClick={this.handleNewPostClick}>New post!</Button>
      </Fragment>
    )
  }
}

export default NewsFeed;