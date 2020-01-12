import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// TODO: refactor to function style later
const NotFoundPage = ({ location }) => {

  return (
    <div>
      <p style={{ textAlign: "center" }}>
        <p>Page <code>{location.pathname}</code> not found!</p>
        <Link to="/">Go to Home</Link>
      </p>
    </div>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.object,
};

export default NotFoundPage;