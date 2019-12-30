import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './NewPostForm.scss?module'

class NewPostForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleTextChange(event) {
    this.setState({text: event.target.value});
  }

  handleSubmit(event) {
    // TODO: form validation
    const response = axios.post('/api/posts/', {
      userName: this.state.name,
      text: this.state.text
    })

    response.then(res => console.log(res.data))
      .catch(error => console.log(error));

    this.props.fetchPosts()
    event.preventDefault();
  }

  render() {
    return (
      <form className={styles.newPostForm} onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input className="form-control" type="text" value={this.state.name} onChange={this.handleNameChange} />
        </div>
        <div className="form-group">
          <label>Text:</label>
          <textarea className="form-control" value={this.state.text} onChange={this.handleTextChange} />
        </div>
        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
    )
  }
}

NewPostForm.propTypes = {
  fetchPosts: PropTypes.func
};

export default NewPostForm