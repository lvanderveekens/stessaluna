import React, { useState } from 'react';
import styles from './NewCommentForm.scss?module';
import PropTypes from 'prop-types';

const NewCommentForm = ({ addComment }) => {

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.new}>
        {/* TODO: input field must autosize  */}
        <div className={styles.inputWrapper}>
          <input type="text" name="comment" onChange={(e) => setText(e.target.value)} value={text} />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default NewCommentForm;