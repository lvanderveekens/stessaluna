import React, {FC, useState} from "react"
import styles from "./CommentToolbar.scss?module"
import {Dropdown} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons"
import {ReactComponent as LikeIcon} from "../../../../images/icon/like.svg";
import {ReactComponent as DislikeIcon} from "../../../../images/icon/dislike.svg";
import {connect} from "react-redux"
import {undoVoteOnComment, updateVoteOnComment, voteOnComment} from "../../../store/post/actions";
import Vote, {VoteType} from "../../vote/vote.interface";
import User from "../../../user/user.interface";
import LoginSignupModal from "../../../exercise/login-signup-modal/LoginSignupModal";
import {State} from "../../../store";
import CustomToggle from "../../../dropdown/custom-toggle/CustomToggle";
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

interface Props {
  id: number
  author: User
  votes: Vote[]
  onDelete: () => void
  loggedIn: boolean
  user?: User
  voteOnComment: (commentId: number, type: VoteType) => Promise<void>
  updateVoteOnComment: (commentId: number, voteId: number, type: VoteType) => Promise<void>
  undoVoteOnComment: (commentId: number, voteId: number) => Promise<void>
}

const CommentToolbar: FC<Props> = (
  {
    id,
    author,
    votes,
    onDelete,
    loggedIn,
    user,
    voteOnComment,
    updateVoteOnComment,
    undoVoteOnComment
  }
) => {

  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false)
  const [loginSignupModalText, setLoginSignupModalText] = useState(null)

  const existingVote = votes.find((vote) => user && user.id == vote.user.id)

  const vote = (type: VoteType) => {
    if (!loggedIn) {
      setLoginSignupModalText("Log in or sign up to vote on comments")
      setShowLoginSignupModal(true)
      return
    }

    if (existingVote) {
      if (existingVote.type == type) {
        undoVoteOnComment(id, existingVote.id)
      } else {
        updateVoteOnComment(id, existingVote.id, type)
      }
    } else {
      voteOnComment(id, type)
    }
  }

  return (
    <div className={styles.commentToolbar}>
      <div className={styles.likeIcon} onClick={() => vote(VoteType.UP)}>
        <LikeIcon className={cx({voted: existingVote && existingVote.type === VoteType.UP})}/>
        {votes.filter((v: Vote) => v.type == VoteType.UP).length}
      </div>
      <div className={styles.dislikeIcon} onClick={() => vote(VoteType.DOWN)}>
        <DislikeIcon className={cx({voted: existingVote && existingVote.type === VoteType.DOWN})}/>
        {votes.filter((v: Vote) => v.type == VoteType.DOWN).length}
      </div>
      {user && user.id == author.id && (
        <div className={styles.moreIcon}>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="something">
              <FontAwesomeIcon icon={faEllipsisH}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
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

const actionCreators = {
  voteOnComment,
  updateVoteOnComment,
  undoVoteOnComment
}

const mapStateToProps = (state: State) => ({
  user: state.auth.user,
  loggedIn: state.auth.loggedIn,
})

export default connect(mapStateToProps, actionCreators)(CommentToolbar)
