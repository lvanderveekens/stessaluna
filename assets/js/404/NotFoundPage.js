import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// TODO: refactor to function style later
class NotFoundPage extends Component {
  render() {
    return <div>
      {/* <img src={PageNotFound}  /> */}
      <p style={{ textAlign: "center" }}>
        <p>This page does not exist!</p>
        <Link to="/">Go to Home </Link>
      </p>
    </div>;
  }
}
export default NotFoundPage;