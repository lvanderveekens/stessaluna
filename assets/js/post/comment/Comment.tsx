import React, { FunctionComponent, useState } from 'react';
import styles from './Comment.scss?module';
import User from '../../user/user.interface';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import CustomToggle from '../../dropdown/CustomToggle';

interface Props {
  author: User
  timestamp: string;
  text: string;
  user: User
  onDelete: () => void
}

const Comment: FunctionComponent<Props> = ({ author, timestamp, text, user, onDelete }) => {

  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <img src={author.avatar} />
      </div>
      <div className={styles.content}>
        <div className="d-flex">
          <div className="mr-3">
            <span className={styles.author}>{author.username}</span>
            <span className={styles.text}>{text}</span>
            <div className={styles.timestamp}>{timestamp}</div>
          </div>
          {user.id == author.id && (
            <div className={styles.threeDotsMenu}>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="something">
                  <span className={styles.iconWrapper}>
                    <FontAwesomeIcon className={styles.icon} icon={faEllipsisV} />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;