import React, { useState, FunctionComponent } from 'react';
import styles from './Post.scss?module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { addComment } from '../store/post/actions';
import CommentSection from './comment/comment-section/CommentSection';
import User from '../user/user.interface';
import { Dropdown } from 'react-bootstrap';
import CustomToggle from '../dropdown/CustomToggle';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../user/avatar/Avatar';

interface Props {
  id: number
  author: User
  timestamp: string
  text?: string
  image?: string
  onDelete: () => void
  comments: any[]
  user: User,
};

const Post: FunctionComponent<Props> = ({ id, author, timestamp, text, image, comments, onDelete, user, children }) => {

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const renderUserName = () => {
    if (author.firstName && author.lastName) {
      return (
        <span>
          <span className={styles.fullName}>{author.firstName} {author.lastName}</span>
          <span className={styles.usernameAfterFullName}>@{author.username}</span>
        </span>
      );
    }
    return (
      <span>
        <span style={{ marginRight: '0.3rem' }}>@{author.username}</span>
      </span>
    )
  }

  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className="d-flex w-100">
            <div className="mr-3">
              <Avatar src={author.avatar} countryCode={author.country} />
            </div>
            <div className={styles.usernameTimestampWrapper}>
              <div>{renderUserName()}</div>
              <span className={styles.timestamp}>{timestamp}</span>
            </div>
            {user.id == author.id && (
              <div className={styles.threeDotsMenu}>
                <Dropdown alignRight={true}>
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
        {children}
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

const mapStateToProps = state => ({
  user: state.auth.user
});

const actionCreators = {
  addComment,
};

export default connect(mapStateToProps, actionCreators)(Post);