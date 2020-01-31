import React, { useState } from 'react';
import styles from './NewCommentForm.scss?module';
import PropTypes from 'prop-types';

const NewCommentForm = ({ onSubmit }) => {

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText("");
  };

  return (
    <form className={styles.newCommentForm} onSubmit={handleSubmit}>
      <div className={styles.new}>
        {/* TODO: input field must autosize  */}
        <div className={styles.inputWrapper}>
          <input type="text" name="comment" onChange={(e) => setText(e.target.value)} placeholder="Write a comment" value={text} />
        </div>
        <div>
          <input className="btn btn-dark" type="submit" value="Submit" />
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewCommentForm;