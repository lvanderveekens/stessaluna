import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import NewsFeed from "./feed/NewsFeed";
import NavBar from "./nav/NavBar";
import { Container, Col, Row } from 'react-bootstrap';
import NewPostForm from './post/NewPostForm';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.fetchPosts = this.fetchPosts.bind(this);
  } 

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts() {
    axios.get('/api/posts')
      .then(res => { this.setState({ posts: res.data }) })
      .catch(console.log);
  }

  render() {
    return (
      <Container>
        <NavBar />
        <Row>
          <Col md={3}>
            <NewPostForm fetchPosts={this.fetchPosts}/>
          </Col>
          <Col md={6}>
            <NewsFeed posts={this.state.posts} fetchPosts={this.fetchPosts} />
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));