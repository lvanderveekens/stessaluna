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
    const response = axios.post('/api/posts/');
    console.log(response.data);
    this.props.fetchPosts()
    event.preventDefault();
  }

  render() {
    return (
      <form className={styles.newPostForm} onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          Text:
          <textarea value={this.state.text} onChange={this.handleTextChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

NewPostForm.propTypes = {
  fetchPosts: PropTypes.func
};

export default NewPostForm