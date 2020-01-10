import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// TODO: refactor to function style later
class NotFoundPage extends Component {
  render(){
      return <div>
          {/* <img src={PageNotFound}  /> */}
          DOES NOT EXIST!
          <p style={{textAlign:"center"}}>
            <Link to="/">Go to Home </Link>
          </p>
        </div>;
  }
}
export default NotFoundPage;