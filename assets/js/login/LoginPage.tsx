import React, {FC} from "react"
import {Col, Container, Row} from "react-bootstrap"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {logIn} from "../store/auth/actions"
import LoginForm from "./login-form/LoginForm"
import styles from "./LoginPage.scss?module"
import {History} from 'history';
import {COLUMN_BREAKPOINTS} from "../config/column-breakpoints";
import Button from "../button/Button";
import {ReactComponent as Logo} from "../../images/logo.svg";

interface Props {
  logIn: (username: string, password: string) => Promise<void>
  history: History
}

const LoginPage: FC<Props> = ({logIn, history}) => {

  const handleSubmit = (username: string, password: string) => {
    return logIn(username, password)
      .then(() => {
        history.push("/")
      })
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.logoWrapper}>
        <Logo className={styles.logo} onClick={() => history.push("/")}/>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col {...COLUMN_BREAKPOINTS}>
            <h4>Log in to Stessaluna</h4>
            <LoginForm onSubmit={handleSubmit}/>
            <div className={styles.divider}>
              <span className={styles.line}/>
              <span className={styles.text}>OR</span>
              <span className={styles.line}/>
            </div>
            <Link to="/signup">
              <Button variant="light" className={styles.signupButton}>
                Sign up
              </Button>
            </Link>
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
