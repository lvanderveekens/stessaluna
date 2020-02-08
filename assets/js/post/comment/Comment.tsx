import React, { FunctionComponent, useState } from 'react';
import styles from './Comment.scss?module';
import ThreeDotsMenu from '../../menu/ThreeDotsMenu';
import User from '../../user/user.interface';


interface Props {
  author: User
  timestamp: string;
  text: string;
  user: User
  onDelete: () => void
}

const Comment: FunctionComponent<Props> = ({ author, timestamp, text, user, onDelete }) => {

  const [hovering, setHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showMenu = hovering || menuOpen

  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <img src={author.avatar} />
      </div>
      <div
        className={styles.content}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="d-flex">
          <div className="mr-3">
            <span className={styles.author}>{author.username}</span>
            <span className={styles.text}>{text}</span>
          </div>
          {user.id == author.id && (
            <ThreeDotsMenu hidden={!showMenu} open={menuOpen} setOpen={setMenuOpen}>
              <div onClick={onDelete}>Delete comment</div>
            </ThreeDotsMenu>
          )}
        </div>
        <div className={styles.timestamp}>{timestamp}</div>
      </div>
    </div>
  );
};

export default Comment;