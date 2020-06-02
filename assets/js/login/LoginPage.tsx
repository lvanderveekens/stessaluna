import React, {FC, useState} from "react"
import {Col, Container, Row} from "react-bootstrap"
import Helmet from "react-helmet"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {logIn} from "../store/auth/actions"
import LoginForm from "./login-form/LoginForm"
import styles from "./LoginPage.scss?module"
import logoPath from "../../images/logo.svg"
import {History} from 'history';

interface Props {
  logIn: (username: string, password: string) => Promise<void>
  history: History
}

const LoginPage: FC<Props> = ({logIn, history}) => {

  const handleSubmit = (username: string, password: string) => {
    return logIn(username, password)
      .then(() => history.push("/"))
  }

  return (
    <div className={styles.loginPage}>
      <Helmet>
        <style>{`body { background-color: ${styles.stessalunaBrandSecondary}; }`}</style>
      </Helmet>
      <div className={styles.logoWrapper}>
        <img src={logoPath} alt="Logo" onClick={() => history.push("/")}/>
      </div>
      <Container>
        <Row>
          <Col sm={6} md={4} lg={4} xl={3}>
            <h4>Log in to Stessaluna</h4>
            <LoginForm onSubmit={handleSubmit}/>
            <p className="text-white">
              Or <Link to="/signup">click here</Link> to create a new account.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const actionCreators = {
  logIn,
}

export default connect(null, actionCreators)(LoginPage)
