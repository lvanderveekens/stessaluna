import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NewsFeed from "./feed/NewsFeed";
import { Container, Col, Row } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <NewsFeed />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));