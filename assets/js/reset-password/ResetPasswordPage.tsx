import React, {FC, useState} from "react"
import logoPath from "../../images/logo.svg";
import {Alert, Col, Container, Row} from "react-bootstrap";
import {COLUMN_BREAKPOINTS} from "../config/column-breakpoints";
import {RouteComponentProps} from 'react-router-dom';
import styles from './ResetPasswordPage.scss?module';
import {Formik} from "formik";
import Button from "../button/Button";
import ResetPasswordForm from "./reset-password-form/ResetPasswordForm";

interface Props extends RouteComponentProps {
}

const ResetPasswordPage: FC<Props> = ({history}) => {

  return (
    <div className={styles.resetPasswordPage}>
      <div className={styles.logoWrapper}>
        <img src={logoPath} alt="Logo" onClick={() => history.push("/")}/>
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
