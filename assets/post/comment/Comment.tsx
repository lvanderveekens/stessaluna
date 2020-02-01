import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import styles from './Comment.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
var classNames = require('classnames/dedupe');


interface Props {
  timestamp: string;
  author: string;
  avatar: string;
  text: string;
  onDelete: () => void
}

const Comment: FunctionComponent<Props> = ({ timestamp, author, avatar, text, onDelete }) => {

  const [showMenu, setShowMenu] = useState(false);

  var menuIconClass = classNames(styles.menuIcon, { 'visible': showMenu });

  const menuPopupRef = useRef(null)

  function handleClickOutside(event) {
    if (menuPopupRef.current && !menuPopupRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  }

  // TODO: move popup menu into own component
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  });

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
          <div className={menuIconClass}>
            <FontAwesomeIcon icon={faEllipsisV} onClick={() => setShowMenu(!showMenu)} />
            {showMenu && (
              <div ref={menuPopupRef} className={styles.menuPopup} onClick={() => setShowMenu(false)}>
                <div onClick={onDelete}>Delete comment</div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.timestamp}>{timestamp}</div>
      </div>
    </div>
  );
};

export default Comment;