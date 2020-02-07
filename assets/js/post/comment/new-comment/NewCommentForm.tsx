import React, { useState, FunctionComponent } from 'react';
import styles from './NewCommentForm.scss?module';
import PropTypes from 'prop-types';

interface Props {
  onSubmit: (comment: string) => void
  avatar: string
}

const NewCommentForm: FunctionComponent<Props> = ({ onSubmit, avatar }) => {

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText("");
  };

  return (
    <form className={styles.newCommentForm} onSubmit={handleSubmit}>
      <div className="d-flex align-items-center">
        <div className={styles.avatar}>
          <img src={avatar} />
        </div>
        <div className={styles.inputWrapper}>
          <input type="text" name="comment" onChange={(e) => setText(e.target.value)} placeholder="Write a comment..." value={text} />
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewCommentForm;