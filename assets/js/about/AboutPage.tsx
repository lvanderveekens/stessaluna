import React, {FC} from "react";
import styles from "./AboutPage.scss?module";
import Navbar from "../nav/Navbar";
import {Col, Container, Row} from "react-bootstrap";
import Feed from "../feed";

const AboutPage: FC = ({}) => {
  return (
  <div className={styles.aboutPage}>
    <Navbar pageTitle="About"/>
    <Container className={styles.content}>
      <Row className="justify-content-center">
        <Col md={6} lg={6} xl={5}>
        </Col>
      </Row>
    </Container>
  </div>
)
}

export default AboutPage