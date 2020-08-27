import React, {FC} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import RegistrationForm from './registration-form/RegistrationForm';
import {connect} from 'react-redux';
import {register} from '../user/state/user.actions';
import styles from './RegistrationPage.scss?module';
import {History} from 'history';
import {COLUMN_BREAKPOINTS} from "../config/column-breakpoints";
import {ReactComponent as Logo} from "../../images/logo.svg";

interface Props {
  register: (email: string, username: string, password: string, country: string) => Promise<void>
  history: History
}

const RegistrationPage: FC<Props> = ({register, history}) => {

  const handleSubmit = (email, username, password, country) => {
    return register(email, username, password, country)
  }

  return (
    <div className={styles.registrationPage}>
      <div className={styles.logoWrapper}>
        <Logo className={styles.logo} onClick={() => history.push("/")}/>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col {...COLUMN_BREAKPOINTS}>
            <h4 className="mb-3">Create an account</h4>
            <RegistrationForm onSubmit={handleSubmit}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const actionCreators = {
  register,
};

export default connect(null, actionCreators)(RegistrationPage)