import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Feed from "../feed/Feed"
import NavBar from "../nav/NavBar"
import NewPostForm from "../post/new-post/new-post-form"

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={6} xl={5}>
            <h4 className="mb-4">Home</h4>
            <NewPostForm />
            <Feed />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
