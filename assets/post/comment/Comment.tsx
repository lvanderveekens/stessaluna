import React, { FunctionComponent } from 'react';
import styles from './Comment.scss?module';

interface Props {
  timestamp: string;
  author: string;
  avatar: string;
  text: string;
}

const Comment: FunctionComponent<Props> = ({ timestamp, author, avatar, text }) => {

  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <img src={avatar} />
      </div>
      <div>
        <span className={styles.author}>
          {author}
        </span>
        <span className={styles.text}>{text}</span>
        <div className={styles.timestamp}>{timestamp}</div>
      </div>
    </div>
  );
};

export default Comment;