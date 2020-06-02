import React, {FC, FunctionComponent, useState} from "react"
import { Col, Container, Row } from "react-bootstrap"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logIn } from "../store/auth/actions"
import LoginForm from "./LoginForm"
import styles from "./LoginPage.scss?module"
import logoPath from "../../images/logo.svg"
import { History } from 'history';

interface Props {
  logIn: (username: string, password: string) => Promise<void>
  history: History
}

const LoginPage: FC<Props> = ({logIn, history}) => {
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = ({ username, password }) => {
    setErrorMessage("")
    logIn(username, password)
      .then(() => {
        history.push("/")
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message)
      })
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
            <LoginForm onSubmit={handleSubmit}/>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
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
