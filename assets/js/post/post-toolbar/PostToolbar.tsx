import React, {FC, useState} from "react";
import Vote, {VoteType} from "../vote/vote.interface";
import {deletePost, undoVoteOnPost, updateVoteOnPost, voteOnPost} from "../../store/post/actions";
import styles from "./PostToolbar.scss?module";
import {ReactComponent as LikeIcon} from "../../../images/icon/like.svg";
import {ReactComponent as DislikeIcon} from "../../../images/icon/dislike.svg";
import {ReactComponent as CommentIcon} from "../../../images/icon/comment.svg";
import {Dropdown} from "react-bootstrap";
import CustomToggle from "../../dropdown/custom-toggle/CustomToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import User from "../../user/user.interface";
import classNames from "classnames/bind"
import LoginSignupModal from "../../exercise/login-signup-modal/LoginSignupModal";

const cx = classNames.bind(styles)

interface Props {
  postId: number
  author: User
  votes: Vote[]
  commentCount: number
  toggleComments: () => void
  loggedIn: boolean
  user?: User
  voteOnPost: (postId: number, type: VoteType) => Promise<void>
  updateVoteOnPost: (postId: number, voteId: number, type: VoteType) => Promise<void>
  undoVoteOnPost: (postId: number, voteId: number) => Promise<void>
  deletePost: (id: number) => Promise<void>
}

const PostToolbar: FC<Props> = ({postId, author, votes, commentCount, toggleComments, loggedIn, user, voteOnPost, updateVoteOnPost, undoVoteOnPost, deletePost}) => {

  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false)
  const [loginSignupModalText, setLoginSignupModalText] = useState(null)

  const existingVote = votes.find((vote) => user && user.id == vote.user.id)

  const vote = (type: VoteType) => {
    if (!loggedIn) {
      setLoginSignupModalText("Log in or sign up to vote on posts")
      setShowLoginSignupModal(true)
      return
    }

    if (existingVote) {
      if (existingVote.type == type) {
        undoVoteOnPost(postId, existingVote.id)
      } else {
        updateVoteOnPost(postId, existingVote.id, type)
      }
    } else {
      voteOnPost(postId, type)
    }
  }

  return (
    <div className={styles.postToolbar}>
      <div className={styles.likeIcon} onClick={() => vote(VoteType.UP)}>
        <LikeIcon className={cx({voted: existingVote && existingVote.type === VoteType.UP})}/>
        <span>{votes.filter((v) => v.type == VoteType.UP).length}</span>
      </div>
      <div className={styles.dislikeIcon} onClick={() => vote(VoteType.DOWN)}>
        <DislikeIcon className={cx({voted: existingVote && existingVote.type === VoteType.DOWN})}/>
        <span>{votes.filter((v) => v.type == VoteType.DOWN).length}</span>
      </div>
      <div className={styles.commentIcon} onClick={toggleComments}>
        <CommentIcon/>
        <span>{commentCount}</span>
      </div>
      {user && user.id == author.id && (
        <div className={styles.moreIcon}>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="something">
              <FontAwesomeIcon icon={faEllipsisH}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/edit-post/${postId}`}>Edit</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={() => deletePost(postId)}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
      {showLoginSignupModal && (
        <LoginSignupModal text={loginSignupModalText} onClose={() => setShowLoginSignupModal(false)}/>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
})

const actionCreators = {
  voteOnPost,
  updateVoteOnPost,
  undoVoteOnPost,
  deletePost,
}

export default connect(mapStateToProps, actionCreators)(PostToolbar)
