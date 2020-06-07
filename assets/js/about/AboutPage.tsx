import React, {FC} from "react";
import styles from "./AboutPage.scss?module";
import Navbar from "../nav/Navbar";
import {Col, Container, Row} from "react-bootstrap";
import meImagePath from "../../images/me.jpg"
import Button from "../button/Button";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AboutPage: FC = ({}) => {
  return (
  <div className={styles.aboutPage}>
    <Navbar pageTitle="About"/>
    <Container className={styles.content}>
      <Row className="justify-content-center">
        <Col md={6} lg={6} xl={5}>
          <div className={styles.imageWrapper}>
            <img src={meImagePath}/>
          </div>
          <p>Hi 👋🏻, my name is Luciano and I'm the founder of Stessaluna, a social platform for community-driven language learning exercises.</p>
          <p>Practicing a language on a daily basis is fundamental to improvement and with Stessaluna I intended to create such an environment where people can go to and learn or teach a language together for whatever amount of time you have available on a given day.</p>
          <p>If you 👍🏻 what I’m doing and want to share new feature ideas with me or you just want to say Hi, send me an email.</p>
          <div className={styles.mailLinkWrapper}>
            <a href="mailto:info@stessaluna.com"><FontAwesomeIcon icon={faPaperPlane}/> Mail me</a>
          </div>
          <p>Or if you ❤️ what I’m doing and you want to support further development, you can buy me a coffee.</p>
          <p>BMAC link</p>
        </Col>
      </Row>
    </Container>
  </div>
)
}

export default AboutPage