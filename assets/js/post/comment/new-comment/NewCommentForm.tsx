import React, { useState, FunctionComponent } from 'react';
import styles from './NewCommentForm.scss?module';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  onSubmit: (comment: string) => void
  avatar: string
}

const NewCommentForm: FunctionComponent<Props> = ({ onSubmit, avatar }) => {

  const [text, setText] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }
  const handleSubmit = () => {
    onSubmit(text);
    setText("");
  };

  return (
    <form className={styles.newCommentForm} onSubmit={handleSubmit}>
      <div className="d-flex">
        <div className={styles.avatar}>
          <img src={avatar} />
        </div>
        <div className={styles.inputWrapper}>
          <TextareaAutosize
            className="form-control"
            type="text"
            name="comment"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment..."
            value={text}
          />
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewCommentForm;