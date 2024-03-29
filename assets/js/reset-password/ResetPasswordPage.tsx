import React, {FC} from "react"
import {Col, Container, Row} from "react-bootstrap";
import {COLUMN_BREAKPOINTS} from "../config/column-breakpoints";
import {RouteComponentProps} from 'react-router-dom';
import styles from './ResetPasswordPage.scss?module';
import ResetPasswordForm from "./reset-password-form/ResetPasswordForm";
import {ReactComponent as Logo} from "../../images/logo.svg"

interface Props extends RouteComponentProps {
}

const ResetPasswordPage: FC<Props> = ({history}) => {

  return (
    <div className={styles.resetPasswordPage}>
      <div className={styles.logoWrapper}>
        <Logo className={styles.logo} onClick={() => history.push("/")}/>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col {...COLUMN_BREAKPOINTS}>
            <h4>Reset your password</h4>
            <div className="mb-3">
              Enter your email address and we will send you a link to reset your password.
            </div>
            <ResetPasswordForm/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ResetPasswordPage
