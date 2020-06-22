import React, {FC} from "react";
import styles from "./AboutPage.scss?module";
import Navbar from "../nav/Navbar";
import {Col, Container, Row} from "react-bootstrap";
import meImagePath from "../../images/me.jpg"
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {COLUMN_BREAKPOINTS} from "../config/column-breakpoints";

const AboutPage: FC = ({}) => {
  return (
  <div className={styles.aboutPage}>
    <Navbar pageTitle="About"/>
    <Container className={styles.content}>
      <Row className="justify-content-center">
        <Col {...COLUMN_BREAKPOINTS}>
          <div className={styles.imageWrapper}>
            <img src={meImagePath}/>
          </div>
          <p>Hi <span className={styles.emoji}>👋🏻</span>, my name is Luciano and I'm the founder of Stessaluna, a social platform for
            community-driven language learning exercises.</p>
          <p>Practicing a language on a daily basis is fundamental to improvement and with Stessaluna I intended to
            create such an environment where people can go to and learn or teach a language together for whatever amount
            of time you have available on a given day.</p>
          <p>If you <span className={styles.emoji}>👍🏻</span> what I’m doing and want to share new feature ideas with me or you just want to say Hi, send me
            an email.</p>
          <div className={styles.mailLinkWrapper}>
            <a href="mailto:info@stessaluna.com"><FontAwesomeIcon icon={faPaperPlane}/> Mail me</a>
          </div>
          <p>Or if you <span className={styles.emoji}>❤️</span> what I’m doing and want to support development and server costs, you can always buy me a dose
            of caffeine.</p>
          <div className={styles.bmcLinkWrapper}>
            <a className={styles.bmcLink} target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/lvdveekens">
              <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee"/>
              <span>Buy me a coffee</span>
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
)
}

export default AboutPage
