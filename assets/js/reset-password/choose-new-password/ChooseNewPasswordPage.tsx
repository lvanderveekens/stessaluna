import React, {FC} from "react"
import logoPath from "../../../images/logo.svg";
import {Col, Container, Row} from "react-bootstrap";
import {RouteComponentProps} from 'react-router-dom';
import styles from './ChooseNewPasswordPage.scss?module';
import {COLUMN_BREAKPOINTS} from "../../config/column-breakpoints";
import ChooseNewPasswordForm from "./choose-new-password-form/ChooseNewPasswordForm";

interface Props extends RouteComponentProps {
}

const ChooseNewPasswordPage: FC<Props> = ({history}) => {

  return (
    <div className={styles.chooseNewPasswordPage}>
      <div className={styles.logoWrapper}>
        <img src={logoPath} alt="Logo" onClick={() => history.push("/")}/>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col {...COLUMN_BREAKPOINTS}>
            <h4>Choose a new password</h4>
            <ChooseNewPasswordForm/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ChooseNewPasswordPage
