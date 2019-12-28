import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import NewsFeed from "./feed/NewsFeed";
import NavBar from "./nav/NavBar";
import { Button, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const newPostStyle = {
  paddingTop: '10px',
  display: 'flex',
  justifyContent: 'center',
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.handleNewPostClick = this.handleNewPostClick.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  } 

  componentDidMount() {
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

  async handleNewPostClick() {
    const response = await axios.post('/api/posts/');
    console.log(response.data);
    this.fetchPosts()
  }

  render() {
    return (
      <Container>
        <NavBar />
        <Row>
          <Col md={3}>
            <div style={newPostStyle}>
              <Button onClick={this.handleNewPostClick}>New post</Button>
            </div>
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