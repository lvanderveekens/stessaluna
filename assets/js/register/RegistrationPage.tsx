import React, {FC} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import RegistrationForm from './registration-form/RegistrationForm';
import { connect } from 'react-redux';
import { register } from '../store/auth/actions';
import styles from './RegistrationPage.scss?module';
import logoPath from "../../images/logo.svg"
import { History } from 'history';

interface Props {
  register: (email: string, username: string, password: string, country: string) => void
  history: History
}

const RegistrationPage: FC<Props> = ({register, history}) => {

  const handleSubmit = (email, username, password, country) => {
    // TODO: onSubmit check if username already exists...
    register(email, username, password, country)
  }

  return (
    <div className={styles.registrationPage}>
      <div className={styles.logoWrapper}>
        <img src={logoPath} alt="Logo" onClick={() => history.push("/")}/>
      </div>
      <Container>
        <Row>
          <Col sm={6} md={4} lg={4} xl={3}>
            <h4 className="mb-3">Create your account</h4>
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