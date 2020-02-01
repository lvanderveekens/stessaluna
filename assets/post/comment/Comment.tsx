import React, { FunctionComponent } from 'react';
import styles from './Comment.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

interface Props {
  timestamp: string;
  author: string;
  avatar: string;
  text: string;
  onDelete: () => void
}

const Comment: FunctionComponent<Props> = ({ timestamp, author, avatar, text, onDelete }) => {

  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <img src={avatar} />
      </div>
      <div className={styles.content}>
        <div className="d-flex">
          <div className="mr-3">
            <span className={styles.author}>
              {author}
            </span>
            <span className={styles.text}>{text}</span>
          </div>
          <div className={styles.menu}>
            <FontAwesomeIcon icon={faEllipsisV} onClick={() => { }} />
          </div>
        </div>
        <div className={styles.timestamp}>{timestamp}</div>
      </div>
    </div>
  );
};

export default Comment;