import React, { FunctionComponent, useState } from 'react';
import styles from './Comment.scss?module';
import ThreeDotsMenu from '../../menu/ThreeDotsMenu';


interface Props {
  timestamp: string;
  author: string;
  avatar: string;
  text: string;
  onDelete: () => void
}

const Comment: FunctionComponent<Props> = ({ timestamp, author, avatar, text, onDelete }) => {

  const [hovering, setHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showMenu = hovering || menuOpen
  console.log(showMenu);

  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <img src={avatar} />
      </div>
      <div
        className={styles.content}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="d-flex">
          <div className="mr-3">
            <span className={styles.author}>
              {author}
            </span>
            <span className={styles.text}>{text}</span>
          </div>
          <ThreeDotsMenu hidden={!showMenu} open={menuOpen} setOpen={setMenuOpen}>
            <div onClick={onDelete}>Delete comment</div>
          </ThreeDotsMenu>
        </div>
        <div className={styles.timestamp}>{timestamp}</div>
      </div>
    </div>
  );
};

export default Comment;