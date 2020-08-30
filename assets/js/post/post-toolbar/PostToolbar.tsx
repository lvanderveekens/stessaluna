import React, {FC, useState} from "react";
import Vote, {VoteType} from "../vote/vote.interface";
import {deletePost} from "../state/post.actions";
import styles from "./PostToolbar.scss?module";
import {ReactComponent as LikeIcon} from "../../../images/icon/like.svg";
import {ReactComponent as DislikeIcon} from "../../../images/icon/dislike.svg";
import {ReactComponent as CommentIcon} from "../../../images/icon/comment.svg";
import {Dropdown} from "react-bootstrap";
import CustomToggle from "../../dropdown/custom-toggle/CustomToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {connect, useSelector} from "react-redux"
import User from "../../user/user.interface";
import classNames from "classnames/bind"
import LoginSignupModal from "../../exercise/login-signup-modal/LoginSignupModal";
import {undoVoteOnPost, updateVoteOnPost, voteOnPost} from "../vote/state/vote.actions";
import {State} from "../../store";

const cx = classNames.bind(styles)

interface OwnProps {
  postId: number
  authorId: number
  voteIds: number[]
  commentCount: number
  toggleComments: () => void
}

interface StateProps {
  loggedIn: boolean
  user?: User
}

interface DispatchProps {
  voteOnPost: (postId: number, type: VoteType) => Promise<void>
  updateVoteOnPost: (postId: number, voteId: number, type: VoteType) => Promise<void>
  undoVoteOnPost: (postId: number, voteId: number) => Promise<void>
  deletePost: (id: number) => Promise<void>
}

type Props  = OwnProps & StateProps & DispatchProps

const PostToolbar: FC<Props> = (
  {
    postId,
    authorId,
    voteIds,
    commentCount,
    toggleComments,
    loggedIn,
    user,
    voteOnPost,
    updateVoteOnPost,
    undoVoteOnPost,
    deletePost
  }
) => {

  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false)
  const [loginSignupModalText, setLoginSignupModalText] = useState(null)

  const votes: Vote[] = useSelector((state: State) => voteIds.map(id => state.entities.votesById[id]))
  const existingVote = votes.find((vote) => user && user.id == vote.userId)

  const [submittingVote, setSubmittingVote] = useState(false)

  const handleVoteClick = (type: VoteType) => () => {
    if (!loggedIn) {
      setLoginSignupModalText("Log in or sign up to vote on posts")
      setShowLoginSignupModal(true)
      return
    }

    setSubmittingVote(true)
    vote(type)
      .then(() => setSubmittingVote(false))
  }

  const vote = (type: VoteType): Promise<void> => {
    if (existingVote) {
      if (existingVote.type == type) {
        return undoVoteOnPost(postId, existingVote.id)
      } else {
        return updateVoteOnPost(postId, existingVote.id, type)
      }
    } else {
      return voteOnPost(postId, type)
    }
  }

  return (
    <div className={styles.postToolbar}>
      <button className={styles.likeIcon} disabled={submittingVote} onClick={handleVoteClick(VoteType.UP)}>
        <LikeIcon className={cx({voted: existingVote && existingVote.type === VoteType.UP})}/>
        <span>{votes.filter((v) => v.type == VoteType.UP).length}</span>
      </button>
      <button className={styles.dislikeIcon} disabled={submittingVote} onClick={handleVoteClick(VoteType.DOWN)}>
        <DislikeIcon className={cx({voted: existingVote && existingVote.type === VoteType.DOWN})}/>
        <span>{votes.filter((v) => v.type == VoteType.DOWN).length}</span>
      </button>
      <button className={styles.commentIcon} onClick={toggleComments}>
        <CommentIcon/>
        <span>{commentCount}</span>
      </button>
      {user && user.id == authorId && (
        <div className={styles.moreIcon}>
          <Dropdown className="h-100">
            <Dropdown.Toggle className="h-100 d-flex align-items-center" as={CustomToggle} id="something">
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

const mapStateToProps = (state: State): StateProps => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.userId && state.entities.usersById[state.auth.userId],
})

const mapDispatchToProps: any = ({
  voteOnPost,
  updateVoteOnPost,
  undoVoteOnPost,
  deletePost,
})

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(PostToolbar)
