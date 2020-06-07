import React, {FC} from "react";
import styles from "./ContactPage.scss?module";
import Navbar from "../nav/Navbar";
import {Col, Container, Row} from "react-bootstrap";
import Feed from "../feed";

const ContactPage: FC = ({}) => {
  return (
  <div className={styles.contactPage}>
    <Navbar pageTitle="Contact"/>
    <Container className={styles.content}>
      <Row className="justify-content-center">
        <Col md={6} lg={6} xl={5}>
          {/*<Feed/>*/}
        </Col>
      </Row>
    </Container>
  </div>
)
}

export default ContactPage