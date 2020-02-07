import React, { useState, FunctionComponent } from 'react';
import styles from './Post.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { addComment } from './actions';
import CommentSection from './comment/comment-section/CommentSection';
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import ThreeDotsMenu from '../menu/ThreeDotsMenu';
import YouTubeVideo from './video/YouTubeVideo';

interface Props {
  id: number
  text: string
  author: string
  timestamp: string
  image: string
  onDelete: () => void
  avatar: string
  comments: any[]
};

const Post: FunctionComponent<Props> = ({ id, text, author, timestamp, image, onDelete, avatar, comments }) => {

  const [showComments, setShowComments] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const youtubeLink = linkify.find(text)
    .find(link => link.type == "url" &&
      (link.value.includes("youtube.com") || link.value.includes("youtu.be")));

  let youtubeVideoId
  if (youtubeLink) {
    if (youtubeLink.value.includes("youtube.com/watch?v=")) {
      youtubeVideoId = /watch\?v=(.*)/.exec(youtubeLink.value)[1];
    } else if (youtubeLink.value.includes("youtu.be/")) {
      youtubeVideoId = /youtu.be\/(.*)/.exec(youtubeLink.value)[1]
    }
  }

  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className="d-flex w-100">
            <div className={styles.avatar}>
              <img src={avatar} />
            </div>
            <div className={styles.usernameTimestampWrapper}>
              <div>{author}</div>
              <span className={styles.timestamp}>{timestamp}</span>
            </div>
            <ThreeDotsMenu open={menuOpen} setOpen={setMenuOpen}>
              <div onClick={onDelete}>Delete post</div>
            </ThreeDotsMenu>
          </div>
        </div>
        <div className={styles.text}><Linkify>{text}</Linkify></div>
        {image && (<img className={styles.image} src={image} />)}
        {youtubeVideoId && (<YouTubeVideo id={youtubeVideoId} />)}
      </div>
      <div className={styles.activity}>
        {comments && comments.length > 0 && (
          <div className={styles.numberOfComments} onClick={toggleComments}>Comments: {comments.length}</div>
        )}
      </div>
      <div className={styles.actions}>
        <div className={styles.addComment} onClick={() => setShowComments(true)}>
          <span className={styles.commentIcon}><FontAwesomeIcon icon={faCommentAlt} /></span>
          Add comment
        </div>
      </div>
      {showComments && (<CommentSection postId={id} comments={comments} />)}
    </div>
  );
};

const actionCreators = {
  addComment,
};

export default connect(null, actionCreators)(Post);